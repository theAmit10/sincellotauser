import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, FONT} from '../../../assets/constants';
import PowerGameInsightsComp from '../../components/powerball/gameinsights/PowerGameInsightsComp';
import {
  useGetPowerballGameInsightsQuery,
  useGetResultBasedDateTimePowerResultQuery,
  useSearchJackpotGameInsightsQuery,
} from '../../helper/Networkcall';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const PowerGameInsights = ({route}) => {
  const navigation = useNavigation();
  const {accesstoken} = useSelector(state => state.user);
  const {item, powertime} = route.params;

  // States
  const [gameInsightsData, setGameInsightsData] = useState([]);
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 8;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [gameId, setGameId] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const [resultFound, setResultFound] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  // Debounce Effect for Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Paginated Data
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
    {skip: debouncedSearch.length > 0}, // Skip pagination if searching
  );

  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} =
    useSearchJackpotGameInsightsQuery(
      debouncedSearch.length > 0
        ? {accesstoken, id: gameId, jackpot: debouncedSearch, page, limit}
        : {skip: true},
    );

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data
      setPage(1); // ✅ Reset Page
      setHasMore(true); // ✅ Reset Load More
      refetchPaginated?.(); // ✅ Ensure Fresh Data
    }, [refetchPaginated]),
  );

  // useEffect(() => {
  //   setLoading(true);

  //   if (debouncedSearch.length > 0 && searchData?.userList) {
  //     // For search results, replace the existing data
  //     setPartners(searchData.userList);
  //     setHasMore(false); // Disable pagination when searching
  //   } else if (paginatedData?.userList) {
  //     // For paginated data, filter out duplicates before appending
  //     setPartners(prev => {
  //       const newData = paginatedData.userList.filter(
  //         newItem => !prev.some(prevItem => prevItem._id === newItem._id),
  //       );
  //       return page === 1 ? paginatedData.userList : [...prev, ...newData];
  //     });

  //     // Update `hasMore` based on the length of the new data
  //     if (paginatedData.userList.length < limit) {
  //       setHasMore(false); // No more data to fetch
  //     } else {
  //       setHasMore(true); // More data available
  //     }
  //   }

  //   setLoading(false);
  // }, [searchData, paginatedData, debouncedSearch, page]);

  // Data processing

  // Data processing
  useEffect(() => {
    if (fetchingPaginated || fetchingSearch) return;

    if (paginatedError) {
      setHasMore(false);
      return;
    }

    if (paginatedData) {
      setTotalRecords(paginatedData.totalRecords);
      setTotalAmount(paginatedData?.totalAmount);
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

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch;

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

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

  return (
    <MainBackgroundWithoutScrollview
      lefttext={item.powerdate}
      righttext={powertime.powertime}
      title={'Game Insights'}>
      <View style={{flex: 1}}>
        {/* SEARCH INPUT */}
        {/* <View
          style={{
            height: heightPercentageToDP(7),
            flexDirection: 'row',
            backgroundColor: COLORS.white_s,
            alignItems: 'center',
            paddingHorizontal: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(1),
            marginHorizontal: heightPercentageToDP(1),
          }}>
          <Fontisto
            name="search"
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
          <TextInput
            style={{
              marginStart: heightPercentageToDP(1),
              flex: 1,
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
            }}
            placeholder="Search for User"
            placeholderTextColor={COLORS.black}
            onChangeText={text => {
              setLoading(true);
              setSearchQuery(text);
            }}
          />
        </View> */}

        <View
          style={{
            height: heightPercentageToDP(7),
            flexDirection: 'row',
            marginTop: heightPercentageToDP(2),
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
              style={{
                marginStart: heightPercentageToDP(1),
                flex: 1,
                fontFamily: FONT.Montserrat_Regular,
                fontSize: heightPercentageToDP(2.5),
                color: COLORS.black,
              }}
              placeholder="Search Jackpot"
              placeholderTextColor={COLORS.black}
              onChangeText={text => {
                setLoading(true);
                setSearchQuery(text);
              }}
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

        {/* PARTNER USER LIST */}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              key={`flatlist-${gameInsightsData.length}`}
              data={gameInsightsData}
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
                    {totalRecords} Tickets
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white_s,
                      fontSize: heightPercentageToDP(2),
                      fontFamily: FONT.Montserrat_Bold,
                    }}>
                    Total Amount: {totalAmount}
                  </Text>
                </View>
              )}
              keyExtractor={item => item._id?.toString()} // Ensure _id is unique
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
              onEndReachedThreshold={0.3}
              ListFooterComponent={() =>
                hasMore && isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.white_s} />
                ) : null
              }
            />
          )}
        </View>
        {resultFound && <Footer />}
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerGameInsights;

