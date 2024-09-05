import {
  ImageBackground,
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
import GradientText from '../components/helpercComponent/GradientText';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Background from '../components/background/Background';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../components/helpercComponent/Loading';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import { getTimeAccordingLocation } from '../redux/actions/timeAction';

const UpdateResult = ({route}) => {
  const {locationdata, timedata, datedata, resultdata} = route.params;

  console.log(JSON.stringify(locationdata));
  const [enterData, setEnterData] = useState(resultdata.resultNumber);
  const [nextResultData, setNextResultData] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {accesstoken} = useSelector(state => state.user);

  const [time, setTime] = useState(new Date());
  // const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      setNextResultData(formatTime(selectedTime));
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

  const checkForSameTime = selectedTime => {
    const currentTime = formatTime(new Date());
    if (selectedTime === currentTime) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Next result time and current time cannot be the same',
      });
    }
  };

  useEffect(() => {
    setEnterData('');
  }, [loading]);

  const submitHandler = () => {
    console.log('Working on login ');
    const currentTime = formatTime(new Date());
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Result Number',
      });
    } else if (!nextResultData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Next Result Time',
      });
    } else if (nextResultData === currentTime) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Next result time and current time cannot be the same',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing ',
      });

      updateLocationName();
    }
  };

  const updateLocationName = async () => {
    try {
      setLoading(true);

      const url = `${UrlHelper.UPDATE_RESULT_API}/${resultdata._id}`;

      console.log('URL :: ' + url);

      const {data} = await axios.put(
        url,
        {
          resultNumber: enterData,
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
      setEnterData('');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(' Err :: ' + error);
      console.log(error.response.data.message);
      Toast.show({
        type: 'error',
        text1: 'Something went Wrong',
        text2: 'Please try again',
      });
    }
  };


  const {times, loading: loadingAllTime} = useSelector(state => state.time);

  useEffect(() => {
    dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
  }, [dispatch]);

  // const getNextResultTime = (times, currentTime) => {
  //   const timeList = times.map(time => time.lottime);
  //   const index = timeList.indexOf(currentTime);

  //   if (index === -1) {
  //     return timeList[0];
  //   }

  //   if (index === timeList.length - 1) {
  //     return timeList[0];
  //   }

  //   return timeList[index + 1];
  // };
  function getNextResultTime(times, curtime) {
    // Sort times based on the lottime to ensure they are in order
    const sortedTimes = [...times].sort((a, b) => {
      return new Date(`1970-01-01T${a.lottime}Z`) - new Date(`1970-01-01T${b.lottime}Z`);
    });
  
    // Find the index of the current time in the sorted times array
    const curIndex = sortedTimes.findIndex(time => time.lottime === curtime);
  
    // If curtime is not found, or if there's only one time in the list
    if (curIndex === -1 || sortedTimes.length === 1) {
      return sortedTimes[0]?.lottime || curtime;
    }
  
    // Check if curtime is the last item in the list
    if (curIndex === sortedTimes.length - 1) {
      return sortedTimes[0].lottime; // Return the first time in the list
    }
  
    // Return the next time after curtime
    return sortedTimes[curIndex + 1].lottime;
  }

  useEffect(() => {
    console.log('Getting all the times');
    if (times) {
      console.log('times', getNextResultTime(times, timedata.lottime));
      setNextResultData(getNextResultTime(times, timedata.lottime));
    }
  }, [loadingAllTime]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>Update</GradientText>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <GradientText style={styles.textStyle}>Result</GradientText>
            <GradientText
              style={{
                fontSize: heightPercentageToDP(2),
                fontFamily: FONT.Montserrat_Bold,
                marginEnd: heightPercentageToDP(2),
              }}>
              {locationdata?.maximumRange}
            </GradientText>
          </View>
        </View>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(65),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(65),
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

            <ScrollView>
              {/** Result Main Container */}

              <View style={{padding: heightPercentageToDP(2)}}>
                <GradientTextWhite
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2.5),
                    color: COLORS.black,
                    marginBottom: heightPercentageToDP(1),
                  }}>
                  Current Result
                </GradientTextWhite>
                <GradientTextWhite style={styles.textStyle}>
                  {resultdata.resultNumber}
                </GradientTextWhite>

                {/** NExt Result */}

                <GradientTextWhite
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2.5),
                    color: COLORS.black,
                    marginTop: heightPercentageToDP(1),
                  }}>
                  Current Next Result Time
                </GradientTextWhite>
                <GradientText style={styles.textStyle}>
                  {resultdata.nextresulttime}
                </GradientText>

                <View
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.grayHalfBg,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(5),
                  }}>
                  <Entypo
                    name={'price-ribbon'}
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
                    placeholder="Enter New Result"
                    placeholderTextColor={COLORS.black}
                    label="result"
                    value={enterData}
                    onChangeText={text => setEnterData(text)}
                  />
                </View>

                {/** Next Result Data */}

                <GradientText
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(3),
                    color: COLORS.black,
                    marginTop: heightPercentageToDP(3),
                  }}>
                  Next Result
                </GradientText>

                <View
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.grayHalfBg,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(1),
                  }}>
                  <Entypo
                    name={'clock'}
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
                    placeholder="Enter Next Result Time"
                    placeholderTextColor={COLORS.black}
                    label="result"
                    value={nextResultData}
                    onChangeText={text => setNextResultData(text)}
                  />
                </View>
              </View>
              {/** Submit container */}

              {loading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Loading />
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'flex-end',
                    flex: 1,
                    alignItems: 'flex-end',
                    paddingVertical: heightPercentageToDP(4),
                    paddingHorizontal: heightPercentageToDP(2),
                  }}>
                  <TouchableOpacity
                    onPress={submitHandler}
                    className="rounded-full"
                    style={{
                      height: heightPercentageToDP(7),
                      width: heightPercentageToDP(7),
                      flexDirection: 'row',
                      backgroundColor: COLORS.blue,
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                    }}>
                    <Ionicons
                      name={'send'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default UpdateResult;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
