import {
  Image,
  ImageBackground,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GradientText from '../helpercComponent/GradientText';
import {useDispatch, useSelector} from 'react-redux';
import {serverName} from '../../redux/store';
import GradientTextWhite from '../helpercComponent/GradientTextWhite';
import {loadAllNotification} from '../../redux/actions/userAction';
import {
  useGetAllNotificationQuery,
  useGetSingleUserNotificationQuery,
} from '../../helper/Networkcall';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AdminBackground = () => {
  const navigation = useNavigation();

  const {user, accesstoken, loading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Getting Profile');
    console.log('User Profile :: ' + JSON.stringify(user));
    // console.log('Profile Avatar :: ' + user.avatar);
  }, [loading]);

  const [newNotification, setNewNotification] = useState(true);
  // const [notifications, setnotifications] = useState([]);

  const id = 1000;
  // // Fetch Paginated Data
  // const {
  //   data,
  //   refetch: refetchPaginated,
  //   isLoading: loadingNotification,
  // } = useGetAllNotificationQuery({accesstoken, id});

  const checkingForNewNotification = () => {
    console.log('CHECKING FOR NEW NOTIFCATION');
    if (notifications) {
      const noti =
        notifications?.length === 0 ? true : notifications[0]?.seennow;
      console.log('seennow noti len :: ' + notifications?.length);
      console.log('seennow :: ' + noti);
      setNewNotification(noti);
    }
  };

  // useEffect(() => {
  //   if (!loadingNotification && data) {
  //     setnotifications(data);
  //     checkingForNewNotification();
  //   }
  // }, [accesstoken]);

  // useEffect(() => {
  //   if (accesstoken) {
  //     if (!loadingNotification && data) {
  //       checkingForNewNotification();
  //     }
  //   }
  // }, [loadingNotification, notifications, user, accesstoken]);

  // FOR ALL THE NOTIFICAITON CONTAINER
  const focused = useIsFocused();
  const [notifications, setNotification] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: refetchPaginated,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
  } = useGetSingleUserNotificationQuery(
    {accesstoken, id: id, page, limit},
    {refetchOnMountOrArgChange: true}, // Disable caching
  );

  useEffect(() => {
    if (!loadingPaginated && paginatedData) {
      setNotification(paginatedData.notifications);
    }
  }, [loadingPaginated, paginatedData, focused]);

  useEffect(() => {
    if (accesstoken && user) {
      if (!loadingPaginated && paginatedData) {
        checkingForNewNotification();
      }
    }
  }, [loadingPaginated, notifications, focused]);

  useEffect(() => {
    if (accesstoken && user) {
      if (!loadingPaginated && paginatedData) {
        refetchPaginated();
      }
    }
  }, [focused]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/** Top View Rectangle View */}

      {/** Top View Rectangle View */}

      <ImageBackground
        source={require('../../../assets/image/tlwbg.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            margin: heightPercentageToDP(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <GradientTextWhite style={{...styles.textStyle}}>
            Admin Dashboard
          </GradientTextWhite>
          {user && user.role === 'admin' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
              className="rounded-md p-2"
              style={{
                backgroundColor: COLORS.grayHalfBg,
                width: widthPercentageToDP(10),
              }}>
              <Ionicons
                name={'settings-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.black}
              />
            </TouchableOpacity>
          ) : user && user.role === 'subadmin' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
              className="rounded-md p-2"
              style={{
                backgroundColor: COLORS.grayHalfBg,
                width: widthPercentageToDP(10),
              }}>
              <Ionicons
                name={'settings-outline'}
                size={heightPercentageToDP(3)}
                color={COLORS.black}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            marginTop: heightPercentageToDP(1),
            marginEnd: heightPercentageToDP(2.5),
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            className="rounded-md p-2"
            style={{
              backgroundColor: newNotification
                ? COLORS.grayHalfBg
                : COLORS.white_s,
              width: widthPercentageToDP(10),
            }}>
            {newNotification ? (
              <Ionicons
                name={'notifications'}
                size={heightPercentageToDP(3)}
                color={COLORS.black}
              />
            ) : (
              <MaterialIcons
                name={'notification-add'}
                size={heightPercentageToDP(3)}
                color={COLORS.lightyellow}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: heightPercentageToDP(30),
            height: heightPercentageToDP(30),
            backgroundColor: COLORS.grayHalfBg,
            position: 'absolute',
            borderRadius: heightPercentageToDP(5),
            zIndex: 1,
            top: heightPercentageToDP(8),
            left: widthPercentageToDP(20),
            elevation: heightPercentageToDP(1),
          }}>
          {/** Admin Profile image  */}

          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateProfile')}
            style={{
              borderRadius: 100,
              overflow: 'hidden',
              width: heightPercentageToDP(15),
              height: heightPercentageToDP(15),
              zIndex: 2,
              position: 'absolute',
              top: heightPercentageToDP(-2),
              left: widthPercentageToDP(15),
            }}>
            {loading ? (
              <Image
                source={require('../../../assets/image/dark_user.png')}
                resizeMode="cover"
                style={{
                  height: heightPercentageToDP(15),
                  width: heightPercentageToDP(15),
                }}
              />
            ) : user?.avatar ? (
              <Image
                source={{uri: `${serverName}/uploads/${user?.avatar?.url}`}}
                resizeMode="cover"
                style={{
                  height: heightPercentageToDP(15),
                  width: heightPercentageToDP(15),
                }}
              />
            ) : (
              <Image
                source={require('../../../assets/image/dark_user.png')}
                resizeMode="cover"
                style={{
                  height: heightPercentageToDP(15),
                  width: heightPercentageToDP(15),
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
              marginTop: heightPercentageToDP(1),
            }}>
            {/** name */}
            <GradientText style={{...styles.textStyle}}>
              {user ? user.name : ''}
            </GradientText>
            {/** email */}
            <GradientText style={styles.textStyleEmail}>
              {user ? user.email : ''}
            </GradientText>
          </View>

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
          className="rounded-full h-5 w-5"
          style={{
            margin: heightPercentageToDP(3),
            backgroundColor: COLORS.background,
          }}></View>
      </ImageBackground>
    </View>
  );
};

export default AdminBackground;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.darkGray,
  },
  textStyleEmail: {
    fontSize: heightPercentageToDP(2),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.darkGray,
  },
});

