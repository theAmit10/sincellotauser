import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import GradientText from '../../components/helpercComponent/GradientText';
import {useGetPendingPaymentMethodCountQuery} from '../../helper/Networkcall';

const Payment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accesstoken} = useSelector(state => state.user);

  const {isLoading, data} = useGetPendingPaymentMethodCountQuery({
    accesstoken,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Main Container */}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(80),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              flex: 1,
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
                }}
              />
            </View>

            {/** Content Container */}
            <View style={{flex: 1, marginHorizontal: heightPercentageToDP(2)}}>
              <GradientTextWhite style={styles.textStyle}>
                Payment Deposit
              </GradientTextWhite>
              <ScrollView
                contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}
                showsVerticalScrollIndicator={false}>
                {/** Crypto */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllCryptoDepositPayment')
                  }>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={styles.paymentOption}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={require('../../../assets/image/crypto.png')}
                        resizeMode="cover"
                        style={styles.icon}
                      />
                    </View>
                    <GradientTextWhite style={styles.textStyleContent}>
                      Crypto
                    </GradientTextWhite>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <GradientTextWhite style={styles.textStyleContent}>
                        {data?.breakdown?.cryptoPending}
                      </GradientTextWhite>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/** Paypal */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllPaypalDepositPayment')
                  }>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={styles.paymentOption}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={require('../../../assets/image/paypal.png')}
                        resizeMode="cover"
                        style={styles.icon}
                      />
                    </View>
                    <GradientTextWhite style={styles.textStyleContent}>
                      Paypal
                    </GradientTextWhite>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <GradientTextWhite style={styles.textStyleContent}>
                        {data?.breakdown?.paypalPending}
                      </GradientTextWhite>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/** Skrill */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllSkrillPaymentPayment')
                  }>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={styles.paymentOption}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={require('../../../assets/image/skrill.png')}
                        resizeMode="cover"
                        style={styles.icon}
                      />
                    </View>
                    <GradientTextWhite style={styles.textStyleContent}>
                      Skrill
                    </GradientTextWhite>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <GradientTextWhite style={styles.textStyleContent}>
                        {data?.breakdown?.skrillPending}
                      </GradientTextWhite>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/** BANK */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllBankDepositPayment')}>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={styles.paymentOption}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={require('../../../assets/image/bank.png')}
                        resizeMode="cover"
                        style={styles.icon}
                      />
                    </View>
                    <GradientTextWhite style={styles.textStyleContent}>
                      Bank
                    </GradientTextWhite>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <GradientTextWhite style={styles.textStyleContent}>
                        {data?.breakdown?.bankPending}
                      </GradientTextWhite>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/** UPI */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllUpiDepositPayment')}>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    style={styles.paymentOption}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                  >
                    <View style={styles.iconContainer}>
                      <Image
                        source={require('../../../assets/image/upi.png')}
                        resizeMode="cover"
                        style={styles.icon}
                      />
                    </View>
                    <GradientTextWhite style={styles.textStyleContent}>
                      UPI
                    </GradientTextWhite>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <GradientTextWhite style={styles.textStyleContent}>
                        {data?.breakdown?.upiPending}
                      </GradientTextWhite>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/** Cash */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllOtherDepositPayment')}>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    style={styles.paymentOption}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                  >
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        color={COLORS.black}
                        name="contactless-payment-circle"
                        size={heightPercentageToDP(4)}
                      />
                    </View>
                    <GradientTextWhite style={styles.textStyleContent}>
                      Other Payment
                    </GradientTextWhite>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <GradientTextWhite style={styles.textStyleContent}>
                        {data?.breakdown?.otherPending}
                      </GradientTextWhite>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: heightPercentageToDP(12),
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
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});

// Complete Blank Screen

// import {
//   FlatList,
//   ImageBackground,
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
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Toast from 'react-native-toast-message';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import Background from '../../components/background/Background';
// import {COLORS, FONT} from '../../../assets/constants';
// import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';

// const Payment = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const {accesstoken} = useSelector(state => state.user);

//   return (
//     <View style={{flex: 1}}>
//       <Background />

//       {/** Main Cointainer */}

//       <View style={{flex: 1, justifyContent: 'flex-end'}}>
//         <ImageBackground
//           source={require('../../../assets/image/tlwbg.jpg')}
//           style={{
//             width: '100%',
//             height: heightPercentageToDP(85),
//           }}
//           imageStyle={{
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderTopRightRadius: heightPercentageToDP(5),
//           }}>
//           <View
//             style={{
//               height: heightPercentageToDP(85),
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

//             {/** Content Container */}

//             <View
//               style={{
//                 height: heightPercentageToDP(21),
//                 margin: heightPercentageToDP(2),
//               }}>
//               <GradientTextWhite style={styles.textStyle}>
//                 Search
//               </GradientTextWhite>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// export default Payment;

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
//   title: {
//     color: COLORS.white_s,
//     fontFamily: FONT.SF_PRO_MEDIUM,
//   },
// });
