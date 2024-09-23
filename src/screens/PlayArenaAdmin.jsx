import {
  Button,
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
import React, {useCallback, useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {
  useGetAllDepositQuery,
  useGetSinglePlayQuery,
} from '../helper/Networkcall';
import Loading from '../components/helpercComponent/Loading';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import SortingOptions from '../components/helpercComponent/SortingOptions';

const playdata = [
  {
    _id: '66acc5aa28d6077199ecdebe',
    lotlocation: '66acbbaa0bdc29889536acdc',
    lottime: '66acbb7d0bdc29889536acb5',
    lotdate: '66acc5a928d6077199ecdebb',
    playnumbers: [
      {
        playnumber: 1,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [
          {
            username: 'wasu',
            userId: '1120',
            number: '01',
            amount: '2022',
          },
          {
            username: 'Karna',
            userId: '1120',
            number: '01',
            amount: '22022',
          },
          {
            username: 'Maru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'jarna',
            userId: '1120',
            number: '01',
            amount: '22022',
          },
          {
            username: 'Taru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'Maru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'jarna',
            userId: '1120',
            number: '01',
            amount: '22022',
          },
          {
            username: 'Taru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'Maru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'jarna',
            userId: '1120',
            number: '01',
            amount: '22022',
          },
          {
            username: 'Taru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'Taru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'Maru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
          {
            username: 'jarna',
            userId: '1120',
            number: '01',
            amount: '22022',
          },
          {
            username: 'Taru',
            userId: '1120',
            number: '01',
            amount: '21022',
          },
        ],
        _id: '66acc5aa28d6077199ecdebf',
      },
      {
        playnumber: 2,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec0',
      },
      {
        playnumber: 3,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec1',
      },
      {
        playnumber: 4,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec2',
      },
      {
        playnumber: 5,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec3',
      },
      {
        playnumber: 6,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec4',
      },
      {
        playnumber: 7,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec5',
      },
      {
        playnumber: 8,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec6',
      },
      {
        playnumber: 9,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec7',
      },
      {
        playnumber: 10,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
        _id: '66acc5aa28d6077199ecdec8',
      },
    ],
    createdAt: '2024-08-02T11:40:26.599Z',
    __v: 0,
  },
];

const PlayArenaAdmin = ({route}) => {
  const {locationdata, timedata, datedata} = route.params;
  const navigation = useNavigation();

  const {accesstoken, user} = useSelector(state => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const focused = useIsFocused();

  const {isLoading, data, isError, refetch, error, endpointName, originalArgs} =
    useGetSinglePlayQuery({
      accesstoken,
      lotlocation: locationdata._id,
      lottime: timedata._id,
      lotdate: datedata._id,
    });

  // useEffect(() => {
  //   refetch();
  // }, [focused]);

    // Refetch data every 6 seconds
    useEffect(() => {
      const intervalId = setInterval(() => {
        console.log("Refetching data...");
        refetch(); // Trigger a refetch every 6 seconds
      }, 6000);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [focused, refetch]);
  
    // Update filtered data after refetch
    useEffect(() => {
      if (!isLoading && data) {
        console.log('Data refetched: ', data);
        setFilteredData(data?.playzone?.playnumbers || []);
      }
    }, [isLoading, data]);
  

 

  console.log('IS loaging :: ', isLoading);

  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [filteredData, setFilteredData] = useState([]);
  const [showSorting, setShowSorting] = useState(false);

  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log('USE Effect running');
  //     setFilteredData(data?.playzone?.playnumbers);
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     console.log('USE Effect running');
  //     setFilteredData(data?.playzone?.playnumbers || []);
  //   }
  // }, [isLoading, data]);


  const sortByAmount = (order = 'asc') => {
    const sortedData = [...filteredData].sort((a, b) => {
      return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });
    setFilteredData(sortedData);
  };

  const sortByWinningAmount = (order = 'asc') => {
    const sortedData = [...filteredData].sort((a, b) => {
      const winningAmountA = a.users.reduce(
        (acc, user) => acc + user.winningamount,
        0,
      );
      const winningAmountB = b.users.reduce(
        (acc, user) => acc + user.winningamount,
        0,
      );
      return order === 'asc'
        ? winningAmountA - winningAmountB
        : winningAmountB - winningAmountA;
    });
    setFilteredData(sortedData);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Main Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height:
              Platform.OS === 'android'
                ? heightPercentageToDP(85)
                : heightPercentageToDP(80),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height:
                Platform.OS === 'android'
                  ? heightPercentageToDP(85)
                  : heightPercentageToDP(80),
              width: widthPercentageToDP(100),

              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
            {/** Top Style View */}
            <View
              style={{
                height: heightPercentageToDP(5),
                width: widthPercentageToDP(100),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: widthPercentageToDP(20),
                  height: heightPercentageToDP(0.8),
                  backgroundColor: COLORS.grayBg,
                  borderRadius: heightPercentageToDP(2),
                }}></View>
            </View>

            {/** Top Container */}

            <View
              style={{
                margin: heightPercentageToDP(2),
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              {/** LOCATION */}
              <View
                style={{flexDirection: 'row', gap: heightPercentageToDP(1)}}>
                <GradientTextWhite style={styles.textStyle}>
                  {locationdata.name}
                </GradientTextWhite>
                <GradientTextWhite style={styles.textStyle}>
                  {locationdata.limit}
                </GradientTextWhite>
              </View>
              {/** TIME */}
              <GradientTextWhite style={styles.textStyle}>
                {timedata.time}
              </GradientTextWhite>
              {/** DATE */}
              <GradientTextWhite style={styles.textStyle}>
                {datedata.lotdate}
              </GradientTextWhite>

              {/* TouchableOpacity to toggle sorting options */}
              <TouchableOpacity onPress={() => setShowSorting(!showSorting)}>
                <FontAwesome
                  name={'reorder'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.white_s}
                />
              </TouchableOpacity>

              {/* Conditional rendering of sorting options */}
              {showSorting && (
                <SortingOptions
                  sortByAmount={sortByAmount}
                  sortByWinningAmount={sortByWinningAmount}
                  onClose={() => setShowSorting(false)} // Close sorting options
                />
              )}
            </View>

            {/** GAME INSIGHT */}
            {!isLoading && filteredData.length !== 0 && (
              <View
                style={{
                  marginBottom: heightPercentageToDP(1),
                  marginHorizontal: heightPercentageToDP(2),
                  marginTop: heightPercentageToDP(2),
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PlayArenaInsights', {
                      playdata: filteredData,
                      locationdata: locationdata,
                      timedata: timedata,
                      datedata: datedata,
                    })
                  }
                  style={{
                    backgroundColor: COLORS.green,
                    padding: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONT.Montserrat_Regular,
                    }}>
                    Game Insights
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/** Main Conatainer */}

            {isLoading ? (
              <View
                style={{
                  height: heightPercentageToDP(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Loading />
              </View>
            ) : (
              <FlatList
                data={filteredData}
                renderItem={({item}) => (
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={{
                      justifyContent: 'flex-start',

                      borderRadius: heightPercentageToDP(2),
                      marginHorizontal: heightPercentageToDP(2),
                      marginTop: heightPercentageToDP(1),
                    }}>
                    <TouchableOpacity
                      onPress={() => toggleItem(item._id)}
                      style={{
                        height: heightPercentageToDP(10),
                        borderTopLeftRadius: heightPercentageToDP(2),
                        borderTopEndRadius: heightPercentageToDP(2),
                        flexDirection: 'row',
                        marginBottom: heightPercentageToDP(1),
                        padding: heightPercentageToDP(1),
                      }}>
                      <View
                        style={{
                          flex: 1,

                          flexDirection: 'row',
                          borderTopLeftRadius: heightPercentageToDP(2),
                          borderTopEndRadius: heightPercentageToDP(2),
                          paddingTop: heightPercentageToDP(1),
                        }}>
                        {/** NUMBERS */}
                        <View
                          style={{
                            width: widthPercentageToDP(15),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(1.5),
                              color: COLORS.black,
                            }}>
                            Number
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(1.8),
                              color: COLORS.black,
                            }}>
                            {item.playnumber}
                          </Text>
                        </View>

                        {/** NO OF BETS */}
                        <View
                          style={{
                            width: widthPercentageToDP(15),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(1.5),
                              color: COLORS.black,
                            }}>
                            No. of Bets
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(1.8),
                              color: COLORS.black,
                            }}>
                            {item.numbercount}
                          </Text>
                        </View>

                        {/** AMOUNT */}
                        <View
                          style={{
                            flex: 1,

                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(1.5),
                              color: COLORS.black,
                            }}>
                            Amount
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(1.8),
                              color: COLORS.black,
                            }}>
                            {item.amount}
                          </Text>
                        </View>

                        {/** DISTRIBUTIVE AMOUNT */}
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(1.5),
                              color: COLORS.black,
                            }}>
                            Dis. Amount
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(1.8),
                              color: COLORS.black,
                            }}>
                            {item.distributiveamount}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/** EXPAND LIST */}
                    {expandedItems[item._id] && (
                      <>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: COLORS.white_s,
                            marginHorizontal: heightPercentageToDP(2),
                          }}
                        />

                        {item.users.length === 0 ? (
                          <View
                            style={{
                              margin: heightPercentageToDP(2),
                            }}>
                            <NoDataFound data={'No users requested'} />
                          </View>
                        ) : (
                          <>
                            {/** Header */}
                            <View
                              style={{
                                height: heightPercentageToDP(5),
                                flexDirection: 'row',
                                borderTopLeftRadius: heightPercentageToDP(2),
                                borderTopEndRadius: heightPercentageToDP(2),
                                padding: heightPercentageToDP(1),
                              }}>
                              {/** USER ID */}
                              <View
                                style={{
                                  width: widthPercentageToDP(15),
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FONT.Montserrat_SemiBold,
                                    fontSize: heightPercentageToDP(1.5),
                                    color: COLORS.black,
                                  }}>
                                  User ID
                                </Text>
                              </View>

                              {/** USER NAME */}
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FONT.Montserrat_SemiBold,
                                    fontSize: heightPercentageToDP(1.5),
                                    color: COLORS.black,
                                  }}>
                                  Username
                                </Text>
                              </View>

                              {/** NUmber */}
                              <View
                                style={{
                                  width: widthPercentageToDP(15),
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FONT.Montserrat_SemiBold,
                                    fontSize: heightPercentageToDP(1.5),
                                    color: COLORS.black,
                                  }}>
                                  Number
                                </Text>
                              </View>

                              {/** AMOUNT */}
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FONT.Montserrat_SemiBold,
                                    fontSize: heightPercentageToDP(1.5),
                                    color: COLORS.black,
                                  }}>
                                  Amount
                                </Text>
                              </View>
                            </View>

                            {/** User Data */}
                            {item.users.map((useritem, key) => (
                              <View
                                key={key}
                                style={{
                                  minHeight: heightPercentageToDP(4),
                                  maxHeight: heightPercentageToDP(7),
                                  flexDirection: 'row',
                                  borderTopLeftRadius: heightPercentageToDP(2),
                                  borderTopEndRadius: heightPercentageToDP(2),
                                  padding: heightPercentageToDP(1),
                                }}>
                                {/** USER ID */}
                                <View
                                  style={{
                                    width: widthPercentageToDP(15),
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      fontFamily: FONT.Montserrat_Regular,
                                      fontSize: heightPercentageToDP(1.8),
                                      color: COLORS.black,
                                    }}>
                                    {useritem?.userId}
                                  </Text>
                                </View>

                                {/** USER NAME */}
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      fontFamily: FONT.Montserrat_Regular,
                                      fontSize: heightPercentageToDP(1.8),
                                      color: COLORS.black,
                                    }}>
                                    {useritem?.username}
                                  </Text>
                                </View>

                                {/** NUmber */}
                                <View
                                  style={{
                                    width: widthPercentageToDP(15),
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      fontFamily: FONT.Montserrat_Regular,
                                      fontSize: heightPercentageToDP(1.8),
                                      color: COLORS.black,
                                    }}>
                                    {useritem?.usernumber}
                                  </Text>
                                </View>

                                {/** AMOUNT */}
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      fontFamily: FONT.Montserrat_Regular,
                                      fontSize: heightPercentageToDP(1.8),
                                      color: COLORS.black,
                                    }}>
                                    {useritem?.convertedAmount
                                      ? useritem?.convertedAmount
                                      : useritem?.amount}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </LinearGradient>
                )}
                keyExtractor={item => item._id}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                ListFooterComponent={() => (
                  <View
                    style={{
                      height: heightPercentageToDP(20),
                    }}></View>
                )}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PlayArenaAdmin;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(1.5),
    fontFamily: FONT.Montserrat_SemiBold,
    color: COLORS.black,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: heightPercentageToDP(20),
  },
  item: {
    padding: heightPercentageToDP(2),
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
  iconContainer: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
  },
  expandIconContainer: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    width: '33%',
    paddingStart: heightPercentageToDP(1),
  },
  detailLabel: {
    fontFamily: FONT.Montserrat_Regular,
    color: COLORS.black,
    fontSize: heightPercentageToDP(1.5),
  },
  detailValue: {
    fontFamily: FONT.Montserrat_SemiBold,
    color: COLORS.black,
    fontSize: heightPercentageToDP(1.8),
  },
});
