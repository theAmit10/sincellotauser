import {
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
import LoginBackground from '../components/login/LoginBackground';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions/userAction';
import {useMessageAndErrorUser} from '../utils/hooks';
import Background from '../components/background/Background';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {useUpdateGameBasicMutation} from '../helper/Networkcall';

const GameDescritptionDetails = ({route}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {accesstoken} = useSelector(state => state.user);
  const {locationdata} = route.params;

  console.log(locationdata);

  const [titleValue, setTitle] = useState(
    locationdata?.locationTitle === '' ? '' : locationdata?.locationTitle,
  );
  const [discriptionValue, setDescription] = useState(
    locationdata?.locationDescription === ''
      ? ''
      : locationdata?.locationDescription,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  // For Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // for Submitting Response
  const submitHandler = () => {
    console.log('Working on login ');
  };

  const loading = false;

  const [showProgressBar, setProgressBar] = useState(false);

  const [updateGameBasic, {isLoading: updateGameBasicIsLoading}] =
    useUpdateGameBasicMutation();

  const updateProfileHandler = async () => {
    if (!titleValue) {
      Toast.show({
        type: 'error',
        text1: 'Enter Game Title',
      });
    } else if (!discriptionValue) {
      Toast.show({
        type: 'error',
        text1: 'Enter Game Discription',
      });
    } else {
      setProgressBar(true);

      try {
        if (locationdata._id === 'powerball') {
          const body = {
            title: titleValue,
            description: discriptionValue,
          };

          const res = await updateGameBasic({
            accesstoken,
            body,
          }).unwrap();
          console.log(JSON.stringify(res));

          // prefetch();

          Toast.show({
            type: 'success',
            text1: res?.message,
          });
        } else {
          const url = `${UrlHelper.UPDATE_LOCATION_API}/${locationdata._id}`;
          const {data} = await axios.put(
            url,
            {
              locationTitle: titleValue,
              locationDescription: discriptionValue,
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
            text1: data.message,
          });
        }

        setProgressBar(false);

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(75),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          {/** Login Cointainer */}

          <View
            style={{
              height: heightPercentageToDP(75),
              width: widthPercentageToDP(100),

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

            {/** Game Description Main Container */}
            <View
              style={{
                flex: 1,
                margin: heightPercentageToDP(2),
              }}>
              <GradientTextWhite style={styles.textStyle}>
                {locationdata.lotlocation}
              </GradientTextWhite>
              <GradientTextWhite style={styles.textStyle}>
                Details
              </GradientTextWhite>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    marginTop: heightPercentageToDP(3),
                    paddingVertical: heightPercentageToDP(2),
                    gap: heightPercentageToDP(2),
                  }}>
                  {/** Title container */}

                  <View
                    style={{
                      height: heightPercentageToDP(7),
                      flexDirection: 'row',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                    }}>
                    <LinearGradient
                      colors={[COLORS.lightWhite, COLORS.white_s]}
                      className="rounded-xl p-1">
                      <MaterialIcons
                        name={'description'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.black}
                      />
                    </LinearGradient>
                    <TextInput
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.black,
                      }}
                      placeholder="Enter Title"
                      placeholderTextColor={COLORS.black}
                      label="location"
                      value={titleValue}
                      onChangeText={text => setTitle(text)}
                    />
                  </View>

                  {/** Description Containter */}

                  <View
                    style={{
                      height: heightPercentageToDP(20),
                      flexDirection: 'row',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'flex-start',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                    }}>
                    <TextInput
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        minHeight: heightPercentageToDP(20),
                        textAlignVertical: 'top',
                        color: COLORS.black,
                      }}
                      placeholder="Enter Description"
                      placeholderTextColor={COLORS.black}
                      label="location"
                      value={discriptionValue}
                      onChangeText={text => setDescription(text)}
                      multiline={true}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>

            {showProgressBar ? (
              <View style={{height: heightPercentageToDP(15)}}>
                <Loading />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'flex-end',
                  height: heightPercentageToDP(15),
                  alignItems: 'flex-end',
                  paddingVertical: heightPercentageToDP(4),
                  paddingHorizontal: heightPercentageToDP(2),
                }}>
                <TouchableOpacity
                  onPress={updateProfileHandler}
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

export default GameDescritptionDetails;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.white_s,
  },
});
