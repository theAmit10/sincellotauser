import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {getAllLocations} from '../redux/actions/locationAction';
import {getAllResult} from '../redux/actions/resultAction';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import {loadAllNotification} from '../redux/actions/userAction';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken, notifications, loadingNotification} = useSelector(
    state => state.user,
  );

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(loadAllNotification(accesstoken));
  }, [dispatch, focused]);

  const [selectedItem, setSelectedItem] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async item => {
    console.log('Item clicked :: ' + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);
    
    try {
      const url = `${UrlHelper.DELETE_NOTIFICATION_API}/${item._id}`;
      const {data} = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log('datat :: ' + data);

      Toast.show({
        type: 'success',
        text1: data.message,
      });
      setProgressBar(false);
      dispatch(loadAllNotification(accesstoken));
    } catch (error) {
      console.log(error.response.data.message);
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please, try after sometime',
      });
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Notification</GradientText>
      </View>

      {/** Main Cointainer */}

      <View
        style={{
          height: heightPercentageToDP(70),
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

        {/** Content Container */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {loadingNotification ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: heightPercentageToDP(2),
              }}>
              <Loading />
            </View>
          ) : notifications && notifications.length == 0 ? (
            <View
              style={{
                height: heightPercentageToDP(10),
                margin: heightPercentageToDP(2),
              }}>
              <NoDataFound data={'No data found '} />
            </View>
          ) : (
            notifications?.map((item, index) => (
              <View
                key={index}
                style={{
                  minHeight: heightPercentageToDP(10),
                  backgroundColor: COLORS.grayBg,
                  margin: heightPercentageToDP(2),
                  padding: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(2),
                  flexDirection: 'row'
                }}>
                <View
                  style={{
                    flex: 4,
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: FONT.Montserrat_SemiBold,
                      fontSize: heightPercentageToDP(2),
                    }}
                    numberOfLines={1}>
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                    }}
                    numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}>
                     {/** For Deleting Notification */}
                {selectedItem === item._id ? (
                  <Loading />
                ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      marginBottom: heightPercentageToDP(2),
                    }}
                    onPress={() => deleteLocationHandler(item)}>
                    <LinearGradient
                      colors={[COLORS.gray2, COLORS.white_s]}
                      className="rounded-xl p-1">
                      <MaterialCommunityIcons
                        name={'delete'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.darkGray}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                )}

                  </View>

               
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

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
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});
