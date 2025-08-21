import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../helpercComponent/GradientText';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONT} from '../../../assets/constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PartnerDashComp = ({
  navigate,
  title,
  subtitle,
  fromicon,
  iconname,
  data,
  count,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigate, {data})}>
      <LinearGradient
        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
        start={{x: 0, y: 0}} // start from left
        end={{x: 1, y: 0}} // end at right
        style={styles.paymentOption}>
        <View
          style={{
            flex: 1,
            gap: heightPercentageToDP(2),
          }}>
          <GradientText style={styles.textStyleContent}>{title}</GradientText>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <GradientText style={styles.textStyleContent}>{count}</GradientText>
        {!count && (
          <View style={styles.iconContainer}>
            {fromicon === 'FontAwesome6' && (
              <FontAwesome6
                name={iconname}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
                style={styles.icon}
              />
            )}
            {fromicon === 'MaterialCommunityIcons' && (
              <MaterialCommunityIcons
                name={iconname}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
                style={styles.icon}
              />
            )}
            {fromicon === 'FontAwesome5' && (
              <FontAwesome5
                name={iconname}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
                style={styles.icon}
              />
            )}

            {fromicon === 'Ionicons' && (
              <Ionicons
                name={iconname}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
                style={styles.icon}
              />
            )}

            {fromicon === 'MaterialIcons' && (
              <MaterialIcons
                name={iconname}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
                style={styles.icon}
              />
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PartnerDashComp;

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
    paddingEnd: heightPercentageToDP(2),
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
