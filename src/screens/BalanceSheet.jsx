import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {
  useGetAllBalanceQuery,
  useSearchBalanceSheetQuery,
} from '../helper/Networkcall';
import Loading from '../components/helpercComponent/Loading';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MainBackgroundWithoutScrollview from '../components/background/MainBackgroundWithoutScrollview';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const BalanceSheet = () => {
  const {accesstoken} = useSelector(state => state.user);
  const navigation = useNavigation();
  // const [page, setPage] = useState(1); // Current page
  // const [dataList, setDataList] = useState([]); // List of all data
  // const [isFetchingNextPage, setIsFetchingNextPage] = useState(false); // Indicator for next page loading

  // Fetch initial data with page and limit
  // const {data, isLoading, error, refetch} = useGetAllBalanceQuery({
  //   accesstoken,
  //   page, // current page number
  //   limit: 20, // number of items per page
  // });

  // useEffect(() => {
  //   if (data && data.balancesheet?.length) {
  //     setDataList(prevData => [...prevData, ...data.balancesheet]); // Append new data
  //   }
  // }, [data]);

  const formatDateTime = dateTimeString => {
    return moment(dateTimeString).format('MMMM DD, YYYY hh:mm A');
  };

  // const fetchMoreData = () => {
  //   if (!isFetchingNextPage && !isLoading) {
  //     setIsFetchingNextPage(true); // Show progress bar
  //     setPage(prevPage => prevPage + 1); // Increment page number
  //     refetch(); // Fetch next page data
  //     setIsFetchingNextPage(false); // Hide progress bar
  //   }
  // };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View
        style={{
          padding: heightPercentageToDP(2),
          height: heightPercentageToDP(10),
        }}>
        <Loading />
      </View>
    );
  };

  // States
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

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
  } = useGetAllBalanceQuery(
    {accesstoken, page, limit},
    {skip: debouncedSearch.length > 0}, // Skip pagination if searching
  );

  const {data: searchData, isFetching: fetchingSearch} =
    useSearchBalanceSheetQuery(
      debouncedSearch.length > 0
        ? {accesstoken, userId: debouncedSearch}
        : {skip: true},
    );

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data

      try {
        setPage(1); // ✅ Reset Page
        setHasMore(true); // ✅ Reset Load More
        refetchPaginated?.(); // ✅ Ensure Fresh Data
      } catch (e) {
        console.log(e);
      }
    }, [refetchPaginated]),
  );

  useEffect(() => {
    setLoading(true);

    if (debouncedSearch.length > 0 && searchData?.balancesheet) {
      // For search results, replace the existing data
      setPartners(searchData.balancesheet);
      setHasMore(false); // Disable pagination when searching
    } else if (paginatedData?.balancesheet) {
      // For paginated data, filter out duplicates before appending
      setPartners(prev => {
        const newData = paginatedData.balancesheet.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.balancesheet : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.balancesheet.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [searchData, paginatedData, debouncedSearch, page]);

  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length === 0) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;

  return (
    <MainBackgroundWithoutScrollview title="Transaction History">
      <View style={{flex: 1}}>
        {/* SEARCH INPUT */}
        <View
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
        </View>

        {/* PARTNER USER LIST */}
        <View style={{flex: 1}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={partners}
              keyExtractor={item => item._id.toString()} // Ensure _id is unique
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BSUserDetails', {
                      userdata: item,
                      formscreen: 'balancesheet',
                    });
                  }}>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={{
                      justifyContent: 'flex-start',
                      minHeight: heightPercentageToDP(20),
                      borderRadius: heightPercentageToDP(2),
                      marginHorizontal: heightPercentageToDP(1),
                      padding: heightPercentageToDP(1),
                      marginTop: heightPercentageToDP(1),
                      marginBottom: heightPercentageToDP(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        {item?.paymentProcessType}
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 2,
                          fontFamily: FONT.Montserrat_Bold,
                          color:
                            item?.paymentProcessType === 'Credit'
                              ? 'green'
                              : COLORS.red,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item?.paymentProcessType === 'Credit' ? '+' : '-'}{' '}
                        {item?.amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Wallet
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item?.activityType === 'Bet'
                          ? 'Game Wallet'
                          : 'Withdrawal wallet'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        ActivityType
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item.activityType}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        User ID
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item.userId}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Created at
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 2,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {formatDateTime(item?.createdAt)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          Withdrawal balance
                        </Text>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_Regular,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          {item?.withdrawalbalance}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          Game balance
                        </Text>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_Regular,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          {item?.gamebalance}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Total balance
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item?.totalbalance}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              onEndReached={loadMore}
              onEndReachedThreshold={0.2}
              ListFooterComponent={() =>
                hasMore && isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.white_s} />
                ) : null
              }
            />
          )}
        </View>
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default BalanceSheet;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  itemText: {
    marginStart: heightPercentageToDP(1),
    flex: 1,
    fontFamily: FONT.Montserrat_Regular,
    color: COLORS.black,
  },
  itemTextRight: {
    marginStart: heightPercentageToDP(1),
    flex: 2,
    fontFamily: FONT.Montserrat_SemiBold,
    color: COLORS.black,
    textAlign: 'right',
    paddingRight: heightPercentageToDP(1),
  },
  row: {
    flexDirection: 'row',
  },
});

