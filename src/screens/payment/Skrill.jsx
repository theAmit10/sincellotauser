import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import Loading from '../../components/helpercComponent/Loading';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import UrlHelper from '../../helper/UrlHelper';
import {
  useCreateSkrillAccountMutation,
} from '../../helper/Networkcall';

const upiapidata = [
  {name: 'Wasu', upiid: '9876543210@ybl', id: '1'},
  {name: 'Aman', upiid: '8876543210@ybl', id: '2'},
  {name: 'Zasu', upiid: '7876543210@ybl', id: '3'},
  {name: 'Masu', upiid: '1876543210@ybl', id: '4'},
  {name: 'Kasu', upiid: '2876543210@ybl', id: '5'},
];

const Skrill = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {accesstoken, user} = useSelector(state => state.user);

  const [address, setaddress] = useState('');

  const [createSkrillAccount, {isLoading, error}] =
    useCreateSkrillAccountMutation();

  const submitDeposit = async () => {
    if (!address) {
      Toast.show({type: 'error', text1: 'Enter address'});
      return;
    } else {
      try {
        const body = {
          address,
        };

        console.log('JSON BODY :: ', JSON.stringify(body));

        const res = await createSkrillAccount({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        Toast.show({type: 'success', text1: 'Success', text2: res.message});
        navigation.goBack();
      } catch (error) {
        console.log('Error during deposit:', error);
        if (error.response) {
          Toast.show({type: 'error', text1: error.response.data});
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Request was made, but no response was received',
          });
        } else {
          Toast.show({type: 'error', text1: error.message});
        }
      }
    }
  };

  useEffect(() => {
    allTheDepositData();
  }, [isFocused, loadingAllData, allDepositdata]);

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const {data} = await axios.get(UrlHelper.ALL_SKRILL_API, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log('datat :: ' + JSON.stringify(data));
      setAllDepositData(data.payments);
      setLoadingAllData(false);
    } catch (error) {
      setLoadingAllData(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-60}>
        <Background />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ImageBackground
            source={require('../../../assets/image/tlwbg.jpg')}
            style={{
              width: '100%',
              height:
              Platform.OS === 'android'
                ? heightPercentageToDP(85)
                : heightPercentageToDP(80),
            }}
            imageStyle={{
              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
            <View
              style={{
                height:
                Platform.OS === 'android'
                  ? heightPercentageToDP(85)
                  : heightPercentageToDP(80),
                width: widthPercentageToDP(100),
                borderTopLeftRadius: heightPercentageToDP(5),
                borderTopRightRadius: heightPercentageToDP(5),
              }}>
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
              <View style={{margin: heightPercentageToDP(2)}}>
                <GradientTextWhite style={styles.textStyle}>
                  Skrill Deposit
                </GradientTextWhite>
              </View>

              {/** FOR UPI DEPOSIT FORM */}

              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    height: heightPercentageToDP(70),
                    padding: heightPercentageToDP(2),
                  }}>
                  {/** Amount */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                      padding: heightPercentageToDP(1),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_SemiBold,
                        color: COLORS.black,
                        fontSize: heightPercentageToDP(2),
                        paddingStart: heightPercentageToDP(1),
                      }}>
                      Address
                    </Text>

                    <LinearGradient
                      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        borderRadius: heightPercentageToDP(2),
                      }}>
                      <TextInput
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        cursorColor={COLORS.white}
                        placeholderTextColor={COLORS.black}
                        style={{
                          backgroundColor: 'transparent',
                          fontFamily: FONT.Montserrat_Bold,
                          color: COLORS.black,
                        }}
                        textColor={COLORS.black}
                        fontFamily={FONT.Montserrat_Bold}
                        value={address}
                        onChangeText={text => setaddress(text)}
                      />
                    </LinearGradient>
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  marginBottom: heightPercentageToDP(5),
                  margin: heightPercentageToDP(2),
                }}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <TouchableOpacity
                    onPress={submitDeposit}
                    style={{
                      backgroundColor: COLORS.blue,
                      padding: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONT.Montserrat_Regular,
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Skrill;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  copycontent: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  copytitle: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_SemiBold,
  },
  inputContainer: {
    marginTop: heightPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    gap: heightPercentageToDP(2),
  },
  input: {
    height: heightPercentageToDP(7),
    flexDirection: 'row',
    backgroundColor: COLORS.white_s,
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  textInput: {
    marginStart: heightPercentageToDP(1),
    flex: 1,
    fontFamily: FONT.SF_PRO_REGULAR,
    color: COLORS.black,
  },
  subtitle: {
    fontFamily: FONT.Montserrat_SemiBold,
    fontSize: heightPercentageToDP(1.5),
    margin: 5,
  },
  userNameInput: {
    fontFamily: FONT.Montserrat_Regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
  },
});
