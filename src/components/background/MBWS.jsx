import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Background from './Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../helpercComponent/GradientTextWhite';
import Feather from 'react-native-vector-icons/Feather';

const MBWS = ({
  children,
  title,
  lefttext,
  righttext,
  handlerPress,
  showMenu,
  showSecondTitle,
  handlerSecondTitlePress,
  secontTitle,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-180}>
        <Background />
        {/* Main Container */}
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
                height: heightPercentageToDP(80),
                width: widthPercentageToDP(100),
                borderTopLeftRadius: heightPercentageToDP(5),
                borderTopRightRadius: heightPercentageToDP(5),
              }}>
              {/* Top Style View */}
              <View
                style={{
                  height: heightPercentageToDP(5),
                  width: widthPercentageToDP(100),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                }}>
                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.white_s,
                    width: widthPercentageToDP(30),
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {lefttext}
                </Text>

                <View
                  style={{
                    width: widthPercentageToDP(20),
                    height: heightPercentageToDP(0.8),
                    backgroundColor: COLORS.grayBg,
                    borderRadius: heightPercentageToDP(2),
                  }}></View>

                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.white_s,
                    overflow: 'hidden',
                    width: widthPercentageToDP(30),
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {righttext}
                </Text>
              </View>

              <View
                style={{
                  height: heightPercentageToDP(5),
                  width: widthPercentageToDP(100),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingEnd: heightPercentageToDP(2),
                }}>
                <GradientTextWhite
                  style={{
                    ...styles.textStyle,
                    paddingLeft: heightPercentageToDP(2),
                  }}>
                  {title}
                </GradientTextWhite>

                {true && (
                  <TouchableOpacity onPress={handlerSecondTitlePress}>
                    <GradientTextWhite
                      style={{
                        ...styles.textStyle,
                        fontSize: heightPercentageToDP(2),
                      }}>
                      {secontTitle}
                    </GradientTextWhite>
                  </TouchableOpacity>
                )}
                {showMenu && (
                  <TouchableOpacity onPress={handlerPress}>
                    <Feather
                      name="menu"
                      size={heightPercentageToDP(3)}
                      color={COLORS.white_s}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Content Container */}
              <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
                {children}
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MBWS;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