// import {
//   FlatList,
//   ImageBackground,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {useSelector} from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import Background from '../components/background/Background';
// import {COLORS, FONT} from '../../assets/constants';
// import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
// import {useGetAllBalanceQuery} from '../helper/Networkcall';
// import Loading from '../components/helpercComponent/Loading';
// import NoDataFound from '../components/helpercComponent/NoDataFound';
// import moment from 'moment';

// const BalanceSheet = () => {
//   const {accesstoken} = useSelector(state => state.user);
//   const {data, isLoading, error, refetch} = useGetAllBalanceQuery(accesstoken);

//   const formatDateTime = dateTimeString => {
//     return moment(dateTimeString).format('MMMM DD, YYYY hh:mm A');
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Background />

//       {/** Main Cointainer */}

//       <View style={{flex: 1, justifyContent: 'flex-end'}}>
//         <ImageBackground
//           source={require('../../assets/image/tlwbg.jpg')}
//           style={{
//             width: '100%',
//             height:
//             Platform.OS === 'android'
//               ? heightPercentageToDP(85)
//               : heightPercentageToDP(80),
//           }}
//           imageStyle={{
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderTopRightRadius: heightPercentageToDP(5),
//           }}>
//           <View
//             style={{
//               height:
//               Platform.OS === 'android'
//                 ? heightPercentageToDP(85)
//                 : heightPercentageToDP(80),
//               width: widthPercentageToDP(100),
//               borderTopLeftRadius: heightPercentageToDP(5),
//               borderTopRightRadius: heightPercentageToDP(5),
//             }}>
//             {/** Top Style View */}
//             <View
//               style={{
//                 height: heightPercentageToDP(5),
//                 width: widthPercentageToDP(100),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   width: widthPercentageToDP(20),
//                   height: heightPercentageToDP(0.8),
//                   backgroundColor: COLORS.grayBg,
//                   borderRadius: heightPercentageToDP(2),
//                 }}></View>
//             </View>

//             {/** Content Container */}

//             <View
//               style={{
//                 margin: heightPercentageToDP(2),
//               }}>
//               <GradientTextWhite style={styles.textStyle}>
//                 Transaction History
//               </GradientTextWhite>
//             </View>

