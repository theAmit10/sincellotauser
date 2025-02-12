import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import AdminBackground from '../components/background/AdminBackground';
import {
  loadAllOneDayUser,
  loadAllUsers,
  loadProfile,
  logout,
} from '../redux/actions/userAction';
import {getAllResult} from '../redux/actions/resultAction';
import {getAllLocations} from '../redux/actions/locationAction';
import {useMessageAndErrorUser} from '../utils/hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientText from '../components/helpercComponent/GradientText';
import Loading from '../components/helpercComponent/Loading';
import {
  useGetAllPlayHomeQuery,
  useGetAllSubAdminQuery,
} from '../helper/Networkcall';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user, accesstoken, allusers, loading, allonedayusers, error} =
    useSelector(state => state.user);
  const {locations} = useSelector(state => state.location);
  const {results} = useSelector(state => state.result);

  const {
    isLoading,
    data: allSubAdmin,
    isError,
    refetch,
  } = useGetAllSubAdminQuery(accesstoken);

  const {isLoading: allPlayIsLoading, data: allPlay} =
    useGetAllPlayHomeQuery(accesstoken);

  const isFocused = useIsFocused();
  const [retrying, setRetrying] = useState(false); // State to manage retrying

  // Fetch data from API
  const fetchData = () => {
    setRetrying(true);
    dispatch(loadProfile(accesstoken));
    dispatch(loadAllUsers(accesstoken));
    dispatch(getAllLocations(accesstoken));
    dispatch(getAllResult(accesstoken));
    dispatch(loadAllOneDayUser(accesstoken));
    refetch();
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
    if (error) {
      console.log('TA Error found :: ' + error);
    }
  }, [dispatch, isFocused]);

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <AdminBackground />

      {/** Main Cointainer */}

      <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', zIndex: 2}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(68),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(68),
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

            {/** Content Container */}

            {loading ? ( // Show loading indicator while data is being fetched
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Loading />
              </View>
            ) : (
              <View style={{flex: 1}}>
                {/* Profile Container */}
                {user && (
                  <View style={styles.profileContainer}>
                    {/* Other components */}

                    <View
                      style={{
                        height: heightPercentageToDP(68),
                        width: widthPercentageToDP(100),
                        elevation: heightPercentageToDP(3),
                      }}>
                      {/** Admin Main Container */}
                      <View
                        style={{
                          flex: 2,
                          marginHorizontal: heightPercentageToDP(2),
                        }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <View
                            style={{
                              paddingVertical: heightPercentageToDP(2),
                              gap: heightPercentageToDP(2),
                            }}>
                            {/** PARTNER container */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('PartnerDashboard')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Partner
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(25),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Partners data
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
                                      {/* {allusers.length} */}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.users ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('PartnerDashboard')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Partners
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(25),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All partner data
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      flex: 2,
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      gap: heightPercentageToDP(1),
                                    }}>
                                    {/* <GradientText style={{...styles.textStyle}}>
                                      {allusers.length}
                                    </GradientText> */}

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** POWEBALL container */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('PowerballDashboard')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Powerball
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(25),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Powerball data
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
                                      {/* {allusers.length} */}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.users ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('PowerballDashboard')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Powerball
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(25),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Powerball data
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      flex: 2,
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      gap: heightPercentageToDP(1),
                                    }}>
                                    {/* <GradientText style={{...styles.textStyle}}>
                                      {allusers.length}
                                    </GradientText> */}

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** All users container */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() => navigation.navigate('AllUsers')}>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.users ? (
                              <TouchableOpacity
                                onPress={() => navigation.navigate('AllUsers')}>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** PLAYZONE */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('PlayArenaLocation')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Play
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
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
                                    <GradientText style={{...styles.textStyle}}>
                                      {allPlay?.plays.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'play-circle-outline'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.play ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('PlayArenaLocation')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Play
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
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
                                    <GradientText style={{...styles.textStyle}}>
                                      {allPlay?.plays.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'play-circle-outline'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** DEPOSIT */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllDeposit')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Deposit
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All deposit data
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
                                      {/* {allPlay?.plays.length} */}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <Entypo
                                        name={'database'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.deposits ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllDeposit')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Deposit
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All deposit data
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
                                      {/* {allPlay?.plays.length} */}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <Entypo
                                        name={'database'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** All Result container */}
                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllResult')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                    <GradientText style={{...styles.textStyle}}>
                                      {results.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'trophy-variant-outline'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.results ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllResult')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                    <GradientText style={{...styles.textStyle}}>
                                      {results.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'trophy-variant-outline'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** All Locations container */}
                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() => navigation.navigate('Search')}>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                    <GradientText style={{...styles.textStyle}}>
                                      {locations.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <Entypo
                                        name={'location'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.alllocation ? (
                              <TouchableOpacity
                                onPress={() => navigation.navigate('Search')}>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                    <GradientText style={{...styles.textStyle}}>
                                      {locations.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <Entypo
                                        name={'location'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** WITHDRAW */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllWithdraw')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Withdraw
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All withdraw data
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
                                      {/* {allPlay?.plays.length} */}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <Entypo
                                        name={'database'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.withdraws ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllWithdraw')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All Withdraw
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      All withdraw data
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
                                      {/* {allPlay?.plays.length} */}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <Entypo
                                        name={'database'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** All new register users container */}

                            {user && user.role === 'admin' ? (
                              <TouchableOpacity
                                onPress={() => navigation.navigate('NewUser')}>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : user &&
                              user.role === 'subadmin' &&
                              user.subadminfeature.users ? (
                              <TouchableOpacity
                                onPress={() => navigation.navigate('NewUser')}>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
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
                                        color: COLORS.black,
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
                                        color: COLORS.black,
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
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}

                            {/** SUB ADMIN */}

                            {user && user.role === 'admin' && !isLoading ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('AllSubAdmin')
                                }>
                                <LinearGradient
                                  colors={[
                                    COLORS.time_firstblue,
                                    COLORS.time_secondbluw,
                                  ]}
                                  start={{x: 0, y: 0}} // start from left
                                  end={{x: 1, y: 0}} // end at right
                                  style={{
                                    height: heightPercentageToDP(15),
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.gray2,
                                    alignItems: 'center',
                                    paddingHorizontal: heightPercentageToDP(2),
                                    borderRadius: heightPercentageToDP(1),
                                    marginBottom: heightPercentageToDP(5),
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
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(4),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Sub Admin
                                    </Text>

                                    <Text
                                      style={{
                                        marginStart: heightPercentageToDP(1),
                                        flex: 1,
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        width: widthPercentageToDP(50),
                                        marginStart: heightPercentageToDP(-1),
                                      }}>
                                      Total Number Of Sub Admin
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
                                      {allSubAdmin?.users?.length}
                                    </GradientText>

                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'account'}
                                        size={heightPercentageToDP(4)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  </View>
                                </LinearGradient>
                              </TouchableOpacity>
                            ) : null}
                          </View>
                        </ScrollView>
                      </View>
                    </View>

                    {/* Add your existing UI components here */}
                  </View>
                )}

                {/* Retry Section */}
                {!user &&
                  retrying && ( // Show retry section only when retrying
                    <View
                      style={{
                        height: heightPercentageToDP(30),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: COLORS.white_s,
                          fontFamily: FONT.Montserrat_SemiBold,
                        }}>
                        There was an issue fetching the data.
                      </Text>
                      <TouchableOpacity
                        onPress={fetchData}
                        style={styles.retryButton}>
                        <Text
                          style={{
                            color: COLORS.white_s,
                            fontFamily: FONT.Montserrat_SemiBold,
                          }}>
                          Retry
                        </Text>
                      </TouchableOpacity>

                      {/** Logout container */}
                      <TouchableOpacity
                        onPress={logoutHandler}
                        style={{
                          height: heightPercentageToDP(7),
                          flexDirection: 'row',
                          backgroundColor: COLORS.grayBg,
                          alignItems: 'center',
                          paddingHorizontal: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          marginTop: heightPercentageToDP(2),
                          marginHorizontal: heightPercentageToDP(2),
                        }}>
                        <LinearGradient
                          colors={[COLORS.lightWhite, COLORS.white_s]}
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
                    </View>
                  )}
              </View>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: heightPercentageToDP(20),
  },
  item: {
    padding: heightPercentageToDP(2),
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigation, useIsFocused} from '@react-navigation/native';
// import {
//   loadAllOneDayUser,
//   loadAllUsers,
//   loadProfile,
//   logout,
// } from '../redux/actions/userAction';
// import {getAllResult} from '../redux/actions/resultAction';
// import {getAllLocations} from '../redux/actions/locationAction';
// import {useMessageAndErrorUser} from '../utils/hooks';
// import Loading from '../components/helpercComponent/Loading';
// import AdminBackground from '../components/background/AdminBackground';
// import {COLORS, FONT} from '../../assets/constants';
// import GradientText from '../components/helpercComponent/GradientText';
// import LinearGradient from 'react-native-linear-gradient';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const AdminDashboard = () => {
//   const navigation = useNavigation();
// const dispatch = useDispatch();

// const {user, accesstoken, allusers, loading, allonedayusers, error} =
//   useSelector(state => state.user);
// const {locations} = useSelector(state => state.location);
// const {results} = useSelector(state => state.result);

// const isFocused = useIsFocused();
// const [retrying, setRetrying] = useState(false); // State to manage retrying

// // Fetch data from API
// const fetchData = () => {
//   setRetrying(true);
//   dispatch(loadProfile(accesstoken));
//   dispatch(loadAllUsers(accesstoken));
//   dispatch(getAllLocations(accesstoken));
//   dispatch(getAllResult(accesstoken));
//   dispatch(loadAllOneDayUser(accesstoken));
// };

// useEffect(() => {
//   fetchData(); // Initial data fetch
//   if (error) {
//     console.log('TA Error found :: ' + error);
//   }
// }, [dispatch, isFocused]);

// useMessageAndErrorUser(navigation, dispatch, 'Login');

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

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <AdminBackground />
//       {loading ? ( // Show loading indicator while data is being fetched
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Loading />
//         </View>
//       ) : (
//         <View style={{flex: 1}}>
//           {/* Profile Container */}
//           {user && (
//             <View style={styles.profileContainer}>
//               {/* Other components */}

//               <View
//                 style={{
//                   height: heightPercentageToDP(55),
//                   width: widthPercentageToDP(100),
//                   backgroundColor: COLORS.white_s,
//                   elevation: heightPercentageToDP(3),
//                 }}>
//                 {/** Admin Main Container */}
//                 <View
//                   style={{
//                     flex: 2,
//                     margin: heightPercentageToDP(2),
//                   }}>
//                   <ScrollView showsVerticalScrollIndicator={false}>
//                     <View
//                       style={{
//                         paddingVertical: heightPercentageToDP(2),
//                         gap: heightPercentageToDP(2),
//                       }}>
//                       {/** All users container */}

//                       {user && user.role === 'admin' ? (
//                         <TouchableOpacity
//                           onPress={() => navigation.navigate('AllUsers')}
//                           style={{
//                             height: heightPercentageToDP(15),
//                             flexDirection: 'row',
//                             backgroundColor: COLORS.gray2,
//                             alignItems: 'center',
//                             paddingHorizontal: heightPercentageToDP(2),
//                             borderRadius: heightPercentageToDP(1),
//                           }}>
//                           <View
//                             style={{
//                               padding: heightPercentageToDP(2),
//                             }}>
//                             <Text
//                               style={{
//                                 marginStart: heightPercentageToDP(1),
//                                 flex: 1,
//                                 fontFamily: FONT.Montserrat_SemiBold,
//                                 color: COLORS.darkGray,
//                                 fontSize: heightPercentageToDP(4),
//                                 marginStart: heightPercentageToDP(-1),
//                               }}>
//                               Users
//                             </Text>

//                             <Text
//                               style={{
//                                 marginStart: heightPercentageToDP(1),
//                                 flex: 1,
//                                 fontFamily: FONT.Montserrat_Regular,
//                                 color: COLORS.darkGray,
//                                 width: widthPercentageToDP(25),
//                                 marginStart: heightPercentageToDP(-1),
//                               }}>
//                               Total Number Of Users
//                             </Text>
//                           </View>

//                           <View
//                             style={{
//                               flex: 2,
//                               flexDirection: 'row',
//                               justifyContent: 'flex-end',
//                               gap: heightPercentageToDP(1),
//                             }}>
//                             <GradientText style={{...styles.textStyle}}>
//                               {allusers.length}
//                             </GradientText>

//                             <LinearGradient
//                               colors={[COLORS.lightWhite, COLORS.white_s]}
//                               className="rounded-xl p-1">
//                               <MaterialCommunityIcons
//                                 name={'account'}
//                                 size={heightPercentageToDP(4)}
//                                 color={COLORS.gray2}
//                               />
//                             </LinearGradient>
//                           </View>
//                         </TouchableOpacity>
//                       ) : null}

//                       {/** All Locations container */}
//                       <TouchableOpacity
//                         onPress={() => navigation.navigate('Search')}
//                         style={{
//                           height: heightPercentageToDP(15),
//                           flexDirection: 'row',
//                           backgroundColor: COLORS.gray2,
//                           alignItems: 'center',
//                           paddingHorizontal: heightPercentageToDP(2),
//                           borderRadius: heightPercentageToDP(1),
//                         }}>
//                         <View
//                           style={{
//                             padding: heightPercentageToDP(2),
//                           }}>
//                           <Text
//                             style={{
//                               marginStart: heightPercentageToDP(1),
//                               flex: 1,
//                               fontFamily: FONT.Montserrat_SemiBold,
//                               color: COLORS.darkGray,
//                               fontSize: heightPercentageToDP(4),
//                               marginStart: heightPercentageToDP(-1),
//                             }}>
//                             Location
//                           </Text>

//                           <Text
//                             style={{
//                               marginStart: heightPercentageToDP(1),
//                               flex: 1,
//                               fontFamily: FONT.Montserrat_Regular,
//                               color: COLORS.darkGray,
//                               width: widthPercentageToDP(25),
//                               marginStart: heightPercentageToDP(-1),
//                             }}>
//                             Total Number Of Location
//                           </Text>
//                         </View>

//                         <View
//                           style={{
//                             flex: 2,
//                             flexDirection: 'row',
//                             justifyContent: 'flex-end',
//                             gap: heightPercentageToDP(1),
//                           }}>
//                           <GradientText style={{...styles.textStyle}}>
//                             {locations.length}
//                           </GradientText>

//                           <LinearGradient
//                             colors={[COLORS.lightWhite, COLORS.white_s]}
//                             className="rounded-xl p-1">
//                             <Entypo
//                               name={'location'}
//                               size={heightPercentageToDP(4)}
//                               color={COLORS.gray2}
//                             />
//                           </LinearGradient>
//                         </View>
//                       </TouchableOpacity>

//                       {/** All Result container */}
//                       <TouchableOpacity
//                         onPress={() => navigation.navigate('AllResult')}
//                         style={{
//                           height: heightPercentageToDP(15),
//                           flexDirection: 'row',
//                           backgroundColor: COLORS.gray2,
//                           alignItems: 'center',
//                           paddingHorizontal: heightPercentageToDP(2),
//                           borderRadius: heightPercentageToDP(1),
//                         }}>
//                         <View
//                           style={{
//                             padding: heightPercentageToDP(2),
//                           }}>
//                           <Text
//                             style={{
//                               marginStart: heightPercentageToDP(1),
//                               flex: 1,
//                               fontFamily: FONT.Montserrat_SemiBold,
//                               color: COLORS.darkGray,
//                               fontSize: heightPercentageToDP(4),
//                               marginStart: heightPercentageToDP(-1),
//                             }}>
//                             Results
//                           </Text>

//                           <Text
//                             style={{
//                               marginStart: heightPercentageToDP(1),
//                               flex: 1,
//                               fontFamily: FONT.Montserrat_Regular,
//                               color: COLORS.darkGray,
//                               width: widthPercentageToDP(25),
//                               marginStart: heightPercentageToDP(-1),
//                             }}>
//                             Total Number Of Result
//                           </Text>
//                         </View>

//                         <View
//                           style={{
//                             flex: 2,
//                             flexDirection: 'row',
//                             justifyContent: 'flex-end',
//                             gap: heightPercentageToDP(1),
//                           }}>
//                           <GradientText style={{...styles.textStyle}}>
//                             {results.length}
//                           </GradientText>

//                           <LinearGradient
//                             colors={[COLORS.lightWhite, COLORS.white_s]}
//                             className="rounded-xl p-1">
//                             <MaterialCommunityIcons
//                               name={'trophy-variant-outline'}
//                               size={heightPercentageToDP(4)}
//                               color={COLORS.gray2}
//                             />
//                           </LinearGradient>
//                         </View>
//                       </TouchableOpacity>

//                       {/** All new register users container */}

//                       {user && user.role === 'admin' ? (
//                         <TouchableOpacity
//                           onPress={() => navigation.navigate('NewUser')}
//                           style={{
//                             height: heightPercentageToDP(15),
//                             flexDirection: 'row',
//                             backgroundColor: COLORS.gray2,
//                             alignItems: 'center',
//                             paddingHorizontal: heightPercentageToDP(2),
//                             borderRadius: heightPercentageToDP(1),
//                             marginBottom: heightPercentageToDP(5)
//                           }}>
//                           <View
//                             style={{
//                               padding: heightPercentageToDP(2),
//                             }}>
//                             <Text
//                               style={{
//                                 marginStart: heightPercentageToDP(1),
//                                 flex: 1,
//                                 fontFamily: FONT.Montserrat_SemiBold,
//                                 color: COLORS.darkGray,
//                                 fontSize: heightPercentageToDP(4),
//                                 marginStart: heightPercentageToDP(-1),
//                               }}>
//                               New Users
//                             </Text>

//                             <Text
//                               style={{
//                                 marginStart: heightPercentageToDP(1),
//                                 flex: 1,
//                                 fontFamily: FONT.Montserrat_Regular,
//                                 color: COLORS.darkGray,
//                                 width: widthPercentageToDP(50),
//                                 marginStart: heightPercentageToDP(-1),
//                               }}>
//                               Total Number Of Users Register in Last 24h
//                             </Text>
//                           </View>

//                           <View
//                             style={{
//                               flex: 2,
//                               flexDirection: 'row',
//                               justifyContent: 'flex-end',
//                               gap: heightPercentageToDP(1),
//                             }}>
//                             <GradientText style={{...styles.textStyle}}>
//                               {allonedayusers.length}
//                             </GradientText>

//                             <LinearGradient
//                               colors={[COLORS.lightWhite, COLORS.white_s]}
//                               className="rounded-xl p-1">
//                               <MaterialCommunityIcons
//                                 name={'account'}
//                                 size={heightPercentageToDP(4)}
//                                 color={COLORS.gray2}
//                               />
//                             </LinearGradient>
//                           </View>
//                         </TouchableOpacity>
//                       ) : null}
//                     </View>
//                   </ScrollView>
//                 </View>
//               </View>

//               {/* Add your existing UI components here */}
//             </View>
//           )}

//           {/* Retry Section */}
//           {!user &&
//             retrying && ( // Show retry section only when retrying
//               <View style={styles.retryContainer}>
//                 <Text style={styles.retryText}>
//                   There was an issue fetching the data.
//                 </Text>
//                 <TouchableOpacity
//                   onPress={fetchData}
//                   style={styles.retryButton}>
//                   <Text style={styles.retryButtonText}>Retry</Text>
//                 </TouchableOpacity>

//                 {/** Logout container */}
//                 <TouchableOpacity
//                   onPress={logoutHandler}
//                   style={{
//                     height: heightPercentageToDP(7),
//                     flexDirection: 'row',
//                     backgroundColor: COLORS.grayBg,
//                     alignItems: 'center',
//                     paddingHorizontal: heightPercentageToDP(2),
//                     borderRadius: heightPercentageToDP(1),
//                     marginTop: heightPercentageToDP(2),
//                     marginHorizontal: heightPercentageToDP(2)
//                   }}>
//                   <LinearGradient
//                     colors={[COLORS.lightWhite, COLORS.white_s]}
//                     className="rounded-xl p-1">
//                     <AntDesign
//                       name={'logout'}
//                       size={heightPercentageToDP(3)}
//                       color={COLORS.darkGray}
//                     />
//                   </LinearGradient>

//                   <Text
//                     style={{
//                       marginStart: heightPercentageToDP(1),
//                       flex: 1,
//                       fontFamily: FONT.Montserrat_Regular,
//                       color: COLORS.black,
//                       fontSize: heightPercentageToDP(2),
//                     }}>
//                     Logout
//                   </Text>

//                   <Ionicons
//                     name={'chevron-forward-outline'}
//                     size={heightPercentageToDP(3)}
//                     color={COLORS.darkGray}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default AdminDashboard;

// const styles = StyleSheet.create({
//   profileContainer: {
//     flex: 1,
//   },
//   retryContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   retryText: {
//     fontFamily: FONT.Montserrat_Regular,
//     fontSize: heightPercentageToDP(2.5),
//     marginBottom: heightPercentageToDP(2),
//   },
//   retryButton: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: heightPercentageToDP(2),
//     paddingHorizontal: widthPercentageToDP(10),
//     borderRadius: heightPercentageToDP(2),
//   },
//   retryButtonText: {
//     fontFamily: FONT.Montserrat_Bold,
//     fontSize: heightPercentageToDP(2.5),
//     color: COLORS.white,
//   },
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//   },
//   textStyleEmail: {
//     fontSize: heightPercentageToDP(2),
//     fontFamily: FONT.Montserrat_Bold,
//   },
// });
