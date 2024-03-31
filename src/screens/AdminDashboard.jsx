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
import ProfileBackground from '../components/background/ProfileBackground';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Wallet from '../components/home/Wallet';
import {Consumer} from 'react-native-paper/lib/typescript/core/settings';
import {useDispatch, useSelector} from 'react-redux';
import {loadProfile, logout} from '../redux/actions/userAction';
import {useMessageAndErrorUser} from '../utils/hooks';
import Loading from '../components/helpercComponent/Loading';
import {HOVER} from 'nativewind/dist/utils/selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminBackground from '../components/background/AdminBackground';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user, accesstoken, loading} = useSelector(state => state.user);

  // Getting User Profile

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch]);

  useMessageAndErrorUser(navigation, dispatch, 'Login');

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

  const updateProfileHandler = () => {
    console.log('Updating profile');
    navigation.navigate('UpdateProfile');

    Toast.show({
      type: 'success',
      text1: 'Updating Profile',
    });
  };

  const ChangePasswordHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'change password precessing',
    });
  };

  return (
    <View style={{flex: 1}}>
      <AdminBackground />

      {/** Profile Cointainer */}

     

      <View
        style={{
          height: heightPercentageToDP(55),
          width: widthPercentageToDP(100),
          backgroundColor: COLORS.white_s,
          elevation: heightPercentageToDP(3),
        }}>
        {/** Admin Main Container */}
        <View
          style={{
            flex: 2,
            margin: heightPercentageToDP(2),
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingVertical: heightPercentageToDP(2),
                gap: heightPercentageToDP(2),
              }}>
              {/** All users container */}
              <TouchableOpacity
               onPress={() => navigation.navigate("AllUsers")}
                style={{
                  height: heightPercentageToDP(15),
                  flexDirection: 'row',
                  backgroundColor: COLORS.grayBg,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                <View
                  style={{
                    padding: heightPercentageToDP(2),
                  }}>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_SemiBold,
                      color: COLORS.darkGray,
                      fontSize: heightPercentageToDP(4),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Users
                  </Text>

                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      color: COLORS.darkGray,
                      width: widthPercentageToDP(25),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Total Number Of Users
                  </Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <GradientText style={{...styles.textStyle}}>
                    28383
                  </GradientText>
                  <MaterialCommunityIcons
                    name={'account'}
                    size={heightPercentageToDP(6)}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>

              {/** All Locations container */}
              <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
                style={{
                  height: heightPercentageToDP(15),
                  flexDirection: 'row',
                  backgroundColor: COLORS.grayBg,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                <View
                  style={{
                    padding: heightPercentageToDP(2),
                  }}>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_SemiBold,
                      color: COLORS.darkGray,
                      fontSize: heightPercentageToDP(4),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Location
                  </Text>

                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      color: COLORS.darkGray,
                      width: widthPercentageToDP(25),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Total Number Of Location
                  </Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <GradientText style={{...styles.textStyle}}>83</GradientText>
                  <Entypo
                    name={'location'}
                    size={heightPercentageToDP(5)}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>

               {/** All users container */}
               <TouchableOpacity
               onPress={() => navigation.navigate("AllUsers")}
                style={{
                  height: heightPercentageToDP(15),
                  flexDirection: 'row',
                  backgroundColor: COLORS.grayBg,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                <View
                  style={{
                    padding: heightPercentageToDP(2),
                  }}>
                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_SemiBold,
                      color: COLORS.darkGray,
                      fontSize: heightPercentageToDP(4),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Results
                  </Text>

                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      color: COLORS.darkGray,
                      width: widthPercentageToDP(25),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Total Number Of Result
                  </Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <GradientText style={{...styles.textStyle}}>
                    28
                  </GradientText>
                  <MaterialCommunityIcons
                    name={'trophy-variant-outline'}
                    size={heightPercentageToDP(6)}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>



            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AdminDashboard;

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

// {
//   loading ? (<Loading />) : (user && <>
//     <View
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'cyan'

//       }}>
//       <GradientText style={styles.textStyle}>Wasu</GradientText>
//       <GradientText style={styles.textStyleEmail}>
//         {user.email}
//       </GradientText>
//     </View>

//     <ScrollView
//       horizontal={true}
//       showsHorizontalScrollIndicator={false}>
//       <View style={{ margin: heightPercentageToDP(1), flexDirection:'row' }}>
//         <Wallet wallet={user.walletOne} />
//         <Wallet wallet={user.walletTwo} />
//       </View>

//     </ScrollView>

//   </>)
// }
