import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {
  useGetAllDepositQuery,
  useUpdateDepositPaymentStatusMutation,
} from '../helper/Networkcall';
import CustomAlertForDeposit from '../components/helpercComponent/CustomAlertForDeposit';
import Toast from 'react-native-toast-message';
import CustomReceiptViewer from '../components/helpercComponent/CustomReceiptViewer';
import NoDataFound from '../components/helpercComponent/NoDataFound';

export const multiplyStringNumbers = (str1, str2) => {
  // Convert the strings to numbers
  const num1 = Number(str1);
  const num2 = Number(str2);

  // Check if the conversion was successful
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Both inputs must be valid numbers');
  }

  // Multiply the numbers and return the result
  return num1 * num2;
};

const AllDeposit = () => {
  const {accesstoken, user} = useSelector(state => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const [updateKey, setUpdateKey] = useState(0);

  console.log('Accesstoken :: ' + accesstoken);
  console.log('User ID :: ' + user.userId);

  const {isLoading, data, isError, refetch} =
    useGetAllDepositQuery(accesstoken);

  // FOR UPDATING PAYMENT STATUS
  const [
    updateDepositPaymentStatus,
    {isLoading: updateStatusIsLoading, error: updateStatusError},
  ] = useUpdateDepositPaymentStatusMutation();

  const isFocused = useIsFocused();


  useEffect(() => {
    refetch();
  }, [updateKey, isFocused]);

  console.log('IS loaging :: ', isLoading);

  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      console.log('USE Effect running');
      setFilteredData(data.deposits);
    }
  }, [isLoading, isFocused, refetch, updateKey]);

  const handleSearch = text => {
    if (data) {
      const filtered = data.deposits.filter(item =>
        item.userId.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  // FOR ACCEPTING

  const acceptingData = async (
    item,
    paymentUpdateNote,
    imageSource,
    amount,
  ) => {
    console.log('Accepting Data');

    setSelectedItem(item._id);
    if (isNaN(amount)) {
      Toast.show({
        type: 'error',
        text1: 'Invaid amount',
        text2: 'Enter valid amount',
      });
    } else if (paymentUpdateNote && imageSource) {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('paymentStatus', 'Completed');
      formData.append('paymentUpdateNote', paymentUpdateNote);
      formData.append('amount', amount);

      formData.append('paymentupdatereceipt', {
        uri: imageSource[0].uri,
        name: imageSource[0].name,
        type: imageSource[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
      });

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
      if (updateStatusError) {
        console.log(updateStatusError);
      }
    } else if (paymentUpdateNote) {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('paymentStatus', 'Completed');
      formData.append('amount', amount);
      formData.append('paymentUpdateNote', paymentUpdateNote);

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
      if (updateStatusError) {
        console.log(updateStatusError);
      }
    } else if (imageSource) {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('paymentStatus', 'Completed');
      formData.append('amount', amount);
      formData.append('paymentupdatereceipt', {
        uri: imageSource[0].uri,
        name: imageSource[0].name,
        type: imageSource[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
      });

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
    } else {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('amount', amount);
      formData.append('paymentStatus', 'Completed');

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);

      if (updateStatusError) {
        console.log(updateStatusError);
      }
    }

    // const body = {
    //   transactionId: item._id,
    //   paymentStatus: 'Completed',
    // };

    // const res = await updateDepositPaymentStatus({
    //   accesstoken: accesstoken,
    //   body: body,
    // }).unwrap();

    // refetch();

    // Toast.show({type: 'success', text1: 'Success', text2: res.message});
  };

  // FOR CANCELLING

  const cancellingData = async (
    item,
    paymentUpdateNote,
    imageSource,
    amount,
  ) => {
    console.log('Cancelling Data');
    setSelectedItem(item._id);
    if (isNaN(amount)) {
      Toast.show({
        type: 'error',
        text1: 'Invaid amount',
        text2: 'Enter valid amount',
      });
    } else if (paymentUpdateNote && imageSource) {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('paymentStatus', 'Cancelled');
      formData.append('paymentUpdateNote', paymentUpdateNote);
      formData.append('amount', amount);
      formData.append('paymentupdatereceipt', {
        uri: imageSource[0].uri,
        name: imageSource[0].name,
        type: imageSource[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
      });

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
    } else if (paymentUpdateNote) {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('paymentStatus', 'Cancelled');
      formData.append('amount', amount);
      formData.append('paymentUpdateNote', paymentUpdateNote);

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
    } else if (imageSource) {
      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('paymentStatus', 'Cancelled');
      formData.append('amount', amount);
      formData.append('paymentupdatereceipt', {
        uri: imageSource[0].uri,
        name: imageSource[0].name,
        type: imageSource[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
      });

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
    } else {
      // const body = {
      //   transactionId: item._id,
      //   paymentStatus: "Completed",
      // };

      const formData = new FormData();
      formData.append('transactionId', item._id);
      formData.append('amount', amount);
      formData.append('paymentStatus', 'Cancelled');

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      setUpdateKey(prevKey => prevKey + 1);
    }

    // const body = {
    //   transactionId: item._id,
    //   paymentStatus: 'Cancelled',
    // };

    // const res = await updateDepositPaymentStatus({
    //   accesstoken: accesstoken,
    //   body: body,
    // }).unwrap();

    // refetch();

    // Toast.show({type: 'success', text1: 'Success', text2: res.message});
  };

  const [alertVisibleAccepted, setAlertVisibleAccepted] = useState(false);
  const [alertVisibleRejected, setAlertVisibleRejected] = useState(false);

  const showAlertAccepted = item => {
    setAlertVisibleAccepted(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);

    // console.log("Transaction :: "+JSON.stringify(item))
  };

  const closeAlertAccepted = () => {
    setAlertVisibleAccepted(false);
  };

  const handleYesAccepted = ({paymentUpdateNote, imageSource, amount}) => {
    // Handle the Yes action here
    setAlertVisibleAccepted(false);
    acceptingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log('Yes pressed');
  };

  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const [usercountry, setUserCountry] = useState(null);

  const showAlertRejected = item => {
    setAlertVisibleRejected(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);

    // Calculate the amount
    const calculatedAmount = item.convertedAmount
      ? item.convertedAmount
      : multiplyStringNumbers(
          item.amount,
          item.currency !== undefined
            ? item.currency.countrycurrencyvaluecomparedtoinr
            : 1,
        );

    // Set the calculated amount and country
    setCalculatedAmount(calculatedAmount);
    setUserCountry(item.currency);

    console.log('Selceted data');
    console.log(calculatedAmount);
    console.log(JSON.stringify(usercountry));
  };

  // const showAlertRejected = item => {
  //   setAlertVisibleRejected(true);
  //   setSelectedItemId(item._id);
  //   setSelectedItem(item);

  //   // Calculate values here
  //   const calculatedAmount = item.convertedAmount
  //     ? item.convertedAmount
  //     : multiplyStringNumbers(
  //         item.amount,
  //         item.currency !== undefined
  //           ? item.currency.countrycurrencyvaluecomparedtoinr
  //           : 1,
  //       );

  //   setSelectedAmount(calculatedAmount);
  //   setSelectedCountry(item.currency);
  // };

  const closeAlertRejected = () => {
    setAlertVisibleRejected(false);
  };

  const handleYesRejected = ({paymentUpdateNote, imageSource, amount}) => {
    // Handle the Yes action here
    setAlertVisibleRejected(false);
    cancellingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log('Yes pressed');
  };

  //  FOR SHOWING RECEIPT

  const [alertVisibleReceipt, setAlertVisibleReceipt] = useState(false);

  const showAlertReceipt = item => {
    setAlertVisibleReceipt(true);
  };

  const closeAlertReceipt = () => {
    setAlertVisibleReceipt(false);
  };

  const handleYesReceipt = () => {
    // Handle the Yes action here
    setAlertVisibleReceipt(false);
    console.log('Yes pressed');
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
            source={require('../../assets/image/tlwbg.jpg')}
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
                  AllDeposit
                </GradientTextWhite>
                <View
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.white_s,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  <Fontisto
                    name={'search'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                  <TextInput
                    style={{
                      marginStart: heightPercentageToDP(1),
                      flex: 1,
                      fontFamily: FONT.Montserrat_SemiBold,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}
                    placeholder="Search for userid"
                    placeholderTextColor={COLORS.black}
                    label="Search"
                    onChangeText={handleSearch}
                  />
                </View>

                {isLoading ? (
                  <View
                    style={{
                      height: heightPercentageToDP(30),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Loading />
                  </View>
                ) : filteredData.length === 0 ? (
                  <View>
                    <NoDataFound data={'No History Found'} />
                  </View>
                ) : (
                  <FlatList
                    data={filteredData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                      const calculatedAmount = item.convertedAmount
                        ? item.convertedAmount
                        : multiplyStringNumbers(
                            item.amount,
                            item.currency !== undefined
                              ? item.currency.countrycurrencyvaluecomparedtoinr
                              : 1,
                          );

                      const usercountry = item.currency;

                      return (
                        <LinearGradient
                          colors={[
                            COLORS.time_firstblue,
                            COLORS.time_secondbluw,
                          ]}
                          start={{x: 0, y: 0}} // start from left
                          end={{x: 1, y: 0}} // end at right
                          style={{
                            justifyContent: 'flex-start',
                            height: expandedItems[item._id]
                              ? heightPercentageToDP(30)
                              : heightPercentageToDP(10),
                            borderRadius: heightPercentageToDP(2),
                            marginTop: heightPercentageToDP(2),
                          }}>
                          <TouchableOpacity
                            onPress={() => toggleItem(item._id)}
                            style={{
                              flex: 1,
                              borderTopLeftRadius: heightPercentageToDP(2),
                              borderTopEndRadius: heightPercentageToDP(2),
                              flexDirection: 'row',
                              marginBottom: heightPercentageToDP(1),
                            }}>
                            <View
                              style={{
                                width: widthPercentageToDP(50),

                                flexDirection: 'row',
                                borderTopLeftRadius: heightPercentageToDP(2),
                                borderTopEndRadius: heightPercentageToDP(2),
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  paddingStart: heightPercentageToDP(2),
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: FONT.Montserrat_SemiBold,
                                      fontSize: heightPercentageToDP(1.6),
                                      color: COLORS.black,
                                    }}>
                                    User ID
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate('UserDetails', {
                                      userdata: item,
                                      fromscreen: 'deposit',
                                    })
                                  }
                                  style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: FONT.Montserrat_Regular,
                                      fontSize: heightPercentageToDP(1.8),
                                      color: COLORS.black,
                                    }}>
                                    {item.userId}
                                  </Text>
                                </TouchableOpacity>
                              </View>

                              <View
                                style={{
                                  flex: 2,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: FONT.Montserrat_SemiBold,
                                      fontSize: heightPercentageToDP(1.6),
                                      color: COLORS.black,
                                    }}>
                                    Amount
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: FONT.Montserrat_Regular,
                                      fontSize: heightPercentageToDP(1.8),
                                      color: COLORS.black,
                                    }}>
                                    {calculatedAmount}
                                  </Text>
                                </View>
                              </View>
                            </View>

                            {/** Right View */}
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              {updateStatusIsLoading &&
                              item._id === selectedItemId ? (
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Loading />
                                </View>
                              ) : (
                                <>
                                  {item.paymentStatus === 'Pending' && (
                                    <TouchableOpacity
                                      onPress={() => showAlertAccepted(item)}
                                      style={{
                                        width: '40%',
                                        paddingHorizontal: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <LinearGradient
                                        colors={[
                                          COLORS.lightWhite,
                                          COLORS.white_s,
                                        ]}
                                        style={styles.iconContainer}>
                                        <AntDesign
                                          name={'check'}
                                          size={heightPercentageToDP(2)}
                                          color={COLORS.green}
                                        />
                                      </LinearGradient>
                                    </TouchableOpacity>
                                  )}

                                  {/** PAYMENT STATUS TEXT */}
                                  {item.paymentStatus === 'Pending' ? (
                                    <Text
                                      style={{
                                        fontFamily: FONT.Montserrat_Regular,
                                        color: COLORS.black,
                                        fontSize: heightPercentageToDP(1.2),
                                        textAlignVertical: 'center',
                                        alignSelf: 'center',
                                      }}>
                                      {item.paymentStatus}
                                    </Text>
                                  ) : item.paymentStatus === 'Completed' ? (
                                    <View
                                      style={{
                                        backgroundColor: COLORS.green,
                                        borderRadius: heightPercentageToDP(1),
                                        margin: heightPercentageToDP(2),
                                        alignSelf: 'center',
                                        padding: heightPercentageToDP(1),
                                        flex: 1, // Ensure the view takes up space if necessary
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: FONT.Montserrat_SemiBold,
                                          color: COLORS.white_s,
                                          fontSize: heightPercentageToDP(1.5),
                                          textAlignVertical: 'center',
                                          textAlign: 'center',
                                        }}>
                                        {item.paymentStatus}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        flex: 1,
                                        backgroundColor: COLORS.red,
                                        borderRadius: heightPercentageToDP(2),
                                        margin: heightPercentageToDP(2),
                                        alignSelf: 'center',
                                        padding: heightPercentageToDP(1),
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: FONT.Montserrat_SemiBold,
                                          color: COLORS.white_s,
                                          fontSize: heightPercentageToDP(1.5),
                                          textAlignVertical: 'center',
                                          textAlign: 'center',
                                        }}>
                                        {item.paymentStatus}
                                      </Text>
                                    </View>
                                  )}

                                  {selectedItemId === item._id && (
                                    <>
                                      {/** FOR ACCEPTING */}
                                      <CustomAlertForDeposit
                                        visible={alertVisibleAccepted}
                                        onClose={closeAlertAccepted}
                                        onYes={handleYesAccepted}
                                        defaultAmount={calculatedAmount}
                                        usercountry={usercountry}
                                      />

                                      {/** FOR REJECTING */}
                                      <CustomAlertForDeposit
                                        visible={alertVisibleRejected}
                                        onClose={closeAlertRejected}
                                        onYes={handleYesRejected}
                                        defaultAmount={calculatedAmount}
                                        usercountry={usercountry}
                                      />
                                    </>
                                  )}

                                  {item.paymentStatus === 'Pending' && (
                                    <TouchableOpacity
                                      onPress={() => showAlertRejected(item)}
                                      style={{
                                        width: '40%',
                                        paddingHorizontal: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <LinearGradient
                                        colors={[
                                          COLORS.lightWhite,
                                          COLORS.white_s,
                                        ]}
                                        style={styles.iconContainer}>
                                        <AntDesign
                                          name={'close'}
                                          size={heightPercentageToDP(2)}
                                          color={COLORS.red}
                                        />
                                      </LinearGradient>
                                    </TouchableOpacity>
                                  )}
                                </>
                              )}
                            </View>
                          </TouchableOpacity>

                          {expandedItems[item._id] && (
                            <>
                              <View
                                style={{
                                  height: 1,
                                  backgroundColor: COLORS.white_s,
                                  marginHorizontal: heightPercentageToDP(2),
                                }}
                              />
                              <View
                                style={{
                                  flex: 1,
                                  borderBottomLeftRadius:
                                    heightPercentageToDP(2),
                                  borderBottomEndRadius:
                                    heightPercentageToDP(2),
                                  flexDirection: 'row',
                                  padding: heightPercentageToDP(1),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <View style={styles.detailContainer}>
                                  <Text
                                    style={{
                                      ...styles.detailLabel,
                                      width: '70%',
                                    }}>
                                    Payment Method
                                  </Text>
                                  <Text style={styles.detailValue}>
                                    {item.paymentType}
                                  </Text>
                                </View>

                                <View style={styles.detailContainer}>
                                  <Text
                                    style={{
                                      ...styles.detailLabel,
                                      width: '70%',
                                    }}>
                                    Payment ID
                                  </Text>
                                  <Text style={styles.detailValue}>
                                    {item.paymentTypeId}
                                  </Text>
                                </View>

                                <View style={styles.detailContainer}>
                                  <Text style={{...styles.detailLabel}}>
                                    Transaction ID
                                  </Text>
                                  <Text style={styles.detailValue}>
                                    {item.transactionId}
                                  </Text>
                                </View>
                              </View>

                              {/** FOR SHOWING RECEIPT */}
                              <CustomReceiptViewer
                                visible={alertVisibleReceipt}
                                onClose={closeAlertReceipt}
                                onYes={handleYesReceipt}
                                data={item}
                                img={item.receipt}
                              />

                              {/** BOTTOM DEPOSIT DETAILS CONTAINER  */}

                              <View
                                style={{
                                  flex: 1,
                                  borderBottomLeftRadius:
                                    heightPercentageToDP(2),
                                  borderBottomEndRadius:
                                    heightPercentageToDP(2),
                                  flexDirection: 'row',
                                  padding: heightPercentageToDP(1),
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    ...styles.detailContainer,
                                    width: '70%',
                                    paddingBottom: heightPercentageToDP(1),
                                  }}>
                                  <Text style={styles.detailLabel}>Remark</Text>
                                  <Text
                                    style={{
                                      ...styles.detailValue,
                                      paddingEnd: heightPercentageToDP(1),
                                      fontSize: heightPercentageToDP(1.5),
                                    }}
                                    numberOfLines={5}>
                                    {item.remark === '' ? 'NA' : item.remark}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() => showAlertReceipt()}
                                  style={styles.detailContainer}>
                                  <Text style={styles.detailLabel}>
                                    Receipt
                                  </Text>
                                  <Text
                                    style={{
                                      ...styles.detailValue,
                                      paddingEnd: heightPercentageToDP(1),
                                    }}>
                                    Show Receipt
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              {/* <View
                              style={{
                                flex: 1,
                                borderBottomLeftRadius: heightPercentageToDP(2),
                                borderBottomEndRadius: heightPercentageToDP(2),
                                flexDirection: 'row',
                                padding: heightPercentageToDP(1),
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity
                              onPress={() => showingReceipt(item)}
                              style={styles.detailContainer}>
                                <Text style={styles.detailLabel}>Receipt</Text>
                                <Text style={styles.detailValue}>
                                  Show Receipt
                                </Text>
                              </TouchableOpacity>

                              <View
                                style={{
                                  ...styles.detailContainer,
                                  width: '70%',
                                  paddingBottom: heightPercentageToDP(1),
                                }}>
                                <Text style={styles.detailLabel}>Remark</Text>
                                <Text
                                  style={{...styles.detailValue,paddingEnd: heightPercentageToDP(1)}}
                                  numberOfLines={3}>
                                  {item.remark === '' ? 'NA' : item.remark}
                                </Text>
                              </View>
                            </View> */}
                            </>
                          )}
                        </LinearGradient>
                      );
                    }}
                    keyExtractor={item => item._id}
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
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AllDeposit;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  iconContainer: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
  },
  expandIconContainer: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    width: '33%',
    paddingStart: heightPercentageToDP(1),
  },
  detailLabel: {
    fontFamily: FONT.Montserrat_Regular,
    color: COLORS.black,
    fontSize: heightPercentageToDP(1.5),
  },
  detailValue: {
    fontFamily: FONT.Montserrat_SemiBold,
    color: COLORS.black,
    fontSize: heightPercentageToDP(1.8),
  },
});

// const historyapidatas = [
//   {
//     id: 1,
//     amount: '638383',
//     currency: 'INR',
//     date: 'Apr 19, 2024 05:36 PM',
//     status: 'success',
//     paymentmethod: 'UPI',
//     transactionid: '2938398398238',
//     type: 'deposit',
//   },
//   {
//     id: 2,
//     amount: '8383',
//     currency: 'INR',
//     date: 'Apr 09, 2024 05:36 PM',
//     status: 'pending',
//     paymentmethod: 'Bank',
//     transactionid: '2938398398238',
//     type: 'withdraw',
//   },
//   {
//     id: 3,
//     amount: '9638383',
//     currency: 'INR',
//     date: 'Apr 19, 2024 05:36 PM',
//     status: 'success',
//     paymentmethod: 'UPI',
//     transactionid: '2938398398238',
//     type: 'deposit',
//   },
//   {
//     id: 4,
//     amount: '238383',
//     currency: 'INR',
//     date: 'Apr 19, 2024 05:36 PM',
//     status: 'success',
//     paymentmethod: 'UPI',
//     transactionid: '2938398398238',
//     type: 'deposit',
//   },
//   {
//     id: 5,
//     amount: '138383',
//     currency: 'INR',
//     date: 'Apr 19, 2024 05:36 PM',
//     status: 'success',
//     paymentmethod: 'UPI',
//     transactionid: '2938398398238',
//     type: 'deposit',
//   },
// ];