// import {
//   Image,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {COLORS, FONT} from '../../../assets/constants';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import GradientText from '../helpercComponent/GradientText';
// import {useDispatch, useSelector} from 'react-redux';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Toast from 'react-native-toast-message';
// import DocumentPicker from 'react-native-document-picker';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
// import LinearGradient from 'react-native-linear-gradient';
// import {serverName} from '../../redux/store';
// import Loading from '../helpercComponent/Loading';
// import {loadProfile} from '../../redux/actions/userAction';

// const AdminBackground = () => {
//   const navigation = useNavigation();

//   const {user, accesstoken, loading} = useSelector(state => state.user);

//   useEffect(() => {
//     console.log('Getting Profile');
//     console.log('User Profile :: ' + JSON.stringify(user));
//     // console.log('Profile Avatar :: ' + user.avatar);
//   }, [loading]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.white_s,
//       }}>
//       {/** Top View Rectangle View */}

//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           margin: heightPercentageToDP(2),
//         }}>
//         <GradientText style={{...styles.textStyle}}>Admin</GradientText>
//         <GradientText style={{...styles.textStyle}}>Dashboard</GradientText>
//       </View>

//       {
//         user && user.role === "admin" ? ( <TouchableOpacity
//           onPress={() => navigation.navigate('Setting')}
//           className="rounded-md p-2"
//           style={{
//             backgroundColor: COLORS.grayHalfBg,
//             width: widthPercentageToDP(10),
//             margin: heightPercentageToDP(2),
//             position: 'absolute',
//             right: heightPercentageToDP(2),
//           }}>
//           <Ionicons
//             name={'settings-outline'}
//             size={heightPercentageToDP(3)}
//             color={COLORS.black}
//           />
//         </TouchableOpacity>) : (null)
//       }

