import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {loadSingleUser} from '../redux/actions/userAction';
import Loading from '../components/helpercComponent/Loading';
import UserProfileBackground from '../components/background/UserProfileBackground';

export const roundToInteger = input => {
  // Convert input to a float
  const floatValue = parseFloat(input);

  // Check if it's a valid number
  if (isNaN(floatValue)) {
    return 'Invalid number'; // Handle invalid input
  }

  // Check if the number is already an integer
  if (Number.isInteger(floatValue)) {
    return floatValue; // Return the number as it is
  }

  // Return the integer part (without rounding)
  return Math.floor(floatValue);
};

const BSUserDetails = ({route}) => {
  const navigation = useNavigation();

  const {userdata, fromscreen} = route.params;

  const {singleuser, accesstoken, loadingSingleUser, user} = useSelector(
    state => state.user,
  );

  const [text, setText] = useState(singleuser.contact);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(loadSingleUser(accesstoken, userdata.userId));
  }, [dispatch, isFocused, userdata]);

  console.log('Users id :: ' + userdata?.userId);
  console.log('Users data :: ' + JSON.stringify(userdata));
  console.log('Users Detials :: ' + JSON.stringify(singleuser));

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The Text has been copied to your clipboard!',
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loadingSingleUser ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <ImageBackground
            source={require('../../assets/image/tlwbg.jpg')}
            style={{
              width: '100%',
              height: heightPercentageToDP(100),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loading />
          </ImageBackground>
        </View>
      ) : (
        <>
          <UserProfileBackground userdata={singleuser} />
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <ImageBackground
              source={require('../../assets/image/tlwbg.jpg')}
              style={{
                width: '100%',
                height: heightPercentageToDP(60),
              }}
              imageStyle={{
                borderTopLeftRadius: heightPercentageToDP(5),
                borderTopRightRadius: heightPercentageToDP(5),
              }}>
              <View
                style={{
                  height: heightPercentageToDP(60),
                  width: widthPercentageToDP(100),
                  borderTopLeftRadius: heightPercentageToDP(5),
                  borderTopRightRadius: heightPercentageToDP(5),
                  elevation: heightPercentageToDP(3),
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

                {loadingSingleUser ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Loading />
                  </View>
                ) : (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {/** Wallet Two */}

                    <View
                      style={{
                        height: heightPercentageToDP(20),
                        flexDirection: 'row',
                        backgroundColor: COLORS.grayBg,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                        margin: heightPercentageToDP(2),
                      }}>
                      <View
                        style={{
                          padding: heightPercentageToDP(2),
                        }}>
                        <Text
                          style={{
                            marginStart: heightPercentageToDP(1),
                            flex: 1,
                            fontFamily: FONT.Montserrat_Regular,
                            color: COLORS.darkGray,
                            fontSize: heightPercentageToDP(2),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          Country Details
                        </Text>
                        <Text
                          style={{
                            marginStart: heightPercentageToDP(1),
                            flex: 1,
                            fontFamily: FONT.Montserrat_SemiBold,
                            color: COLORS.darkGray,
                            fontSize: heightPercentageToDP(3),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          {singleuser?.country?.countryname}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: heightPercentageToDP(1),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          <GradientText
                            style={{
                              ...styles.textStyle,
                              width: widthPercentageToDP(60),
                            }}>
                            {singleuser?.country?.countrycurrencysymbol}
                          </GradientText>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.white,
                          position: 'absolute',
                          right: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          padding: heightPercentageToDP(1),
                          top: heightPercentageToDP(2),
                        }}>
                        <Entypo
                          name={'user'}
                          size={heightPercentageToDP(4)}
                          color={COLORS.darkGray}
                        />
                      </View>
                    </View>

                    {user && user.role === 'admin' ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditUserWallet', {
                            data: singleuser.walletTwo,
                            forwallet: 'two',
                            singleuserdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(25),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}>
                            Total Balance
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser.walletTwo?.walletName}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Ionicons
                                name={'wallet'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              {roundToInteger(singleuser?.walletTwo?.balance)}
                              <Text
                                style={{fontSize: heightPercentageToDP(1.5)}}>
                                {singleuser?.country?.countrycurrencysymbol}
                              </Text>
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : user &&
                      user.role === 'subadmin' &&
                      user.subadminfeature.gamewalletbalnceedit ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditUserWallet', {
                            data: singleuser.walletTwo,
                            forwallet: 'two',
                            singleuserdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(25),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}>
                            Total Balance
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser.walletTwo?.walletName}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Ionicons
                                name={'wallet'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              {roundToInteger(singleuser?.walletTwo?.balance)}
                              <Text
                                style={{fontSize: heightPercentageToDP(1.5)}}>
                                {singleuser?.country?.countrycurrencysymbol}
                              </Text>
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate('EditUserWallet', {
                        //     data: singleuser.walletTwo,
                        //     forwallet: 'two',
                        //   })
                        // }
                        style={{
                          height: heightPercentageToDP(25),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}>
                            Total Balance
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser.walletTwo?.walletName}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Ionicons
                                name={'wallet'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              {roundToInteger(singleuser?.walletTwo?.balance)}
                              <Text
                                style={{fontSize: heightPercentageToDP(1.5)}}>
                                {singleuser?.country?.countrycurrencysymbol}
                              </Text>
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {/** Wallet One */}

                    {user && user.role === 'admin' ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditUserWallet', {
                            data: singleuser.walletOne,
                            forwallet: 'one',
                            singleuserdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(25),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}>
                            Total Balance
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser.walletOne?.walletName}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Ionicons
                                name={'wallet'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              {roundToInteger(singleuser?.walletOne?.balance)}
                              <Text
                                style={{fontSize: heightPercentageToDP(1.5)}}>
                                {singleuser?.country?.countrycurrencysymbol}
                              </Text>
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : user &&
                      user.role === 'subadmin' &&
                      user.subadminfeature.withdrawalletbalanceedit ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditUserWallet', {
                            data: singleuser.walletOne,
                            forwallet: 'one',
                            singleuserdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(25),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}>
                            Total Balance
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser.walletOne?.walletName}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Ionicons
                                name={'wallet'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              {roundToInteger(singleuser?.walletOne?.balance)}
                              <Text
                                style={{fontSize: heightPercentageToDP(1.5)}}>
                                {singleuser?.country?.countrycurrencysymbol}
                              </Text>
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate('EditUserWallet', {
                        //     data: singleuser.walletOne,
                        //     forwallet: 'one',
                        //   })
                        // }
                        style={{
                          height: heightPercentageToDP(25),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}>
                            Total Balance
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser.walletOne?.walletName}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Ionicons
                                name={'wallet'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              {roundToInteger(singleuser?.walletOne?.balance)}
                              <Text
                                style={{fontSize: heightPercentageToDP(1.5)}}>
                                {singleuser?.country?.countrycurrencysymbol}
                              </Text>
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {/** User Id  */}

                    {user && user.role === 'admin' ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ChangeUserId', {
                            userdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(20),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(2),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            Change User Id
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser?.userId}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Entypo
                                name={'user'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              User Id
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : user &&
                      user.role === 'subadmin' &&
                      user.subadminfeature.useridedit ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ChangeUserId', {
                            userdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(20),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(2),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            Change User Id
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser?.userId}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Entypo
                                name={'user'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              User Id
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate('ChangeUserId', {
                        //     userdata: singleuser,
                        //   })
                        // }
                        style={{
                          height: heightPercentageToDP(20),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(2),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            Change User Id
                          </Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(3),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            {singleuser?.userId}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Entypo
                                name={'user'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              User Id
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {/** Single User NOTIFICATION */}

                    {user && user.role === 'admin' ? (
                      <TouchableOpacity
                        onPress={() =>
                          // Toast.show({
                          //   type: 'info',
                          //   text1: 'Comming soon'
                          // })
                          navigation.navigate('CreateNotification', {
                            userdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(20),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}></Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(2),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            Push Notification
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Entypo
                                name={'user'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              Notification
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <Ionicons
                            name={'notifications'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : user &&
                      user.role === 'subadmin' &&
                      user.subadminfeature.notificationsend ? (
                      <TouchableOpacity
                        onPress={() =>
                          // Toast.show({
                          //   type: 'info',
                          //   text1: 'Comming soon'
                          // })
                          navigation.navigate('CreateNotification', {
                            userdata: singleuser,
                          })
                        }
                        style={{
                          height: heightPercentageToDP(20),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          margin: heightPercentageToDP(2),
                        }}>
                        <View
                          style={{
                            padding: heightPercentageToDP(2),
                          }}>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              width: widthPercentageToDP(25),
                              marginStart: heightPercentageToDP(-1),
                              textAlignVertical: 'bottom',
                            }}></Text>
                          <Text
                            style={{
                              marginStart: heightPercentageToDP(1),
                              flex: 1,
                              fontFamily: FONT.Montserrat_Regular,
                              color: COLORS.darkGray,
                              fontSize: heightPercentageToDP(2),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            Push Notification
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              gap: heightPercentageToDP(1),
                              marginStart: heightPercentageToDP(-1),
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                                justifyContent: 'center',
                              }}>
                              <Entypo
                                name={'user'}
                                size={heightPercentageToDP(4)}
                                color={COLORS.darkGray}
                              />
                            </View>
                            <GradientText
                              style={{
                                ...styles.textStyle,
                                width: widthPercentageToDP(60),
                              }}>
                              Notification
                            </GradientText>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            right: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(1),
                            padding: heightPercentageToDP(1),
                            top: heightPercentageToDP(2),
                          }}>
                          <Ionicons
                            name={'notifications'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : null}

                    {/** PLAY HISTORY */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PlayHistory', {
                          userdata: singleuser,
                        })
                      }
                      style={{
                        height: heightPercentageToDP(20),
                        flexDirection: 'row',
                        backgroundColor: COLORS.grayBg,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                        margin: heightPercentageToDP(2),
                      }}>
                      <View
                        style={{
                          padding: heightPercentageToDP(2),
                        }}>
                        <Text
                          style={{
                            marginStart: heightPercentageToDP(1),
                            flex: 1,
                            fontFamily: FONT.Montserrat_Regular,
                            color: COLORS.darkGray,
                            width: widthPercentageToDP(25),
                            marginStart: heightPercentageToDP(-1),
                            textAlignVertical: 'bottom',
                          }}></Text>
                        <Text
                          style={{
                            marginStart: heightPercentageToDP(1),
                            flex: 1,
                            fontFamily: FONT.Montserrat_Regular,
                            color: COLORS.darkGray,
                            fontSize: heightPercentageToDP(2),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          User's play history
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: heightPercentageToDP(1),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          <View
                            style={{
                              backgroundColor: COLORS.white_s,
                              padding: heightPercentageToDP(1),
                              borderRadius: heightPercentageToDP(1),
                              justifyContent: 'center',
                            }}>
                            <Entypo
                              name={'user'}
                              size={heightPercentageToDP(4)}
                              color={COLORS.darkGray}
                            />
                          </View>
                          <GradientText
                            style={{
                              ...styles.textStyle,
                              width: widthPercentageToDP(60),
                            }}>
                            Play History
                          </GradientText>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.white,
                          position: 'absolute',
                          right: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          padding: heightPercentageToDP(1),
                          top: heightPercentageToDP(2),
                        }}>
                        <MaterialCommunityIcons
                          name={'play-circle-outline'}
                          size={heightPercentageToDP(4)}
                          color={COLORS.darkGray}
                        />
                      </View>
                    </TouchableOpacity>

                    {/** HISTORY */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('History', {
                          userdata: singleuser,
                        })
                      }
                      style={{
                        height: heightPercentageToDP(20),
                        flexDirection: 'row',
                        backgroundColor: COLORS.grayBg,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                        margin: heightPercentageToDP(2),
                      }}>
                      <View
                        style={{
                          padding: heightPercentageToDP(2),
                        }}>
                        <Text
                          style={{
                            marginStart: heightPercentageToDP(1),
                            flex: 1,
                            fontFamily: FONT.Montserrat_Regular,
                            color: COLORS.darkGray,
                            width: widthPercentageToDP(25),
                            marginStart: heightPercentageToDP(-1),
                            textAlignVertical: 'bottom',
                          }}></Text>
                        <Text
                          style={{
                            marginStart: heightPercentageToDP(1),
                            flex: 1,
                            fontFamily: FONT.Montserrat_Regular,
                            color: COLORS.darkGray,
                            fontSize: heightPercentageToDP(2),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          User's transaction history
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: heightPercentageToDP(1),
                            marginStart: heightPercentageToDP(-1),
                          }}>
                          <View
                            style={{
                              backgroundColor: COLORS.white_s,
                              padding: heightPercentageToDP(1),
                              borderRadius: heightPercentageToDP(1),
                              justifyContent: 'center',
                            }}>
                            <Entypo
                              name={'user'}
                              size={heightPercentageToDP(4)}
                              color={COLORS.darkGray}
                            />
                          </View>
                          <GradientText
                            style={{
                              ...styles.textStyle,
                              width: widthPercentageToDP(60),
                            }}>
                            Transaction
                          </GradientText>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.white,
                          position: 'absolute',
                          right: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          padding: heightPercentageToDP(1),
                          top: heightPercentageToDP(2),
                        }}>
                        <MaterialCommunityIcons
                          name={'history'}
                          size={heightPercentageToDP(4)}
                          color={COLORS.darkGray}
                        />
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                )}
              </View>
            </ImageBackground>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default BSUserDetails;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
  textStyleEmail: {
    fontSize: heightPercentageToDP(2),
    fontFamily: FONT.Montserrat_Bold,
  },
});
