import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import LoginBackground from '../components/login/LoginBackground';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {register} from '../redux/actions/userAction';
import {useMessageAndErrorUser} from '../utils/hooks';
import Loading from '../components/helpercComponent/Loading';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import AdminAuthLoginBackground from '../components/login/AdminAuthLoginBackground';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const Register = ({route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [firstNameVal, setFirstName] = useState('');
  const [secondNameVal, setSecondName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const [selectedRole, setSelectedRole] = useState('admin');

  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '412257267839-e6d36ambgqs0ufglgndb21pr74j720se.apps.googleusercontent.com',
      iosClientId:
        '933772582958-d9jg0dvdkei7r75uapoc169vdq0tu25m.apps.googleusercontent.com',
      // androidClientId: '191145196270-ru4ac3nj22665k2ldtvqjvd0c4361qiu.apps.googleusercontent.com',
      // offlineAccess: true
    });
  }, []);

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        console.log(result);

        setEmail(result.user.email);
        setFirstName(result.user.givenName);
        setSecondName(result.user.familyName);
        setProfileImage(result.user.photo);

        navigation.navigate('GoogleAuthPassword', {data: result});
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibilityConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, 'SplashScreen');

  const [showProgressBar, setProgressBar] = useState(false);

  const submitHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Enter name',
      });
    } else if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Enter email address',
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Enter valid email address',
      });
    } else if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Enter password',
      });
    } else if (!confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Enter confirm password',
      });
    } else if (password != confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password and Confirm Password Not Matched',
      });
    } 
    else if (!selectedCountry === 'Select Country') {
      Toast.show({
        type: 'error',
        text1: 'Please select your country',
      });
    }
    else {
      // const myform = new FormData();

      // myform.append('name', name);
      // myform.append('email', email);
      // myform.append('password', password);

      console.log(name, email, password, confirmPassword, selectedRole);

      // dispatch(register(name, email, password,selectedRole));

      Toast.show({
        type: 'success',
        text1: 'Processing',
      });

      setProgressBar(true);

      try {
        const {data} = await axios.post(
          UrlHelper.REGISTER_API,
          {
            name,
            email,
            password,
            role: selectedRole,
            country: route.params?.country._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('datat :: ' + data);

        Toast.show({
          type: 'success',
          text1: data.message,
        });
        setProgressBar(false);
        navigation.navigate('Login');
      } catch (error) {
        setProgressBar(false);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
        console.log(error);
        console.log(error.response);
        console.log(error.response.data.message);
        
      }
    }
  };

  useEffect(() => {
    if (route.params?.country) {
      setSelectedCountry(route.params.country.countryname);
      console.log('Country :: ' + JSON.stringify(route.params?.country));
    }
  }, [route.params?.country]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-60}>
        <AdminAuthLoginBackground />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ImageBackground
            source={require('../../assets/image/tlwbg.jpg')}
            style={{
              width: '100%',
              height: heightPercentageToDP(80),
            }}
            imageStyle={{
              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
            {/** Login Cointainer */}

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

              {/** Login Main Container */}
              <View
                style={{
                  flex: 1,
                  margin: heightPercentageToDP(2),
                }}>
                <GradientTextWhite style={styles.textStyle}>
                  Register Now
                </GradientTextWhite>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      marginTop: heightPercentageToDP(3),
                      paddingVertical: heightPercentageToDP(2),
                      gap: heightPercentageToDP(2),
                    }}>
                    {/** Name container */}

                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        flexDirection: 'row',
                        backgroundColor: COLORS.white_s,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                      }}>
                      <Entypo
                        name={'user'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                      <TextInput
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.SF_PRO_REGULAR,
                          color: COLORS.black,
                        }}
                        placeholder="Name"
                        placeholderTextColor={COLORS.black}
                        label="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                      />
                    </View>

                    {/** Email container */}
                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        flexDirection: 'row',
                        backgroundColor: COLORS.white_s,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                      }}>
                      <Fontisto
                        name={'email'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                      <TextInput
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.SF_PRO_REGULAR,
                          color: COLORS.black,
                        }}
                        placeholder="Email"
                        placeholderTextColor={COLORS.black}
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                      />
                    </View>

                    {/** Password container */}
                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        flexDirection: 'row',
                        backgroundColor: COLORS.white_s,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                      }}>
                      <Entypo
                        name={'lock'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                      <TextInput
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.SF_PRO_REGULAR,
                          color: COLORS.black,
                        }}
                        placeholder="Password"
                        value={password}
                        placeholderTextColor={COLORS.black}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!passwordVisible}
                      />
                      <Entypo
                        onPress={togglePasswordVisibility}
                        name={passwordVisible ? 'eye' : 'eye-with-line'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                    </View>

                    {/** Confirm Password container */}
                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        flexDirection: 'row',
                        backgroundColor: COLORS.white_s,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                      }}>
                      <Entypo
                        name={'lock'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                      <TextInput
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.SF_PRO_REGULAR,
                          color: COLORS.black,
                        }}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        placeholderTextColor={COLORS.black}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry={!confirmPasswordVisible}
                      />
                      <Entypo
                        onPress={togglePasswordVisibilityConfirmPassword}
                        name={confirmPasswordVisible ? 'eye' : 'eye-with-line'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                    </View>

                       {/** Country container */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SelectCountry', {
                        fromScreen: 'Register',
                        signupwith: 'emailtype',
                      })
                    }
                    style={{
                      height: heightPercentageToDP(7),
                      flexDirection: 'row',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      marginBottom: heightPercentageToDP(2),
                    }}>
                    <Entypo
                      name={'location'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.SF_PRO_REGULAR,
                        color: COLORS.black,
                      }}>
                      {selectedCountry}
                    </Text>
                    <Entypo
                      name={'chevron-with-circle-down'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </TouchableOpacity>

                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        borderRadius: heightPercentageToDP(1),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: heightPercentageToDP(2),
                      }}>
                      <TouchableOpacity
                        onPress={() => setSelectedRole('admin')}
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.white_s,
                          paddingHorizontal: heightPercentageToDP(1),
                          borderRadius: heightPercentageToDP(1),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor:
                            selectedRole === 'admin'
                              ? COLORS.green
                              : COLORS.grayBg,
                          borderWidth: 2,
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_Bold,
                            fontSize: heightPercentageToDP(2),
                          }}>
                          Admin
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setSelectedRole('subadmin')}
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.white_s,
                          paddingHorizontal: heightPercentageToDP(1),
                          borderRadius: heightPercentageToDP(1),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor:
                            selectedRole === 'subadmin'
                              ? COLORS.green
                              : COLORS.grayBg,
                          borderWidth: 2,
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_Bold,
                            fontSize: heightPercentageToDP(2),
                          }}>
                          Sub Admin
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={GoogleSingUp}
                      style={{
                        padding: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                        alignItems: 'center',
                        backgroundColor: COLORS.white_s,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: heightPercentageToDP(2),
                      }}>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontFamily: FONT.Montserrat_Regular,
                        }}>
                        Sign up with Google
                      </Text>
                      <Fontisto
                        name={'google'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                    </TouchableOpacity>

                    {showProgressBar ? (
                      <View style={{padding: heightPercentageToDP(2)}}>
                        <Loading />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={submitHandler}
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

                    <View
                      style={{
                        padding: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: COLORS.gray2,
                          fontFamily: FONT.Montserrat_Regular,
                        }}>
                        Already have account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.blue,
                          }}>
                          {' '}
                          Sign In
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.white_s,
  },
});
