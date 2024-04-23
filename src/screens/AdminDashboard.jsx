
import {
  SafeAreaView,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch, useSelector} from 'react-redux';
import {loadAllOneDayUser, loadAllUsers, loadProfile, logout} from '../redux/actions/userAction';
import {useMessageAndErrorUser} from '../utils/hooks';
import AdminBackground from '../components/background/AdminBackground';
import LinearGradient from 'react-native-linear-gradient';
import { getAllResult } from '../redux/actions/resultAction';
import { getAllLocations } from '../redux/actions/locationAction';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user, accesstoken,allusers, loading,allonedayusers} = useSelector(state => state.user);
  const {locations} = useSelector(state => state.location);
  const {results} = useSelector(state => state.result);

  const isFocused = useIsFocused();
  // Getting User Profile

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
    dispatch(loadAllUsers(accesstoken))
    dispatch(getAllLocations(accesstoken))
    dispatch(getAllResult(accesstoken));
    dispatch(loadAllOneDayUser(accesstoken));
  }, [dispatch,isFocused]);

  useMessageAndErrorUser(navigation, dispatch, 'Login');



 

  return (
    <SafeAreaView style={{flex: 1}}>
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
                onPress={() => navigation.navigate('AllUsers')}
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
                    gap: heightPercentageToDP(1),
                  }}>
                  <GradientText style={{...styles.textStyle}}>
                    {allusers.length}
                  </GradientText>

                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialCommunityIcons
                      name={'account'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.gray2}
                    />
                  </LinearGradient>
                </View>
              </TouchableOpacity>

              {/** All Locations container */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
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
                    gap: heightPercentageToDP(1),
                  }}>
                  <GradientText style={{...styles.textStyle}}>{locations.length}</GradientText>

                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <Entypo
                      name={'location'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.gray2}
                    />
                  </LinearGradient>
                </View>
              </TouchableOpacity>

              {/** All Result container */}
              <TouchableOpacity
                onPress={() => navigation.navigate('AllResult')}
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
                    gap: heightPercentageToDP(1),
                  }}>
                  <GradientText style={{...styles.textStyle}}>{results.length}</GradientText>

                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialCommunityIcons
                      name={'trophy-variant-outline'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.gray2}
                    />
                  </LinearGradient>
                </View>
              </TouchableOpacity>


               {/** All new register users container */}

               <TouchableOpacity
                onPress={() => navigation.navigate('NewUser')}
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
                    New Users
                  </Text>

                  <Text
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_Regular,
                      color: COLORS.darkGray,
                      width: widthPercentageToDP(50),
                      marginStart: heightPercentageToDP(-1),
                    }}>
                    Total Number Of Users Register in Last 24h
                  </Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: heightPercentageToDP(1),
                  }}>
                  <GradientText style={{...styles.textStyle}}>
                    {allonedayusers.length}
                  </GradientText>

                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    className="rounded-xl p-1">
                    <MaterialCommunityIcons
                      name={'account'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.gray2}
                    />
                  </LinearGradient>
                </View>
              </TouchableOpacity>

             
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
