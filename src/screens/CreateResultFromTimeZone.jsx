
import {
  SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
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
  import {useSelector} from 'react-redux';
  import UrlHelper from '../helper/UrlHelper';
  import {useNavigation} from '@react-navigation/native';
  import axios from 'axios';
  import Loading from '../components/helpercComponent/Loading';
  import DateTimePicker from '@react-native-community/datetimepicker';
  
  
  const CreateResultFromTimeZone = ({route}) => {
    const {datedata, locationdata, timedata} = route.params;
  
    console.log('All Result  data');
    console.log(datedata._id);
    console.log(locationdata._id);
    console.log(timedata);
  
    const [enterData, setEnterData] = useState('');
    const [nextResultData, setNextResultData] = useState(timedata.lottime);
    const {accesstoken} = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
  
    const [time, setTime] = useState(new Date());
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
  
    const checkForSameTime = (selectedTime) => {
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
      }
       else {
        Toast.show({
          type: 'success',
          text1: 'Processing... ',
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
        navigation.navigate('Result', {
            datedata: datedata,
            locationdata: locationdata,
            timedata: timedata,
          })
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
  
        {/** Login Cointainer */}
  
        <View
          style={{
            height: heightPercentageToDP(65),
            width: widthPercentageToDP(100),
            backgroundColor: COLORS.white_s,
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
  
          <GradientText
            style={{
              fontSize: heightPercentageToDP(4),
              fontFamily: FONT.Montserrat_Bold,
              color: COLORS.black,
              margin: heightPercentageToDP(1),
            }}>
            {locationdata.lotlocation}
          </GradientText>
          
  
          {/* <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <GradientText
            style={{
              fontSize: heightPercentageToDP(4),
              fontFamily: FONT.Montserrat_Bold,
              color: COLORS.black,
              marginStart: heightPercentageToDP(1),
            }}>
            {timedata.lottime}
          </GradientText>
           
          <TouchableOpacity onPress={() =>  navigation.navigate('LocationTimeZone', {
                         datedata: datedata,
                         locationdata: locationdata,
                         timedata: timedata,
                      })}
              className="rounded-md p-2" style={{backgroundColor: COLORS.gray2, width: widthPercentageToDP(10), margin: heightPercentageToDP(2)}}
          >
              <Entypo
                name={'clock'}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
              />
            </TouchableOpacity>
  
          </View> */}
  
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
                backgroundColor: COLORS.grayHalfBg,
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
  
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  color: COLORS.black,
                  fontSize: heightPercentageToDP(2.5),
                }}>
                {nextResultData}
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
      </SafeAreaView>
    );
  };
  
  export default CreateResultFromTimeZone;
  
  const styles = StyleSheet.create({
    textStyle: {
      fontSize: heightPercentageToDP(4),
      fontFamily: FONT.Montserrat_Bold,
    },
  });
  