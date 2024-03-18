import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { COLORS, FONT } from '../../../assets/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BigResult = ({data}) => {
  return (
    <View
      style={{
        height: heightPercentageToDP(25),
        backgroundColor: COLORS.grayHalfBg,
        marginTop: heightPercentageToDP(2),
        borderRadius: heightPercentageToDP(1),
      }}>
      <View
        style={{
          height: heightPercentageToDP(15),
          borderRadius: heightPercentageToDP(1),
          flexDirection: 'row',
        }}>
        {/** Top view left container */}
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(3),
              marginTop: heightPercentageToDP(2),
            }}
            numberOfLines={1}
            >
            {data.lotlocation.lotlocation}
          </Text>
          <Text
            style={{
              fontFamily: FONT.SF_PRO_REGULAR,
              fontSize: heightPercentageToDP(11),
              color: COLORS.black,
              marginTop: heightPercentageToDP(-2),
            }}
            numberOfLines={1}
            >
            {data.resultNumber}
          </Text>
        </View>

        {/** Top view right container */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.gray2,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              transform: [{rotate: '90deg'}],
              color: COLORS.black,
              fontFamily: FONT.Montserrat_SemiBold,
              fontSize: heightPercentageToDP(1.5),
            }}>
            {data.lottime.lottime}
          </Text>
        </View>
      </View>

      {/** Big Result bottom container */}

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white_s,
          margin: heightPercentageToDP(1),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: heightPercentageToDP(1),
        }}>
        <View
          style={{
            backgroundColor: COLORS.grayHalfBg,
            padding: heightPercentageToDP(1),
            borderRadius: heightPercentageToDP(1),
            marginStart: heightPercentageToDP(-3),
          }}>
          <Ionicons
            name={'calendar'}
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
        </View>

        <Text
          style={{
            fontFamily: FONT.Montserrat_Regular,
            fontSize: heightPercentageToDP(2),
          }}>
          {data.lotdate.lotdate}
        </Text>
      </View>
    </View>
  );
};

export default BigResult;

const styles = StyleSheet.create({});
