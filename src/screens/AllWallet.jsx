import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import Loading from '../components/helpercComponent/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientText from '../components/helpercComponent/GradientText';
import {loadProfile} from '../redux/actions/userAction';

const AllWallet = () => {
  const navigation = useNavigation();

  const {user, accesstoken, allusers, loading} = useSelector(
    state => state.user,
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // Getting User Profile

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch, isFocused]);

  // const {userdata} = route.params;

  const userdata = {
    name: 'Wadu',
    email: 'wadu@gmail.com',
  };

  // console.log('Users Detials :: ' + JSON.stringify(userdata));

  return (
    <View style={{flex: 1}}>
      <Background />

      {/** Main Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(65),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(65),
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

            <View
              style={{
                margin: heightPercentageToDP(2),
              }}>
              <GradientTextWhite style={styles.textStyle}>
                Wallet Modification
              </GradientTextWhite>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: heightPercentageToDP(10),
                  }}>
                  <Loading />
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WalletModification', {
                        walletname: 'one',
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
                        }}>
                        Current Name
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
                          style={{
                            ...styles.textStyle,
                            width: widthPercentageToDP(60),
                          }}>
                          {user.walletOne?.walletName}
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
                      navigation.navigate('WalletModification', {
                        walletname: 'two',
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
                        }}>
                        Current Name
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
                          style={{
                            ...styles.textStyle,
                            width: widthPercentageToDP(60),
                          }}>
                          {user.walletTwo?.walletName}
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
                </>
              )}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default AllWallet;

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

// import {
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useIsFocused, useNavigation} from '@react-navigation/native';

// import {useDispatch, useSelector} from 'react-redux';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Toast from 'react-native-toast-message';
// import DocumentPicker from 'react-native-document-picker';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
// import GradientText from '../components/helpercComponent/GradientText';
// import {COLORS, FONT} from '../../assets/constants';
// import {serverName} from '../redux/store';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Loading from '../components/helpercComponent/Loading';
// import { loadProfile } from '../redux/actions/userAction';

// const AllWallet = () => {
//   const navigation = useNavigation();

//   const {user, accesstoken, allusers, loading} = useSelector(
//     state => state.user,
//   );

//   const isFocused = useIsFocused();
//   const dispatch = useDispatch();
//   // Getting User Profile

//   useEffect(() => {
//     dispatch(loadProfile(accesstoken));

//   }, [dispatch,isFocused]);

//   // const {userdata} = route.params;

//   const userdata = {
//     name: 'Wadu',
//     email: 'wadu@gmail.com',
//   };

//   // console.log('Users Detials :: ' + JSON.stringify(userdata));

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.white_s,
//       }}>
//       {/** Top View Rectangle View */}
//       <View
//         style={{
//           width: heightPercentageToDP(30),
//           height: heightPercentageToDP(30),
//           backgroundColor: COLORS.grayHalfBg,
//           position: 'absolute',
//           borderRadius: heightPercentageToDP(5),
//           zIndex: 1,
//           top: heightPercentageToDP(10),
//           left: widthPercentageToDP(20),
//           elevation: heightPercentageToDP(1),
//         }}>
//         {/** User Profile Image */}

//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'transparent',
//             zIndex: 3,
//             alignSelf: 'stretch',
//           }}>
//           <GradientText style={{...styles.textStyle}}>Wallet</GradientText>
//           <GradientText style={styles.textStyleEmail}>
//             Modification
//           </GradientText>
//         </View>

//         {/** Username */}

//         {/** Email */}

//         <View
//           style={{
//             width: heightPercentageToDP(15),
//             height: heightPercentageToDP(30),
//             backgroundColor: COLORS.grayHalfBg,
//             position: 'absolute',
//             zIndex: 1,
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderBottomLeftRadius: heightPercentageToDP(5),
//           }}></View>
//       </View>
//       <View
//         style={{
//           backgroundColor: COLORS.profileDarkGray,
//           width: widthPercentageToDP(100),
//           height: heightPercentageToDP(30),
//           opacity: 80,
//         }}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           className="rounded-md p-2"
//           style={{
//             backgroundColor: COLORS.white_s,
//             width: widthPercentageToDP(10),
//             margin: heightPercentageToDP(2),
//           }}>
//           <Ionicons
//             name={'chevron-back'}
//             size={heightPercentageToDP(3)}
//             color={COLORS.black}
//           />
//         </TouchableOpacity>

//         <View
//           className="rounded-full h-5 w-5"
//           style={{
//             margin: heightPercentageToDP(3),
//             backgroundColor: COLORS.background,
//           }}></View>
//       </View>

//       <View
//         style={{
//           height: heightPercentageToDP(15),
//           backgroundColor: COLORS.grayHalfBg,
//         }}></View>

//       {/** Wallet One */}

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {loading ? (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               paddingTop: heightPercentageToDP(10),
//             }}>
//             <Loading />
//           </View>
//         ) : (
//           <>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('WalletModification', {walletname: 'one'})
//               }
//               style={{
//                 height: heightPercentageToDP(20),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 margin: heightPercentageToDP(2),
//               }}>
//               <View
//                 style={{
//                   padding: heightPercentageToDP(2),
//                 }}>
//                 <Text
//                   style={{
//                     marginStart: heightPercentageToDP(1),
//                     flex: 1,
//                     fontFamily: FONT.Montserrat_Regular,
//                     color: COLORS.darkGray,
//                     width: widthPercentageToDP(25),
//                     marginStart: heightPercentageToDP(-1),
//                     textAlignVertical: 'bottom',
//                   }}>
//                   Current Name
//                 </Text>
//                 <Text
//                   style={{
//                     marginStart: heightPercentageToDP(1),
//                     flex: 1,
//                     fontFamily: FONT.Montserrat_SemiBold,
//                     color: COLORS.darkGray,
//                     fontSize: heightPercentageToDP(3),
//                     marginStart: heightPercentageToDP(-1),
//                   }}>
//                   {userdata.walletOne?.walletName}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'flex-end',
//                     gap: heightPercentageToDP(1),
//                     marginStart: heightPercentageToDP(-1),
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: COLORS.white_s,
//                       padding: heightPercentageToDP(1),
//                       borderRadius: heightPercentageToDP(1),
//                       justifyContent: 'center',
//                     }}>
//                     <Ionicons
//                       name={'wallet'}
//                       size={heightPercentageToDP(4)}
//                       color={COLORS.darkGray}
//                     />
//                   </View>
//                   <GradientText
//                     style={{
//                       ...styles.textStyle,
//                       width: widthPercentageToDP(60),
//                     }}>
//                     {user.walletOne?.walletName}
//                   </GradientText>
//                 </View>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   backgroundColor: COLORS.white,
//                   position: 'absolute',
//                   right: heightPercentageToDP(2),
//                   borderRadius: heightPercentageToDP(1),
//                   padding: heightPercentageToDP(1),
//                   top: heightPercentageToDP(2),
//                 }}>
//                 <MaterialCommunityIcons
//                   name={'circle-edit-outline'}
//                   size={heightPercentageToDP(4)}
//                   color={COLORS.darkGray}
//                 />
//               </View>
//             </TouchableOpacity>

//             {/** Wallet Two */}

//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('WalletModification', {walletname: 'two'})
//               }
//               style={{
//                 height: heightPercentageToDP(20),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.grayBg,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 margin: heightPercentageToDP(2),
//               }}>
//               <View
//                 style={{
//                   padding: heightPercentageToDP(2),
//                 }}>
//                 <Text
//                   style={{
//                     marginStart: heightPercentageToDP(1),
//                     flex: 1,
//                     fontFamily: FONT.Montserrat_Regular,
//                     color: COLORS.darkGray,
//                     width: widthPercentageToDP(25),
//                     marginStart: heightPercentageToDP(-1),
//                     textAlignVertical: 'bottom',
//                   }}>
//                   Current Name
//                 </Text>
//                 <Text
//                   style={{
//                     marginStart: heightPercentageToDP(1),
//                     flex: 1,
//                     fontFamily: FONT.Montserrat_SemiBold,
//                     color: COLORS.darkGray,
//                     fontSize: heightPercentageToDP(3),
//                     marginStart: heightPercentageToDP(-1),
//                   }}>
//                   {userdata.walletTwo?.walletName}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'flex-start',
//                     gap: heightPercentageToDP(1),
//                     marginStart: heightPercentageToDP(-1),
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: COLORS.white_s,
//                       padding: heightPercentageToDP(1),
//                       borderRadius: heightPercentageToDP(1),
//                       justifyContent: 'center',
//                     }}>
//                     <Ionicons
//                       name={'wallet'}
//                       size={heightPercentageToDP(4)}
//                       color={COLORS.darkGray}
//                     />
//                   </View>
//                   <GradientText
//                     style={{
//                       ...styles.textStyle,
//                       width: widthPercentageToDP(60),
//                     }}>
//                     {user.walletTwo?.walletName}
//                   </GradientText>
//                 </View>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   backgroundColor: COLORS.white,
//                   position: 'absolute',
//                   right: heightPercentageToDP(2),
//                   borderRadius: heightPercentageToDP(1),
//                   padding: heightPercentageToDP(1),
//                   top: heightPercentageToDP(2),
//                 }}>
//                 <MaterialCommunityIcons
//                   name={'circle-edit-outline'}
//                   size={heightPercentageToDP(4)}
//                   color={COLORS.darkGray}
//                 />
//               </View>
//             </TouchableOpacity>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AllWallet;

// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//   },
//   textStyleEmail: {
//     fontSize: heightPercentageToDP(2),
//     fontFamily: FONT.Montserrat_Bold,
//   },
// });
