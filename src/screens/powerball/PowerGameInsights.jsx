import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import PowerGameInsightsComp from '../../components/powerball/gameinsights/PowerGameInsightsComp';
import {
  useGetPowerballGameInsightsQuery,
  useGetResultBasedDateTimePowerResultQuery,
  useSearchJackpotGameInsightsQuery,
} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/helpercComponent/NoDataFound';
import _ from 'lodash';

const PowerGameInsights = ({route}) => {
  const {item, powertime} = route.params;
  const searchInputRef = useRef(null);

  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const {accesstoken} = useSelector(state => state.user);
  const [gameInsightsData, setGameInsightsData] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [resultFound, setResultFound] = useState(false);

  // Focus the input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Result checking logic
  const {
    isLoading: resultIsLoading,
    data: resultData,
    error: resultError,
    refetch: resultRefetch,
  } = useGetResultBasedDateTimePowerResultQuery({
    accesstoken,
    powertimeid: powertime._id,
    powerdateid: item._id,
  });

  useEffect(() => {
    if (!resultIsLoading && resultData) {
      if (resultData.message === 'PowerResult retrieved successfully') {
        setResultFound(false);
      } else {
        setResultFound(true);
      }
    }
    if (
      resultError?.data?.message ===
      'No PowerResult found for the given powertime and powerdate'
    ) {
      setResultFound(true);
    }
  }, [resultData, resultIsLoading, resultError]);

  // API calls
  const {
    data: paginatedData,
    refetch: refetchPaginated,
    isFetching: fetchingPaginated,
    error: paginatedError,
  } = useGetPowerballGameInsightsQuery(
    {
      accesstoken,
      powerdateId: item._id,
      powertimeId: powertime._id,
      page,
      limit,
    },
    {skip: debouncedSearch.length > 0},
  );

  const {data: searchData, isFetching: fetchingSearch} =
    useSearchJackpotGameInsightsQuery(
      debouncedSearch.length > 0
        ? {accesstoken, id: gameId, jackpot: debouncedSearch, page, limit}
        : {skip: true},
    );

  // Data processing
  useEffect(() => {
    if (fetchingPaginated || fetchingSearch) return;

    if (paginatedError) {
      setHasMore(false);
      return;
    }

    if (paginatedData) {
      setTotalRecords(paginatedData.totalRecords);
      if (paginatedData.tickets?.[0]?._id) {
        setGameId(paginatedData.tickets[0]._id);
      }
      if (paginatedData.tickets?.[0]?.alltickets) {
        const newTickets = paginatedData.tickets[0].alltickets;
        setGameInsightsData(prev => {
          if (page === 1) return newTickets;
          const existingIds = new Set(
            prev.map(item => `${item.userId}-${item.tickets[0]._id}`),
          );
          const filteredNewTickets = newTickets.filter(item => {
            const itemId = `${item.userId}-${item.tickets[0]._id}`;
            return !existingIds.has(itemId);
          });
          return [...prev, ...filteredNewTickets];
        });
        setHasMore(page < paginatedData.totalPages);
      }
    }

    if (debouncedSearch.length > 0 && searchData?.tickets?.[0]?.alltickets) {
      const newTickets = searchData.tickets[0].alltickets;
      setGameInsightsData(prev => {
        if (page === 1) return newTickets;
        const existingIds = new Set(prev.map(item => item.tickets[0]._id));
        const filteredNewTickets = newTickets.filter(item => {
          return !existingIds.has(item.tickets[0]._id);
        });
        return [...prev, ...filteredNewTickets];
      });
      setTotalRecords(searchData.totalRecords);
      setHasMore(page < searchData.totalPages);
    }
  }, [
    paginatedData,
    searchData,
    debouncedSearch,
    page,
    fetchingPaginated,
    fetchingSearch,
    paginatedError,
  ]);

  // Components
  const Footer = () => {
    return (
      <View style={{marginVertical: heightPercentageToDP(2)}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreatePowerResult', {
              forprocess: 'create',
              powertime,
              item,
            })
          }
          style={{
            backgroundColor: COLORS.blue,
            padding: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(1),
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONT.Montserrat_Regular,
            }}>
            Create New Result
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

  const Header = React.memo(() => {
    return (
      <View
        style={{
          height: heightPercentageToDP(7),
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            width: widthPercentageToDP(50),
            flexDirection: 'row',
            backgroundColor: COLORS.white_s,
            alignItems: 'center',
            paddingHorizontal: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(1),
            marginHorizontal: heightPercentageToDP(1),
          }}>
          <Fontisto
            name={'search'}
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
          <TextInput
            ref={searchInputRef}
            style={{
              marginStart: heightPercentageToDP(1),
              flex: 1,
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
            }}
            placeholder="Search Jackpot"
            placeholderTextColor={COLORS.black}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={() => {
              setDebouncedSearch(searchQuery);
              Keyboard.dismiss();
            }}
            blurOnSubmit={false}
            autoFocus={true}
            onFocus={() => searchInputRef.current?.focus()}
          />
        </View>
        <TouchableOpacity
          onPress={() => copyToClipboard(searchQuery)}
          style={{
            backgroundColor: COLORS.white_s,
            margin: heightPercentageToDP(1),
            padding: heightPercentageToDP(1),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: heightPercentageToDP(1),
          }}>
          <Feather
            name={'copy'}
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
        </TouchableOpacity>
      </View>
    );
  });

  const loadMore = () => {
    if (
      !loading &&
      hasMore &&
      debouncedSearch.length === 0 &&
      !fetchingPaginated
    ) {
      setPage(prev => prev + 1);
    }
  };

  const isLoading = fetchingPaginated || fetchingSearch;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="height"
      keyboardVerticalOffset={-130}>
      <MainBackgroundWithoutScrollview
        lefttext={item.powerdate}
        righttext={powertime.powertime}
        title={'Game Insights'}>
        <Header />
        {isLoading && page === 1 ? (
          <Loading />
        ) : gameInsightsData.length > 0 ? (
          <FlatList
            key={`flatlist-${gameInsightsData.length}`}
            data={[...gameInsightsData].slice().reverse()}
            keyExtractor={item => item._id?.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            ListHeaderComponent={() => (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  marginTop: heightPercentageToDP(1),
                }}>
                <Text
                  style={{
                    color: COLORS.white_s,
                    fontSize: heightPercentageToDP(2),
                    fontFamily: FONT.Montserrat_Bold,
                  }}>
                  Total Tickets : {totalRecords}
                </Text>
              </View>
            )}
            renderItem={({item, index}) => (
              <PowerGameInsightsComp
                item={item}
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                toggleItem={toggleItem}
                index={totalRecords - index}
              />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={() =>
              hasMore && isLoading ? (
                <ActivityIndicator size="large" color={COLORS.white_s} />
              ) : null
            }
          />
        ) : (
          <NoDataFound data={'No data found'} />
        )}
        {resultFound && <Footer />}
      </MainBackgroundWithoutScrollview>
    </KeyboardAvoidingView>
  );
};

