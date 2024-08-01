import { Image, ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONT } from '../../../assets/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import GradientText from '../helpercComponent/GradientText';
import { useDispatch, useSelector } from 'react-redux';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { loadProfile } from '../../redux/actions/userAction';
import { serverName } from '../../redux/store';

const UserProfileBackground = ({userdata}) => {
  const navigation = useNavigation();
  const user = userdata;
  const [imageSource, setImageSource] = useState(require('../../../assets/image/dark_user.png'));

 
  return (
    <View
      style={{
        flex: 1,
      }}>
      {/** Top View Rectangle View */}

      <ImageBackground
        source={require('../../../assets/image/tlwbg.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}>
           <View
        style={{
          width: heightPercentageToDP(30),
          height: heightPercentageToDP(30),
          backgroundColor: COLORS.grayHalfBg,
          position: 'absolute',
          borderRadius: heightPercentageToDP(5),
          zIndex: 1,
          top: heightPercentageToDP(6),
          left: widthPercentageToDP(20),
          elevation: heightPercentageToDP(1)
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
            top: heightPercentageToDP(-4),
            left: heightPercentageToDP(4),
          }}>
          

          {user?.avatar?.url ? (
            <Image
              source={{uri: `${serverName}/uploads/${user?.avatar.url}`}}
              resizeMode="cover"
              style={{
                height: heightPercentageToDP(20),
              width: heightPercentageToDP(20),
              }}
            />
          ) : (
            <Image
              source={imageSource}
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
            marginTop: heightPercentageToDP(14)
          }}>
            {/** name */}
          <GradientText style={{...styles.textStyle}}>{user? user.name: ""}</GradientText>
            {/** email */}
          <GradientText style={styles.textStyleEmail}>
          {user? user.email: ""}
          </GradientText>
            {/** contact */}
           {
             user && user.contact != user.userId ? (<GradientText style={styles.textStyleEmail}>
              {user? user.contact: ""}
              </GradientText>) : (null)
           }

            {/* {
             user && user?.contact ? (<GradientText style={styles.textStyleEmail}>
              {user? user.contact: ""}
              </GradientText>) : (null)
           } */}
          
          
          <GradientText style={styles.textStyleEmail}>
            User ID - {user ? user.userId : ''}
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


        </ImageBackground>
     
    </View>
  );
};

export default UserProfileBackground;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color:COLORS.darkGray,
  },
  textStyleEmail: {
    fontSize: heightPercentageToDP(2),
    fontFamily: FONT.Montserrat_Bold,
    color:COLORS.darkGray,
  },
});
