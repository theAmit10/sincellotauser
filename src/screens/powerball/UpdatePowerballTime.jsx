import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import {COLORS, FONT} from '../../../assets/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loading from '../../components/helpercComponent/Loading';
import {
  useUpdatePowerballTimeMutation,
  useUpdatePowerballTimeQuery,
} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const UpdatePowerballTime = ({route}) => {
  const {accesstoken} = useSelector(state => state.user);
  const {item} = route.params;
  console.log(item);

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [enterData, setEnterData] = useState('');

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      setEnterData(formatTime(selectedTime));
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

  const [updatePowerballTime, {isLoading}] = useUpdatePowerballTimeMutation();

  const submitHandler = async () => {
    console.log('Working on update powerball time ');
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please enter time',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing ',
      });

      try {
        const body = {
          powertime: enterData,
        };

        const res = await updatePowerballTime({
          accesstoken: accesstoken,
          body: body,
          id: item._id,
        }).unwrap(); // <-- Ensures we get clean response data

        console.log(JSON.stringify(res));

        Toast.show({
          type: 'success',
          text1: res.message,
        });
      } catch (error) {
        console.log('Error during update powertime:', error);
        Toast.show({
          type: 'error',
          text1: error.data.message,
        });
      }
    }
  };

  return (
    <MainBackgroundWithoutScrollview title={'Update Powerball Time'}>
      <View style={{padding: heightPercentageToDP(2)}}>
        <GradientTextWhite
          style={{
            fontFamily: FONT.Montserrat_Regular,
            fontSize: heightPercentageToDP(3),
            color: COLORS.black,
          }}>
          Current Time
        </GradientTextWhite>
        <GradientTextWhite style={styles.textStyle}>
          {item.powertime}
        </GradientTextWhite>

        <View style={{paddingTop: heightPercentageToDP(2)}}>
          <GradientTextWhite
            style={{
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
              marginBottom: heightPercentageToDP(1),
            }}>
            Select Time
          </GradientTextWhite>

          <TouchableOpacity
            onPress={showTimepicker}
            style={{
              height: heightPercentageToDP(7),
              flexDirection: 'row',
              backgroundColor: COLORS.grayHalfBg,
              alignItems: 'center',
              paddingHorizontal: heightPercentageToDP(2),
              borderRadius: heightPercentageToDP(1),
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
              {formatTime(time)}
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
      </View>
      {/** Submit container */}

      {isLoading ? (
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
            disabled={isLoading}
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
    </MainBackgroundWithoutScrollview>
  );
};

export default UpdatePowerballTime;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
