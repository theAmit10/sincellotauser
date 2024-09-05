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
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../components/helpercComponent/Loading';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const UpdateDate = ({route}) => {
  const {locationdata, timedata, datedata} = route.params;

  console.log(JSON.stringify(datedata));
  const [enterData, setEnterData] = useState('');
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
        text1: 'Please Enter Location Name',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing ',
      });

      updateLocationName(accesstoken, datedata);
    }
  };

  const updateLocationName = async (accesstoken, datedata) => {
    try {
      setLoading(true);

      const url = `${UrlHelper.UPDATE_DATE_API}/${datedata._id}`;

      console.log('URL :: ' + url);

      const {data} = await axios.put(
        url,
        {
          lotdate: enterData,
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
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>Update</GradientText>
          <GradientText style={styles.textStyle}>Date</GradientText>
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

            {/** Result Main Container */}

            <View style={{padding: heightPercentageToDP(2)}}>
              <GradientTextWhite
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(3),
                  color: COLORS.black,
                  marginBottom: heightPercentageToDP(1),
                }}>
                Current Date
              </GradientTextWhite>
              <GradientTextWhite style={styles.textStyle}>
                {datedata.lotdate}
              </GradientTextWhite>

              <View
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                  marginTop: heightPercentageToDP(5),
                }}>
                <Entypo
                  name="calendar"
                  size={heightPercentageToDP(3)}
                  color={COLORS.black}
                />
                <TextInput
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.black,
                  }}
                  placeholder="Enter new Date"
                  placeholderTextColor={COLORS.black}
                  label="date"
                  value={enterData}
                  onChangeText={text => setEnterData(text)}
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
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default UpdateDate;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