//             {isLoading ? (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Loading />
//               </View>
//             ) : data?.balancesheet?.length === 0 ? (
//               <View
//                 style={{
//                   margin: heightPercentageToDP(1),
//                 }}>
//                 <NoDataFound data={'No Country Available'} />
//               </View>
//             ) : (
//               <FlatList
//                 data={data.balancesheet}
//                 renderItem={({item}) => (
//                   <LinearGradient
//                     colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                     start={{x: 0, y: 0}} // start from left
//                     end={{x: 1, y: 0}} // end at right
//                     style={{
//                       justifyContent: 'flex-start',
//                       minHeight: heightPercentageToDP(20),
//                       borderRadius: heightPercentageToDP(2),
//                       marginHorizontal: heightPercentageToDP(2),
//                       padding: heightPercentageToDP(1),
//                       marginBottom: heightPercentageToDP(1),
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_Regular,
//                           color: COLORS.black,
//                         }}>
//                         {item?.paymentProcessType}
//                       </Text>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 2,
//                           fontFamily: FONT.Montserrat_SemiBold,
//                           color: COLORS.b,
//                           textAlign: 'right',
//                           paddingRight: heightPercentageToDP(1),
//                         }}>
//                         {item?.paymentProcessType === 'Credit' ? '+' : '-'}{' '}
//                         {item?.amount}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_Regular,
//                           color: COLORS.black,
//                         }}>
//                         Wallet
//                       </Text>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_SemiBold,
//                           color: COLORS.black,
//                           textAlign: 'right',
//                           paddingRight: heightPercentageToDP(1),
//                         }}>
//                         {item?.activityType === 'Bet'
//                           ? 'Game Wallet'
//                           : 'Withdrawal wallet'}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_Regular,
//                           color: COLORS.black,
//                         }}>
//                         ActivityType
//                       </Text>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_SemiBold,
//                           color: COLORS.black,
//                           textAlign: 'right',
//                           paddingRight: heightPercentageToDP(1),
//                         }}>
//                         {item.activityType}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_Regular,
//                           color: COLORS.black,
//                         }}>
//                         User ID
//                       </Text>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_SemiBold,
//                           color: COLORS.black,
//                           textAlign: 'right',
//                           paddingRight: heightPercentageToDP(1),
//                         }}>
//                         {item.userId}
//                       </Text>
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_Regular,
//                           color: COLORS.black,
//                         }}>
//                         Created at
//                       </Text>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 2,
//                           fontFamily: FONT.Montserrat_SemiBold,
//                           color: COLORS.black,
//                           textAlign: 'right',
//                           paddingRight: heightPercentageToDP(1),
//                         }}>
//                         {formatDateTime(item?.createdAt)}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 1,
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <View
//                         style={{
//                           width: '50%',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             color: COLORS.black,
//                             fontFamily: FONT.Montserrat_SemiBold,
//                             fontSize: heightPercentageToDP(1.8),
//                           }}>
//                           Withdrawal balance
//                         </Text>
//                         <Text
//                           style={{
//                             color: COLORS.black,
//                             fontFamily: FONT.Montserrat_Regular,
//                             fontSize: heightPercentageToDP(1.8),
//                           }}>
//                           {item?.withdrawalbalance}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           width: '50%',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             color: COLORS.black,
//                             fontFamily: FONT.Montserrat_SemiBold,
//                             fontSize: heightPercentageToDP(1.8),
//                           }}>
//                           Game balance
//                         </Text>
//                         <Text
//                           style={{
//                             color: COLORS.black,
//                             fontFamily: FONT.Montserrat_Regular,
//                             fontSize: heightPercentageToDP(1.8),
//                           }}>
//                           {item?.gamebalance}
//                         </Text>
//                       </View>
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_Regular,
//                           color: COLORS.black,
//                         }}>
//                         Total balance
//                       </Text>
//                       <Text
//                         style={{
//                           marginStart: heightPercentageToDP(1),
//                           flex: 1,
//                           fontFamily: FONT.Montserrat_SemiBold,
//                           color: COLORS.black,
//                           textAlign: 'right',
//                           paddingRight: heightPercentageToDP(1),
//                         }}>
//                         {item?.totalbalance}
//                       </Text>
//                     </View>
//                   </LinearGradient>
//                 )}
//                 keyExtractor={item => item._id.toString()}
//                 initialNumToRender={10}
//                 maxToRenderPerBatch={10}
//                 windowSize={10}
//                 ListFooterComponent={() => (
//                   <View
//                     style={{
//                       height: heightPercentageToDP(20),
//                     }}></View>
//                 )}
//               />
//             )}
//           </View>
//         </ImageBackground>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BalanceSheet;

// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//     color: COLORS.black,
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     height: heightPercentageToDP(20),
//   },
//   item: {
//     padding: heightPercentageToDP(2),
//     marginVertical: heightPercentageToDP(1),
//     marginHorizontal: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(1),
//   },
//   title: {
//     color: COLORS.white_s,
//     fontFamily: FONT.SF_PRO_MEDIUM,
//   },
// });
