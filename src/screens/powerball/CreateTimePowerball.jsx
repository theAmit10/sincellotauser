import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import Loading from '../../components/helpercComponent/Loading';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import {useSelector} from 'react-redux';
import {useCreatePowerballTimeMutation} from '../../helper/Networkcall';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import Entypo from 'react-native-vector-icons/Entypo';
const CreateTimePowerball = ({route}) => {
  const {forprocess} = route.params;

  console.log(forprocess);

  const [createtime, settime] = useState('');
  const [updatetime, setupdatetime] = useState('');

  const {accesstoken} = useSelector(state => state.user);

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

  const [createPowerballTime, {isLoading}] = useCreatePowerballTimeMutation();

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

        const res = await createPowerballTime({
          accesstoken: accesstoken,
          body: body,
        }).unwrap(); // <-- Ensures we get clean response data

        console.log(JSON.stringify(res));

        Toast.show({
          type: 'success',
          text1: res.message,
        });
      } catch (error) {
        console.log('Error during create powertime:', error);
        Toast.show({
          type: 'error',
          text1: error.data.message,
        });
      }
    }
  };

  return (
    <>
      {forprocess === 'create' && (
        <MainBackgound title={'Create Time'}>
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

          <View
            style={{
              flex: 1,
              marginBottom: heightPercentageToDP(5),
              marginVertical: heightPercentageToDP(2),
              justifyContent: 'flex-end',
            }}>
            {isLoading ? (
              <Loading />
            ) : (
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
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </MainBackgound>
      )}

      {forprocess === 'update' && (
        <MainBackgound title={'Update Time'}>
          <Textinput
            title="Time"
            value={updatetime}
            onChangeText={text => setupdatetime(text)} // Updates inputValue state
            placeholder="Enter time"
          />

          <View
            style={{
              flex: 1,
              marginBottom: heightPercentageToDP(5),
              marginVertical: heightPercentageToDP(2),
              justifyContent: 'flex-end',
            }}>
            {false ? (
              <Loading />
            ) : (
              <TouchableOpacity
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
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </MainBackgound>
      )}
    </>
  );
};

export default CreateTimePowerball;

const styles = StyleSheet.create({});
