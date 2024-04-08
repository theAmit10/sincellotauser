import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONT } from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ProfileBackground from '../components/background/ProfileBackground';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Wallet from '../components/home/Wallet';
import { Consumer } from 'react-native-paper/lib/typescript/core/settings';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfile, logout } from '../redux/actions/userAction';
import { useMessageAndErrorUser } from '../utils/hooks';
import Loading from '../components/helpercComponent/Loading';
import { HOVER } from 'nativewind/dist/utils/selector';
import LinearGradient from 'react-native-linear-gradient';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';


const UpdateProfile = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  // const [email, setEmail] = useState('');

  const { user, accesstoken, loading } = useSelector(state => state.user);


  useMessageAndErrorUser(navigation, dispatch, "Login")

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(loadProfile(accesstoken))
  },[isFocused])


  const logoutHandler = () => {

    Toast.show({
      type: 'success',
      text1: 'Please wait... logging off',
    });

    dispatch(logout())
  };

  

  const ChangePasswordHandler = () => {

    Toast.show({
      type: 'success',
      text1: 'change password precessing',
    });
  };


  const [showProgressBar,setProgressBar] = useState(false); 

  const updateProfileHandler  = async () => {
    if (!name) {
     Toast.show({
       type: 'error',
       text1: 'Please enter your name',
     });
     
   } else {
     setProgressBar(true);

     try {
  
       const {data} = await axios.put(
        UrlHelper.UPDATE_USER_PROFILE_API,
        {
          name: name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      console.log("datat :: "+data)

      dispatch(loadProfile(accesstoken))
      
       Toast.show({
         type: 'success',
         text1: data.message,
       });
       setProgressBar(false);
       navigation.goBack();
     } catch (error) {
      setProgressBar(false);
       Toast.show({
         type: 'error',
         text1: 'Something went wrong',
       });
       console.log(error);

     }
   }
 };









  return (
    <View style={{ flex: 1 }}>


      <ProfileBackground />


      {/** Profile Cointainer */}

      <View style={{
        backgroundColor: COLORS.white_s,
        margin: heightPercentageToDP(2),
        borderRadius: heightPercentageToDP(1),
        paddingStart: heightPercentageToDP(1)
      }}>

        <GradientText style={{
          fontSize: heightPercentageToDP(3.5),
          fontFamily: FONT.Montserrat_Bold,
        }}>Update</GradientText>

        <GradientText style={{
          fontSize: heightPercentageToDP(3.5),
          fontFamily: FONT.Montserrat_Bold,
        }}>Profile</GradientText>

      </View>



      <View
        style={{
          height: heightPercentageToDP(42),
          width: widthPercentageToDP(100),
          backgroundColor: COLORS.white_s,
          borderTopLeftRadius: heightPercentageToDP(5),
          borderTopRightRadius: heightPercentageToDP(5),
          elevation: heightPercentageToDP(3)
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



        {/** Profile Main Container */}
        <View
          style={{
            flex: 2,
            margin: heightPercentageToDP(2),
          }}>
          <View
            style={{

              paddingVertical: heightPercentageToDP(2),
            }}>


            {/** Change name container */}


            <View
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
             
              <TextInput
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.darkGray,
                }}
                placeholder="Name"
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

           
            {/** Update Profile container */}

            <TouchableOpacity
            onPress={() => navigation.navigate("UploadProfilePicture")}
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
                Profile Picture
              </Text>

              <Ionicons
                name={'chevron-forward-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.white}
              />
            </TouchableOpacity>



            {/** Bottom Submit Container */}

            <View
              style={{
                marginBottom: heightPercentageToDP(5),
                marginTop: heightPercentageToDP(2),
              }}>
              {showProgressBar ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  onPress={updateProfileHandler}
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
                    Submit
                  </Text>
                </TouchableOpacity>
              )}
            </View>

        

          </View>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;

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

