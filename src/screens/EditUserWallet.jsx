import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import LinearGradient from 'react-native-linear-gradient';

const EditUserWallet = ({route}) => {
  const {data, forwallet} = route.params;

  const url =
    forwallet === 'one'
      ? `${UrlHelper.USER_WALLET_ONE_MODIFICATION_API}/${data._id}`
      : `${UrlHelper.USER_WALLET_TWO_MODIFICATION_API}/${data._id}`;

  console.log(JSON.stringify(data));
  console.log("UPdate :: "+url)
  
  const [amount, setAmount] = useState('');
  const [walletVisibilty, setWalletVisibility] = useState(data.visibility);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showProgressBar, setProgressBar] = useState(false);

  const {accesstoken} = useSelector(state => state.user);

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
        const {data} = await axios.put(
          url,
          {
            balance: amount,
            visibility: walletVisibilty,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accesstoken}`,
            },
          },
        );

        console.log('datat :: ' + data);

        Toast.show({
          type: 'success',
          text1: 'User Wallet Updated Successfully',
        });
        setProgressBar(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'AdminDashboard'}],
        });
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

  return (
    <View style={{flex: 1}}>
      <Background />

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Wallet</GradientText>
        <GradientText style={styles.textStyle}>Balance</GradientText>
      </View>

      {/** Login Cointainer */}

      <View
        style={{
          height: heightPercentageToDP(65),
          width: widthPercentageToDP(100),
          backgroundColor: COLORS.white_s,
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
            }}></View>
        </View>

        {/** Result Main Container */}

        <View style={{padding: heightPercentageToDP(2)}}>
          <GradientText
            style={{
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(3),
              color: COLORS.black,
              marginBottom: heightPercentageToDP(1),
            }}>
            {data.walletName}
          </GradientText>
          <GradientText
            style={{
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2),
              color: COLORS.black,
              marginBottom: heightPercentageToDP(1),
            }}>
            Current Balance
          </GradientText>
          <GradientText style={styles.textStyle}>₹ {data.balance}</GradientText>

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
            <LinearGradient
              colors={[COLORS.lightGray, COLORS.white_s]}
              className="rounded-full p-2">
              <MaterialCommunityIcons
                name={'currency-inr'}
                size={heightPercentageToDP(3)}
                color={COLORS.darkGray}
              />
            </LinearGradient>
            <TextInput
              style={{
                marginStart: heightPercentageToDP(1),
                flex: 1,
                fontFamily: FONT.SF_PRO_REGULAR,
                fontSize: heightPercentageToDP(2),
                color: COLORS.black
              }}
              placeholder="Enter Amount"
              label="Balance"
              value={amount}
              onChangeText={text => setAmount(text)}
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
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

                  <Text
                    style={{
                      color: COLORS.darkGray,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      textAlignVertical: 'center',
                      paddingStart: heightPercentageToDP(1),
                    }}>
                    Visibilty
                  </Text>
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
    </View>
  );
};

export default EditUserWallet;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
