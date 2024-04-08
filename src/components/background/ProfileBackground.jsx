import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import GradientText from '../helpercComponent/GradientText';
import {useSelector} from 'react-redux';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {serverName} from '../../redux/store';
import Loading from '../helpercComponent/Loading';

const ProfileBackground = () => {
  const navigation = useNavigation();

  const {user, accesstoken, loading} = useSelector(state => state.user);
  const source = require('../../../assets/image/dark_user.png');

  useEffect(() => {
    console.log('Getting Profile');
    console.log('User Profile :: ' + JSON.stringify(user));
    // console.log('Profile Avatar :: ' + user.avatar);
  }, [loading]);

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
          {loading ? (
           <View style={{
            height: heightPercentageToDP(20),
            width: heightPercentageToDP(20),
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Loading/>
           </View>
          ) : user?.avatar ? (
            <Image
              source={{uri: `${serverName}uploads/${user?.avatar?.url}`}}
              resizeMode="cover"
              style={{
                height: heightPercentageToDP(20),
                width: heightPercentageToDP(20),
              }}
            />
          ) : (
            <Image
              source={source}
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
            {user ? user.name : ''}
          </GradientText>
          <GradientText style={styles.textStyleEmail}>
            {user ? user.email : ''}
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
    </View>
  );
};

export default ProfileBackground;

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
