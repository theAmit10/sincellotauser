import {
  FlatList,
  Image,
  ImageBackground,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import {serverName} from '../../redux/store';

const ShowingReceipt = ({route}) => {
  const {item} = route.params;
  console.log('Item :: ', item);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accesstoken} = useSelector(state => state.user);

  return (
    <View style={{flex: 1}}>
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
                Receipt
              </GradientTextWhite>
              <ScrollView
                contentContainerStyle={{padding: heightPercentageToDP(2)}}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    height: heightPercentageToDP(40),
                  }}>
                  <Image
                    source={{
                      uri: `${serverName}/uploads/deposit/${item?.receipt}`,
                    }}
                    resizeMode="cover"
                    style={{
                      height: heightPercentageToDP(20),
                      width: heightPercentageToDP(20),
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ShowingReceipt;

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
