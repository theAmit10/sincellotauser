import {
  ImageBackground,
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
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllAboutUs} from '../redux/actions/userAction';

const SendNotification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken, loadingAbout, abouts} = useSelector(state => state.user);
  // const {loading, locations} = useSelector(state => state.location);
  const {loading, results} = useSelector(state => state.result);

  // const [filteredData, setFilteredData] = useState(locations);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = abouts.filter(item =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(loadAllAboutUs(accesstoken));
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(abouts); // Update filteredData whenever locations change
  }, [abouts]);

  const submitHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'Searching',
    });
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
          <GradientText style={styles.textStyle}>Push</GradientText>
          <GradientText style={styles.textStyle}>Notifiction</GradientText>
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

            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 2,
                }}>
                {/** AllUser */}
                <TouchableOpacity
                  onPress={
                    () => navigation.navigate('CreateNotificationForAllUsers')
                    // Toast.show({
                    //   type: 'info',
                    //   text1: 'Comming Soon'
                    // })
                  }
                  style={{
                    height: heightPercentageToDP(20),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    margin: heightPercentageToDP(2),
                  }}>
                  <View
                    style={{
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.darkGray,
                        width: widthPercentageToDP(25),
                        marginStart: heightPercentageToDP(-1),
                        textAlignVertical: 'bottom',
                      }}></Text>
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.darkGray,
                        fontSize: heightPercentageToDP(2),
                        marginStart: heightPercentageToDP(-1),
                      }}>
                      Push Notification for all user
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: heightPercentageToDP(1),
                        marginStart: heightPercentageToDP(-1),
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.grayHalfBg,
                          padding: heightPercentageToDP(1),
                          borderRadius: heightPercentageToDP(1),
                          justifyContent: 'center',
                        }}>
                        <Entypo
                          name={'user'}
                          size={heightPercentageToDP(4)}
                          color={COLORS.darkGray}
                        />
                      </View>
                      <GradientText
                        style={{
                          ...styles.textStyle,
                          width: widthPercentageToDP(60),
                        }}>
                        All User
                      </GradientText>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.grayHalfBg,
                      position: 'absolute',
                      right: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      padding: heightPercentageToDP(1),
                      top: heightPercentageToDP(2),
                    }}>
                    <Ionicons
                      name={'notifications'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.darkGray}
                    />
                  </View>
                </TouchableOpacity>

                {/** Single User */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllUsers')}
                  style={{
                    height: heightPercentageToDP(20),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    margin: heightPercentageToDP(2),
                  }}>
                  <View
                    style={{
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.darkGray,
                        width: widthPercentageToDP(25),
                        marginStart: heightPercentageToDP(-1),
                        textAlignVertical: 'bottom',
                      }}></Text>
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.darkGray,
                        fontSize: heightPercentageToDP(2),
                        marginStart: heightPercentageToDP(-1),
                      }}>
                      Push Notification for Single user
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: heightPercentageToDP(1),
                        marginStart: heightPercentageToDP(-1),
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.grayHalfBg,
                          padding: heightPercentageToDP(1),
                          borderRadius: heightPercentageToDP(1),
                          justifyContent: 'center',
                        }}>
                        <Entypo
                          name={'user'}
                          size={heightPercentageToDP(4)}
                          color={COLORS.darkGray}
                        />
                      </View>
                      <GradientText
                        style={{
                          ...styles.textStyle,
                          width: widthPercentageToDP(60),
                        }}>
                        Single User
                      </GradientText>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.grayHalfBg,
                      position: 'absolute',
                      right: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      padding: heightPercentageToDP(1),
                      top: heightPercentageToDP(2),
                    }}>
                    <Ionicons
                      name={'notifications'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.darkGray}
                    />
                  </View>
                </TouchableOpacity>

                {/** All Notification */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notification')}
                  style={{
                    height: heightPercentageToDP(20),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    margin: heightPercentageToDP(2),
                  }}>
                  <View
                    style={{
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.darkGray,
                        width: widthPercentageToDP(25),
                        marginStart: heightPercentageToDP(-1),
                        textAlignVertical: 'bottom',
                      }}></Text>
                    <Text
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_Regular,
                        color: COLORS.darkGray,
                        fontSize: heightPercentageToDP(2),
                        marginStart: heightPercentageToDP(-1),
                      }}>
                      List of previous Notification
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: heightPercentageToDP(1),
                        marginStart: heightPercentageToDP(-1),
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.grayHalfBg,
                          padding: heightPercentageToDP(1),
                          borderRadius: heightPercentageToDP(1),
                          justifyContent: 'center',
                        }}>
                        <Entypo
                          name={'user'}
                          size={heightPercentageToDP(4)}
                          color={COLORS.darkGray}
                        />
                      </View>
                      <GradientText
                        style={{
                          ...styles.textStyle,
                          width: widthPercentageToDP(60),
                        }}>
                        Notifications
                      </GradientText>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.grayHalfBg,
                      position: 'absolute',
                      right: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      padding: heightPercentageToDP(1),
                      top: heightPercentageToDP(2),
                    }}>
                    <Ionicons
                      name={'notifications'}
                      size={heightPercentageToDP(4)}
                      color={COLORS.darkGray}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/** Bottom Submit Container */}

            {/** end */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default SendNotification;

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
