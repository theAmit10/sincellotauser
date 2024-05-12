import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONT } from '../../../assets/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Background = () => {
    const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grayBg,
      }}>
        {/** Top View Rectangle View */}
      <View
        style={{
          width: heightPercentageToDP(30),
          height: heightPercentageToDP(30),
          backgroundColor: COLORS.white_s,
          position: 'absolute',
          borderRadius: heightPercentageToDP(5),
          zIndex: 1,
          top: heightPercentageToDP(10),
          left: widthPercentageToDP(20),
        }}>
        <View
          style={{
            width: heightPercentageToDP(15),
            height: heightPercentageToDP(30),
            backgroundColor: COLORS.lightWhite,
            position: 'absolute',
            zIndex: 1,
            borderTopLeftRadius: heightPercentageToDP(5),
            borderBottomLeftRadius: heightPercentageToDP(5),
          }}></View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.profileDarkGray,
          width: widthPercentageToDP(50),
          flex: 1,
          opacity: 80,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}
            className="rounded-md p-2" style={{backgroundColor: COLORS.white_s, width: widthPercentageToDP(10), margin: heightPercentageToDP(2)}}
        >
            <Ionicons
              name={'chevron-back'}
              size={heightPercentageToDP(3)}
              color={COLORS.black}
            />
          </TouchableOpacity>

        <View
          className="rounded-full h-5 w-5"
          style={{
            margin: heightPercentageToDP(3),
            backgroundColor: COLORS.background,
          }}></View>
      </View>

      <View
        style={{
          flex: 1,
          opacity: 80,
          position: 'absolute',
          right: 0
        }}>
        <TouchableOpacity onPress={() => navigation.navigate("AdminDashboard")}
            className="rounded-md p-2" style={{backgroundColor: COLORS.white_s, width: widthPercentageToDP(10), margin: heightPercentageToDP(2)}}
        >
            <Ionicons
              name={'home'}
              size={heightPercentageToDP(3)}
              color={COLORS.black}
            />
          </TouchableOpacity>

        <View
          className="rounded-full h-5 w-5"
          style={{
            margin: heightPercentageToDP(3),
            backgroundColor: COLORS.background,
          }}></View>
      </View>

      
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
