import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Switch,
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
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Toast from 'react-native-toast-message';
import Background from '../components/background/Background';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import LinearGradient from 'react-native-linear-gradient';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {roundToInteger} from './UserDetails';
import {loadSingleUser} from '../redux/actions/userAction';

const EditUserWallet = ({route}) => {
  const {data, forwallet, singleuserdata} = route.params;

  const url =
    forwallet === 'one'
      ? `${UrlHelper.USER_WALLET_ONE_MODIFICATION_API}/${data._id}`
      : `${UrlHelper.USER_WALLET_TWO_MODIFICATION_API}/${data._id}`;

  console.log(JSON.stringify(data));

  const [walletBalance, setWalletBalance] = useState(data.balance)
 
  console.log('UPdate :: ' + url);
  console.log('Wallet Balance :: ' +  data.balance);

  const [amount, setAmount] = useState('');
  const [paymentUpdateNote, setpaymentUpdateNote] = useState('');
  const [walletVisibilty, setWalletVisibility] = useState(data.visibility);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showProgressBar, setProgressBar] = useState(false);

  const {singleuser, accesstoken, loadingSingleUser} = useSelector(
    state => state.user,
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (singleuserdata.userId) {
      dispatch(loadSingleUser(accesstoken, singleuserdata.userId));
    } else {
      dispatch(loadSingleUser(accesstoken, singleuserdata._id));
    }
  }, [dispatch, isFocused, data]);

  const toggleVisibility = () => {
    setWalletVisibility(!walletVisibilty);
  };

  const submitHandler = async () => {
    if (!amount) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Amount',
      });
    } else {
      setProgressBar(true);

      try {
        const newWalletBalance = plusOperation
          ? parseFloat(walletBalance) + parseFloat(amount)
          : parseFloat(walletBalance) - parseFloat(amount);

        const {data} = await axios.put(
          url,
          {
            balance: newWalletBalance,
            visibility: walletVisibilty,
            paymentUpdateNote: paymentUpdateNote,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accesstoken}`,
            },
          },
        );

        console.log('datat :: ' + JSON.stringify(data));
        console.log("Updated Balance Now : ",data.updatedWallet.balance)
        setWalletBalance(data.updatedWallet.balance)

        Toast.show({
          type: 'success',
          text1: 'User Wallet Updated Successfully',
        });
        setProgressBar(false);
        // navigation.goBack();
        console.log('USer ID', singleuserdata.userId);
        dispatch(loadSingleUser(accesstoken, singleuserdata.userId));
        setAmount('');
        setpaymentUpdateNote('');
        setWalletBalance
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'AdminDashboard'}],
        // });
      } catch (error) {
        setProgressBar(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
        console.log(error);
      }
    }
  };

  const loading = false;

  const [plusOperation, setPlusOperation] = useState(true);

  const settingOperationWork = () => {
    setPlusOperation(prevState => !prevState);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>Wallet</GradientText>
          <GradientText style={styles.textStyle}>Balance</GradientText>
        </View>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(65),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          {/** Login Cointainer */}

          <View
            style={{
              height: heightPercentageToDP(65),
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
                {singleuser.name}
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
                {singleuser.country?.countryname}
              </Text>
            </View>

            {/** Result Main Container */}

            {loadingSingleUser ? (
              <Loading />
            ) : (
              <View style={{padding: heightPercentageToDP(2)}}>
                <GradientTextWhite
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(3),
                    color: COLORS.white_s,
                    marginBottom: heightPercentageToDP(1),
                  }}>
                  {data.walletName}
                </GradientTextWhite>
                <GradientTextWhite
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.white_s,
                    marginBottom: heightPercentageToDP(1),
                  }}>
                  Current Balance
                </GradientTextWhite>
                <GradientText style={styles.textStyle}>
                  {forwallet === 'one'
                    ? roundToInteger(singleuser?.walletOne?.balance)
                    : roundToInteger(singleuser?.walletTwo?.balance)}
                  <Text style={{fontSize: heightPercentageToDP(1.5)}}>
                    {singleuser?.country?.countrycurrencysymbol}
                  </Text>
                </GradientText>

                {/** Change name container */}

                <View
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.grayBg,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(5),
                  }}>
                  <TouchableOpacity onPress={settingOperationWork}>
                    <LinearGradient
                      colors={[COLORS.lightGray, COLORS.white_s]}
                      className="rounded-full p-2"
                      style={{
                        borderColor: COLORS.green,
                        borderWidth: 2,
                      }}>
                      {plusOperation ? (
                        <AntDesign
                          name={'plus'}
                          size={heightPercentageToDP(3)}
                          color={COLORS.darkGray}
                        />
                      ) : (
                        <AntDesign
                          name={'minus'}
                          size={heightPercentageToDP(3)}
                          color={COLORS.darkGray}
                        />
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.SF_PRO_REGULAR,
                      fontSize: heightPercentageToDP(2.2),
                      color: COLORS.black,
                    }}
                    placeholder="Enter Amount"
                    placeholderTextColor={COLORS.black}
                    label="Balance"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                  />
                </View>

                <View
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.grayBg,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  <LinearGradient
                    colors={[COLORS.lightGray, COLORS.white_s]}
                    className="rounded-full p-2">
                    <MaterialCommunityIcons
                      name={'note-outline'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </LinearGradient>
                  <TextInput
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.SF_PRO_REGULAR,
                      fontSize: heightPercentageToDP(2.2),
                      color: COLORS.black,
                    }}
                    placeholder="Enter Note"
                    placeholderTextColor={COLORS.black}
                    value={paymentUpdateNote}
                    onChangeText={text => setpaymentUpdateNote(text)}
                  />
                </View>

                {/** Dark Mode */}

                <View>
                  <TouchableOpacity
                    style={{
                      height: heightPercentageToDP(7),
                      flexDirection: 'row',
                      backgroundColor: COLORS.grayBg,
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      marginTop: heightPercentageToDP(2),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', flex: 5}}>
                        <LinearGradient
                          colors={[COLORS.lightGray, COLORS.white_s]}
                          className="rounded-full p-2">
                          <Ionicons
                            name={'wallet'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>

                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: COLORS.black,
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(2),
                              paddingStart: heightPercentageToDP(1),
                            }}>
                            Visibilty
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{textAlignVertical: 'center'}}>
                          <Switch
                            value={walletVisibilty}
                            onValueChange={toggleVisibility}
                            trackColor={{false: '#767577', true: '#81b0ff'}} // Change background color
                            thumbColor={data.visibility ? '#f4f3f4' : '#f4f3f4'} // Change thumb color
                            ios_backgroundColor="#3e3e3e"
                          />
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {showProgressBar ? (
              <View style={{flex: 1}}>
                <Loading />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'flex-end',
                  flex: 1,
                  alignItems: 'flex-end',
                  paddingVertical: heightPercentageToDP(4),
                  paddingHorizontal: heightPercentageToDP(2),
                }}>
                <TouchableOpacity
                  onPress={submitHandler}
                  className="rounded-full"
                  style={{
                    height: heightPercentageToDP(7),
                    width: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.blue,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <Ionicons
                    name={'send'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default EditUserWallet;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
