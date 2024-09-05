import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {
  useGetAllBalanceQuery,
} from '../helper/Networkcall';
import Loading from '../components/helpercComponent/Loading';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import moment from 'moment';

const BalanceSheet = () => {
 
  const {accesstoken} = useSelector(state => state.user);
  const {data, isLoading, error, refetch} = useGetAllBalanceQuery(accesstoken);
  
  console.log('Balancesheet ::' + JSON.stringify(data));

  // useFocusEffect(
  //   useCallback(() => {
  //     // Refetch the data when the screen is focused
  //     refetch();
  //   }, [refetch]),
  // );

 

  const formatDateTime = dateTimeString => {
    return moment(dateTimeString).format('MMMM DD, YYYY hh:mm A');
  };

  return (
    <View style={{flex: 1}}>
      <Background />

      {/** Main Cointainer */}

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(85),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(85),
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
                margin: heightPercentageToDP(2),
               
              }}>
              <GradientTextWhite style={styles.textStyle}>
                Balance Sheet
              </GradientTextWhite>
            </View>

            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Loading />
              </View>
            ) : data?.balancesheet?.length === 0 ? (
              <View
                style={{
                  margin: heightPercentageToDP(1),
                }}>
                <NoDataFound data={'No Country Available'} />
              </View>
            ) : (
              <FlatList
                data={data.balancesheet}
                renderItem={({item}) => (
                  <LinearGradient
                    colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={{
                      justifyContent: 'flex-start',
                      minHeight: heightPercentageToDP(20),
                      borderRadius: heightPercentageToDP(2),
                      marginHorizontal: heightPercentageToDP(2),
                      padding: heightPercentageToDP(1),
                      marginBottom: heightPercentageToDP(1)
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        {item?.paymentProcessType}
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 2,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.b,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item?.paymentProcessType === 'Credit' ? "+" : "-"} {item?.amount} INR
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Wallet
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item?.activityType === "Bet" ? ("Game Wallet") : ("Withdrawal wallet")}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Created at
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 2,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {formatDateTime(item?.createdAt)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          Withdrawal balance
                        </Text>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_Regular,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          {item?.withdrawalbalance} INR
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          Game balance
                        </Text>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_Regular,
                            fontSize: heightPercentageToDP(1.8),
                          }}>
                          {item?.gamebalance} INR
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Total balance
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          textAlign: 'right',
                          paddingRight: heightPercentageToDP(1),
                        }}>
                        {item?.totalbalance} INR
                      </Text>
                    </View>
                  </LinearGradient>
                )}
                keyExtractor={item => item._id.toString()}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                ListFooterComponent={() => (
                  <View
                    style={{
                      height: heightPercentageToDP(20),
                    }}></View>
                )}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default BalanceSheet;

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
});
