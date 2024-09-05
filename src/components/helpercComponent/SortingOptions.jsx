import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {COLORS, FONT} from '../../../assets/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const SortingOptions = ({sortByAmount, sortByWinningAmount, onClose}) => {
  return (
    <LinearGradient
      colors={[COLORS.lightyellow, COLORS.darkyellow]}
      start={{x: 0, y: 0}} // start from left
      end={{x: 1, y: 0}} // end at right
      style={styles.container}>
      <Text style={styles.title}>Sort Data</Text>
      <Text
        style={styles.btn}
        onPress={() => {
          sortByAmount('asc');
          onClose();
        }}>
        Asc by Amount
      </Text>
      <Text
        style={styles.btn}
        onPress={() => {
          sortByAmount('desc');
          onClose();
        }}>
        Desc by Amount
      </Text>
      <Text
        style={styles.btn}
        onPress={() => {
          sortByWinningAmount('asc');
          onClose();
        }}>
        Asc by Winning
      </Text>
      <Text
        style={styles.btn}
        onPress={() => {
          sortByWinningAmount('desc');
          onClose();
        }}>
        Desc by Winning
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 50, // Adjust as per requirement
    left: 20, // Adjust as per requirement
    right: 20, // Adjust as per requirement
    elevation: 5, // For shadow effect on Android
    zIndex: 10, // To bring it above other elements
  },
  btn: {
    backgroundColor: COLORS.green,
    padding: heightPercentageToDP(2),
    textAlign: 'center',
    fontFamily: FONT.Montserrat_Bold,
    fontSize: heightPercentageToDP(2),
    color: COLORS.white_s,
    borderRadius: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(2),
  },
  title: {
    padding: heightPercentageToDP(2),
    textAlign: 'center',
    fontFamily: FONT.Montserrat_Bold,
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
  },
});

export default SortingOptions;
