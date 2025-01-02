import {
  FlatList,
  Image,
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
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {
  useAddAppLinkMutation,
  useDeleteAppLinkMutation,
  useGetAppLinkQuery,
} from '../helper/Networkcall';
import Loading from '../components/helpercComponent/Loading';

const UpdateApplink = ({route}) => {
  const {fromapp} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(true);
  const [showAddAndroid, setShowAndroid] = useState(false);
  const [showAddIos, setShowAddIos] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [androidLink, setAndroidLink] = useState('');
  const [iosLink, setIosLink] = useState('');
  const [title, setTitle] = useState('App Link');

  const {accesstoken} = useSelector(state => state.user);
  const {data, isLoading, refetch} = useGetAppLinkQuery(accesstoken);

  useEffect(() => {
    try {
      refetch();
    } catch (error) {
      console.error('Error during refetch:', error);
    }
  }, [refetch]);

  useEffect(() => {
    if (!isLoading && data) {
      console.log('Fetched data:', data);
      setAndroidLink(data?.appLink?.androidLink || '');
      setIosLink(data?.appLink?.iosLink || '');
    }
  }, [isLoading, data]);

  const [addAppLink, {isLoading: createIsLoading}] = useAddAppLinkMutation();

  const submitCreateAndroidRequest = async () => {
    if (!androidLink) {
      Toast.show({
        type: 'error',
        text1: 'Enter android link',
      });
      return;
    } else {
      try {
        const body = {
          androidLink: androidLink,
        };

        console.log('JSON BODY :: ', JSON.stringify(body));

        const res = await addAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        refetch();
  
      } catch (error) {
        console.log('Error during deposit:', error);

        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  const submitCreateIosRequest = async () => {
    if (!iosLink) {
      Toast.show({
        type: 'error',
        text1: 'Enter ios link',
      });
      return;
    } else {
      try {
        const body = {
          iosLink: iosLink,
        };

        console.log('JSON BODY :: ', JSON.stringify(body));

        const res = await addAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        refetch();
      } catch (error) {
        console.log('Error during deposit:', error);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  const [deleteAppLink, {isLoading: deleteIsLoading}] =
    useDeleteAppLinkMutation();

  return (
    <SafeAreaView style={{flex: 1}}>
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="height"
      keyboardVerticalOffset={-60}>

     
      <Background />

      

      {/** Main Container */}
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
                Update App Link
              </GradientTextWhite>
              <ScrollView
                contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}
                showsVerticalScrollIndicator={false}>
                {/** ANDROID  */}
                <TouchableOpacity>
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={styles.paymentOption}>
                    <View
                      style={{
                        backgroundColor: COLORS.white_s,
                        padding: heightPercentageToDP(1),
                        borderRadius: heightPercentageToDP(1),
                        justifyContent: 'center',
                      }}>
                      <AntDesign
                        name={fromapp === 'android' ? 'android1' : 'apple1'}
                        size={heightPercentageToDP(4)}
                        color={COLORS.darkGray}
                      />
                    </View>
                    <Text style={styles.textStyleContent}>
                      {fromapp === 'android' ? 'Android' : 'IOS'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/** IOS  */}
                {/** ANDROID */}
                {fromapp === 'android' ? (
                  <View
                    style={{
                      height: heightPercentageToDP(20),
                      flexDirection: 'row',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'flex-start',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      marginTop: heightPercentageToDP(2),
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
                      placeholder="Enter Android Link"
                      placeholderTextColor={COLORS.black}
                      label="location"
                      value={androidLink}
                      onChangeText={text => setAndroidLink(text)}
                      multiline={true}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      height: heightPercentageToDP(20),
                      flexDirection: 'row',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'flex-start',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      marginTop: heightPercentageToDP(2),
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
                      placeholder="Enter IOS Link"
                      placeholderTextColor={COLORS.black}
                      label="location"
                      value={iosLink}
                      onChangeText={text => setIosLink(text)}
                      multiline={true}
                    />
                  </View>
                )}
              </ScrollView>
            </View>

            {/** SUBMIT CONTAINTER */}
            {createIsLoading ? (
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
                  onPress={
                    fromapp === 'android'
                      ? submitCreateAndroidRequest
                      : submitCreateIosRequest
                  }
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateApplink;

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
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
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
    flex: 1,
    fontSize: heightPercentageToDP(2),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
