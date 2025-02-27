import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../helpercComponent/GradientTextWhite';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const RechargePaymentComp = ({navigate, title, data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigate, {data})}>
      <LinearGradient
        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
        start={{x: 0, y: 0}} // start from left
        end={{x: 1, y: 0}} // end at right
        style={styles.paymentOption}>
        <View style={styles.iconContainer}>
          {title === 'Crypto' && (
            <Image
              source={require('../../../assets/image/crypto.png')}
              resizeMode="cover"
              style={styles.icon}
            />
          )}
          {title === 'Paypal' && (
            <Image
              source={require('../../../assets/image/paypal.png')}
              resizeMode="cover"
              style={styles.icon}
            />
          )}
          {title === 'Skrill' && (
            <Image
              source={require('../../../assets/image/skrill.png')}
              resizeMode="cover"
              style={styles.icon}
            />
          )}
          {title === 'Bank' && (
            <Image
              source={require('../../../assets/image/bank.png')}
              resizeMode="cover"
              style={styles.icon}
            />
          )}
          {title === 'Upi' && (
            <Image
              source={require('../../../assets/image/upi.png')}
              resizeMode="cover"
              style={styles.icon}
            />
          )}
        </View>
        <GradientTextWhite style={styles.textStyleContent}>
          {title}
        </GradientTextWhite>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RechargePaymentComp;

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
