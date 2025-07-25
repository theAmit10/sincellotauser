import {
  FlatList,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useSelector} from 'react-redux';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import LinearGradient from 'react-native-linear-gradient';
import {
  useGetAllLocationWithTimeQuery,
  useGetPowerballQuery,
  useGetPowetTimesQuery,
} from '../helper/Networkcall';
import moment from 'moment-timezone';
import {extractMultiplerFromLocation} from '../helper/HelperFunction';

const LiveResultLocation = () => {
  const navigation = useNavigation();
  const {accesstoken, user} = useSelector(state => state.user);
  const [alldatafiler, setalldatafilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const {data, error, isLoading, refetch} =
    useGetAllLocationWithTimeQuery(accesstoken);

  const {
    data: pdata,
    isLoading: pisLoading,
    refetch: prefetch,
    error: perror,
  } = useGetPowerballQuery(
    {
      accesstoken,
    },
    {refetchOnMountOrArgChange: true},
  );

  const {
    isLoading: allTimeIsLoading,
    data: allTimeData,
    refetch: allTimeRefetch,
  } = useGetPowetTimesQuery(
    {
      accesstoken,
    },
    {refetchOnMountOrArgChange: true},
  );

  const [updatename, setupdatename] = useState('');
  useEffect(() => {
    if (!pisLoading && pdata) {
      setupdatename(pdata?.games[0]?.name);
    }
  }, [pisLoading, pdata, prefetch]);

  const [nextTime, setNextTime] = useState(null);
  const [filteredDataT, setFilteredDataT] = useState([]);

  useEffect(() => {
    if (!allTimeIsLoading && allTimeData) {
      setFilteredDataT(allTimeData.powerTimes);

      const nextTime = getNextTimeForHighlightsPowerball(
        allTimeData.powerTimes,
        'Asia/Kolkata',
      );
      setNextTime(nextTime);
    }
  }, [allTimeData, allTimeIsLoading]); // Correct dependencies

  const getNextTimeForHighlightsPowerball = (times, userTimezone) => {
    if (times.length === 1) {
      return times[0];
    }

    // Get the current time in the user's timezone
    const currentRiyadhTime = moment().tz(userTimezone).format('hh:mm A');
    console.log('Current time in Riyadh timezone:', currentRiyadhTime);

    // Convert each time from IST to user timezone (Asia/Riyadh)
    const convertedTimes = times.map(item => {
      const timeInIST = moment.tz(item.powertime, 'hh:mm A', 'Asia/Kolkata');
      const timeInRiyadh = timeInIST.clone().tz(userTimezone).format('hh:mm A');
      return {...item, convertedTime: timeInRiyadh};
    });

    console.log('Converted times to Riyadh timezone:', convertedTimes);

    // Sort the times in the user's timezone
    const sortedTimes = convertedTimes.sort((a, b) =>
      moment(a.convertedTime, 'hh:mm A').diff(
        moment(b.convertedTime, 'hh:mm A'),
      ),
    );

    console.log('Sorted times:', sortedTimes);

    // Find the next available time
    for (let i = 0; i < sortedTimes.length; i++) {
      if (
        moment(currentRiyadhTime, 'hh:mm A').isBefore(
          moment(sortedTimes[i].convertedTime, 'hh:mm A'),
        )
      ) {
        console.log('Next available time found:', sortedTimes[i]);
        return sortedTimes[i]; // Return the first future time
      }
    }

    console.log(
      'No future time found, returning the first sorted time:',
      sortedTimes[0],
    );
    // If no future time found, return the first time (next day scenario)
    return sortedTimes[0];
  };

  const isfocuesed = useIsFocused();

  useEffect(() => {
    refetch();
    prefetch();
    allTimeRefetch();
  }, [isfocuesed, refetch]);

  // FOR ALL FILTER TYPE DATA
  useEffect(() => {
    if (!isLoading && data) {
      const uniqueItems = new Set();
      const filtertype = [{_id: '123', maximumReturn: 'All'}]; // Default element

      data.locationData.forEach(item => {
        const key = extractMultiplerFromLocation(item.limit);
        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          filtertype.push({
            _id: item._id,
            maximumReturn: extractMultiplerFromLocation(item.limit),
          });
        }
      });

      // Sorting the filtertype array
      filtertype.sort((a, b) => {
        if (a.maximumReturn === 'All') return -1;
        if (b.maximumReturn === 'All') return 1;
        const aReturn = parseFloat(a.maximumReturn.replace('x', ''));
        const bReturn = parseFloat(b.maximumReturn.replace('x', ''));
        return aReturn - bReturn;
      });

      setalldatafilter(filtertype);
      setSelectedFilter(filtertype[0]._id);

      console.log(filtertype);
    }
  }, [isLoading, data]);

  const settingFilterData = itemf => {
    setSelectedFilter(itemf._id);
    if (itemf.maximumReturn.toLowerCase() === 'all') {
      // setFilteredData(data?.locationData);
      const sortedData = [...(data?.locationData || [])].sort((a, b) => {
        const aReturn = parseFloat(a.maximumReturn.replace('x', ''));
        const bReturn = parseFloat(b.maximumReturn.replace('x', ''));
        return bReturn - aReturn; // Sort from highest to lowest
      });
      setFilteredData(sortedData);
    } else {
      const filtered = data?.locationData.filter(item =>
        extractMultiplerFromLocation(item.limit)
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = data?.locationData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  // useEffect(() => {
  //   setFilteredData(data?.locationData); // Update filteredData whenever locations change
  // }, [data]);

  useEffect(() => {
    if (!isLoading && data) {
      const sortedData = [...(data?.locationData || [])].sort((a, b) => {
        const aReturn = parseFloat(a.maximumReturn.replace('x', ''));
        const bReturn = parseFloat(b.maximumReturn.replace('x', ''));
        return bReturn - aReturn; // Sort from highest to lowest
      });
      setFilteredData(sortedData); // Update filteredData whenever locations change
      console.log(sortedData);
    }
  }, [data]);

  const getNextTimeForHighlights = times => {
    if (times.length === 1) {
      return times[0];
    }

    const currentISTTime = moment()
      .tz(user?.country?.timezone)
      .format('hh:mm A');
    const sortedTimes = [...times].sort((a, b) =>
      moment(a.time, 'hh:mm A').diff(moment(b.time, 'hh:mm A')),
    );

    for (let i = 0; i < sortedTimes.length; i++) {
      if (
        moment(currentISTTime, 'hh:mm A').isBefore(
          moment(sortedTimes[i].time, 'hh:mm A'),
        )
      ) {
        return sortedTimes[i];
      }
    }

    return sortedTimes[0];
  };

  const renderItem = ({item, index}) => {
    const groupedTimes = [];
    // for (let i = 0; i < item.times.length; i += 2) {
    //   groupedTimes.push(item.times.slice(i, i + 2));
    // }

    let alltime = [];

    alltime = [...item.times].sort((a, b) => {
      // Helper function to convert time to minutes for comparison
      const timeToMinutes = timeStr => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let total = hours * 60 + minutes;
        if (period === 'PM' && hours !== 12) total += 12 * 60;
        if (period === 'AM' && hours === 12) total -= 12 * 60;
        return total;
      };

      return timeToMinutes(a.time) - timeToMinutes(b.time);
    });
    for (let i = 0; i < alltime.length; i += 2) {
      groupedTimes.push(alltime.slice(i, i + 2));
    }

    const nextTime = getNextTimeForHighlights(item?.times);

    return (
      <>
        <TouchableOpacity onPress={() => toggleItem(item._id)}>
          <LinearGradient
            colors={
              index % 2 === 0
                ? [COLORS.lightblue, COLORS.midblue]
                : [COLORS.lightyellow, COLORS.darkyellow]
            }
            start={{x: 0, y: 0}} // start from left
            end={{x: 1, y: 0}} // end at right
            style={styles.item}>
            <View style={{flex: 1.5}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONT.Montserrat_SemiBold,
                  fontSize: heightPercentageToDP(2.5),
                }}>
                {item.name}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  textAlignVertical: 'center',
                  alignSelf: 'flex-end',
                }}>
                {extractMultiplerFromLocation(item.limit)} Win
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {expandedItems[item._id] && (
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <ImageBackground
              source={require('../../assets/image/tlwbg.jpg')}
              imageStyle={{
                borderRadius: heightPercentageToDP(3),
                margin: heightPercentageToDP(2),
              }}
              style={{flex: 1}} // Ensures the overlay covers the entire image
            >
              {/* Transparent Black Overlay */}
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
                  borderRadius: heightPercentageToDP(3),
                  margin: heightPercentageToDP(2),
                }}
              />

              <View
                style={{
                  backgroundColor: 'transparent',
                  margin: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {groupedTimes.length === 0 ? (
                  <GradientTextWhite
                    style={{
                      ...styles.textStyle,
                      height: heightPercentageToDP(15),
                      textAlignVertical: 'center',
                    }}>
                    No Available time
                  </GradientTextWhite>
                ) : (
                  groupedTimes.map((pair, idx) => (
                    <View key={idx} style={[styles.timeRow]}>
                      {pair.map(timeItem => (
                        <TouchableOpacity
                          key={timeItem._id}
                          onPress={() =>
                            navigation.navigate('LiveResult', {
                              locationdata: item,
                              timedata: timeItem,
                            })
                          }
                          style={{
                            borderColor:
                              timeItem.time === nextTime.time
                                ? COLORS.red
                                : 'transparent',
                            borderWidth:
                              timeItem.time === nextTime.time ? 2 : 2,
                            borderRadius: heightPercentageToDP(2),
                            overflow: 'hidden',
                            marginEnd: heightPercentageToDP(1),
                          }}>
                          <LinearGradient
                            colors={
                              idx % 2 === 0
                                ? [COLORS.lightblue, COLORS.midblue]
                                : [COLORS.lightyellow, COLORS.darkyellow]
                            }
                            start={{x: 0, y: 0}} // start from left
                            end={{x: 1, y: 0}} // end at right
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: heightPercentageToDP(2),
                              opacity: 1,
                              paddingVertical: heightPercentageToDP(2),
                              paddingHorizontal: heightPercentageToDP(2),
                              borderRadius: heightPercentageToDP(1),
                            }}>
                            <Text
                              style={{
                                color: COLORS.black,
                                fontFamily: FONT.Montserrat_Regular,
                                fontSize: heightPercentageToDP(1.8),
                                textAlignVertical: 'center',
                              }}>
                              {timeItem.time}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))
                )}
              </View>
            </ImageBackground>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
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

            <View
              style={{
                height: heightPercentageToDP(21),
                margin: heightPercentageToDP(2),
              }}>
              <GradientTextWhite style={styles.textStyle}>
                All Location
              </GradientTextWhite>

              <View
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                  marginTop: heightPercentageToDP(1),
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
                  placeholder="Search for location"
                  placeholderTextColor={COLORS.black}
                  label="Search"
                  onChangeText={handleSearch}
                />
              </View>

              <View
                style={{
                  height: heightPercentageToDP(6),
                  backgroundColor: COLORS.white_s,
                  borderRadius: heightPercentageToDP(3),
                  marginTop: heightPercentageToDP(2),
                  overflow: 'hidden', // Ensures content stays inside the rounded container
                }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(1),
                  }}>
                  {alldatafiler.map(item => (
                    <TouchableOpacity
                      onPress={() => settingFilterData(item)}
                      key={item._id}
                      style={{
                        backgroundColor: COLORS.grayHalfBg,
                        padding: heightPercentageToDP(1),
                        margin: heightPercentageToDP(0.2),
                        borderRadius: heightPercentageToDP(1),
                        borderColor:
                          selectedFilter == item._id
                            ? COLORS.green
                            : COLORS.grayHalfBg,
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_Regular,
                          fontSize: heightPercentageToDP(1.5),
                          color: COLORS.black,
                          paddingHorizontal: heightPercentageToDP(0.5),
                        }}>
                        {item.maximumReturn}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={{flex: 2}}>
              {isLoading ? (
                <Loading />
              ) : (
                <FlatList
                  data={filteredData}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                  ListHeaderComponent={() => {
                    const groupedTimes = [];
                    // for (let i = 0; i < filteredDataT.length; i += 2) {
                    //   groupedTimes.push(filteredDataT.slice(i, i + 2));
                    // }

                    let alltime = [];

                    alltime = [...filteredDataT].sort((a, b) => {
                      // Helper function to convert time to minutes for comparison
                      const timeToMinutes = timeStr => {
                        const [time, period] = timeStr.split(' ');
                        const [hours, minutes] = time.split(':').map(Number);
                        let total = hours * 60 + minutes;
                        if (period === 'PM' && hours !== 12) total += 12 * 60;
                        if (period === 'AM' && hours === 12) total -= 12 * 60;
                        return total;
                      };

                      return (
                        timeToMinutes(a.powertime) - timeToMinutes(b.powertime)
                      );
                    });

                    for (let i = 0; i < alltime.length; i += 2) {
                      groupedTimes.push(alltime.slice(i, i + 2));
                    }

                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => toggleItem('powerball')}>
                          <LinearGradient
                            colors={
                              1 % 2 === 0
                                ? [COLORS.lightblue, COLORS.midblue]
                                : [COLORS.lightyellow, COLORS.darkyellow]
                            }
                            start={{x: 0, y: 0}} // start from left
                            end={{x: 1, y: 0}} // end at right
                            style={styles.item}>
                            <View style={{flex: 1.5}}>
                              <Text
                                style={{
                                  color: COLORS.black,
                                  fontFamily: FONT.Montserrat_SemiBold,
                                  fontSize: heightPercentageToDP(2.5),
                                }}>
                                {updatename}
                              </Text>
                            </View>
                            <View style={{flex: 1}}>
                              <Text
                                style={{
                                  color: COLORS.black,
                                  fontFamily: FONT.Montserrat_Regular,
                                  fontSize: heightPercentageToDP(2),
                                  textAlignVertical: 'center',
                                }}></Text>
                            </View>
                          </LinearGradient>
                        </TouchableOpacity>

                        {expandedItems['powerball'] && (
                          <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <ImageBackground
                              source={require('../../assets/image/tlwbg.jpg')}
                              imageStyle={{
                                borderRadius: heightPercentageToDP(3),
                                margin: heightPercentageToDP(2),
                              }}
                              style={{flex: 1}} // Ensures the overlay covers the entire image
                            >
                              {/* Transparent Black Overlay */}
                              <View
                                style={{
                                  ...StyleSheet.absoluteFillObject,
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
                                  borderRadius: heightPercentageToDP(3),
                                  margin: heightPercentageToDP(2),
                                }}
                              />

                              <View
                                style={{
                                  backgroundColor: 'transparent',
                                  margin: heightPercentageToDP(2),
                                  borderRadius: heightPercentageToDP(5),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {groupedTimes.length === 0 ? (
                                  <GradientTextWhite
                                    style={{
                                      ...styles.textStyle,
                                      height: heightPercentageToDP(15),
                                      textAlignVertical: 'center',
                                    }}>
                                    No Available time
                                  </GradientTextWhite>
                                ) : (
                                  groupedTimes.map((pair, idx) => (
                                    <View key={idx} style={[styles.timeRow]}>
                                      {pair.map(timeItem => (
                                        <TouchableOpacity
                                          key={timeItem._id}
                                          onPress={() =>
                                            navigation.navigate('LiveResult', {
                                              locationdata: timeItem,
                                              timedata: timeItem,
                                            })
                                          }
                                          style={{
                                            borderColor:
                                              timeItem.powertime ===
                                              nextTime.powertime
                                                ? COLORS.red
                                                : 'transparent',
                                            borderWidth:
                                              timeItem.powertime ===
                                              nextTime.powertime
                                                ? 2
                                                : 2,
                                            borderRadius:
                                              heightPercentageToDP(2),
                                            overflow: 'hidden',
                                            marginEnd: heightPercentageToDP(1),
                                          }}>
                                          <LinearGradient
                                            colors={
                                              idx % 2 === 0
                                                ? [
                                                    COLORS.lightblue,
                                                    COLORS.midblue,
                                                  ]
                                                : [
                                                    COLORS.lightyellow,
                                                    COLORS.darkyellow,
                                                  ]
                                            }
                                            start={{x: 0, y: 0}} // start from left
                                            end={{x: 1, y: 0}} // end at right
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                              gap: heightPercentageToDP(2),
                                              opacity: 1,
                                              paddingVertical:
                                                heightPercentageToDP(2),
                                              paddingHorizontal:
                                                heightPercentageToDP(2),
                                              borderRadius:
                                                heightPercentageToDP(1),
                                            }}>
                                            <Text
                                              style={{
                                                color: COLORS.black,
                                                fontFamily:
                                                  FONT.Montserrat_Regular,
                                                fontSize:
                                                  heightPercentageToDP(1.8),
                                                textAlignVertical: 'center',
                                              }}>
                                              {timeItem.powertime}
                                            </Text>
                                          </LinearGradient>
                                        </TouchableOpacity>
                                      ))}
                                    </View>
                                  ))
                                )}
                              </View>
                            </ImageBackground>
                          </View>
                        )}
                      </>
                    );
                  }}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={10}
                  ListFooterComponent={() => (
                    <View style={{height: 100}}></View>
                  )}
                />
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LiveResultLocation;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
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
    flexDirection: 'row',
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 4,
    borderRadius: 4,
    padding: 4,
  },
  time: {
    fontSize: 14,
    marginRight: 8,
    padding: 4,
    backgroundColor: '#ccc',
    borderRadius: 4,
    flex: 1,
    textAlign: 'center',
  },
});
