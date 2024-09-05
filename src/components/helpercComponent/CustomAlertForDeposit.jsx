// CustomAlert.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import {HOVER} from 'nativewind/dist/utils/selector';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomAlertForDeposit = ({visible, onClose, onYes}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <View
            style={{
              width: '40%',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={[COLORS.lightWhite, COLORS.white_s]}
              style={{
                borderRadius: heightPercentageToDP(2),
                padding: heightPercentageToDP(1),
              }}>
              <MaterialCommunityIcons
                name={'security'}
                size={heightPercentageToDP(4)}
                color={COLORS.black}
              />
            </LinearGradient>
          </View>
          <Text style={styles.alertText}>Are you sure?</Text>
          <View style={styles.buttonContainer}>
            <View
              style={{
                height: heightPercentageToDP(7),
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={onYes}
                style={{
                  flex: 1,
                  backgroundColor: COLORS.green,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomLeftRadius: heightPercentageToDP(2),
                }}>
                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.white_s,
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: COLORS.white_s,
                }}></View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.red,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomRightRadius: heightPercentageToDP(2),
                }}
                onPress={onClose}>
                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.white_s,
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: heightPercentageToDP(30),
    height: heightPercentageToDP(20),
    backgroundColor: 'white',
    borderRadius: heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    marginBottom: heightPercentageToDP(1),
    fontSize: heightPercentageToDP(3),
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONT.SF_PRO_REGULAR,
  },
  buttonContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
});

export default CustomAlertForDeposit;
