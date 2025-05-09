import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
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

import {
  useActivatePaypalPaymentMethodMutation,
  useDeletePaypalAccountMutation,
  useGetAllPaypalQuery,
  useRejectPaypalPaymentMethodMutation,
  useSearchAllPaypalByIdQuery,
} from '../../helper/Networkcall';
import Fontisto from 'react-native-vector-icons/Fontisto';

const AllPaypalDepositPayment = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const {accesstoken, user} = useSelector(state => state.user);

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

  const [
    deletePaypalAccount,
    {isLoading: deleteIsLoading, isError: deleteIsError},
  ] = useDeletePaypalAccountMutation();

  // useEffect(() => {
  //   allTheDepositData();
  // }, [isFocused, loadingAllData, allDepositdata]);

  const [seletedItem, setSelectedItem] = useState('');

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  // const allTheDepositData = async () => {
  //   try {
  //     setLoadingAllData(true);
  //     const {data} = await axios.get(UrlHelper.ALL_PAYPAL_API, {
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

  // FOR DELETING DATA

  const deletingData = async item => {
    console.log('Deleting Data');
    setSelectedItem(item._id);

    const res = await deletePaypalAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    await allTheDepositData();

    Toast.show({type: 'success', text1: 'Success', text2: res.message});
  };

  // States
  const [page, setPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce Effect for Search (waits 500ms before updating)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: allTheDepositData,
    isFetching: fetchingPaginated,
  } = useGetAllPaypalQuery({accesstoken, page, limit});

  const {data: searchData, isFetching: fetchingSearch} =
    useSearchAllPaypalByIdQuery(
      debouncedSearch.length > 0
        ? {accesstoken, userId: debouncedSearch}
        : {skip: true},
    );

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data
      setPage(1); // ✅ Reset Page
      setHasMore(true); // ✅ Reset Load More
      allTheDepositData?.(); // ✅ Ensure Fresh Data
    }, [allTheDepositData, debouncedSearch]),
  );

  useEffect(() => {
    setLoading(true);
    if (debouncedSearch.length > 0 && searchData?.payments) {
      // Search Mode: Replace entire list
      setAllDepositData(searchData.payments);
      setHasMore(false); // No pagination during search
    } else if (paginatedData?.payments) {
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
  }, [paginatedData, page, searchData, debouncedSearch]);

  const loadMore = () => {
    if (!loading && hasMore && !fetchingPaginated) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;

  const [activatePaypalPaymentMethod, {isLoading: activatePaypalIsLoading}] =
    useActivatePaypalPaymentMethodMutation();

  const [rejectPaypalPaymentMethod, {isLoading: rejectPaypalIsLoading}] =
    useRejectPaypalPaymentMethodMutation();

  const submitConfirmation = async item => {
    console.log('working on submit payment');
    setSelectedItem(item);
    try {
      const body = {
        activationStatus: true,
      };
      const res = await activatePaypalPaymentMethod({
        accesstoken: accesstoken,
        id: item._id,
        body: body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await allTheDepositData();
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
      const res = await rejectPaypalPaymentMethod({
        accesstoken: accesstoken,
        id: item._id,
        body: body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await allTheDepositData();
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
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-60}>
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
                  Paypal Deposit
                </GradientTextWhite>
              </View>

              {/** FOR UPI ID DEPOSIT OPTION */}
              {/* SEARCH INPUT */}
              <View
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                  marginHorizontal: heightPercentageToDP(1),
                }}>
                <Fontisto
                  name="search"
                  size={heightPercentageToDP(3)}
                  color={COLORS.darkGray}
                />
                <TextInput
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2.5),
                    color: COLORS.black,
                  }}
                  placeholder="Search"
                  placeholderTextColor={COLORS.black}
                  onChangeText={text => {
                    setLoading(true);
                    setSearchQuery(text);
                  }}
                />
              </View>

              <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
                {isLoading && page === 1 ? (
                  <ActivityIndicator size="large" color={COLORS.white_s} />
                ) : (
                  <FlatList
                    data={allDepositdata}
                    keyExtractor={item => item._id.toString()} // Ensure _id is unique
                    renderItem={({item}) => (
                      <TouchableOpacity key={item._id}>
                        <LinearGradient
                          colors={[
                            COLORS.time_firstblue,
                            COLORS.time_secondbluw,
                          ]}
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
                                marginStart: heightPercentageToDP(3),
                              }}>
                              <View
                                style={{
                                  backgroundColor: COLORS.white_s,
                                  padding: heightPercentageToDP(1),
                                  borderRadius: heightPercentageToDP(1),
                                }}>
                                <Image
                                  source={require('../../../assets/image/paypal.png')}
                                  resizeMode="cover"
                                  style={{
                                    height: 25,
                                    width: 25,
                                  }}
                                />
                              </View>
                              <GradientTextWhite
                                style={styles.textStyleContent}>
                                Paypal
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
                                Email Address
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 2,
                                gap: heightPercentageToDP(2),
                              }}>
                              <Text
                                style={styles.copycontent}
                                numberOfLines={2}>
                                {item.emailaddress}
                              </Text>
                            </View>
                            <View style={{gap: heightPercentageToDP(0.5)}}>
                              <TouchableOpacity
                                onPress={() =>
                                  copyToClipboard(item.emailaddress)
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
                                  paddingLeft: heightPercentageToDP(2),
                                }}
                                numberOfLines={2}>
                                {item.paymentnote ? 'Note' : ''}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 2,
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
                                numberOfLines={2}>
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
                                width: widthPercentageToDP(85),
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
                            {item.paymentStatus === 'Pending' && (
                              <View
                                style={{
                                  height: 1,
                                  width: widthPercentageToDP(85),
                                  backgroundColor: COLORS.white_s,
                                  marginTop: heightPercentageToDP(1),
                                }}
                              />
                            )}
                            {/** CONFIRMATION */}
                            {item.paymentStatus === 'Pending' &&
                              (activatePaypalIsLoading ? (
                                seletedItem._id === item._id ? (
                                  <Loading />
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => submitConfirmation(item)}
                                    style={{
                                      flex: 2,
                                      backgroundColor: COLORS.green,
                                      width: widthPercentageToDP(85),
                                      padding: heightPercentageToDP(1),
                                      borderRadius: heightPercentageToDP(4),
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      marginTop: heightPercentageToDP(2),
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
                                    width: widthPercentageToDP(85),
                                    padding: heightPercentageToDP(1),
                                    borderRadius: heightPercentageToDP(4),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: heightPercentageToDP(2),
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
                              (rejectPaypalIsLoading ? (
                                seletedItem._id === item._id ? (
                                  <Loading />
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => submitRejection(item)}
                                    style={{
                                      flex: 2,
                                      backgroundColor: COLORS.red,
                                      width: widthPercentageToDP(85),
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
                                    width: widthPercentageToDP(85),
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
                              ))}
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={() =>
                      hasMore && isLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={COLORS.white_s}
                        />
                      ) : null
                    }
                  />
                )}
              </View>

              <View
                style={{
                  margin: heightPercentageToDP(2),
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PaypalDeposit')}
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
                    Create new account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AllPaypalDepositPayment;

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
