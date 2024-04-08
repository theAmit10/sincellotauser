import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import GradientText from '../components/helpercComponent/GradientText';
import {COLORS, FONT} from '../../assets/constants';
import {serverName} from '../redux/store';
import Wallet from '../components/home/Wallet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetails = ({route}) => {
  const navigation = useNavigation();

  const {userdata} = route.params;

  console.log('Users Detials :: ' + JSON.stringify(userdata));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white_s,
      }}>
      {/** Top View Rectangle View */}
      <View
        style={{
          width: heightPercentageToDP(30),
          height: heightPercentageToDP(30),
          backgroundColor: COLORS.grayHalfBg,
          position: 'absolute',
          borderRadius: heightPercentageToDP(5),
          zIndex: 1,
          top: heightPercentageToDP(10),
          left: widthPercentageToDP(20),
          elevation: heightPercentageToDP(1),
        }}>
        {/** User Profile Image */}
        <TouchableOpacity
          style={{
            borderRadius: 100,
            overflow: 'hidden',
            width: heightPercentageToDP(20),
            height: heightPercentageToDP(20),
            zIndex: 2,
            position: 'absolute',
            top: heightPercentageToDP(-2),
            left: heightPercentageToDP(4),
          }}>
          {userdata.avatar?.url ? (
            <Image
              source={{uri: `${serverName}/uploads/${userdata.avatar.url}`}}
              resizeMode="cover"
              style={{
                height: heightPercentageToDP(20),
                width: heightPercentageToDP(20),
              }}
            />
          ) : (
            <Image
              source={require('../../assets/image/dark_user.png')}
              resizeMode="cover"
              style={{
                height: heightPercentageToDP(20),
                width: heightPercentageToDP(20),
              }}
            />
          )}
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            zIndex: 3,
            alignSelf: 'stretch',
            marginTop: heightPercentageToDP(14),
          }}>
          <GradientText style={{...styles.textStyle}}>
            {userdata ? userdata.name : ''}
          </GradientText>
          <GradientText style={styles.textStyleEmail}>
            {userdata ? userdata.email : ''}
          </GradientText>
        </View>

        {/** Username */}

        {/** Email */}

        <View
          style={{
            width: heightPercentageToDP(15),
            height: heightPercentageToDP(30),
            backgroundColor: COLORS.grayHalfBg,
            position: 'absolute',
            zIndex: 1,
            borderTopLeftRadius: heightPercentageToDP(5),
            borderBottomLeftRadius: heightPercentageToDP(5),
          }}></View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.profileDarkGray,
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(30),
          opacity: 80,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-md p-2"
          style={{
            backgroundColor: COLORS.white_s,
            width: widthPercentageToDP(10),
            margin: heightPercentageToDP(2),
          }}>
          <Ionicons
            name={'chevron-back'}
            size={heightPercentageToDP(3)}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <View
          className="rounded-full h-5 w-5"
          style={{
            margin: heightPercentageToDP(3),
            backgroundColor: COLORS.background,
          }}></View>
      </View>

      <View
        style={{
          height: heightPercentageToDP(15),
          backgroundColor: COLORS.grayHalfBg,
        }}></View>

      {/** Wallet One */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditUserWallet', {data: userdata.walletOne, forwallet: 'one'})
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
              {userdata.walletOne?.walletName}
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
                style={{...styles.textStyle, width: widthPercentageToDP(60)}}>
                ₹ {userdata.walletOne?.balance}
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

        {/** Wallet Two */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditUserWallet', {data: userdata.walletTwo, forwallet : 'two'})
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
              {userdata.walletTwo?.walletName}
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
                style={{...styles.textStyle, width: widthPercentageToDP(60)}}>
                ₹ {userdata.walletTwo?.balance}
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
      </ScrollView>
    </View>
  );
};

export default UserDetails;

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
