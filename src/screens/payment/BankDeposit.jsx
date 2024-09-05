import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import Clipboard from '@react-native-clipboard/clipboard';
import Loading from '../../components/helpercComponent/Loading';
import {TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import axios from 'axios';
import UrlHelper from '../../helper/UrlHelper';
import {
  useCreateBankAccountMutation,
  useCreateDepositMutation,
} from '../../helper/Networkcall';

const upiapidata = [
  {
    name: 'Wasu',
    acccontno: '9876543210@ybl',
    id: '1',
    ifsccode: '837377SBIco',
    bankname: 'SBI',
  },
  {
    name: 'Aman',
    acccontno: '8876543210@ybl',
    id: '2',
    ifsccode: '037377SBIco',
    bankname: 'PND',
  },
  {
    name: 'Zasu',
    acccontno: '7876543210@ybl',
    id: '3',
    ifsccode: '537377SBIco',
    bankname: 'HDFC',
  },
  {
    name: 'Masu',
    acccontno: '1876543210@ybl',
    id: '4',
    ifsccode: '137377SBIco',
    bankname: 'SBI',
  },
  {
    name: 'Kasu',
    acccontno: '2876543210@ybl',
    id: '5',
    ifsccode: '437377SBIco',
    bankname: 'SBI',
  },
];

const BankDeposit = () => {
  const navigation = useNavigation();

  const {accesstoken, user} = useSelector(state => state.user);

  const [bankname, setbankname] = useState('');
  const [accountholdername, setaccountholdername] = useState('');
  const [ifsccode, setifsccode] = useState('');
  const [accountnumber, setaccountnumber] = useState('');

  // TO GET ALL THE ADMIN BANK
  const isFocused = useIsFocused();

  useEffect(() => {
    allTheDepositData();
  }, [isFocused, loadingAllData, allDepositdata]);

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const {data} = await axios.get(UrlHelper.ALL_BANK_API, {
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

  const [createBankAccount, {isLoading, error}] =
    useCreateBankAccountMutation();

  // const submitDeposit = async () => {
  //   if (!bankname) {
  //     Toast.show({type: 'error', text1: 'Enter bank name'});
  //     return;
  //   }
  //   if (!accountholdername) {
  //     Toast.show({type: 'error', text1: 'Enter account holder name'});
  //     return;
  //   }
  //   if (!ifsccode) {
  //     Toast.show({type: 'error', text1: 'Add ifsc code'});
  //     return;
  //   }
  //   if (!accountnumber) {
  //     Toast.show({type: 'error', text1: 'Add account number'});
  //     return;
  //   } else {
  //     try {
  //       const formData = new FormData();
  //       formData.append('bankname', bankname);
  //       formData.append('accountholdername', accountholdername);
  //       formData.append('ifsccode', ifsccode);
  //       formData.append('accountnumber', accountnumber);

  //       console.log('FORM DATA :: ' + JSON.stringify(formData));

  //       const res = await createBankAccount({
  //         accesstoken: accesstoken,
  //         body: formData,
  //       }).unwrap();

  //       Toast.show({type: 'success', text1: 'Success', text2: res.message});
  //       navigation.goBack();
  //     } catch (error) {
  //       console.log('Error during deposit:', error);
  //       if (error.response) {
  //         Toast.show({type: 'error', text1: error.response.data});
  //       } else if (error.request) {
  //         Toast.show({
  //           type: 'error',
  //           text1: 'Request was made, but no response was received',
  //         });
  //       } else {
  //         Toast.show({type: 'error', text1: error.message});
  //       }
  //     }
  //   }
  // };


  const submitDeposit = async () => {
    if (!bankname) {
      Toast.show({ type: 'error', text1: 'Enter bank name' });
      return;
    }
    if (!accountholdername) {
      Toast.show({ type: 'error', text1: 'Enter account holder name' });
      return;
    }
    if (!ifsccode) {
      Toast.show({ type: 'error', text1: 'Add ifsc code' });
      return;
    }
    if (!accountnumber) {
      Toast.show({ type: 'error', text1: 'Add account number' });
      return;
    } else {
      try {
        const body = {
          bankname,
          accountholdername,
          ifsccode,
          accountnumber
        };
  
        console.log('JSON BODY :: ', JSON.stringify(body));
  
        const res = await createBankAccount({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();
  
        Toast.show({ type: 'success', text1: 'Success', text2: res.message });
        navigation.goBack();
      } catch (error) {
        console.log('Error during deposit:', error);
        if (error.response) {
          Toast.show({ type: 'error', text1: error.response.data });
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Request was made, but no response was received',
          });
        } else {
          Toast.show({ type: 'error', text1: error.message });
        }
      }
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
              height: heightPercentageToDP(85),
            }}
            imageStyle={{
              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
            <View
              style={{
                height: heightPercentageToDP(85),
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
                  Bank Deposit
                </GradientTextWhite>
              </View>

              {/** FOR UPI DEPOSIT FORM */}

              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    height: heightPercentageToDP(70),
                    padding: heightPercentageToDP(2),
                  }}>
                  {/** BANK NAME */}
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
                      Bank Name
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
                        value={bankname}
                        onChangeText={text => setbankname(text)}
                      />
                    </LinearGradient>
                  </View>

                  {/** ACCOUNT HOLDER NAME */}

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
                      Account holder name
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
                        value={accountholdername}
                        onChangeText={text => setaccountholdername(text)}
                      />
                    </LinearGradient>
                  </View>

                  {/** IFSC CODE */}
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
                      IFSC code
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
                        value={ifsccode}
                        onChangeText={text => setifsccode(text)}
                      />
                    </LinearGradient>
                  </View>

                  {/** ACCOUNT NUMBER */}

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
                      Account number
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
                        value={accountnumber}
                        onChangeText={text => setaccountnumber(text)}
                      />
                    </LinearGradient>
                  </View>
                </View>
              </ScrollView>

              <View
                style={{
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

export default BankDeposit;

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
    height: heightPercentageToDP(5),
  },
  copytitle: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_SemiBold,
    height: heightPercentageToDP(5),
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
