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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const Applink = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(true);
  const [showAddAndroid, setShowAndroid] = useState(false);
  const [showAddIos, setShowAddIos] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [androidLink, setAndroidLink] = useState('');
  const [iosLink, setIosLink] = useState('');
  const [title, setTitle] = useState('App Link');

  const [seletedapp, setselectedapp] = useState('');

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

  const submitDeleteIosRequest = async () => {
    if (!iosLink) {
      Toast.show({
        type: 'error',
        text1: 'ios link not available',
      });
      return;
    } else {
      setselectedapp('ios');
      try {
        const body = {
          iosLink: true,
        };

        console.log('JSON BODY :: ', JSON.stringify(body));

        const res = await deleteAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);

        Toast.show({
          type: 'success',
          text1: res.message,
        });
        refetch();

        setIosLink('');
      } catch (error) {
        console.log('Error during deposit:', error);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  const submitDeleteAndroidRequest = async () => {
    if (!androidLink) {
      Toast.show({
        type: 'error',
        text1: 'android link not available',
      });
      return;
    } else {
      setselectedapp('android');
      try {
        const body = {
          androidLink: true,
        };

        console.log('JSON BODY :: ', JSON.stringify(body));

        const res = await deleteAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        refetch();

        setAndroidLink('');
      } catch (error) {
        console.log('Error during deposit:', error);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
                App Link
              </GradientTextWhite>
              <ScrollView
                contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}
                showsVerticalScrollIndicator={false}>
                {/** ANDROID  */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateApplink', {
                      androidLink: androidLink,
                      setAndroidLink: setAndroidLink,
                      fromapp: 'android',
                    })
                  }>
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
                        name={'android1'}
                        size={heightPercentageToDP(4)}
                        color={COLORS.darkGray}
                      />
                    </View>
                    <Text style={styles.textStyleContent}>
                      {androidLink === '' ? 'No link available' : androidLink}
                    </Text>
                    {deleteIsLoading ? (
                      seletedapp === 'android' ? (
                        <Loading />
                      ) : (
                        <TouchableOpacity
                          onPress={submitDeleteAndroidRequest}
                          style={{
                            backgroundColor: COLORS.white_s,
                            padding: heightPercentageToDP(1),
                            borderRadius: heightPercentageToDP(1),
                            justifyContent: 'center',
                          }}>
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </TouchableOpacity>
                      )
                    ) : (
                      androidLink && (
                        <TouchableOpacity
                          onPress={submitDeleteAndroidRequest}
                          style={{
                            backgroundColor: COLORS.white_s,
                            padding: heightPercentageToDP(1),
                            borderRadius: heightPercentageToDP(1),
                            justifyContent: 'center',
                          }}>
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </TouchableOpacity>
                      )
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/** APPLE */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateApplink', {
                      iosLink: iosLink,
                      setIosLink: setIosLink,
                      fromapp: 'apple',
                    })
                  }>
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
                        name={'apple1'}
                        size={heightPercentageToDP(4)}
                        color={COLORS.darkGray}
                      />
                    </View>
                    <Text style={styles.textStyleContent}>
                      {iosLink === '' ? 'No link available' : iosLink}
                    </Text>
                    {deleteIsLoading ? (
                      seletedapp === 'ios' ? (
                        <Loading />
                      ) : (
                        <TouchableOpacity
                          onPress={submitDeleteIosRequest}
                          style={{
                            backgroundColor: COLORS.white_s,
                            padding: heightPercentageToDP(1),
                            borderRadius: heightPercentageToDP(1),
                            justifyContent: 'center',
                          }}>
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </TouchableOpacity>
                      )
                    ) : (
                      iosLink && (
                        <TouchableOpacity
                          onPress={submitDeleteIosRequest}
                          style={{
                            backgroundColor: COLORS.white_s,
                            padding: heightPercentageToDP(1),
                            borderRadius: heightPercentageToDP(1),
                            justifyContent: 'center',
                          }}>
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(4)}
                            color={COLORS.darkGray}
                          />
                        </TouchableOpacity>
                      )
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Applink;

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