export default React.memo(PowerGameInsights);

// import {
//   ActivityIndicator,
//   BackHandler,
//   FlatList,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Keyboard,
// } from 'react-native';
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Loading from '../../components/helpercComponent/Loading';
// import {COLORS, FONT} from '../../../assets/constants';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Feather from 'react-native-vector-icons/Feather';
// import PowerGameInsightsComp from '../../components/powerball/gameinsights/PowerGameInsightsComp';
// import {
//   useGetPowerballGameInsightsQuery,
//   useGetResultBasedDateTimePowerResultQuery,
//   useSearchJackpotGameInsightsQuery,
// } from '../../helper/Networkcall';
// import {useSelector} from 'react-redux';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Toast from 'react-native-toast-message';
// import NoDataFound from '../../components/helpercComponent/NoDataFound';
// import _ from 'lodash';

// const PowerGameInsights = ({route}) => {
//   const {item, powertime} = route.params;

//   const [expandedItems, setExpandedItems] = useState({});
//   const toggleItem = id => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const navigation = useNavigation();
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(8);
//   const {accesstoken} = useSelector(state => state.user);
//   const [gameInsightsData, setGameInsightsData] = useState([]);
//   const [gameId, setGameId] = useState(null);
//   const searchInputRef = useRef(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [totalRecords, setTotalRecords] = useState(0);

