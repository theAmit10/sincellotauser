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
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import GradientText from '../../components/helpercComponent/GradientText';
import Loading from '../../components/helpercComponent/Loading';
import AllPartnerComp from '../../components/allpartner/AllPartnerComp';

const PartnerSubPartner = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);

  const dummeyAllUsers = [
    {
      userid: '1090',
      name: 'Babu Roa',
      partner: true,
      noofumser: '10',
      profitpercentage: '10%',
      rechargepercentage: '10%',
      walletbalance: '3788',
    },
    {
      userid: '1091',
      name: 'Arjuna',
      partner: true,
      noofumser: '10',
      profitpercentage: '10%',
      rechargepercentage: '10%',
      walletbalance: '3788',
    },
    {
      userid: '1092',
      name: 'Mark Jone',
      partner: false,
      noofumser: '10',
      profitpercentage: '10%',
      rechargepercentage: '10%',
      walletbalance: '3788',
    },
    {
      userid: '1093',
      name: 'Janny Mona',
      partner: true,
      noofumser: '10',
      profitpercentage: '10%',
      rechargepercentage: '10%',
      walletbalance: '3788',
    },
    {
      userid: '1094',
      name: 'Lucy cina',
      partner: true,
      noofumser: '10',
      profitpercentage: '10%',
      rechargepercentage: '10%',
      walletbalance: '3788',
    },
  ];

  const [filteredData, setFilteredData] = useState([]);

  // Example usage:
  // This will return the date and time in 'America/New_York' timezone.
  // This will return the date and time in 'America/New_York' timezone.

  const handleSearch = text => {
    const filtered = times.filter(item =>
      item.lottime.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Main Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <GradientText
          style={{
            ...styles.textStyle,
            paddingLeft: heightPercentageToDP(2),
          }}>
          Sub Partner
        </GradientText>
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
            {/** Top Style View */}
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
                Babu Bhaiya
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
                1090
              </Text>
            </View>

            <View
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.white_s,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginHorizontal: heightPercentageToDP(1),
              }}>
              <Fontisto
                name={'search'}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
              />
              <TextInput
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                }}
                placeholder="Search for User"
                placeholderTextColor={COLORS.black}
                label="Search"
                onChangeText={handleSearch}
              />
            </View>

            {/** Content Container */}

            <View
              style={{
                flex: 1,
                padding: heightPercentageToDP(1),
              }}>
              <ScrollView
                contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}
                showsVerticalScrollIndicator={false}>
                {/** User content */}
                {false ? (
                  <Loading />
                ) : (
                  dummeyAllUsers.map((item, index) => (
                    <AllPartnerComp
                      key={index}
                      navigate={'PartnerSubSubPartner'}
                      name={item.name}
                      userid={item.userid}
                      noofumser={item.noofumser}
                      profitpercentage={item.profitpercentage}
                      walletbalance={item.walletbalance}
                      rechargepercentage={item.rechargepercentage}
                    />
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PartnerSubPartner;

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
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentageToDP(15),
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
  topContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    height: 1,
    backgroundColor: COLORS.white_s,
  },
  titleRegular: {
    fontSize: heightPercentageToDP(1.5),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  titleBold: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Bold,
  },
  titleSemiBold: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.white_s,
    fontFamily: FONT.Montserrat_Bold,
  },
  acceptBtn: {
    backgroundColor: COLORS.green,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentageToDP(0.5),
    borderRadius: heightPercentageToDP(2),
  },
});
