import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONT} from '../../../assets/constants';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';
import MainBackgound from '../../components/background/MainBackgound';
import {
  useGetPendingRequestCountQuery,
  useGetUserCountQuery,
} from '../../helper/Networkcall';
import Loading from '../../components/helpercComponent/Loading';

const PartnerDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken, user, partner} = useSelector(state => state.user);

  const {isLoading, data, refetch} = useGetUserCountQuery({accesstoken});
  const {
    isLoading: requestIsLoading,
    data: requestData,
    refetch: requestRefetch,
  } = useGetPendingRequestCountQuery({accesstoken});

  return (
    <MainBackgound title={'Partner Dashboard'}>
      {/** PARTNER PERFORMANCE */}

      {isLoading || requestIsLoading ? (
        <Loading />
      ) : (
        <>
          {/** ALL PARTNER */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'AllPartner'}
              title={'All Partner'}
              subtitle={'List of all Partner data'}
              fromicon={'FontAwesome6'}
              iconname={'people-group'}
              count={data?.partnerCount}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.allpartner ? (
            <PartnerDashComp
              navigate={'AllPartner'}
              title={'All Partner'}
              subtitle={'List of all Partner data'}
              fromicon={'FontAwesome6'}
              iconname={'people-group'}
              count={data?.partnerCount}
            />
          ) : null}

          {/** ALL SUB PARTNER */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'AllSubPartner'}
              title={'All Sub Partner'}
              subtitle={'List of all Sub Partner data'}
              fromicon={'FontAwesome6'}
              iconname={'people-group'}
              count={data?.subPartnerCount}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.allsubpartner ? (
            <PartnerDashComp
              navigate={'AllSubPartner'}
              title={'All Sub Partner'}
              subtitle={'List of all Sub Partner data'}
              fromicon={'FontAwesome6'}
              iconname={'people-group'}
              count={data?.subPartnerCount}
            />
          ) : null}

          {/** All Users */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'AllUsersPartner'}
              title={'All Users'}
              subtitle={'List of All User'}
              fromicon={'MaterialCommunityIcons'}
              iconname={'human-capacity-decrease'}
              count={data?.allUserCount}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.alluser ? (
            <PartnerDashComp
              navigate={'AllUsersPartner'}
              title={'All Users'}
              subtitle={'List of All User'}
              fromicon={'MaterialCommunityIcons'}
              iconname={'human-capacity-decrease'}
              count={data?.allUserCount}
            />
          ) : null}

          <PartnerDashComp
            navigate={'PartnerPerformanceDashboard'}
            title={'Performance'}
            subtitle={'List of all Partner Performace'}
            fromicon={'FontAwesome6'}
            iconname={'people-group'}
          />

          {/** All Recharge Request */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'AllRecharge'}
              title={'All Recharge Request'}
              subtitle={'List of Recharge Request'}
              fromicon={'FontAwesome6'}
              iconname={'money-bill-trend-up'}
              count={requestData?.pendingRechargeCount}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.allrechargerequest ? (
            <PartnerDashComp
              navigate={'AllRecharge'}
              title={'All Recharge Request'}
              subtitle={'List of Recharge Request'}
              fromicon={'FontAwesome6'}
              iconname={'money-bill-trend-up'}
              count={requestData?.pendingRechargeCount}
            />
          ) : null}

          {/** All Profit Decrease */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'ProfitDeduction'}
              title={'All Profit Decrease'}
              subtitle={'List of Decrease Request'}
              fromicon={'MaterialCommunityIcons'}
              iconname={'human-capacity-decrease'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.profitdecrease ? (
            <PartnerDashComp
              navigate={'ProfitDeduction'}
              title={'All Profit Decrease'}
              subtitle={'List of Decrease Request'}
              fromicon={'MaterialCommunityIcons'}
              iconname={'human-capacity-decrease'}
            />
          ) : null}

          {/** Minimum Percentage */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'MinimumPercentage'}
              title={'MinimumPercentage'}
              subtitle={'Default Percentage for Partner'}
              fromicon={'FontAwesome5'}
              iconname={'percentage'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.minimumpercentage ? (
            <PartnerDashComp
              navigate={'MinimumPercentage'}
              title={'MinimumPercentage'}
              subtitle={'Default Percentage for Partner'}
              fromicon={'FontAwesome5'}
              iconname={'percentage'}
            />
          ) : null}
        </>
      )}
    </MainBackgound>
  );
};

export default PartnerDashboard;

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
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentageToDP(15),
    borderRadius: heightPercentageToDP(2),
    alignItems: 'center',
    gap: heightPercentageToDP(3),
    paddingStart: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
  },
  iconContainer: {
    backgroundColor: COLORS.white_s,
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(1),
  },
  icon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: heightPercentageToDP(1.5),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
});

// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Toast from 'react-native-toast-message';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import Background from '../../components/background/Background';
// import {COLORS, FONT} from '../../../assets/constants';
// import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
// import GradientText from '../../components/helpercComponent/GradientText';
// import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';

// const PartnerDashboard = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const {accesstoken} = useSelector(state => state.user);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Background />
//       {/** Main Cointainer */}
//       <View style={{flex: 1, justifyContent: 'flex-end'}}>
//         <ImageBackground
//           source={require('../../../assets/image/tlwbg.jpg')}
//           style={{
//             width: '100%',
//             height: heightPercentageToDP(80),
//           }}
//           imageStyle={{
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderTopRightRadius: heightPercentageToDP(5),
//           }}>
//           <View
//             style={{
//               height: heightPercentageToDP(80),
//               width: widthPercentageToDP(100),
//               borderTopLeftRadius: heightPercentageToDP(5),
//               borderTopRightRadius: heightPercentageToDP(5),
//             }}>
//             {/** Top Style View */}
//             <View
//               style={{
//                 height: heightPercentageToDP(5),
//                 width: widthPercentageToDP(100),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   width: widthPercentageToDP(20),
//                   height: heightPercentageToDP(0.8),
//                   backgroundColor: COLORS.grayBg,
//                   borderRadius: heightPercentageToDP(2),
//                 }}></View>
//             </View>

//             <GradientTextWhite
//               style={{
//                 ...styles.textStyle,
//                 paddingLeft: heightPercentageToDP(2),
//               }}>
//               Partner
//             </GradientTextWhite>

//             {/** Content Container */}

//             <View
//               style={{
//                 flex: 1,
//                 padding: heightPercentageToDP(1),
//               }}>
//               <ScrollView
//                 contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}
//                 showsVerticalScrollIndicator={false}>
//                 {/** ALL PARTNER */}

//                 <PartnerDashComp
//                   navigate={'AllPartner'}
//                   title={'All Partner'}
//                   subtitle={'List of all Partner data'}
//                   fromicon={'FontAwesome6'}
//                   iconname={'people-group'}
//                 />

//                 {/** ALL SUB PARTNER */}

//                 <PartnerDashComp
//                   navigate={'AllSubPartner'}
//                   title={'All Sub Partner'}
//                   subtitle={'List of all Sub Partner data'}
//                   fromicon={'FontAwesome6'}
//                   iconname={'people-group'}
//                 />

//                 {/** All Profit Decrease */}

//                 <PartnerDashComp
//                   navigate={'ProfitDeduction'}
//                   title={'All Profit Decrease'}
//                   subtitle={'List of Decrease Request'}
//                   fromicon={'MaterialCommunityIcons'}
//                   iconname={'human-capacity-decrease'}
//                 />

//                 {/** All Recharge Request */}
//                 <PartnerDashComp
//                   navigate={'AllRecharge'}
//                   title={'All Recharge Request'}
//                   subtitle={'List of Recharge Request'}
//                   fromicon={'FontAwesome6'}
//                   iconname={'money-bill-trend-up'}
//                 />

//                 {/** Minimum Percentage */}
//                 <PartnerDashComp
//                   navigate={'MinimumPercentage'}
//                   title={'MinimumPercentage'}
//                   subtitle={'Default Percentage for Partner'}
//                   fromicon={'FontAwesome6'}
//                   iconname={'money-bill-trend-up'}
//                 />
//               </ScrollView>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PartnerDashboard;

// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//     color: COLORS.black,
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     height: heightPercentageToDP(20),
//   },
//   item: {
//     padding: heightPercentageToDP(2),
//     marginVertical: heightPercentageToDP(1),
//     marginHorizontal: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(1),
//   },
//   paymentOption: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: heightPercentageToDP(15),
//     borderRadius: heightPercentageToDP(2),
//     alignItems: 'center',
//     gap: heightPercentageToDP(3),
//     paddingStart: heightPercentageToDP(2),
//     marginTop: heightPercentageToDP(2),
//   },
//   iconContainer: {
//     backgroundColor: COLORS.white_s,
//     padding: heightPercentageToDP(1.5),
//     borderRadius: heightPercentageToDP(1),
//   },
//   icon: {
//     height: 25,
//     width: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textStyleContent: {
//     fontSize: heightPercentageToDP(3),
//     fontFamily: FONT.Montserrat_Bold,
//     color: COLORS.black,
//   },
//   subtitle: {
//     fontSize: heightPercentageToDP(1.5),
//     color: COLORS.black,
//     fontFamily: FONT.Montserrat_Regular,
//   },
// });
