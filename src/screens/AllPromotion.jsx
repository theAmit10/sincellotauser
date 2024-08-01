import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
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
import {loadAllPromotion} from '../redux/actions/userAction';
import {serverName} from '../redux/store';
import LinearGradient from 'react-native-linear-gradient';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';

const AllPromotion = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken, promotions, loadingPromotion} = useSelector(
    state => state.user,
  );
  // const {loading, locations} = useSelector(state => state.location);

  console.log('ALL Promtions ' + JSON.stringify(promotions));

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(loadAllPromotion(accesstoken));
  }, [dispatch, focused]);

  const submitHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'Searching',
    });
  };

  const [selectedItem, setSelectedItem] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async item => {
    console.log('Item clicked :: ' + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);

    try {
      const url = `${UrlHelper.DELETE_PROMOTION_API}/${item._id}`;
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
      navigation.goBack();
    } catch (error) {
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

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>All</GradientText>
          <GradientText style={styles.textStyle}>Promotion</GradientText>
        </View>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(70),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          {/** Main Cointainer */}

          <View
            style={{
              height: heightPercentageToDP(70),
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

            {/** Content Container */}

            <View
              style={{
                flex: 2,
              }}>
              {loadingPromotion ? (
                <Loading />
              ) : (
                promotions.length !== 0 && (
                  <FlatList
                    data={promotions}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={{
                          ...styles.item,
                        }}>
                        <View
                          style={{
                            backgroundColor: COLORS.grayHalfBg,
                            height: heightPercentageToDP(20),
                            borderRadius: heightPercentageToDP(2),
                          }}>
                          <Image
                            source={{
                              uri: `${serverName}uploads/promotion/${item.url}`,
                            }}
                            resizeMode="cover"
                            style={{
                              height: heightPercentageToDP(20),
                              width: '100%',
                              borderRadius: heightPercentageToDP(2),
                            }}
                          />

                          {/** Delete Locatiion */}
                          <View
                            style={{
                              position: 'absolute',
                              right: 0,
                              margin: heightPercentageToDP(2),
                            }}>
                            <TouchableOpacity
                              onPress={() => deleteLocationHandler(item)}>
                              {showProgressBar ? (
                                selectedItem === item._id ? (
                                  <Loading />
                                ) : (
                                  <LinearGradient
                                    colors={[COLORS.lightWhite, COLORS.white_s]}
                                    className="rounded-xl p-1">
                                    <MaterialCommunityIcons
                                      name={'delete'}
                                      size={heightPercentageToDP(3)}
                                      color={COLORS.darkGray}
                                    />
                                  </LinearGradient>
                                )
                              ) : (
                                <LinearGradient
                                  colors={[COLORS.lightWhite, COLORS.white_s]}
                                  className="rounded-xl p-1">
                                  <MaterialCommunityIcons
                                    name={'delete'}
                                    size={heightPercentageToDP(3)}
                                    color={COLORS.darkGray}
                                  />
                                </LinearGradient>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    initialNumToRender={10} // Render initial 10 items
                    maxToRenderPerBatch={10} // Batch size to render
                    windowSize={10} // Number of items kept in memory
                  />
                )
              )}
            </View>

            {/** Bottom Submit Container */}

            <View
              style={{
                marginBottom: heightPercentageToDP(5),
                marginHorizontal: heightPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
              }}>
              {/** Email container */}

              <TouchableOpacity
                onPress={() => navigation.navigate('CreatePromotion')}
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
                  Create Promotion
                </Text>
              </TouchableOpacity>
            </View>

            {/** end */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default AllPromotion;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.white_s,
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
