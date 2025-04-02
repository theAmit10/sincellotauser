import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import Clipboard from '@react-native-clipboard/clipboard';
import Loading from '../../components/helpercComponent/Loading';
import axios from 'axios';
import UrlHelper from '../../helper/UrlHelper';
import {
  useActivateUpiPaymentMethodMutation,
  useDeleteUpiAccountMutation,
  useGetAllUpiQuery,
  useRejectUpiPaymentMethodMutation,
} from '../../helper/Networkcall';
import {serverName} from '../../redux/store';

const upiapidata = [
  {name: 'Wasu', upiid: '9876543210@ybl', id: '1'},
  {name: 'Aman', upiid: '8876543210@ybl', id: '2'},
  {name: 'Zasu', upiid: '7876543210@ybl', id: '3'},
  {name: 'Masu', upiid: '1876543210@ybl', id: '4'},
  {name: 'Kasu', upiid: '2876543210@ybl', id: '5'},
];

const AllUpiDepositPayment = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {accesstoken, user} = useSelector(state => state.user);

  const [seletedItem, setSelectedItem] = useState('');

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const [
    deleteUpiAccount,
    {isLoading: deleteIsLoading, isError: deleteIsError},
  ] = useDeleteUpiAccountMutation();

  // useEffect(() => {
  //   allTheDepositData();
  // }, [isFocused]);

  // useEffect(() => {
  //   console.log(loadingAllData);
  // }, [loadingAllData]);

  // const allTheDepositData = async () => {
  //   try {
  //     setLoadingAllData(true);
  //     const {data} = await axios.get(UrlHelper.ALL_UPI_API, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accesstoken}`,
  //       },
  //     });

  //     console.log('datat :: ' + JSON.stringify(data));
  //     setAllDepositData(data.payments);
  //     setLoadingAllData(false);
  //   } catch (error) {
  //     setLoadingAllData(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Something went wrong',
  //     });
  //     console.log(error);
  //   }
  // };

  // const allTheDepositData = async () => {
  //   try {
  //     setLoadingAllData(true);
  //     const {data} = await axios.get(UrlHelper.ALL_UPI_API, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accesstoken}`,
  //       },
  //     });

  //     console.log('datat :: ' + JSON.stringify(data));
  //     setAllDepositData(data.payments);
  //     setLoadingAllData(false);
  //   } catch (error) {
  //     setLoadingAllData(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Something went wrong',
  //     });
  //     console.log(error);
  //   } finally {
  //     setLoadingAllData(false);
  //   }
  // };

  // FOR DELETING DATA

  const deletingData = async item => {
    console.log('Deleting Data');
    setSelectedItem(item._id);

    const res = await deleteUpiAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    Toast.show({type: 'success', text1: 'Success', text2: res.message});
  };
  // States
  const [page, setPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: allTheDepositData,
    isFetching: fetchingPaginated,
  } = useGetAllUpiQuery({accesstoken, page, limit});

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data
      setPage(1); // ✅ Reset Page
      setHasMore(true); // ✅ Reset Load More
      allTheDepositData?.(); // ✅ Ensure Fresh Data
    }, [allTheDepositData]),
  );

  useEffect(() => {
    setLoading(true);
    if (paginatedData?.payments) {
      // For paginated data, filter out duplicates before appending
      setAllDepositData(prev => {
        const newData = paginatedData.payments.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.payments : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.payments.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [paginatedData, page]);

  const loadMore = () => {
    if (!loading && hasMore && !fetchingPaginated) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;

  const [activateUpiPaymentMethod, {isLoading: activateUpiIsLoading}] =
    useActivateUpiPaymentMethodMutation();

  const [rejectUpiPaymentMethod, {isLoading: rejectUpiIsLoading}] =
    useRejectUpiPaymentMethodMutation();

  const submitConfirmation = async item => {
    console.log('working on submit payment');
    setSelectedItem(item);
    try {
      const body = {
        activationStatus: true,
      };
      const res = await activateUpiPaymentMethod({
        accesstoken: accesstoken,
        id: item._id,
        body: body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      allTheDepositData();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const submitRejection = async item => {
    setSelectedItem(item);
    console.log('working on submit payment');
    try {
      const body = {
        paymentStatus: 'Cancelled',
      };
      const res = await rejectUpiPaymentMethod({
        accesstoken: accesstoken,
        id: item._id,
        body: body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      allTheDepositData();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height:
              Platform.OS === 'android'
                ? heightPercentageToDP(85)
                : heightPercentageToDP(80),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height:
                Platform.OS === 'android'
                  ? heightPercentageToDP(85)
                  : heightPercentageToDP(80),
              width: widthPercentageToDP(100),
              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
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
            <View style={{margin: heightPercentageToDP(2)}}>
              <GradientTextWhite style={styles.textStyle}>
                UPI Deposit
              </GradientTextWhite>
            </View>

            {/** FOR UPI ID DEPOSIT OPTION */}

            <View style={{flex: 1}}>
              {isLoading && page === 1 ? (
                <ActivityIndicator size="large" color={COLORS.white_s} />
              ) : (
                <FlatList
                  data={allDepositdata}
                  keyExtractor={item => item._id.toString()} // Ensure _id is unique
                  renderItem={({item}) => (
                    <TouchableOpacity key={item._id}>
                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                          marginHorizontal: heightPercentageToDP(2),
                          marginVertical: heightPercentageToDP(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: heightPercentageToDP(5),
                            marginVertical: heightPercentageToDP(1),
                          }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              gap: heightPercentageToDP(3),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                backgroundColor: COLORS.white_s,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(1),
                              }}>
                              <Image
                                source={require('../../../assets/image/upi.png')}
                                resizeMode="cover"
                                style={{
                                  height: 25,
                                  width: 25,
                                }}
                              />
                            </View>
                            <GradientTextWhite style={styles.textStyleContent}>
                              UPI
                            </GradientTextWhite>
                            {/* <GradientTextWhite style={styles.textStyleContent}>
                            {item.paymentId}
                          </GradientTextWhite> */}
                          </View>

                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                              paddingEnd: heightPercentageToDP(2),
                              flexDirection: 'row',
                              gap: heightPercentageToDP(2),
                            }}>
                            {/** DELETE BUTTON */}
                            {deleteIsLoading ? (
                              seletedItem === item._id ? (
                                <Loading />
                              ) : (
                                <TouchableOpacity
                                  onPress={() => deletingData(item)}>
                                  <LinearGradient
                                    colors={[COLORS.grayBg, COLORS.white_s]}
                                    style={{borderRadius: 10, padding: 5}}>
                                    <MaterialCommunityIcons
                                      name={'delete'}
                                      size={heightPercentageToDP(3)}
                                      color={COLORS.darkGray}
                                    />
                                  </LinearGradient>
                                </TouchableOpacity>
                              )
                            ) : (
                              <TouchableOpacity
                                onPress={() => deletingData(item)}>
                                <LinearGradient
                                  colors={[COLORS.grayBg, COLORS.white_s]}
                                  style={{borderRadius: 10, padding: 5}}>
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
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: heightPercentageToDP(1),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            paddingHorizontal: heightPercentageToDP(2),
                            borderRadius: heightPercentageToDP(2),
                          }}>
                          <View
                            style={{
                              flex: 1,
                              gap: heightPercentageToDP(2),
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.copytitle} numberOfLines={2}>
                              UPI Holder Name
                            </Text>
                            <Text style={styles.copytitle}>UPI ID</Text>
                          </View>
                          <View
                            style={{
                              flex: 2,
                              gap: heightPercentageToDP(2),
                            }}>
                            <Text style={styles.copycontent} numberOfLines={2}>
                              {item.upiholdername}
                            </Text>
                            <Text style={styles.copycontent} numberOfLines={1}>
                              {item.upiid}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: '100%',
                              width: '10%',
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                copyToClipboard(item.upiholdername)
                              }>
                              <LinearGradient
                                colors={[COLORS.lightWhite, COLORS.white_s]}
                                style={{
                                  padding: heightPercentageToDP(0.5),
                                  borderRadius: heightPercentageToDP(1),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  name={'copy1'}
                                  size={heightPercentageToDP(2.5)}
                                  color={COLORS.darkGray}
                                />
                              </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => copyToClipboard(item.upiid)}>
                              <LinearGradient
                                colors={[COLORS.lightWhite, COLORS.white_s]}
                                style={{
                                  padding: heightPercentageToDP(0.5),
                                  borderRadius: heightPercentageToDP(1),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  name={'copy1'}
                                  size={heightPercentageToDP(2.5)}
                                  color={COLORS.darkGray}
                                />
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        </View>

                        {/** QR code */}
                        <View
                          style={{
                            flex: 2,
                            gap: heightPercentageToDP(2),
                            margin: heightPercentageToDP(2),
                          }}>
                          <View
                            style={{
                              backgroundColor: COLORS.white_s,
                              padding: heightPercentageToDP(1),
                              borderRadius: heightPercentageToDP(1),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {item.qrcode ? (
                              <Image
                                source={{
                                  uri: `${serverName}/uploads/upiqrcode/${item.qrcode}`,
                                }}
                                resizeMode="cover"
                                style={{
                                  height: 150,
                                  width: 150,
                                }}
                              />
                            ) : (
                              <Image
                                source={require('../../../assets/image/upi.png')}
                                resizeMode="cover"
                                style={{
                                  height: 80,
                                  width: 80,
                                }}
                              />
                            )}
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            padding: heightPercentageToDP(2),
                          }}>
                          <View
                            style={{
                              flex: 1,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={{
                                ...styles.copytitle,
                                paddingLeft: heightPercentageToDP(1),
                                textAlignVertical: 'center',
                              }}
                              numberOfLines={2}>
                              {item.paymentnote ? 'Note' : ''}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 2,
                              paddingEnd: heightPercentageToDP(1),
                            }}>
                            <Text style={styles.copycontent}>
                              {item.paymentnote}
                            </Text>
                          </View>
                        </View>

                        {/** FOR ACTIVATION STATUS */}
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            padding: heightPercentageToDP(2),
                            gap: heightPercentageToDP(1),
                          }}>
                          <View
                            style={{
                              flex: 1,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={{
                                ...styles.copytitle,
                                paddingLeft: heightPercentageToDP(2),
                              }}
                              numberOfLines={1}>
                              Activation Status
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 2,
                              backgroundColor:
                                item.paymentStatus === 'Pending'
                                  ? COLORS.orange
                                  : item.paymentStatus === 'Approved'
                                  ? COLORS.green
                                  : COLORS.red,
                              width: widthPercentageToDP(90),
                              padding: heightPercentageToDP(1),
                              borderRadius: heightPercentageToDP(4),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={[
                                styles.copycontent,
                                {color: COLORS.white_s},
                              ]}>
                              {item.paymentStatus}
                            </Text>
                          </View>
                        </View>

                        {/** CONFIRMATION */}
                        {item.paymentStatus === 'Pending' &&
                          (activateUpiIsLoading ? (
                            seletedItem._id === item._id ? (
                              <Loading />
                            ) : (
                              <TouchableOpacity
                                onPress={() => submitConfirmation(item)}
                                style={{
                                  flex: 2,
                                  backgroundColor: COLORS.green,
                                  width: widthPercentageToDP(90),
                                  padding: heightPercentageToDP(1),
                                  borderRadius: heightPercentageToDP(4),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    styles.copycontent,
                                    {color: COLORS.white_s},
                                  ]}>
                                  Confirm
                                </Text>
                              </TouchableOpacity>
                            )
                          ) : (
                            <TouchableOpacity
                              onPress={() => submitConfirmation(item)}
                              style={{
                                flex: 2,
                                backgroundColor: COLORS.green,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(4),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={[
                                  styles.copycontent,
                                  {color: COLORS.white_s},
                                ]}>
                                Confirm
                              </Text>
                            </TouchableOpacity>
                          ))}

                        {/** REJECTION */}
                        {item.paymentStatus === 'Pending' &&
                          (rejectUpiIsLoading ? (
                            seletedItem._id === item._id ? (
                              <Loading />
                            ) : (
                              <TouchableOpacity
                                onPress={() => submitRejection(item)}
                                style={{
                                  flex: 2,
                                  backgroundColor: COLORS.red,

                                  padding: heightPercentageToDP(1),
                                  borderRadius: heightPercentageToDP(4),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    styles.copycontent,
                                    {color: COLORS.white_s},
                                  ]}>
                                  Reject
                                </Text>
                              </TouchableOpacity>
                            )
                          ) : (
                            <TouchableOpacity
                              onPress={() => submitRejection(item)}
                              style={{
                                flex: 2,
                                backgroundColor: COLORS.red,
                                padding: heightPercentageToDP(1),
                                borderRadius: heightPercentageToDP(4),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: heightPercentageToDP(1),
                              }}>
                              <Text
                                style={[
                                  styles.copycontent,
                                  {color: COLORS.white_s},
                                ]}>
                                Reject
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={() =>
                    hasMore && isLoading ? (
                      <ActivityIndicator size="large" color={COLORS.white_s} />
                    ) : null
                  }
                />
              )}
            </View>

            {/** CREATE A NEW ACCOUNT */}
            <View
              style={{
                marginBottom: heightPercentageToDP(5),
                marginTop: heightPercentageToDP(2),
              }}>
              {!loadingAllData && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpiDeposit')}
                  style={{
                    backgroundColor: COLORS.blue,
                    padding: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    margin: heightPercentageToDP(2),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONT.Montserrat_Regular,
                    }}>
                    Create UPI account
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default AllUpiDepositPayment;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  copycontent: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  copytitle: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_SemiBold,
  },
  inputContainer: {
    marginTop: heightPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    gap: heightPercentageToDP(2),
  },
  input: {
    height: heightPercentageToDP(7),
    flexDirection: 'row',
    backgroundColor: COLORS.white_s,
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  textInput: {
    marginStart: heightPercentageToDP(1),
    flex: 1,
    fontFamily: FONT.SF_PRO_REGULAR,
    color: COLORS.black,
  },
  subtitle: {
    fontFamily: FONT.Montserrat_SemiBold,
    fontSize: heightPercentageToDP(1.5),
    margin: 5,
  },
  userNameInput: {
    fontFamily: FONT.Montserrat_Regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
  },
});
