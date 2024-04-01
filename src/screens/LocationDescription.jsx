import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginBackground from '../components/login/LoginBackground';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions/userAction';
import {useMessageAndErrorUser} from '../utils/hooks';
import Background from '../components/background/Background';

const LocationDescription = ({route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {locationdata} = route.params;

  console.log(locationdata);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  // For Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // for Submitting Response
  const submitHandler = () => {
    console.log('Working on login ');
  };

  const loading = false;

  return (
    <View style={{flex: 1}}>
      <Background />

      {/** Login Cointainer */}

      <View
        style={{
          height: heightPercentageToDP(75),
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

        {/** Game Description Main Container */}
        <View
          style={{
            flex: 1,
            margin: heightPercentageToDP(2),
          }}>
          <GradientText style={styles.textStyle}>
            {locationdata.lotlocation}
          </GradientText>
          <GradientText style={styles.textStyle}>Details</GradientText>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: heightPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                gap: heightPercentageToDP(2),
              }}>
              {/** Title container */}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.grayBg,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                  padding: heightPercentageToDP(2),
                }}>
                <Text
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.black,
                  }}>
                  {locationdata?.locationTitle === ''
                    ? 'No Title Available'
                    : locationdata?.locationTitle}
                </Text>
              </View>

              {/** Description Containter */}

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.grayBg,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                  padding: heightPercentageToDP(2),
                }}>
                <Text
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.black,
                  }}>
                  {locationdata?.locationDescription === ''
                    ? 'No Description Available'
                    : locationdata?.locationDescription}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        {/** Add Description Container */}
        <View
          style={{
            marginBottom: heightPercentageToDP(5),
            marginHorizontal: heightPercentageToDP(2),
            marginTop: heightPercentageToDP(2),
          }}>
          {/** Email container */}

          <TouchableOpacity
            onPress={() => navigation.navigate("GameDescritptionDetails",{
                locationdata: locationdata,
              })}
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
              Add Description
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationDescription;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
