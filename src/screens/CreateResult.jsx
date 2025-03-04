import {
  ImageBackground,
  SafeAreaView,
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
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import UrlHelper from '../helper/UrlHelper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/helpercComponent/Loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {getTimeAccordingLocation} from '../redux/actions/timeAction';

const CreateResult = ({route}) => {
  const {datedata, locationdata, timedata} = route.params;

  console.log('All Result  data');
  console.log(datedata._id);
  console.log(locationdata._id);
  console.log(timedata);

  const [enterData, setEnterData] = useState('');
  const [nextResultData, setNextResultData] = useState('');
  const {accesstoken} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dispatch = useDispatch();

  const {times, loading: loadingAllTime} = useSelector(state => state.time);

  useEffect(() => {
    dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
  }, [dispatch]);

  function getNextResultTime(times, curtime) {
    // Sort times based on the lottime to ensure they are in order
    const sortedTimes = [...times].sort((a, b) => {
      return (
        new Date(`1970-01-01T${a.lottime}Z`) -
        new Date(`1970-01-01T${b.lottime}Z`)
      );
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
      console.log('curr time :: ' + timedata.lottime);
      console.log('times', getNextResultTime(times, timedata.lottime));

      // console.log(times)
      setNextResultData(getNextResultTime(times, timedata.lottime));
    }
  }, [loadingAllTime]);

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

  const submitHandler = () => {
    console.log('Working on login ');

    const currentTime = formatTime(new Date());

    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please enter result',
      });
    } else if (!nextResultData) {
      Toast.show({
        type: 'error',
        text1: 'Please select new result time',
      });
    } else if (nextResultData === currentTime) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Next result time and current time cannot be the same',
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Processing... ',
        text2: 'Please dont close the app, this might take a while',
      });

      createResult(
        accesstoken,
        timedata._id,
        datedata._id,
        locationdata._id,
        nextResultData,
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
          resultNumber: enterData,
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
      setEnterData('');
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Login Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>Create</GradientText>

          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <GradientText style={styles.textStyle}>Result</GradientText>
            <GradientTextWhite
              style={{
                fontSize: heightPercentageToDP(2),
                fontFamily: FONT.Montserrat_Bold,
                color: COLORS.white,
              }}>
              {locationdata?.maximumRange}
            </GradientTextWhite>
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

            <GradientTextWhite
              style={{
                fontSize: heightPercentageToDP(4),
                fontFamily: FONT.Montserrat_Bold,
                color: COLORS.black,
                marginHorizontal: heightPercentageToDP(1),
              }}>
              {locationdata.lotlocation}
            </GradientTextWhite>

            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <GradientTextWhite
                style={{
                  fontSize: heightPercentageToDP(4),
                  fontFamily: FONT.Montserrat_Bold,
                  color: COLORS.black,
                  marginStart: heightPercentageToDP(1),
                }}>
                {timedata.lottime}
              </GradientTextWhite>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LocationTimeZone', {
                    datedata: datedata,
                    locationdata: locationdata,
                    timedata: timedata,
                  })
                }
                className="rounded-md p-2"
                style={{
                  backgroundColor: COLORS.gray2,
                  width: widthPercentageToDP(10),
                  margin: heightPercentageToDP(2),
                }}>
                <Entypo
                  name={'clock'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.darkGray}
                />
              </TouchableOpacity>
            </View>

            {/** Result Main Container */}

            <View style={{padding: heightPercentageToDP(2)}}>
              <GradientText
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                  marginBottom: heightPercentageToDP(1),
                }}>
                Result
              </GradientText>

              <View
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                <Entypo
                  name="trophy"
                  size={heightPercentageToDP(3)}
                  color={COLORS.darkGray}
                />
                <TextInput
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    color: COLORS.black,
                    fontSize: heightPercentageToDP(2.5),
                  }}
                  placeholder="Enter result"
                  placeholderTextColor={COLORS.black}
                  label="time"
                  value={enterData}
                  onChangeText={text => setEnterData(text)}
                />
              </View>

              {/** Next Result Data */}

              <GradientText
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                  marginTop: heightPercentageToDP(3),
                }}>
                Next Result
              </GradientText>

              <TouchableOpacity
                onPress={showTimepicker}
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
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

                <Text
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    color: COLORS.black,
                    fontSize: heightPercentageToDP(2.5),
                  }}>
                  {nextResultData ? nextResultData : formatTime(time)}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            {loading ? (
              <View style={{flex: 1}}>
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
                  disabled={loading}
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
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default CreateResult;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