// // import {
// //   ActivityIndicator,
// //   FlatList,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from 'react-native';
// // import React, {useEffect, useRef, useState} from 'react';
// // import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// // import {
// //   heightPercentageToDP,
// //   widthPercentageToDP,
// // } from 'react-native-responsive-screen';
// // import Loading from '../../components/helpercComponent/Loading';
// // import {COLORS, FONT} from '../../../assets/constants';
// // import {useNavigation} from '@react-navigation/native';
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
// // import _ from 'lodash';
// // import MBWS from '../../components/background/MBWS';

// // const PowerGameInsights = ({route}) => {
// //   const {item, powertime} = route.params;
// //   const searchInputRef = useRef(null);
// //   const debounceTimeoutRef = useRef(null);

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
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [debouncedSearch, setDebouncedSearch] = useState('');
// //   const [hasMore, setHasMore] = useState(true);
// //   const [loading, setLoading] = useState(false);
// //   const [totalRecords, setTotalRecords] = useState(0);
// //   const [resultFound, setResultFound] = useState(false);

// //   // Focus the input when component mounts
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (searchInputRef.current) {
// //         searchInputRef.current.focus();
// //       }
// //     }, 300);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   // Debounce search input
// //   useEffect(() => {
// //     if (debounceTimeoutRef.current) {
// //       clearTimeout(debounceTimeoutRef.current);
// //     }

// //     if (searchQuery.trim() !== '') {
// //       debounceTimeoutRef.current = setTimeout(() => {
// //         setDebouncedSearch(searchQuery);
// //       }, 2000);
// //     } else {
// //       setDebouncedSearch('');
// //     }

// //     return () => {
// //       if (debounceTimeoutRef.current) {
// //         clearTimeout(debounceTimeoutRef.current);
// //       }
// //     };
// //   }, [searchQuery]);

// //   // Result checking logic
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

// //   // API calls
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
// //     {skip: debouncedSearch.length > 0},
// //   );

// //   const {data: searchData, isFetching: fetchingSearch} =
// //     useSearchJackpotGameInsightsQuery(
// //       debouncedSearch.length > 0
// //         ? {accesstoken, id: gameId, jackpot: debouncedSearch, page, limit}
// //         : {skip: true},
// //     );

// //   // Data processing
// //   useEffect(() => {
// //     if (fetchingPaginated || fetchingSearch) return;

// //     if (paginatedError) {
// //       setHasMore(false);
// //       return;
// //     }

// //     if (paginatedData) {
// //       setTotalRecords(paginatedData.totalRecords);
// //       if (paginatedData.tickets?.[0]?._id) {
// //         setGameId(paginatedData.tickets[0]._id);
// //       }
// //       if (paginatedData.tickets?.[0]?.alltickets) {
// //         const newTickets = paginatedData.tickets[0].alltickets;
// //         setGameInsightsData(prev => {
// //           if (page === 1) return newTickets;
// //           const existingIds = new Set(
// //             prev.map(item => `${item.userId}-${item.tickets[0]._id}`),
// //           );
// //           const filteredNewTickets = newTickets.filter(item => {
// //             const itemId = `${item.userId}-${item.tickets[0]._id}`;
// //             return !existingIds.has(itemId);
// //           });
// //           return [...prev, ...filteredNewTickets];
// //         });
// //         setHasMore(page < paginatedData.totalPages);
// //       }
// //     }

// //     if (debouncedSearch.length > 0 && searchData?.tickets?.[0]?.alltickets) {
// //       const newTickets = searchData.tickets[0].alltickets;
// //       setGameInsightsData(prev => {
// //         if (page === 1) return newTickets;
// //         const existingIds = new Set(prev.map(item => item.tickets[0]._id));
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

// //   const Footer = () => {
// //     return (
// //       <View style={{marginVertical: heightPercentageToDP(2)}}>
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

// //   const Header = React.memo(() => {
// //     return (
// //       <View
// //         style={{
// //           height: heightPercentageToDP(7),
// //           flexDirection: 'row',
// //           marginTop: heightPercentageToDP(2),
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
// //           <TextInput
// //             ref={searchInputRef}
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
// //             onChangeText={setSearchQuery}
// //             returnKeyType="search"
// //             onSubmitEditing={() => {
// //               if (debounceTimeoutRef.current) {
// //                 clearTimeout(debounceTimeoutRef.current);
// //               }
// //               setDebouncedSearch(searchQuery);
// //             }}
// //             blurOnSubmit={false}
// //             autoFocus={true}
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
// //   });

// //   const loadMore = () => {
// //     if (
// //       !loading &&
// //       hasMore &&
// //       debouncedSearch.length === 0 &&
// //       !fetchingPaginated
// //     ) {
// //       setPage(prev => prev + 1);
// //     }
// //   };

// //   const isLoading = fetchingPaginated || fetchingSearch;

// //   return (
// //     <MBWS
// //       lefttext={item.powerdate}
// //       righttext={powertime.powertime}
// //       title={'Game Insights'}>
// //       {resultFound && <Footer />}
// //       <View
// //         style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'flex-end',
// //           flexDirection: 'row',
// //           marginTop: heightPercentageToDP(1),
// //         }}>
// //         <Text
// //           style={{
// //             color: COLORS.white_s,
// //             fontSize: heightPercentageToDP(2),
// //             fontFamily: FONT.Montserrat_Bold,
// //           }}>
// //           Total Tickets : {totalRecords}
// //         </Text>
// //       </View>
// //       {isLoading && page === 1 ? (
// //         <Loading />
// //       ) : gameInsightsData.length > 0 ? (
// //         <FlatList
// //           key={`flatlist-${gameInsightsData.length}`}
// //           data={[...gameInsightsData].slice().reverse()}
// //           keyExtractor={item => item._id?.toString()}
// //           initialNumToRender={10}
// //           maxToRenderPerBatch={5}
// //           windowSize={10}
// //           contentContainerStyle={{
// //             paddingBottom: heightPercentageToDP(10),
// //           }}
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
// //       <Header />
// //     </MBWS>
// //   );
// // };

// // export default React.memo(PowerGameInsights);

// import {
//   ActivityIndicator,
//   BackHandler,
//   FlatList,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Loading from '../../components/helpercComponent/Loading';
// import {COLORS, FONT} from '../../../assets/constants';
// import {useNavigation} from '@react-navigation/native';
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
// import MBWS from '../../components/background/MBWS';
// const PowerGameInsights = ({route}) => {
//   const {item, powertime} = route.params;
//   const searchInputRef = useRef(null);

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
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [resultFound, setResultFound] = useState(false);

//   // Focus the input when component mounts
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchInputRef.current) {
//         searchInputRef.current.focus();
//       }
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   // Debounce search input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Result checking logic
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

//   // API calls
//   const {
//     data: paginatedData,
//     refetch: refetchPaginated,
//     isFetching: fetchingPaginated,
//     error: paginatedError,
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

//   // Data processing
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

//   // Components
//   const Footer = () => {
//     return (
//       <View style={{marginVertical: heightPercentageToDP(2)}}>
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
//     return (
//       <View
//         style={{
//           height: heightPercentageToDP(7),
//           flexDirection: 'row',
//           marginTop: heightPercentageToDP(2),
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
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             returnKeyType="search"
//             onSubmitEditing={() => {
//               setDebouncedSearch(searchQuery);
//               Keyboard.dismiss();
//             }}
//             blurOnSubmit={false}
//             autoFocus={true}
//             onFocus={() => searchInputRef.current?.focus()}
//           />
//         </View>
//         <TouchableOpacity
//           onPress={() => copyToClipboard(searchQuery)}
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

//   const loadMore = () => {
//     if (
//       !loading &&
//       hasMore &&
//       debouncedSearch.length === 0 &&
//       !fetchingPaginated
//     ) {
//       setPage(prev => prev + 1);
//     }
//   };

//   const isLoading = fetchingPaginated || fetchingSearch;

//   return (
//     <MBWS
//       lefttext={item.powerdate}
//       righttext={powertime.powertime}
//       title={'Game Insights'}>
//       {resultFound && <Footer />}
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
//       <Header />
//     </MBWS>
//   );
// };

// export default React.memo(PowerGameInsights);
