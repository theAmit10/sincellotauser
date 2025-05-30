import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Background from '../components/background/Background';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {useSelector} from 'react-redux';

const Setting = () => {
  const navigation = useNavigation();

  const {accesstoken, user} = useSelector(state => state.user);

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Setting Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(80),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(80),
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
                {/** All Deposit */}
                {user && user.role === 'admin' ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllDeposit')}
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
                      All Deposit
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.deposits ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllDeposit')}
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
                      All Deposit
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}
                {/** All Withdraw */}
                {user && user.role === 'admin' ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllWithdraw')}
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
                      All Withdraw
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.withdraws ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllWithdraw')}
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
                      All Withdraw
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}

                {/** LIVE RESULT */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('LiveResultLocation')}
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
                      name={'document-text'}
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
                    Live Result
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>

                {/** Wallet container */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.wallet ? (
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
                ) : null}
                {/** Add  Game DESCTIPTION */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.gamedescription ? (
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
                ) : null}
                {/** About us container */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.aboutus ? (
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
                ) : null}
                {/** Create location */}
                {user && user.role === 'admin' ? (
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
                ) : null}

                {/** Add Promotion */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.promotions ? (
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
                ) : null}

                {/** Add Notification */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.pushnotification ? (
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
                ) : null}

                {/** Create Result */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.createresult ? (
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
                ) : null}

                {/** Update Profile container */}
                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.updateprofile ? (
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
                ) : null}

                {/** Add  PAYMENT OPTION */}

                {user && user.role === 'admin' ? (
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
                      Payment Option
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.paymentoption ? (
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
                ) : null}
                {/** Withdraw */}
                {/* 
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
                </TouchableOpacity> */}

                {/** ALL COUNTRY container */}

                {user && user.role === 'admin' ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllCountry')}
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
                      <Fontisto
                        name={'world-o'}
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
                      All Country
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.allcountry ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllCountry')}
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
                      <Fontisto
                        name={'world-o'}
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
                      All Country
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}

                {/** PLAY container */}

                {user && user.role === 'admin' ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PlayArenaLocation')}
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
                      All Play
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.play ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PlayArenaLocation')}
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
                      All Play
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}
                {/** PLAYBET HISTORY */}
                {/* 
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
                    Play History
                  </Text>

                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity> */}
                {/** BALANCE SHEET*/}
                {user && user.role === 'admin' ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('BalanceSheet')}
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
                      <FontAwesome
                        name={'balance-scale'}
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
                      Transaction History
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.transcationhistory ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('BalanceSheet')}
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
                      <FontAwesome
                        name={'balance-scale'}
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
                      Transaction History
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}

                {/** Change Password */}

                {user && user.role === 'admin' ? (
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
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.changepassword ? (
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
                ) : null}

                {/** App Link */}
                {user && user.role === 'admin' ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Applink')}
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
                        name={'download'}
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
                      App Link
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.changepassword ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Applink')}
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
                        name={'android'}
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
                      App Link
                    </Text>

                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}

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
