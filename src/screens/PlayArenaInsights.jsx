import {
  FlatList,
  ImageBackground,
  ScrollView,
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
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
import Loading from '../components/helpercComponent/Loading';
import {
  useGetNextResultQuery,
  useGetSinglePlayQuery,
} from '../helper/Networkcall';
import UrlHelper from '../helper/UrlHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getResultAccordingToLocationTimeDate} from '../redux/actions/resultAction';
import GradientText from '../components/helpercComponent/GradientText';
import axios from 'axios';
import {getTimeAccordingLocation} from '../redux/actions/timeAction';

const playinsightdata = {
  success: true,
  playzone: {
    _id: '66adeb9d4727825f58cf7fac',
    lotlocation: '66acbb7d0bdc29889536acb5',
    lottime: '66acbbaa0bdc29889536acdc',
    lotdate: '66adeb9c4727825f58cf7fa9',
    playnumbers: [
      {
        playnumber: 1,
        numbercount: 2,
        amount: 60,
        distributiveamount: 600,
        users: [
          {
            userId: '1016',
            username: 'Ishy',
            amount: 50,
            usernumber: 1,
            winningamount: 500,
            _id: '66b078773ccaba9e23e63d03',
          },
          {
            userId: '1023',
            username: 'Rajesh',
            amount: 10,
            usernumber: 1,
            winningamount: 100,
            _id: '66b078773ccaba9e23e63d07',
          },
        ],
        _id: '66adeb9d4727825f58cf7fad',
      },
      {
        playnumber: 2,
        numbercount: 1,
        amount: 300,
        distributiveamount: 3000,
        users: [
          {
            userId: '1024',
            username: 'Vikas',
            amount: 300,
            usernumber: 2,
            winningamount: 3000,
            _id: '66b078773ccaba9e23e63d08',
          },
        ],
        _id: '66adeb9d4727825f58cf7fae',
      },
      {
        playnumber: 3,
        numbercount: 1,
        amount: 100,
        distributiveamount: 1000,
        users: [
          {
            userId: '1025',
            username: 'Anil',
            amount: 100,
            usernumber: 3,
            winningamount: 1000,
            _id: '66b078773ccaba9e23e63d09',
          },
        ],
        _id: '66adeb9d4727825f58cf7faf',
      },
      {
        playnumber: 4,
        numbercount: 1,
        amount: 40,
        distributiveamount: 400,
        users: [
          {
            userId: '1016',
            username: 'Ishy',
            amount: 40,
            usernumber: 4,
            winningamount: 400,
            _id: '66b078773ccaba9e23e63d04',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb0',
      },
      {
        playnumber: 5,
        numbercount: 1,
        amount: 500,
        distributiveamount: 5000,
        users: [
          {
            userId: '1026',
            username: 'Suresh',
            amount: 500,
            usernumber: 5,
            winningamount: 5000,
            _id: '66b078773ccaba9e23e63d10',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb1',
      },
      {
        playnumber: 6,
        numbercount: 2,
        amount: 80,
        distributiveamount: 800,
        users: [
          {
            userId: '1027',
            username: 'Amit',
            amount: 40,
            usernumber: 6,
            winningamount: 400,
            _id: '66b078773ccaba9e23e63d11',
          },
          {
            userId: '1028',
            username: 'Rohit',
            amount: 40,
            usernumber: 6,
            winningamount: 400,
            _id: '66b078773ccaba9e23e63d12',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb2',
      },
      {
        playnumber: 7,
        numbercount: 1,
        amount: 4000,
        distributiveamount: 40000,
        users: [
          {
            userId: '1029',
            username: 'Vijay',
            amount: 4000,
            usernumber: 7,
            winningamount: 40000,
            _id: '66b078773ccaba9e23e63d13',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb3',
      },
      {
        playnumber: 8,
        numbercount: 1,
        amount: 200,
        distributiveamount: 2000,
        users: [
          {
            userId: '1030',
            username: 'Karan',
            amount: 200,
            usernumber: 8,
            winningamount: 2000,
            _id: '66b078773ccaba9e23e63d14',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb4',
      },
      {
        playnumber: 9,
        numbercount: 1,
        amount: 1000,
        distributiveamount: 10000,
        users: [
          {
            userId: '1031',
            username: 'Ravi',
            amount: 1000,
            usernumber: 9,
            winningamount: 10000,
            _id: '66b078773ccaba9e23e63d15',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb5',
      },
      {
        playnumber: 10,
        numbercount: 1,
        amount: 3000,
        distributiveamount: 30000,
        users: [
          {
            userId: '1032',
            username: 'Arjun',
            amount: 3000,
            usernumber: 10,
            winningamount: 30000,
            _id: '66b078773ccaba9e23e63d16',
          },
        ],
        _id: '66adeb9d4727825f58cf7fb6',
      },
    ],
    createdAt: '2024-08-03T08:34:37.381Z',
    __v: 1,
  },
};

const PlayArenaInsights = ({route}) => {
  const {locationdata, timedata, datedata, playdata} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);
  const [resultnumber, setresultnumber] = useState('');
  const [nextresult, setnextresult] = useState('');
  const [loading, setLoading] = useState(false);

  const {times, loading: loadingAllTime} = useSelector(state => state.time);

  const {
    isLoading,
    data: playinsightdata,
    isError,
    refetch,
  } = useGetSinglePlayQuery({
    accesstoken,
    lotlocation: locationdata._id,
    lottime: timedata._id,
    lotdate: datedata._id,
  });

  useEffect(() => {
    dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
  }, [dispatch, focused]);

  console.log('LOTtime :: ' + timedata.time);

  useEffect(() => {
    console.log('Getting all the times');
    if (times) {
      console.log('times', getNextResultTime(times, timedata.time));
      setnextresult(getNextResultTime(times, timedata.time));
    }
  }, [loadingAllTime]);

  const getNextResultTime = (times, currentTime) => {
    const timeList = times.map(time => time.lottime);
    const index = timeList.indexOf(currentTime);

    if (index === -1) {
      return timeList[0];
    }

    if (index === timeList.length - 1) {
      return timeList[0];
    }

    return timeList[index + 1];
  };

  // console.log('Single Play Insight :: ' + JSON.stringify(data?.playzone?.playnumbers?.length));
  console.log(
    'Single Play Insight :: ' +
      JSON.stringify(playinsightdata.playzone.playnumbers.length),
  );

  useFocusEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch]),
  );

  // TOTAL NUMBER OF BET
  const getTotalUsers = data => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return 0;
    }

    return data.playzone.playnumbers.reduce((total, playnumber) => {
      if (Array.isArray(playnumber.users)) {
        return total + playnumber.users.length;
      }
      return total;
    }, 0);
  };

  console.log(getTotalUsers(playinsightdata)); // Output: 12

  // TOTAL AMOUNT ON BET
  const getTotalAmount = data => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return 0;
    }

    return data.playzone.playnumbers.reduce((total, playnumber) => {
      return total + playnumber.amount;
    }, 0);
  };

  console.log(getTotalAmount(playinsightdata)); // Output: 8280

  // MOST BET AMOUNT ON A SPECIFIC NUMBER
  const getLargestAmount = data => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return 0;
    }

    return data.playzone.playnumbers.reduce((maxAmount, playnumber) => {
      return Math.max(maxAmount, playnumber.amount);
    }, 0);
  };

  console.log(getLargestAmount(playinsightdata)); // Output will be the largest amount in the playnumbers array

  // PLAYNUMBER ON WHICH MOST BET PLAYED
  const getPlaynumberOfLargestAmount = data => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return null;
    }

    return data.playzone.playnumbers.reduce((maxPlaynumber, playnumber) => {
      return playnumber.amount > (maxPlaynumber.amount || 0)
        ? playnumber
        : maxPlaynumber;
    }, {}).playnumber;
  };

  console.log(getPlaynumberOfLargestAmount(playinsightdata)); // Output will be the playnumber of the largest amount in the playnumbers array

  // LOWEST BET AMOUNT ON A SPECIFIC NUMBER
  // const getLowestAmount = data => {
  //   if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
  //     return null;
  //   }

  //   return data.playzone.playnumbers.reduce((minAmount, playnumber) => {
  //     return playnumber.amount < minAmount ? playnumber.amount : minAmount;
  //   }, Infinity);
  // };
  function getLowestAmount(playinsightdata) {
    // Extract playnumbers array
    const playnumbers = playinsightdata.playzone.playnumbers;
  
    // Find the minimum amount in the playnumbers list
    const minAmount = Math.min(...playnumbers.map(p => p.amount));
  
    // Get all playnumbers with the minimum amount
    const minAmountPlaynumbers = playnumbers.filter(p => p.amount === minAmount);
  
    // If there's more than one playnumber with the minimum amount, select one randomly
    if (minAmountPlaynumbers.length > 1) {
      const randomIndex = Math.floor(Math.random() * minAmountPlaynumbers.length);
      return minAmountPlaynumbers[randomIndex].amount;
    }
  
    // Otherwise, return the amount of the single minimum amount
    return minAmountPlaynumbers[0].amount;
  }
  
  // Usage example:
  const lowestAmount = getLowestAmount(playinsightdata);
  console.log(lowestAmount);
  

  console.log(getLowestAmount(playinsightdata)); // Output will be the lowest amount in the playnumbers array

  // PLAYNUMBER ON WHICH LOWEST BET PLAYED
  // const getPlaynumberOfLowestAmount = data => {
  //   if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
  //     return null;
  //   }

  //   return data.playzone.playnumbers.reduce((minPlaynumber, playnumber) => {
  //     return playnumber.amount < minPlaynumber.amount
  //       ? playnumber
  //       : minPlaynumber;
  //   }, data.playzone.playnumbers[0]).playnumber;
  // };

  function getPlaynumberOfLowestAmount(playinsightdata) {
    // Extract playnumbers array
    const playnumbers = playinsightdata.playzone.playnumbers;
  
    // Find the minimum amount in the playnumbers list
    const minAmount = Math.min(...playnumbers.map(p => p.amount));
  
    // Get all playnumbers with the minimum amount
    const minAmountPlaynumbers = playnumbers.filter(p => p.amount === minAmount);
  
    // If there's more than one playnumber with the minimum amount, select one randomly
    if (minAmountPlaynumbers.length > 1) {
      const randomIndex = Math.floor(Math.random() * minAmountPlaynumbers.length);
      return minAmountPlaynumbers[randomIndex].playnumber;
    }
  
    // Otherwise, return the playnumber of the single minimum amount
    return minAmountPlaynumbers[0].playnumber;
  }
  
  // Usage example:
  const playnumber = getPlaynumberOfLowestAmount(playinsightdata);
  console.log(playnumber);
  console.log("getPlaynumberOfLowestAmount ::  ",playnumber);
  

  console.log(getPlaynumberOfLowestAmount(playinsightdata)); // Output will be the playnumber of the lowest amount in the playnumbers array

  const {loadingResult, results} = useSelector(state => state.result);
  const [filteredData, setFilteredData] = useState([]);
  const [showProgressBar, setProgressBar] = useState(false);

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        datedata._id,
        datedata.lottime._id,
        datedata.lottime.lotlocation,
      ),
    );
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(results); // Update filteredData whenever locations change
  }, [results]);

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      setnextresult(formatTime(selectedTime));
      console.log('TIme :: ' + selectedTime);
      console.log('TIme :: ' + formatTime(selectedTime));
    }
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  const formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const paddedHours =
      formattedHours < 10 ? '0' + formattedHours : formattedHours;
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${paddedHours}:${paddedMinutes} ${ampm}`;
  };

  const submitHandler = () => {
    console.log('Working on login ');
    const currentTime = formatTime(new Date());

    if (!resultnumber) {
      Toast.show({
        type: 'error',
        text1: 'Please enter result',
      });
    } else if (!nextresult) {
      Toast.show({
        type: 'error',
        text1: 'Please select new result time',
      });
    } else if (nextresult === currentTime) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Next result time and current time cannot be the same',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing... ',
      });

      createResult(
        accesstoken,
        timedata._id,
        datedata._id,
        locationdata._id,
        nextresult,
      );
    }
  };

  const createResult = async (
    accesstoken,
    lottime,
    lotdate,
    lotlocation,
    nextResultData,
  ) => {
    try {
      setLoading(true);
      const {data} = await axios.post(
        UrlHelper.CREATE_RESULT_API,
        {
          resultNumber: resultnumber,
          lotdate,
          lottime,
          lotlocation,
          nextresulttime: nextResultData,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Data :: ' + data.message);
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      setresultnumber('');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(' Err :: ' + error);
      console.log(error.response.data.message);
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
    }
  };

  const deleteLocationHandler = async () => {
    setProgressBar(true);

    try {
      const url = `${UrlHelper.DELETE_LOT_RESULT_API}/${filteredData[0]._id}`;
      console.log(url);

      const {data} = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log('datat :: ' + data);

      Toast.show({
        type: 'success',
        text1: data.message,
      });
      setProgressBar(false);

      navigation.goBack();
    } catch (error) {
      console.log(error.response.data.message);
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please, try after sometime',
      });
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />

      {/** Main Container */}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(85),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              flex: 1,
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

            {/** Content Container */}
            <View style={{margin: heightPercentageToDP(2)}}>
              <GradientTextWhite style={styles.textStyle}>
                Play Insights
              </GradientTextWhite>
            </View>

            <View style={{flex: 1}}>
              {isLoading ? (
                <View>
                  <Loading color={COLORS.white_s} />
                </View>
              ) : (
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: heightPercentageToDP(2),
                  }}>
                  {/** TOTAL NO OF BET */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                      padding: heightPercentageToDP(1),
                    }}>
                    <LinearGradient
                      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        borderRadius: heightPercentageToDP(2),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          paddingStart: heightPercentageToDP(1),
                          backgroundColor: COLORS.time_secondbluw,
                          borderTopRightRadius: heightPercentageToDP(2),
                          borderTopLeftRadius: heightPercentageToDP(2),
                        }}>
                        Total no. of bet
                      </Text>
                      <Text
                        style={{
                          backgroundColor: 'transparent',
                          fontFamily: FONT.Montserrat_Bold,
                          color: COLORS.black,
                          height: heightPercentageToDP(7),
                          textAlignVertical: 'center',
                          paddingStart: heightPercentageToDP(1),
                          textAlign: 'center',
                        }}>
                        {getTotalUsers(playinsightdata)}
                      </Text>
                    </LinearGradient>
                  </View>

                  {/** TOTAL AMOUNT ON BET */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                      padding: heightPercentageToDP(1),
                    }}>
                    <LinearGradient
                      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        borderRadius: heightPercentageToDP(2),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          paddingStart: heightPercentageToDP(1),
                          backgroundColor: COLORS.time_secondbluw,
                          borderTopRightRadius: heightPercentageToDP(2),
                          borderTopLeftRadius: heightPercentageToDP(2),
                        }}>
                        Total amount on bet
                      </Text>
                      <Text
                        style={{
                          backgroundColor: 'transparent',
                          fontFamily: FONT.Montserrat_Bold,
                          color: COLORS.black,
                          height: heightPercentageToDP(7),
                          textAlignVertical: 'center',
                          paddingStart: heightPercentageToDP(1),
                          textAlign: 'center',
                        }}>
                        {getTotalAmount(playinsightdata)}
                      </Text>
                    </LinearGradient>
                  </View>

                  {/** MOST BET ON NUMBER */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                      padding: heightPercentageToDP(1),
                    }}>
                    <LinearGradient
                      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        borderRadius: heightPercentageToDP(2),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: COLORS.time_secondbluw,
                          borderTopRightRadius: heightPercentageToDP(2),
                          borderTopLeftRadius: heightPercentageToDP(2),
                          justifyContent: 'space-evenly',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        <Text
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.black,
                            fontSize: heightPercentageToDP(2),
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          Highest bet amount
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.black,
                            fontSize: heightPercentageToDP(2),
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          On number
                        </Text>
                      </View>

                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: 'transparent',
                            borderTopRightRadius: heightPercentageToDP(2),
                            borderTopLeftRadius: heightPercentageToDP(2),
                            justifyContent: 'space-evenly',
                            padding: heightPercentageToDP(2),
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.black,
                              fontSize: heightPercentageToDP(2),
                              paddingStart: heightPercentageToDP(1),
                            }}>
                            {getLargestAmount(playinsightdata)}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.black,
                              fontSize: heightPercentageToDP(2),
                              paddingStart: heightPercentageToDP(1),
                              textAlign: 'center',
                              textAlignVertical: 'center',
                            }}>
                            {getPlaynumberOfLargestAmount(playinsightdata)}
                          </Text>
                        </View>
                      </LinearGradient>
                    </LinearGradient>
                  </View>

                  {/** LEAST BET ON NUMBER */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                      padding: heightPercentageToDP(1),
                    }}>
                    <LinearGradient
                      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        borderRadius: heightPercentageToDP(2),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: COLORS.time_secondbluw,
                          borderTopRightRadius: heightPercentageToDP(2),
                          borderTopLeftRadius: heightPercentageToDP(2),
                          justifyContent: 'space-evenly',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        <Text
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.black,
                            fontSize: heightPercentageToDP(2),
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          Lowest bet amount
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.black,
                            fontSize: heightPercentageToDP(2),
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          On number
                        </Text>
                      </View>

                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: 'transparent',
                            borderTopRightRadius: heightPercentageToDP(2),
                            borderTopLeftRadius: heightPercentageToDP(2),
                            justifyContent: 'space-evenly',
                            padding: heightPercentageToDP(2),
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.black,
                              fontSize: heightPercentageToDP(2),
                              paddingStart: heightPercentageToDP(1),
                            }}>
                               {getLowestAmount(playinsightdata)}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.black,
                              fontSize: heightPercentageToDP(2),
                              paddingStart: heightPercentageToDP(1),
                              textAlign: 'center',
                              textAlignVertical: 'center',
                            }}>
                            {getPlaynumberOfLowestAmount(playinsightdata)}
                          </Text>
                        </View>
                      </LinearGradient>
                    </LinearGradient>
                  </View>
                

                  {loadingResult ? (
                    <Loading />
                  ) : filteredData.length == 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                      {/** CREATE RESULT */}
                      <View
                        style={{
                          borderRadius: heightPercentageToDP(2),
                          padding: heightPercentageToDP(1),
                        }}>
                        <Text
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.black,
                            fontSize: heightPercentageToDP(2),
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          Create result
                        </Text>

                        <LinearGradient
                          colors={[
                            COLORS.time_firstblue,
                            COLORS.time_secondbluw,
                          ]}
                          start={{x: 0, y: 0}} // start from left
                          end={{x: 1, y: 0}} // end at right
                          style={{
                            borderRadius: heightPercentageToDP(2),
                          }}>
                          <TextInput
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            cursorColor={COLORS.white}
                            placeholderTextColor={COLORS.black}
                            style={{
                              backgroundColor: 'transparent',
                              fontFamily: FONT.Montserrat_Bold,
                              color: COLORS.black,
                              textAlign: 'center',
                            }}
                            value={resultnumber}
                            onChangeText={text => setresultnumber(text)}
                          />
                        </LinearGradient>
                      </View>

                      {/** NEXT RESULT */}
                      <TouchableOpacity
                        onPress={showTimepicker}
                        style={{
                          borderRadius: heightPercentageToDP(2),
                          padding: heightPercentageToDP(1),
                        }}>
                        <Text
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.black,
                            fontSize: heightPercentageToDP(2),
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          Next result
                        </Text>
                        {showPicker && (
                          <DateTimePicker
                            value={time}
                            mode="time"
                            is24Hour={false}
                            display="default"
                            onChange={onChange}
                          />
                        )}

                        <LinearGradient
                          colors={[
                            COLORS.time_firstblue,
                            COLORS.time_secondbluw,
                          ]}
                          start={{x: 0, y: 0}} // start from left
                          end={{x: 1, y: 0}} // end at right
                          style={{
                            borderRadius: heightPercentageToDP(2),
                            height: heightPercentageToDP(7),
                            justifyContent: 'center',
                            paddingStart: heightPercentageToDP(1),
                          }}>
                          <Text
                            style={{
                              backgroundColor: 'transparent',
                              fontFamily: FONT.Montserrat_Bold,
                              color: COLORS.black,
                              textAlignVertical: 'center',
                            }}>
                            {nextresult}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <View
                        style={{
                          margin: heightPercentageToDP(2),
                        }}>
                        <TouchableOpacity
                          onPress={submitHandler}
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
                            Create Result
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        margin: heightPercentageToDP(2),
                      }}>
                      <View
                        style={{
                          gap: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            height: heightPercentageToDP(35),
                            backgroundColor: COLORS.grayHalfBg,

                            borderRadius: heightPercentageToDP(1),
                          }}>
                          <View
                            style={{
                              height: heightPercentageToDP(25),
                              borderRadius: heightPercentageToDP(1),
                              flexDirection: 'row',
                            }}>
                            {/** Top view left container */}
                            <View
                              style={{
                                flex: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: FONT.Montserrat_Regular,
                                  fontSize: heightPercentageToDP(3),
                                  marginTop: heightPercentageToDP(1),
                                  color: COLORS.black,
                                }}>
                                {filteredData[0].lotlocation.lotlocation}
                              </Text>

                              <GradientText
                                style={{
                                  fontSize: heightPercentageToDP(11),
                                  color: COLORS.black,
                                }}>
                                {filteredData[0].resultNumber}
                              </GradientText>
                            </View>

                            {/** Top view right container */}
                            <View
                              style={{
                                flex: 1,
                                backgroundColor: COLORS.gray2,
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  transform: [{rotate: '90deg'}],
                                  color: COLORS.black,
                                  fontFamily: FONT.Montserrat_SemiBold,
                                  fontSize: heightPercentageToDP(2),
                                }}>
                                {filteredData[0]?.lottime?.lottime}
                              </Text>
                            </View>
                          </View>

                          {/** Big Result bottom container */}

                          <View
                            style={{
                              flex: 1,
                              backgroundColor: COLORS.white_s,
                              margin: heightPercentageToDP(1),
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                              gap: heightPercentageToDP(1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.grayHalfBg,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                marginStart: heightPercentageToDP(-3),
                              }}>
                              <Ionicons
                                name={'calendar'}
                                size={heightPercentageToDP(3)}
                                color={COLORS.darkGray}
                              />
                            </View>

                            <Text
                              style={{
                                fontFamily: FONT.Montserrat_Regular,
                                fontSize: heightPercentageToDP(2),
                                color: COLORS.black,
                              }}>
                              {filteredData[0].lotdate.lotdate}
                            </Text>
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('UpdateResult', {
                              locationdata: locationdata,
                              timedata: timedata,
                              datedata: datedata,
                              resultdata: filteredData[0],
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
                            Update Result
                          </Text>
                        </TouchableOpacity>

                        {showProgressBar ? (
                          <View
                            style={{
                              flex: 1,
                              marginTop: heightPercentageToDP(2),
                            }}>
                            <Loading />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={deleteLocationHandler}
                            style={{
                              backgroundColor: COLORS.darkGray,
                              padding: heightPercentageToDP(2),
                              borderRadius: heightPercentageToDP(1),
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: COLORS.white,
                                fontFamily: FONT.Montserrat_Regular,
                              }}>
                              Delete Result
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default PlayArenaInsights;

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
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});

// import {
//   FlatList,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Toast from 'react-native-toast-message';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import Background from '../components/background/Background';
// import {COLORS, FONT} from '../../assets/constants';
// import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

// const PlayArenaInsights = ({route}) => {
//   const playdata = route.params;

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const {accesstoken} = useSelector(state => state.user);
//   const [resultnumber, setresultnumber] = useState('');
//   const [nextresult, setnextresult] = useState('');

//   return (
//     <View style={{flex: 1}}>
//       <Background />

//       {/** Main Cointainer */}

//       <View style={{flex: 1, justifyContent: 'flex-end'}}>
//         <ImageBackground
//           source={require('../../assets/image/tlwbg.jpg')}
//           style={{
//             width: '100%',
//             height: heightPercentageToDP(85),
//           }}
//           imageStyle={{
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderTopRightRadius: heightPercentageToDP(5),
//           }}>
//           <View
//             style={{
//               height: heightPercentageToDP(85),
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
//                 Play Insights
//               </GradientTextWhite>
//             </View>

//             <View style={{
//                 flex: 1
//             }}>
//                  <ScrollView>
//               {/** TOTAL NO OF BET */}

//               <View
//                 style={{
//                   borderRadius: heightPercentageToDP(2),
//                   padding: heightPercentageToDP(1),
//                 }}>
//                 <LinearGradient
//                   colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                   start={{x: 0, y: 0}} // start from left
//                   end={{x: 1, y: 0}} // end at right
//                   style={{
//                     borderRadius: heightPercentageToDP(2),
//                   }}>
//                   <Text
//                     style={{
//                       fontFamily: FONT.Montserrat_SemiBold,
//                       color: COLORS.black,
//                       fontSize: heightPercentageToDP(2),
//                       paddingStart: heightPercentageToDP(1),
//                       backgroundColor: COLORS.time_secondbluw,
//                       borderTopRightRadius: heightPercentageToDP(2),
//                       borderTopLeftRadius: heightPercentageToDP(2),
//                     }}>
//                     Total no. of bet
//                   </Text>
//                   <Text
//                     style={{
//                       backgroundColor: 'transparent',
//                       fontFamily: FONT.Montserrat_Bold,
//                       color: COLORS.black,
//                       height: heightPercentageToDP(7),
//                       textAlignVertical: 'center',
//                       paddingStart: heightPercentageToDP(1),
//                     }}>
//                     100
//                   </Text>
//                 </LinearGradient>
//               </View>

//               {/** TOTAL AMOUNT ON BET */}
//               <View
//                 style={{
//                   borderRadius: heightPercentageToDP(2),
//                   padding: heightPercentageToDP(1),
//                 }}>
//                 <LinearGradient
//                   colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                   start={{x: 0, y: 0}} // start from left
//                   end={{x: 1, y: 0}} // end at right
//                   style={{
//                     borderRadius: heightPercentageToDP(2),
//                   }}>
//                   <Text
//                     style={{
//                       fontFamily: FONT.Montserrat_SemiBold,
//                       color: COLORS.black,
//                       fontSize: heightPercentageToDP(2),
//                       paddingStart: heightPercentageToDP(1),
//                       backgroundColor: COLORS.time_secondbluw,
//                       borderTopRightRadius: heightPercentageToDP(2),
//                       borderTopLeftRadius: heightPercentageToDP(2),
//                     }}>
//                     Total amount on bet
//                   </Text>
//                   <Text
//                     style={{
//                       backgroundColor: 'transparent',
//                       fontFamily: FONT.Montserrat_Bold,
//                       color: COLORS.black,
//                       height: heightPercentageToDP(7),
//                       textAlignVertical: 'center',
//                       paddingStart: heightPercentageToDP(1),
//                     }}>
//                     312000 INR
//                   </Text>
//                 </LinearGradient>
//               </View>

//               {/** MOST BET ON NUMBER */}
//               <View
//                 style={{
//                   borderRadius: heightPercentageToDP(2),
//                   padding: heightPercentageToDP(1),
//                 }}>
//                 <LinearGradient
//                   colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                   start={{x: 0, y: 0}} // start from left
//                   end={{x: 1, y: 0}} // end at right
//                   style={{
//                     borderRadius: heightPercentageToDP(2),
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       backgroundColor: COLORS.time_secondbluw,
//                       borderTopRightRadius: heightPercentageToDP(2),
//                       borderTopLeftRadius: heightPercentageToDP(2),
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: FONT.Montserrat_SemiBold,
//                         color: COLORS.black,
//                         fontSize: heightPercentageToDP(2),
//                         paddingStart: heightPercentageToDP(1),
//                       }}>
//                       Most bet on number
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: FONT.Montserrat_Bold,
//                         fontSize: heightPercentageToDP(2.5),
//                         flex: 1,
//                         textAlign: 'right',
//                         paddingEnd: heightPercentageToDP(3),
//                         color: COLORS.black,
//                       }}>
//                       99
//                     </Text>
//                   </View>

//                   <Text
//                     style={{
//                       backgroundColor: 'transparent',
//                       fontFamily: FONT.Montserrat_Bold,
//                       color: COLORS.black,
//                       height: heightPercentageToDP(7),
//                       textAlignVertical: 'center',
//                       paddingStart: heightPercentageToDP(1),
//                     }}>
//                     312000 INR
//                   </Text>
//                 </LinearGradient>
//               </View>

//               {/** LEAST BET ON NUMBER */}
//               <View
//                 style={{
//                   borderRadius: heightPercentageToDP(2),
//                   padding: heightPercentageToDP(1),
//                 }}>
//                 <LinearGradient
//                   colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                   start={{x: 0, y: 0}} // start from left
//                   end={{x: 1, y: 0}} // end at right
//                   style={{
//                     borderRadius: heightPercentageToDP(2),
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       backgroundColor: COLORS.time_secondbluw,
//                       borderTopRightRadius: heightPercentageToDP(2),
//                       borderTopLeftRadius: heightPercentageToDP(2),
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: FONT.Montserrat_SemiBold,
//                         color: COLORS.black,
//                         fontSize: heightPercentageToDP(2),
//                         paddingStart: heightPercentageToDP(1),
//                       }}>
//                       Least bet on number
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: FONT.Montserrat_Bold,
//                         fontSize: heightPercentageToDP(2.5),
//                         flex: 1,
//                         textAlign: 'right',
//                         paddingEnd: heightPercentageToDP(3),
//                         color: COLORS.black,
//                       }}>
//                       09
//                     </Text>
//                   </View>

//                   <Text
//                     style={{
//                       backgroundColor: 'transparent',
//                       fontFamily: FONT.Montserrat_Bold,
//                       color: COLORS.black,
//                       height: heightPercentageToDP(7),
//                       textAlignVertical: 'center',
//                       paddingStart: heightPercentageToDP(1),
//                     }}>
//                     30 INR
//                   </Text>
//                 </LinearGradient>
//               </View>

//               {/** CREATE RESULT */}
//               <View
//                 style={{
//                   borderRadius: heightPercentageToDP(2),
//                   padding: heightPercentageToDP(1),
//                 }}>
//                 <Text
//                   style={{
//                     fontFamily: FONT.Montserrat_SemiBold,
//                     color: COLORS.black,
//                     fontSize: heightPercentageToDP(2),
//                     paddingStart: heightPercentageToDP(1),
//                   }}>
//                   Create result
//                 </Text>

//                 <LinearGradient
//                   colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                   start={{x: 0, y: 0}} // start from left
//                   end={{x: 1, y: 0}} // end at right
//                   style={{
//                     borderRadius: heightPercentageToDP(2),
//                   }}>
//                   <TextInput
//                     underlineColor="transparent"
//                     activeUnderlineColor="transparent"
//                     cursorColor={COLORS.white}
//                     placeholderTextColor={COLORS.black}
//                     style={{
//                       backgroundColor: 'transparent',
//                       fontFamily: FONT.Montserrat_Bold,
//                       color: COLORS.black,
//                     }}
//                     value={resultnumber}
//                     onChangeText={text => setresultnumber(text)}
//                   />
//                 </LinearGradient>
//               </View>

//               {/** NEXT RESULT */}
//               <View
//                 style={{
//                   borderRadius: heightPercentageToDP(2),
//                   padding: heightPercentageToDP(1),
//                 }}>
//                 <Text
//                   style={{
//                     fontFamily: FONT.Montserrat_SemiBold,
//                     color: COLORS.black,
//                     fontSize: heightPercentageToDP(2),
//                     paddingStart: heightPercentageToDP(1),
//                   }}>
//                   Next result
//                 </Text>

//                 <LinearGradient
//                   colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
//                   start={{x: 0, y: 0}} // start from left
//                   end={{x: 1, y: 0}} // end at right
//                   style={{
//                     borderRadius: heightPercentageToDP(2),
//                   }}>
//                   <TextInput
//                     underlineColor="transparent"
//                     activeUnderlineColor="transparent"
//                     cursorColor={COLORS.white}
//                     placeholderTextColor={COLORS.black}
//                     style={{
//                       backgroundColor: 'transparent',
//                       fontFamily: FONT.Montserrat_Bold,
//                       color: COLORS.black,
//                     }}
//                     value={nextresult}
//                     onChangeText={text => setnextresult(text)}
//                   />
//                 </LinearGradient>
//               </View>

//             </ScrollView>

//             </View>

//           </View>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// export default PlayArenaInsights;

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
