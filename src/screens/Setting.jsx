import {
  Image,
  ImageBackground,
  SafeAreaView,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Background from '../components/background/Background';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const Setting = () => {
  const navigation = useNavigation();

  // Function to clear AsyncStorage data when the user logs out
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage data cleared successfully.');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error,
      });
    }
  };

  const logoutHandler = () => {
    console.log('Logging Off...');

    Toast.show({
      type: 'success',
      text1: 'Logging Out ',
      text2: 'Please wait...',
    });

    setTimeout(() => {
      clearAsyncStorage();
    }, 1000);
  };

  const submitHandler = () => {
    console.log('Working on login ');
    Toast.show({
      type: 'success',
      text1: 'Processing',
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Setting Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(75),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(75),
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

            {/** Setting Main Container */}

            <View
              style={{
                flex: 1,
                margin: heightPercentageToDP(2),
              }}>
              <GradientTextWhite
                style={{
                  ...styles.textStyle,
                  marginBottom: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}>
                Setting
              </GradientTextWhite>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/** Wallet container */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllWallet')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <Ionicons
                      name={'wallet'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Wallet Modification
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Add  Game Setting */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('GameDescription')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
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
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Game Description
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** About us container */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AboutUs')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
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
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    About Us
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Create location */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateLocation')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
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
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Create Location
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Add Promotion */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllPromotion')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
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
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Add Promotion
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Add Notification */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SendNotification')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <Ionicons
                      name={'notifications'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Push Notifiction
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Create Result */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
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
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Create Result
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Update Profile container */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdateProfile')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialCommunityIcons
                      name={'account'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Update Profile
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Add  Deposit */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('Payment')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <Image
                      source={require('../../assets/image/deposit.png')}
                      resizeMode="cover"
                      style={{
                        height: heightPercentageToDP(3),
                        width: heightPercentageToDP(3),
                      }}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Deposit Payment
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Withdraw */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('Withdraw')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <Image
                      source={require('../../assets/image/withdraw.png')}
                      resizeMode="cover"
                      style={{
                        height: heightPercentageToDP(3),
                        width: heightPercentageToDP(3),
                      }}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Withdraw Payment
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Balance Transfer container */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('BalanceTransfer')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <AntDesign
                      name={'wallet'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Balance Transfer
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** PLAYBET HISTORY */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('PlayHistory')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialCommunityIcons
                      name={'play-circle-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Play History
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** HISTORY */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('History')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialCommunityIcons
                      name={'history'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    History
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Change Password */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('ChangePassword')}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialIcons
                      name={'password'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    Change Password
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Update Email */}

                {/* <TouchableOpacity
              onPress={() => navigation.navigate('ChangeEmail')}
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
                <Fontisto
                  name={'email'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.darkGray}
                />
              </LinearGradient>
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.black,
                }}>
                Change Email
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
              />
            </TouchableOpacity> */}

                {/** Logout container */}
                <TouchableOpacity
                  onPress={logoutHandler}
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  <LinearGradient
                    colors={[COLORS.grayBg, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <AntDesign
                      name={'logout'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>

                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      color: COLORS.black,
                      fontSize: heightPercentageToDP(2),
                    }}>
                    Logout
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});

// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useState} from 'react';
// import LoginBackground from '../components/login/LoginBackground';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {COLORS, FONT} from '../../assets/constants';
// import GradientText from '../components/helpercComponent/GradientText';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Toast from 'react-native-toast-message';
// import {useNavigation} from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Background from '../components/background/Background';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Setting = () => {
// const navigation = useNavigation();

// // Function to clear AsyncStorage data when the user logs out
// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage data cleared successfully.');
//     navigation.reset({
//       index: 0,
//       routes: [{name: 'Login'}],
//     });
//   } catch (error) {
//     Toast.show({
//       type: 'error',
//       text1: 'Something went wrong',
//       text2: error,
//     });
//   }
// };

// const logoutHandler = () => {
//   console.log('Logging Off...');

//   Toast.show({
//     type: 'success',
//     text1: 'Logging Out ',
//     text2: 'Please wait...',
//   });

//   setTimeout(() => {
//     clearAsyncStorage();
//   }, 1000);
// };

// const submitHandler = () => {
//   console.log('Working on login ');
//   Toast.show({
//     type: 'success',
//     text1: 'Processing',
//   });
// };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Background />

//       {/** Setting Cointainer */}

//       <View
//         style={{
//           height: heightPercentageToDP(75),
//           width: widthPercentageToDP(100),
//           backgroundColor: COLORS.white_s,
//           borderTopLeftRadius: heightPercentageToDP(5),
//           borderTopRightRadius: heightPercentageToDP(5),
//         }}>
//         {/** Top Style View */}
//         <View
//           style={{
//             height: heightPercentageToDP(5),
//             width: widthPercentageToDP(100),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View
//             style={{
//               width: widthPercentageToDP(20),
//               height: heightPercentageToDP(0.8),
//               backgroundColor: COLORS.grayBg,
//               borderRadius: heightPercentageToDP(2),
//             }}></View>
//         </View>

//         {/** Setting Main Container */}

//         <View
//           style={{
//             flex: 1,
//             margin: heightPercentageToDP(2),
//           }}>
//           <GradientText style={styles.textStyle}>Setting</GradientText>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {/** Update Profile container */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('UpdateProfile')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 marginTop: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <MaterialCommunityIcons
//                   name={'account'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Update Profile
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Change Password container */}

//             <TouchableOpacity
//               onPress={() => navigation.navigate('ChangePassword')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 marginTop: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <MaterialIcons
//                   name={'password'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Change Password
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Change Email container */}

//             {/* <TouchableOpacity
//               onPress={() => navigation.navigate('ChangeEmail')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 marginTop: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Fontisto
//                   name={'email'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.gray2}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.darkGray,
//                 }}>
//                 Change Email
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.white}
//               />
//             </TouchableOpacity> */}

//             {/** Wallet container */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('AllWallet')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 marginTop: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Ionicons
//                     name={'wallet'}
//                     size={heightPercentageToDP(3)}
//                     color={COLORS.darkGray}
//                   />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Wallet Modification
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Add  Game Setting */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('GameDescription')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 marginTop: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <MaterialCommunityIcons
//                   name={'gamepad-variant-outline'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Game Description
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** About us container */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('AboutUs')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 marginTop: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <AntDesign
//                   name={'infocirlceo'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 About Us
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Create location */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('CreateLocation')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Entypo
//                   name={'location'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Create Location
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Add Promotion */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('AllPromotion')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Fontisto
//                   name={'date'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Add Promotion
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Add Notification */}
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("SendNotification")
//               }
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Ionicons
//                   name={'notifications'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Push Notifiction
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Create Time */}
//             {/* <TouchableOpacity
//               onPress={() => navigation.navigate('Search')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Entypo
//                   name={'time-slot'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.gray2}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.darkGray,
//                 }}>
//                 Create Time
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.white}
//               />
//             </TouchableOpacity> */}

//             {/** Create Date */}
//             {/* <TouchableOpacity
//               onPress={() => navigation.navigate('CreateDate')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Fontisto
//                   name={'date'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.gray2}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.darkGray,
//                 }}>
//                 Create Date
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.white}
//               />
//             </TouchableOpacity> */}

//             {/** Create Result */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Search')}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <Entypo
//                   name={'trophy'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>
//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2),
//                   color: COLORS.black,
//                 }}>
//                 Create Result
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>

//             {/** Logout container */}
//             <TouchableOpacity
//             onPress={logoutHandler}
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginTop: heightPercentageToDP(2),
//               }}>
//               <LinearGradient
//                 colors={[COLORS.lightWhite, COLORS.white_s]}
//                 className="rounded-xl p-1">
//                 <AntDesign
//                   name={'logout'}
//                   size={heightPercentageToDP(3)}
//                   color={COLORS.darkGray}
//                 />
//               </LinearGradient>

//               <Text
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   color: COLORS.black,
//                   fontSize: heightPercentageToDP(2),
//                 }}>
//                 Logout
//               </Text>

//               <Ionicons
//                 name={'chevron-forward-outline'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Setting;

// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//   },
// });
