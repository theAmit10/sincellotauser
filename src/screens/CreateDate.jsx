import {
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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createDate} from '../redux/actions/dateAction';
import Loading from '../components/helpercComponent/Loading';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateDate = ({route}) => {
  const [enterData, setEnterData] = useState('');
  const navigation = useNavigation();
  const {timedata, locationdata} = route.params;
  const dispatch = useDispatch();

  // const {loading, message, error} = useSelector(state => state.date);
  const {accesstoken} = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);

  const [fromDate, setFromDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);

  // const onChangeFrom = (event, selectedDate) => {
  //   const currentDate = selectedDate || fromDate;
  //   // Define options for formatting the date
  //   const options = { day: '2-digit', month: 'numeric',year: 'numeric'};

  //   // Format the date using toLocaleDateString
  //   const formattedDate = currentDate.toLocaleDateString('en-US', options);
  //   // setShow(Platform.OS === 'ios');
  //   setShowFrom(Platform.OS === 'ios');
  //   setFromDate(currentDate);
  //   console.log(currentDate)
  //   console.log(formattedDate)
  //   setEnterData(currentDate)
  // };

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
  
    // Define options for formatting the date
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  
    // Format the date using toLocaleDateString
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
    // Rearrange the formatted date to match the desired format
    const [month, day, year] = formattedDate.split('/');
    const rearrangedDate = `${day}-${month}-${year}`;
  
    // setShow(Platform.OS === 'ios');
    setShowFrom(Platform.OS === 'ios');
    setFromDate(currentDate);
    console.log(currentDate);
    console.log(rearrangedDate);
  
    // Assuming setEnterData is a function to set some state related to the formatted date
    setEnterData(rearrangedDate); // Set formatted date to state
  };
  

  const showModeFrom = currentMode => {
    setShowFrom(true);
    // setMode(currentMode);
  };

  const showDatepickerFrom = () => {
    showModeFrom('date');
    // handleDateChange(fromDate, 'START_DATE');
  };

  const submitHandler = () => {
    console.log('Working on login ');
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please enter location time',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing...',
      });

      // dispatch(createDate(accesstoken, timedata._id, enterData));
      createDateForLocation(accesstoken, timedata._id, enterData);
    }
  };

  const createDateForLocation = async (accesstoken, lottime, lotdate) => {
    try {
      setLoading(true);
      const {data} = await axios.post(
        UrlHelper.CREATE_DATE_API,
        {
          lotdate,
          lottime,
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

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Create</GradientText>
        <GradientText style={styles.textStyle}>Date</GradientText>
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

        {/** Result Main Container */}

        <View style={{padding: heightPercentageToDP(2)}}>
          <GradientText
            style={{
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
              marginBottom: heightPercentageToDP(1),
            }}>
            Enter Date
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
            <TouchableOpacity onPress={showDatepickerFrom}>
              <Entypo
                name={'calendar'}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
              />
            </TouchableOpacity>

            <TextInput
              style={{
                marginStart: heightPercentageToDP(1),
                flex: 1,
                fontFamily: FONT.Montserrat_Regular,
                color: COLORS.black,
                fontSize: heightPercentageToDP(2.5),
              }}
              placeholder="For example - 05-03-2024"
              placeholderTextColor={COLORS.black}
              label="time"
              value={enterData}
              onChangeText={text => setEnterData(text)}
            />
          </View>

          {showFrom && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fromDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeFrom}
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

export default CreateDate;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
