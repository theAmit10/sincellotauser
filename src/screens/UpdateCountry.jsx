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
import mime from 'mime';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import Clipboard from '@react-native-clipboard/clipboard';
import Loading from '../components/helpercComponent/Loading';
import {TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import {
  useCreateCurrencyMutation,
  useCreateUPIAccountMutation,
  useGetAllLocationWithTimeQuery,
  useUpdateCurrencyMutation,
} from '../helper/Networkcall';

const upiapidata = [
  {name: 'Wasu', upiid: '9876543210@ybl', id: '1'},
  {name: 'Aman', upiid: '8876543210@ybl', id: '2'},
  {name: 'Zasu', upiid: '7876543210@ybl', id: '3'},
  {name: 'Masu', upiid: '1876543210@ybl', id: '4'},
  {name: 'Kasu', upiid: '2876543210@ybl', id: '5'},
];

const UpdateCountry = ({route}) => {
  const {item} = route.params;

  console.log('item :: ' + item);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {accesstoken} = useSelector(state => state.user);

  const [
    countrycurrencyvaluecomparedtoinr,
    setcountrycurrencyvaluecomparedtoinr,
  ] = useState(item.countrycurrencyvaluecomparedtoinr);
  const [countrycurrencysymbol, setcountrycurrencysymbol] = useState(
    item.countrycurrencysymbol,
  );
  const [ticketprice, setticketprice] = useState(item.ticketprice.toString());
  const [multiplierprice, setmultiplierprice] = useState(
    item.multiplierprice.toString(),
  );

  const [imageFileName, setImageFileName] = useState('Choose a file');
  const [mineImage, setMineImage] = useState(null);
  const [imageSource, setImageSource] = useState(null);

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

  const [updateCurrency, {isLoading, error}] = useUpdateCurrencyMutation();

  const submitDeposit = async () => {
    if (!countrycurrencyvaluecomparedtoinr) {
      Toast.show({
        type: 'error',
        text1: 'Enter currency value compared to INR',
      });
      return;
    } else if (!countrycurrencysymbol) {
      Toast.show({type: 'error', text1: 'Enter currency name'});
      return;
    } else {
      console.log('Update Currency Running');

      if (imageSource) {
        try {
          // const formData = {
          //   countrycurrencyvaluecomparedtoinr: countrycurrencyvaluecomparedtoinr,
          //   countrycurrencysymbol: countrycurrencysymbol,
          // };

          const formData = new FormData();

          formData.append('countrycurrencysymbol', countrycurrencysymbol);
          formData.append('ticketprice', ticketprice);
          formData.append('multiplierprice', multiplierprice);
          formData.append(
            'countrycurrencyvaluecomparedtoinr',
            countrycurrencyvaluecomparedtoinr,
          );
          formData.append('countryicon', {
            uri: mineImage[0].uri,
            name: mineImage[0].name,
            type: mineImage[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
          });

          console.log('FORM DATA :: ' + JSON.stringify(formData));

          const res = await updateCurrency({
            accesstoken: accesstoken,
            id: item._id,
            body: formData,
          }).unwrap();

          console.log('Res :: ' + res);
          console.log('Res String :: ' + JSON.stringify(res));

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
      } else {
        try {
          // const formData = {
          //   countrycurrencyvaluecomparedtoinr: countrycurrencyvaluecomparedtoinr,
          //   countrycurrencysymbol: countrycurrencysymbol,
          // };

          const formData = new FormData();

          formData.append('countrycurrencysymbol', countrycurrencysymbol);
          formData.append('ticketprice', ticketprice);
          formData.append('multiplierprice', multiplierprice);
          formData.append(
            'countrycurrencyvaluecomparedtoinr',
            countrycurrencyvaluecomparedtoinr,
          );

          console.log('FORM DATA :: ' + JSON.stringify(formData));

          const res = await updateCurrency({
            accesstoken: accesstoken,
            id: item._id,
            body: formData,
          }).unwrap();

          console.log('Res :: ' + res);
          console.log('Res String :: ' + JSON.stringify(res));

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-60}>
        <Background />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ImageBackground
            source={require('../../assets/image/tlwbg.jpg')}
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
                  Update country
                </GradientTextWhite>
                <GradientTextWhite
                  style={{
                    ...styles.textStyletwo,
                    marginTop: heightPercentageToDP(4),
                  }}>
                  {item.countryname}
                </GradientTextWhite>
                <GradientTextWhite style={styles.textStyletwo}>
                  {item.countrycurrencysymbol}
                </GradientTextWhite>
              </View>

              {/** FOR UPI DEPOSIT FORM */}

              <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets>
                <View
                  style={{
                    padding: heightPercentageToDP(2),
                  }}>
                  {/** country val */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_SemiBold,
                        color: COLORS.black,
                        fontSize: heightPercentageToDP(2),
                        paddingStart: heightPercentageToDP(1),
                      }}>
                      Currency value
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
                        value={countrycurrencyvaluecomparedtoinr}
                        onChangeText={text =>
                          setcountrycurrencyvaluecomparedtoinr(text)
                        }
                      />
                    </LinearGradient>
                  </View>

                  {/** CURRENCY NAME */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_SemiBold,
                        color: COLORS.black,
                        fontSize: heightPercentageToDP(2),
                        paddingStart: heightPercentageToDP(1),
                      }}>
                      Currency name
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
                        value={countrycurrencysymbol}
                        onChangeText={text => setcountrycurrencysymbol(text)}
                      />
                    </LinearGradient>
                  </View>

                  {/** TICKET PRICE */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_SemiBold,
                        color: COLORS.black,
                        fontSize: heightPercentageToDP(2),
                        paddingStart: heightPercentageToDP(1),
                      }}>
                      Ticket Price
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
                        value={ticketprice}
                        onChangeText={text => setticketprice(text)}
                      />
                    </LinearGradient>
                  </View>

                  {/** MULTIPLIER PRICE */}
                  <View
                    style={{
                      borderRadius: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_SemiBold,
                        color: COLORS.black,
                        fontSize: heightPercentageToDP(2),
                        paddingStart: heightPercentageToDP(1),
                      }}>
                      Multiplier Price
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
                        value={multiplierprice}
                        onChangeText={text => setmultiplierprice(text)}
                      />
                    </LinearGradient>
                  </View>

                  {/** country icon */}

                  <TouchableOpacity
                    onPress={selectDoc}
                    style={{
                      borderRadius: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_SemiBold,
                        color: COLORS.black,
                        fontSize: heightPercentageToDP(2),
                        paddingStart: heightPercentageToDP(1),
                      }}>
                      Icon
                    </Text>

                    <LinearGradient
                      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        borderRadius: heightPercentageToDP(2),
                        flexDirection: 'row',
                        alignItems: 'center', // Ensures vertical alignment of items
                        padding: heightPercentageToDP(0.5), // Adjust padding for spacing
                      }}>
                      <Text
                        style={{
                          backgroundColor: 'transparent',
                          fontFamily: FONT.HELVETICA_REGULAR,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          textAlign: 'left',
                          paddingStart: heightPercentageToDP(2), // Padding for spacing on the left
                          flex: 1, // Let the text take available space
                        }}>
                        {imageFileName}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingEnd: heightPercentageToDP(2),
                        }}>
                        <LinearGradient
                          colors={[COLORS.grayBg, COLORS.white_s]}
                          style={{borderRadius: 20, padding: 10}}>
                          <AntDesign
                            name={'upload'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
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

export default UpdateCountry;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  textStyletwo: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Regular,
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