//       <View
//         style={{
//           width: heightPercentageToDP(30),
//           height: heightPercentageToDP(25),
//           backgroundColor: COLORS.grayHalfBg,
//           position: 'absolute',
//           borderTopRightRadius: heightPercentageToDP(5),
//           borderTopLeftRadius: heightPercentageToDP(5),
//           borderBottomLeftRadius: heightPercentageToDP(3),
//           borderBottomRightRadius: heightPercentageToDP(3),
//           zIndex: 1,
//           top: heightPercentageToDP(15),
//           left: widthPercentageToDP(20),
//           elevation: heightPercentageToDP(1),
//         }}>
//         {/** User Profile Image */}

//         <TouchableOpacity
//           onPress={() => navigation.navigate('UpdateProfile')}
//           style={{
//             borderRadius: 100,
//             overflow: 'hidden',
//             width: heightPercentageToDP(15),
//             height: heightPercentageToDP(15),
//             zIndex: 2,
//             position: 'absolute',
//             top: heightPercentageToDP(-2),
//             left: widthPercentageToDP(15),
//           }}>
//           {loading ? (
//             <Image
//               source={require('../../../assets/image/dark_user.png')}
//               resizeMode="cover"
//               style={{
//                 height: heightPercentageToDP(15),
//                 width: heightPercentageToDP(15),
//               }}
//             />
//           ) : user?.avatar ? (
//             <Image
//               source={{uri: `${serverName}uploads/${user?.avatar?.url}`}}
//               resizeMode="cover"
//               style={{
//                 height: heightPercentageToDP(15),
//                 width: heightPercentageToDP(15),
//               }}
//             />
//           ) : (
//             <Image
//               source={require('../../../assets/image/dark_user.png')}
//               resizeMode="cover"
//               style={{
//                 height: heightPercentageToDP(15),
//                 width: heightPercentageToDP(15),
//               }}
//             />
//           )}
//         </TouchableOpacity>

//         {loading ? (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: heightPercentageToDP(14),
//               zIndex: 3,
//             }}>
//             <Loading />
//           </View>
//         ) : (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'transparent',
//               zIndex: 3,
//               alignSelf: 'stretch',
//               marginTop: heightPercentageToDP(14),
//             }}>
//             <GradientText style={{...styles.textStyle}}>
//               {user ? user.name : ''}
//             </GradientText>
//             <GradientText style={styles.textStyleEmail}>
//               {user ? user.email : ''}
//             </GradientText>
//           </View>
//         )}

//         {/** Username */}

//         {/** Email */}

//         <LinearGradient
//           colors={[COLORS.darkGray, COLORS.white_s]}
//           style={{
//             width: heightPercentageToDP(15),
//             height: heightPercentageToDP(20),
//             position: 'absolute',
//             zIndex: 1,
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderBottomLeftRadius: heightPercentageToDP(5),
//           }}></LinearGradient>
//       </View>
//       <View
//         style={{
//           backgroundColor: COLORS.profileDarkGray,
//           width: widthPercentageToDP(100),
//           height: heightPercentageToDP(30),
//           opacity: 80,
//         }}>
//         <LinearGradient
//           colors={[COLORS.darkGray, COLORS.white_s]}
//           className="rounded-full h-5 w-5"
//           style={{
//             margin: heightPercentageToDP(3),
//             backgroundColor: COLORS.background,
//           }}></LinearGradient>
//       </View>
//     </View>
//   );
// };

// export default AdminBackground;

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
