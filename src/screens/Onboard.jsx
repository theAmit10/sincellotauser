import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../assets/constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import GradientText from '../components/helpercComponent/GradientText';

const Onboard = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
      <StatusBar hidden={true} />

      {/** app name */}
      <View
        style={{
          height: heightPercentageToDP(8),
          padding: heightPercentageToDP(2),
        }}>
        <Text
          style={{
            color: COLORS.white_s,
            fontFamily: FONT.ZCOOL_Regular,
            fontSize: heightPercentageToDP(3),
          }}>
          Since 1984
        </Text>
      </View>

      {/** title */}

      <View
        style={{
          height: heightPercentageToDP(8),
          padding: heightPercentageToDP(2),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.white_s,
            fontFamily: FONT.ZCOOL_Regular,
            fontSize: heightPercentageToDP(3),
          }}>
          Unlock your dreams with just a tap
        </Text>
      </View>

      {/** Image Container */}
      <View style={{height: heightPercentageToDP(50), backgroundColor: 'gray'}}>
        <Image
          source={require('../../assets/image/dark_user.png')}
          style={{
            height: heightPercentageToDP(50),
            width: widthPercentageToDP(100),
          }}
          resizeMode="cover"
        />
      </View>

      {/** Bottom discription */}

      <View
        style={{
          height: heightPercentageToDP(10),

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: COLORS.white_s,
            fontFamily: FONT.ZCOOL_Regular,
            fontSize: heightPercentageToDP(3),
          }}>
          Welcome to your lottery
        </Text>
        <View style={{flexDirection: 'row', gap: heightPercentageToDP(1)}}>
          <Text
            style={{
              color: COLORS.white_s,
              fontFamily: FONT.ZCOOL_Regular,
              fontSize: heightPercentageToDP(3),
            }}>
            Advanture
          </Text>
          <Text
            style={{
              color: COLORS.white_s,
              fontFamily: FONT.ZCOOL_Regular,
              fontSize: heightPercentageToDP(3),
            }}>
            ^
          </Text>
        </View>
      </View>

      {/** indicator */}
      <View
        style={{
          height: heightPercentageToDP(10),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: heightPercentageToDP(1),
        }}>
        <View
          style={{backgroundColor: COLORS.grayHalfBg}}
          className={'rounded-full p-1'}></View>
        <View
          style={{backgroundColor: COLORS.darkGray}}
          className={'rounded-full p-1'}></View>
        <View
          style={{backgroundColor: COLORS.darkGray}}
          className={'rounded-full p-1'}></View>
      </View>

      {/** Bottom Container*/}
      <View style={{height: 1, backgroundColor: COLORS.grayHalfBg}}></View>

      <View
        style={{
          height: heightPercentageToDP(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: heightPercentageToDP(1),
        }}>
        <GradientText
          style={{
            fontSize: heightPercentageToDP(4),
            fontFamily: FONT.Montserrat_Bold,
            color: COLORS.white_s,
          }}>
          Since
        </GradientText>
        <GradientText
          style={{
            fontSize: heightPercentageToDP(4),
            fontFamily: FONT.Montserrat_Bold,
          }}>
          ^
        </GradientText>
        <GradientText
          style={{
            fontSize: heightPercentageToDP(4),
            fontFamily: FONT.Montserrat_Bold,
          }}>
          1984
        </GradientText>
      </View>
    </SafeAreaView>
  );
};

export default Onboard;

const styles = StyleSheet.create({});