//   // Keep your existing debounce effect
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   const {
//     isLoading: resultIsLoading,
//     data: resultData,
//     error: resultError,
//     refetch: resultRefetch,
//   } = useGetResultBasedDateTimePowerResultQuery({
//     accesstoken,
//     powertimeid: powertime._id,
//     powerdateid: item._id,
//   });

//   const [resultFound, setResultFound] = useState(false);

//   useEffect(() => {
//     if (!resultIsLoading && resultData) {
//       if (resultData.message === 'PowerResult retrieved successfully') {
//         setResultFound(false);
//       } else {
//         setResultFound(true);
//       }
//     }
//     if (
//       resultError?.data?.message ===
//       'No PowerResult found for the given powertime and powerdate'
//     ) {
//       setResultFound(true);
//     }
//   }, [resultData, resultIsLoading, resultError]);

//   const Footer = () => {
//     return (
//       <View
//         style={{
//           marginVertical: heightPercentageToDP(2),
//         }}>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate('CreatePowerResult', {
//               forprocess: 'create',
//               powertime,
//               item,
//             })
//           }
//           style={{
//             backgroundColor: COLORS.blue,
//             padding: heightPercentageToDP(2),
//             borderRadius: heightPercentageToDP(1),
//             alignItems: 'center',
//           }}>
//           <Text
//             style={{
//               color: COLORS.white,
//               fontFamily: FONT.Montserrat_Regular,
//             }}>
//             Create New Result
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const copyToClipboard = val => {
//     Clipboard.setString(val);
//     Toast.show({
//       type: 'success',
//       text1: 'Text Copied',
//       text2: 'The text has been copied to your clipboard!',
//     });
//   };

//   const Header = React.memo(() => {
//     const searchInputRef = useRef(null);

//     const handleSearchChange = text => {
//       setSearchQuery(text); // Update the main state
//     };

//     const handleSearchSubmit = () => {
//       setDebouncedSearch(searchQuery); // Trigger the search
//       Keyboard.dismiss();
//     };

//     return (
//       <View
//         style={{
//           height: heightPercentageToDP(7),
//           flexDirection: 'row',
//         }}>
//         <View
//           style={{
//             flex: 1,
//             width: widthPercentageToDP(50),
//             flexDirection: 'row',
//             backgroundColor: COLORS.white_s,
//             alignItems: 'center',
//             paddingHorizontal: heightPercentageToDP(2),
//             borderRadius: heightPercentageToDP(1),
//             marginHorizontal: heightPercentageToDP(1),
//           }}>
//           <Fontisto
//             name={'search'}
//             size={heightPercentageToDP(3)}
//             color={COLORS.darkGray}
//           />
//           {/* <TextInput
//             ref={searchInputRef}
//             style={{
//               marginStart: heightPercentageToDP(1),
//               flex: 1,
//               fontFamily: FONT.Montserrat_Regular,
//               fontSize: heightPercentageToDP(2.5),
//               color: COLORS.black,
//             }}
//             placeholder="Search Jackpot"
//             placeholderTextColor={COLORS.black}
//             value={localSearchQuery}
//             onChangeText={handleSearchChange}
//             returnKeyType="search"
//             onSubmitEditing={() => {
//               setDebouncedSearch(localSearchQuery);
//               Keyboard.dismiss();
//             }}
//             blurOnSubmit={false}
//             autoCorrect={false}
//             autoCapitalize="none"
//           /> */}
//           <TextInput
//             ref={searchInputRef}
//             style={{
//               marginStart: heightPercentageToDP(1),
//               flex: 1,
//               fontFamily: FONT.Montserrat_Regular,
//               fontSize: heightPercentageToDP(2.5),
//               color: COLORS.black,
//             }}
//             placeholder="Search Jackpot"
//             placeholderTextColor={COLORS.black}
//             value={searchQuery} // Use the main state
//             onChangeText={handleSearchChange}
//             returnKeyType="search"
//             onSubmitEditing={handleSearchSubmit}
//             blurOnSubmit={false}
//             autoCorrect={false}
//             autoCapitalize="none"
//           />
//         </View>
//         <TouchableOpacity
//           onPress={() => copyToClipboard(localSearchQuery)}
//           style={{
//             backgroundColor: COLORS.white_s,
//             margin: heightPercentageToDP(1),
//             padding: heightPercentageToDP(1),
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: heightPercentageToDP(1),
//           }}>
//           <Feather
//             name={'copy'}
//             size={heightPercentageToDP(3)}
//             color={COLORS.darkGray}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   });

//   useEffect(() => {
//     if (debouncedSearch) {
//       setPage(1);
//       setGameInsightsData([]);
//       setHasMore(true);
//     }
//   }, [debouncedSearch]);

//   const {
//     data: paginatedData,
//     refetch: refetchPaginated,
//     isFetching: fetchingPaginated,
//     error: paginatedError,
//     isSuccess,
//   } = useGetPowerballGameInsightsQuery(
//     {
//       accesstoken,
//       powerdateId: item._id,
//       powertimeId: powertime._id,
//       page,
//       limit,
//     },
//     {skip: debouncedSearch.length > 0},
//   );

//   const {data: searchData, isFetching: fetchingSearch} =
//     useSearchJackpotGameInsightsQuery(
//       debouncedSearch.length > 0
//         ? {accesstoken, id: gameId, jackpot: debouncedSearch, page, limit}
//         : {skip: true},
//     );

//   useFocusEffect(
//     useCallback(() => {
//       setPage(1);
//       setHasMore(true);
//       if (isSuccess) {
//         refetchPaginated?.();
//       }

//       resultRefetch();
//     }, [refetchPaginated, isSuccess]),
//   );

//   useEffect(() => {
//     if (fetchingPaginated || fetchingSearch) return;

//     if (paginatedError) {
//       setHasMore(false);
//       return;
//     }

//     if (paginatedData) {
//       setTotalRecords(paginatedData.totalRecords);

//       if (paginatedData.tickets?.[0]?._id) {
//         setGameId(paginatedData.tickets[0]._id);
//       }

//       if (paginatedData.tickets?.[0]?.alltickets) {
//         const newTickets = paginatedData.tickets[0].alltickets;

//         setGameInsightsData(prev => {
//           if (page === 1) return newTickets;

//           const existingIds = new Set(
//             prev.map(item => `${item.userId}-${item.tickets[0]._id}`),
//           );

//           const filteredNewTickets = newTickets.filter(item => {
//             const itemId = `${item.userId}-${item.tickets[0]._id}`;
//             return !existingIds.has(itemId);
//           });

//           return [...prev, ...filteredNewTickets];
//         });

//         setHasMore(page < paginatedData.totalPages);
//       }
//     }

//     if (debouncedSearch.length > 0 && searchData?.tickets?.[0]?.alltickets) {
//       const newTickets = searchData.tickets[0].alltickets;
//       setGameInsightsData(prev => {
//         if (page === 1) return newTickets;

//         const existingIds = new Set(prev.map(item => item.tickets[0]._id));

//         const filteredNewTickets = newTickets.filter(item => {
//           return !existingIds.has(item.tickets[0]._id);
//         });

//         return [...prev, ...filteredNewTickets];
//       });
//       setTotalRecords(searchData.totalRecords);
//       setHasMore(page < searchData.totalPages);
//     }
//   }, [
//     paginatedData,
//     searchData,
//     debouncedSearch,
//     page,
//     fetchingPaginated,
//     fetchingSearch,
//     paginatedError,
//   ]);

//   const loadMore = () => {
//     if (
//       !isLoading &&
//       hasMore &&
//       debouncedSearch.length === 0 &&
//       !fetchingPaginated
//     ) {
//       setPage(prev => prev + 1);
//     }
//   };

//   const isLoading = fetchingPaginated || fetchingSearch;
//   return (
//     <MainBackgroundWithoutScrollview
//       lefttext={item.powerdate}
//       righttext={powertime.powertime}
//       title={'Game Insights'}>
//       <Header />
//       {isLoading && page === 1 ? (
//         <Loading />
//       ) : gameInsightsData.length > 0 ? (
//         <FlatList
//           key={`flatlist-${gameInsightsData.length}`}
//           data={[...gameInsightsData].slice().reverse()}
//           keyExtractor={item => item._id?.toString()}
//           initialNumToRender={10}
//           maxToRenderPerBatch={5}
//           windowSize={10}
//           ListHeaderComponent={() => (
//             <View
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'flex-end',
//                 flexDirection: 'row',
//                 marginTop: heightPercentageToDP(1),
//               }}>
//               <Text
//                 style={{
//                   color: COLORS.white_s,
//                   fontSize: heightPercentageToDP(2),
//                   fontFamily: FONT.Montserrat_Bold,
//                 }}>
//                 Total Tickets : {totalRecords}
//               </Text>
//             </View>
//           )}
//           renderItem={({item, index}) => (
//             <PowerGameInsightsComp
//               item={item}
//               expandedItems={expandedItems}
//               setExpandedItems={setExpandedItems}
//               toggleItem={toggleItem}
//               index={totalRecords - index}
//             />
//           )}
//           onEndReached={loadMore}
//           onEndReachedThreshold={0.2}
//           ListFooterComponent={() =>
//             hasMore && isLoading ? (
//               <ActivityIndicator size="large" color={COLORS.white_s} />
//             ) : null
//           }
//         />
//       ) : (
//         <NoDataFound data={'No data found'} />
//       )}

//       {resultFound && <Footer />}
//     </MainBackgroundWithoutScrollview>
//   );
// };

// export default PowerGameInsights;

// // import {
// //   ActivityIndicator,
// //   BackHandler,
// //   FlatList,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import React, {useCallback, useEffect, useRef, useState} from 'react';
// // import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// // import {
// //   heightPercentageToDP,
// //   widthPercentageToDP,
// // } from 'react-native-responsive-screen';
// // import Loading from '../../components/helpercComponent/Loading';
// // import {COLORS, FONT} from '../../../assets/constants';
// // import {useFocusEffect, useNavigation} from '@react-navigation/native';
// // import Fontisto from 'react-native-vector-icons/Fontisto';
// // import Feather from 'react-native-vector-icons/Feather';
// // import PowerGameInsightsComp from '../../components/powerball/gameinsights/PowerGameInsightsComp';
// // import {
// //   useGetPowerballGameInsightsQuery,
// //   useGetResultBasedDateTimePowerResultQuery,
// //   useSearchJackpotGameInsightsQuery,
// // } from '../../helper/Networkcall';
// // import {useSelector} from 'react-redux';
// // import Clipboard from '@react-native-clipboard/clipboard';
// // import Toast from 'react-native-toast-message';
// // import NoDataFound from '../../components/helpercComponent/NoDataFound';

// // const PowerGameInsights = ({route}) => {
// //   const {item, powertime} = route.params;

// //   const [expandedItems, setExpandedItems] = useState({});
// //   const toggleItem = id => {
// //     setExpandedItems(prev => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };

// //   const navigation = useNavigation();
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(8);
// //   const {accesstoken} = useSelector(state => state.user);
// //   const [gameInsightsData, setGameInsightsData] = useState([]);
// //   const [gameId, setGameId] = useState(null);

// //   // useEffect(() => {
// //   //   const handleBackPress = () => {
// //   //     return true; // Prevent back navigation on space key press
// //   //   };

// //   //   BackHandler.addEventListener('hardwareBackPress', handleBackPress);
// //   //   return () =>
// //   //     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
// //   // }, []);

// //   // [CHECKING FOR RESULT ALREADY CREATED OR NOT]
// //   const {
// //     isLoading: resultIsLoading,
// //     data: resultData,
// //     error: resultError,
// //     refetch: resultRefetch,
// //   } = useGetResultBasedDateTimePowerResultQuery({
// //     accesstoken,
// //     powertimeid: powertime._id,
// //     powerdateid: item._id,
// //   });

// //   // console.log(JSON.stringify(resultData));
// //   // console.log(resultData);

// //   const [resultFound, setResultFound] = useState(false);

// //   useEffect(() => {
// //     if (!resultIsLoading && resultData) {
// //       if (resultData.message === 'PowerResult retrieved successfully') {
// //         setResultFound(false);
// //       } else {
// //         setResultFound(true);
// //       }
// //     }
// //     if (
// //       resultError?.data?.message ===
// //       'No PowerResult found for the given powertime and powerdate'
// //     ) {
// //       setResultFound(true);
// //     }
// //   }, [resultData, resultIsLoading, resultError]);

// //   const Footer = () => {
// //     return (
// //       <View
// //         style={{
// //           marginVertical: heightPercentageToDP(2),
// //         }}>
// //         <TouchableOpacity
// //           onPress={() =>
// //             navigation.navigate('CreatePowerResult', {
// //               forprocess: 'create',
// //               powertime,
// //               item,
// //             })
// //           }
// //           style={{
// //             backgroundColor: COLORS.blue,
// //             padding: heightPercentageToDP(2),
// //             borderRadius: heightPercentageToDP(1),
// //             alignItems: 'center',
// //           }}>
// //           <Text
// //             style={{
// //               color: COLORS.white,
// //               fontFamily: FONT.Montserrat_Regular,
// //             }}>
// //             Create New Result
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   const copyToClipboard = val => {
// //     Clipboard.setString(val);
// //     Toast.show({
// //       type: 'success',
// //       text1: 'Text Copied',
// //       text2: 'The text has been copied to your clipboard!',
// //     });
// //   };

// //   const Header = () => {
// //     return (
// //       <View
// //         style={{
// //           height: heightPercentageToDP(7),
// //           flexDirection: 'row',
// //         }}>
// //         <View
// //           style={{
// //             flex: 1,
// //             width: widthPercentageToDP(50),
// //             flexDirection: 'row',
// //             backgroundColor: COLORS.white_s,
// //             alignItems: 'center',
// //             paddingHorizontal: heightPercentageToDP(2),
// //             borderRadius: heightPercentageToDP(1),
// //             marginHorizontal: heightPercentageToDP(1),
// //           }}>
// //           <Fontisto
// //             name={'search'}
// //             size={heightPercentageToDP(3)}
// //             color={COLORS.darkGray}
// //           />

// //           {/*
// //           <TextInput
// //             style={{
// //               marginStart: heightPercentageToDP(1),
// //               flex: 1,
// //               fontFamily: FONT.Montserrat_Regular,
// //               fontSize: heightPercentageToDP(2.5),
// //               color: COLORS.black,
// //             }}
// //             placeholder="Search Jackpot"
// //             placeholderTextColor={COLORS.black}
// //             value={searchQuery} // ✅ Ensure controlled input
// //             onChangeText={text => setSearchQuery(text)} // ✅ Direct state update
// //             keyboardType="default"
// //             returnKeyType="done" // ✅ Helps prevent unnecessary behaviors
// //             blurOnSubmit={false} // ✅ Prevents closing keyboard on enter
// //             onSubmitEditing={() => console.log('Submitted')} // ✅ Handles submission properly
// //           /> */}
// //           <TextInput
// //             style={{
// //               marginStart: heightPercentageToDP(1),
// //               flex: 1,
// //               fontFamily: FONT.Montserrat_Regular,
// //               fontSize: heightPercentageToDP(2.5),
// //               color: COLORS.black,
// //             }}
// //             placeholder="Search Jackpot"
// //             placeholderTextColor={COLORS.black}
// //             value={searchQuery}
// //             onChangeText={setSearchQuery} // Directly use setter
// //             returnKeyType="search" // Shows search button on keyboard
// //             onSubmitEditing={() => {
// //               // Trigger search when search button is pressed
// //               setDebouncedSearch(searchQuery);
// //             }}
// //             blurOnSubmit={false} // Prevents keyboard from dismissing
// //           />
// //         </View>
// //         <TouchableOpacity
// //           onPress={() => copyToClipboard(searchQuery)}
// //           style={{
// //             backgroundColor: COLORS.white_s,
// //             margin: heightPercentageToDP(1),
// //             padding: heightPercentageToDP(1),
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             borderRadius: heightPercentageToDP(1),
// //           }}>
// //           <Feather
// //             name={'copy'}
// //             size={heightPercentageToDP(3)}
// //             color={COLORS.darkGray}
// //           />
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   // States

// //   const [hasMore, setHasMore] = useState(true);
// //   const [loading, setLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [debouncedSearch, setDebouncedSearch] = useState('');
// //   const [totalRecords, setTotalRecords] = useState(0);
// //   // Debounce Effect for Search
// //   useEffect(() => {
// //     const handler = setTimeout(() => {
// //       setDebouncedSearch(searchQuery);
// //     }, 500);
// //     return () => clearTimeout(handler);
// //   }, [searchQuery]);

// //   // Reset pagination when search changes
// //   useEffect(() => {
// //     if (debouncedSearch) {
// //       setPage(1);
// //       setGameInsightsData([]);
// //       setHasMore(true);
// //     }
// //   }, [debouncedSearch]);

// //   // FOR ALL BET DATA

// //   // Fetch Paginated Data
// //   const {
// //     data: paginatedData,
// //     refetch: refetchPaginated,
// //     isFetching: fetchingPaginated,
// //     error: paginatedError,
// //   } = useGetPowerballGameInsightsQuery(
// //     {
// //       accesstoken,
// //       powerdateId: item._id,
// //       powertimeId: powertime._id,
// //       page,
// //       limit,
// //     },
// //     {skip: debouncedSearch.length > 0}, // Skip pagination if searching
// //   );

// //   // Fetch Search Data
// //   // Fetch Search Data
// //   const {data: searchData, isFetching: fetchingSearch} =
// //     useSearchJackpotGameInsightsQuery(
// //       debouncedSearch.length > 0
// //         ? {accesstoken, id: gameId, jackpot: debouncedSearch, page, limit}
// //         : {skip: true},
// //     );

// //   // Reset State on Navigation Back
// //   useFocusEffect(
// //     useCallback(() => {
// //       // setPartners([]); // ✅ Reset Data
// //       setPage(1); // ✅ Reset Page
// //       setHasMore(true); // ✅ Reset Load More
// //       refetchPaginated?.(); // ✅ Ensure Fresh Data
// //       resultRefetch();
// //     }, [refetchPaginated]),
// //   );

// //   useEffect(() => {
// //     if (fetchingPaginated || fetchingSearch) return;

// //     if (paginatedError) {
// //       setHasMore(false);
// //       return;
// //     }

// //     if (paginatedData) {
// //       // Update total records from API response
// //       setTotalRecords(paginatedData.totalRecords);

// //       // Update game ID if available
// //       if (paginatedData.tickets?.[0]?._id) {
// //         setGameId(paginatedData.tickets[0]._id);
// //       }

// //       // If we have tickets data
// //       if (paginatedData.tickets?.[0]?.alltickets) {
// //         const newTickets = paginatedData.tickets[0].alltickets;

// //         setGameInsightsData(prev => {
// //           if (page === 1) return newTickets;

// //           // Merge while avoiding duplicates - for paginated data
// //           const existingIds = new Set(
// //             prev.map(item => `${item.userId}-${item.tickets[0]._id}`),
// //           );

// //           const filteredNewTickets = newTickets.filter(item => {
// //             const itemId = `${item.userId}-${item.tickets[0]._id}`;
// //             return !existingIds.has(itemId);
// //           });

// //           return [...prev, ...filteredNewTickets];
// //         });

// //         // Determine if more data is available
// //         setHasMore(page < paginatedData.totalPages);
// //       }
// //     }

// //     // Handle search results
// //     if (debouncedSearch.length > 0 && searchData?.tickets?.[0]?.alltickets) {
// //       const newTickets = searchData.tickets[0].alltickets;
// //       setGameInsightsData(prev => {
// //         if (page === 1) return newTickets;

// //         // Merge while avoiding duplicates - for search data
// //         const existingIds = new Set(
// //           prev.map(item => {
// //             // For search results, use the ticket's _id directly since structure is different
// //             return item.tickets[0]._id; // Just use the ticket ID since it's unique
// //           }),
// //         );

// //         const filteredNewTickets = newTickets.filter(item => {
// //           return !existingIds.has(item.tickets[0]._id);
// //         });

// //         return [...prev, ...filteredNewTickets];
// //       });
// //       setTotalRecords(searchData.totalRecords);
// //       setHasMore(page < searchData.totalPages);
// //     }
// //   }, [
// //     paginatedData,
// //     searchData,
// //     debouncedSearch,
// //     page,
// //     fetchingPaginated,
// //     fetchingSearch,
// //     paginatedError,
// //   ]);

// //   // const loadMore = () => {
// //   //   if (!loading && hasMore && debouncedSearch.length === 0) {
// //   //     setPage(prev => prev + 1);
// //   //   }
// //   // };

// //   const loadMore = () => {
// //     if (
// //       !isLoading &&
// //       hasMore &&
// //       debouncedSearch.length === 0 &&
// //       !fetchingPaginated
// //     ) {
// //       setPage(prev => prev + 1); // This will trigger the useEffect
// //     }
// //   };

// //   // Combined Loading State
// //   // const isLoading = fetchingPaginated || fetchingSearch || loading;
// //   const isLoading = fetchingPaginated || fetchingSearch;
// //   return (
// //     <MainBackgroundWithoutScrollview
// //       lefttext={item.powerdate}
// //       righttext={powertime.powertime}
// //       title={'Game Insights'}>
// //       <Header />
// //       {isLoading && page === 1 ? (
// //         <Loading />
// //       ) : gameInsightsData.length > 0 ? (
// //         <FlatList
// //           key={item => item._id}
// //           data={[...gameInsightsData].slice().reverse()}
// //           keyExtractor={item => item._id?.toString()}
// //           initialNumToRender={10}
// //           maxToRenderPerBatch={5}
// //           windowSize={10}
// //           ListHeaderComponent={() => (
// //             <View
// //               style={{
// //                 display: 'flex',
// //                 justifyContent: 'space-between',
// //                 alignItems: 'flex-end',
// //                 flexDirection: 'row',
// //                 marginTop: heightPercentageToDP(1),
// //               }}>
// //               <Text
// //                 style={{
// //                   color: COLORS.white_s,
// //                   fontSize: heightPercentageToDP(2),
// //                   fontFamily: FONT.Montserrat_Bold,
// //                 }}>
// //                 Total Tickets : {totalRecords}
// //               </Text>
// //             </View>
// //           )}
// //           renderItem={({item, index}) => (
// //             <PowerGameInsightsComp
// //               item={item}
// //               expandedItems={expandedItems}
// //               setExpandedItems={setExpandedItems}
// //               toggleItem={toggleItem}
// //               index={totalRecords - index}
// //             />
// //           )}
// //           onEndReached={loadMore}
// //           onEndReachedThreshold={0.2}
// //           ListFooterComponent={() =>
// //             hasMore && isLoading ? (
// //               <ActivityIndicator size="large" color={COLORS.white_s} />
// //             ) : null
// //           }
// //         />
// //       ) : (
// //         <NoDataFound data={'No data found'} />
// //       )}

// //       {resultFound && <Footer />}
// //     </MainBackgroundWithoutScrollview>
// //   );
// // };

// // export default PowerGameInsights;
