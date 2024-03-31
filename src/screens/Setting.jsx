import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Background from '../components/background/Background';
import LinearGradient from 'react-native-linear-gradient';

const Setting = () => {
  const navigation = useNavigation();

  const [searchData, setSearchData] = useState('');

  const submitHandler = () => {
    console.log('Working on login ');
    Toast.show({
      type: 'success',
      text1: 'Processing',
    });
  };

  return (
    <View style={{flex: 1}}>
      <Background />

      {/** Setting Cointainer */}

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

        {/** Setting Main Container */}

        <View
          style={{
            flex: 1,
            margin: heightPercentageToDP(2),
          }}>
          <GradientText style={styles.textStyle}>Setting</GradientText>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/** Update Profile container */}
            <TouchableOpacity
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
              }}>
              <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <MaterialCommunityIcons
                  name={'account'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                  
                }}>
                Update Profile
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** Add  Game Setting */}
            <TouchableOpacity
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
              }}>
              
              <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <MaterialCommunityIcons
                  name={'gamepad-variant-outline'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                Game Description
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** About us container */}
            <TouchableOpacity
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
              }}>
              <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <AntDesign
                  name={'infocirlceo'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                About Us
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** Create location */}
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateLocation')}
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
              }}>
               <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <Entypo
                  name={'location'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                Create Location
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** Create Time */}
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateTime')}
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
              }}>
              <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <Entypo
                  name={'time-slot'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                Create Time
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** Create Date */}
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateDate')}
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
              }}>
              <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <Fontisto
                  name={'date'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                Create Date
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** Create Result */}
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateResult')}
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
              }}>
               <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <Entypo
                  name={'trophy'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray2}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                Create Result
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/** Logout container */}
            <TouchableOpacity
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
              }}>
                 <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                 <AntDesign
                name={'logout'}
                size={heightPercentageToDP(3)}
                color={COLORS.gray2}
              />
              </LinearGradient>
             
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.SF_PRO_REGULAR,
                  color: COLORS.darkGray,
                }}>
                Logout
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
