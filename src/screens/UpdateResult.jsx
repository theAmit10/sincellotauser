import {
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

const UpdateResult = ({route}) => {
  const {locationdata, timedata, datedata, resultdata} = route.params;

  console.log(JSON.stringify(locationdata));
  const [enterData, setEnterData] = useState(resultdata.resultNumber);
  const [nextResultData, setNextResultData] = useState(resultdata.nextresulttime);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {accesstoken} = useSelector(state => state.user);

  useEffect(() => {
    setEnterData('');
  }, [loading]);

  const submitHandler = () => {
    console.log('Working on login ');
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

  return (
    <View style={{flex: 1}}>
      <Background />

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Update</GradientText>
        <GradientText style={styles.textStyle}>Result</GradientText>
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

        <ScrollView>
          {/** Result Main Container */}

          <View style={{padding: heightPercentageToDP(2)}}>
            <GradientText
              style={{
                fontFamily: FONT.Montserrat_Regular,
                fontSize: heightPercentageToDP(2.5),
                color: COLORS.black,
                marginBottom: heightPercentageToDP(1),
              }}>
              Current Result
            </GradientText>
            <GradientText style={styles.textStyle}>
              {resultdata.resultNumber}
            </GradientText>

            {/** NExt Result */}

            <GradientText
              style={{
                fontFamily: FONT.Montserrat_Regular,
                fontSize: heightPercentageToDP(2.5),
                color: COLORS.black,
                marginTop: heightPercentageToDP(1),
              }}>
              Current Next Result Time
            </GradientText>
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
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
    </View>
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
