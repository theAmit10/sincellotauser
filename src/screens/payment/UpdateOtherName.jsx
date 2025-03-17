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
import mime from 'mime';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Clipboard from '@react-native-clipboard/clipboard';

import {TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

import axios from 'axios';
import {COLORS, FONT} from '../../../assets/constants';
import {
  useCreateOtherPaymentAccountMutation,
  useCreateUPIAccountMutation,
  useGetOtherPaymentNameQuery,
  useUpdateOtherPaymentNameMutation,
} from '../../helper/Networkcall';
import UrlHelper from '../../helper/UrlHelper';
import Background from '../../components/background/Background';
import Loading from '../../components/helpercComponent/Loading';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';

const UpdateOtherName = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {accesstoken, user} = useSelector(state => state.user);

  const [upiVisible, setUpiVisible] = useState(false);

  const [upiholdername, setupiholdername] = useState('');
  const [upiid, setupiid] = useState('');
  const [paymentnote, setpaymentnote] = useState('');

  const toggleUpiOptionView = () => {
    setUpiVisible(!upiVisible);
  };

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

  const [imageFileName, setImageFileName] = useState('Choose a file');
  const [mineImage, setMineImage] = useState(null);

  const [imageSource, setImageSource] = useState(null);

  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [thirdInput, setThirdInput] = useState('');

  // For Opening PhoneStorage
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });

      if (doc) {
        console.log(doc);

        setMineImage(doc);
        setImageSource({uri: doc[0].uri});
        setImageFileName(doc[0].name);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const submitDeposit = async () => {
    if (!upiholdername) {
      Toast.show({type: 'error', text1: 'Enter UPI holder name'});
      return;
    }
    if (!upiid) {
      Toast.show({type: 'error', text1: 'Enter UPI ID'});
      return;
    }
    if (!paymentnote) {
      Toast.show({type: 'error', text1: 'Enter payment note'});
      return;
    }
    if (!imageSource) {
      Toast.show({type: 'error', text1: 'Add QR code'});
      return;
    } else {
      console.log('Create UPI Running');
      try {
        const formData = new FormData();
        formData.append('upiholdername', upiholdername);
        formData.append('upiid', upiid);
        formData.append('paymentnote', paymentnote);
        formData.append('userId', user.userId);
        formData.append('qrcode', {
          uri: mineImage[0].uri,
          name: mineImage[0].name,
          type: mineImage[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
        });

        console.log('FORM DATA :: ' + JSON.stringify(formData));

        const res = await createUPIAccount({
          accesstoken: accesstoken,
          body: formData,
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

  const {
    isLoading: loadingOtherPayment,
    data: otherPaymentData,
    refetch: refetchOtherPayment,
  } = useGetOtherPaymentNameQuery({accesstoken});

  const [firstInputName, setFirstInputName] = useState('');
  const [secondInputName, setSecondInputName] = useState('');
  const [thirdInputName, setThirdInputName] = useState('');
  const [fourthInputName, setFourthInputName] = useState('');

  useEffect(() => {
    if (!loadingOtherPayment && otherPaymentData) {
      setFirstInputName(otherPaymentData?.inputNames?.firstInputName);
      setSecondInputName(otherPaymentData?.inputNames?.secondInputName);
      setThirdInputName(otherPaymentData?.inputNames?.thirdInputName);
      setFourthInputName(otherPaymentData?.inputNames?.fourthInputName);
    }
  }, [loadingOtherPayment, otherPaymentData]);

  //  FOR CREATING UPI

  const [createOtherPaymentAccount, {isLoading, error}] =
    useCreateOtherPaymentAccountMutation();

  const submitCreateRequest = async () => {
    if (otherPaymentData) {
      if (firstInputName && !firstInput) {
        Toast.show({
          type: 'error',
          text1: `Enter ${
            otherPaymentData?.inputNames?.firstInputName || 'value'
          }`,
        });
        return;
      }
      if (secondInputName && !secondInput) {
        Toast.show({
          type: 'error',
          text1: `Enter ${
            otherPaymentData?.inputNames?.secondInputName || 'value'
          }`,
        });
        return;
      }
      if (thirdInputName && !thirdInput) {
        Toast.show({
          type: 'error',
          text1: `Enter ${
            otherPaymentData?.inputNames?.thirdInputName || 'value'
          }`,
        });
        return;
      }

      if (fourthInputName && !imageSource) {
        Toast.show({
          type: 'error',
          text1: 'Add QR code',
        });
        return;
      }
      if (!paymentnote) {
        showErrorToast('Add payment note');
        return;
      } else {
        console.log('Create other payment Running');
        try {
          const formData = new FormData();
          // ✅ Append fields dynamically only if they have data
          if (firstInput) formData.append('firstInput', firstInput);
          if (secondInput) formData.append('secondInput', secondInput);
          if (thirdInput) formData.append('thirdInput', thirdInput);
          if (imageSource) formData.append('qrcode', imageSource);
          if (paymentnote) formData.append('paymentnote', paymentnote);

          const res = await createOtherPaymentAccount({
            accesstoken: accesstoken,
            body: formData,
          }).unwrap();

          Toast.show({type: 'success', text1: 'Success', text2: res.message});

          navigation.goBack();
        } catch (error) {
          showErrorToast('Something went wrong');
          console.log('Error during create upi:', error);
        }
      }
    } else {
      showErrorToast('Something went wrong');
      return;
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
      const {data} = await axios.get(UrlHelper.ALL_UPI_API, {
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

  const [updateOtherPaymentName, {isLoading: updateOPSettingLoading}] =
    useUpdateOtherPaymentNameMutation();

  const submitUpdateSetting = async () => {
    if (otherPaymentData) {
      console.log('Create other Running');
      try {
        const body = {
          firstInputName: firstInputName,
          secondInputName: secondInputName,
          thirdInputName: thirdInputName,
          fourthInputName: fourthInputName,
        };

        const res = await updateOtherPaymentName({
          accesstoken: accesstoken,
          body,
        }).unwrap();

        Toast.show({
          type: 'success',
          text1: res.message,
        });
        await refetchOtherPayment();
        allTheDepositData();
        navigation.goBack();
      } catch (error) {
        Toast.show({type: 'error', text1: 'Something went wrong'});
        console.log('Error during create upi:', error);
      }
    } else {
      Toast.show({type: 'error', text1: 'Something went wrong'});
      return;
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
                  Update Other Payment
                </GradientTextWhite>
              </View>

              {/** FOR UPI DEPOSIT FORM */}
              {loadingOtherPayment ? (
                <Loading />
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  automaticallyAdjustKeyboardInsets>
                  <View
                    style={{
                      padding: heightPercentageToDP(2),
                    }}>
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
                        First input name
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
                          value={firstInputName}
                          inputMode="text"
                          onChangeText={text => setFirstInputName(text)}
                        />
                      </LinearGradient>
                    </View>

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
                        Second input name
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
                          value={secondInputName}
                          inputMode="text"
                          onChangeText={text => setSecondInputName(text)}
                        />
                      </LinearGradient>
                    </View>

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
                        Third input name
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
                          value={thirdInputName}
                          inputMode="text"
                          onChangeText={text => setThirdInputName(text)}
                        />
                      </LinearGradient>
                    </View>

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
                        Fourth input name
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
                          value={fourthInputName}
                          inputMode="text"
                          onChangeText={text => setFourthInputName(text)}
                        />
                      </LinearGradient>
                    </View>
                  </View>
                </ScrollView>
              )}

              <View
                style={{
                  marginBottom: heightPercentageToDP(5),
                  margin: heightPercentageToDP(2),
                }}>
                {updateOPSettingLoading ? (
                  <Loading />
                ) : (
                  <TouchableOpacity
                    onPress={submitUpdateSetting}
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

export default UpdateOtherName;

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
