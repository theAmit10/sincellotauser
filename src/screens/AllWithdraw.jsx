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
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  useGetAllWithdrawQuery,
  useUpdateDepositPaymentStatusMutation,
} from '../helper/Networkcall';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import CustomAlertForDeposit from '../components/helpercComponent/CustomAlertForDeposit';
import {multiplyStringNumbers} from './AllDeposit';
import NoDataFound from '../components/helpercComponent/NoDataFound';

const historyapidatas = [
  {
    id: 1,
    amount: '638383',
    currency: 'INR',
    date: 'Apr 19, 2024 05:36 PM',
    status: 'success',
    paymentmethod: 'UPI',
    transactionid: '2938398398238',
    type: 'deposit',
  },
  {
    id: 2,
    amount: '8383',
    currency: 'INR',
    date: 'Apr 09, 2024 05:36 PM',
    status: 'pending',
    paymentmethod: 'Bank',
    transactionid: '2938398398238',
    type: 'withdraw',
  },
  {
    id: 3,
    amount: '9638383',
    currency: 'INR',
    date: 'Apr 19, 2024 05:36 PM',
    status: 'success',
    paymentmethod: 'UPI',
    transactionid: '2938398398238',
    type: 'deposit',
  },
  {
    id: 4,
    amount: '238383',
    currency: 'INR',
    date: 'Apr 19, 2024 05:36 PM',
    status: 'success',
    paymentmethod: 'UPI',
    transactionid: '2938398398238',
    type: 'deposit',
  },
  {
    id: 5,
    amount: '138383',
    currency: 'INR',
    date: 'Apr 19, 2024 05:36 PM',
    status: 'success',
    paymentmethod: 'UPI',
    transactionid: '2938398398238',
    type: 'deposit',
  },
];

const AllWithdraw = () => {
  const {accesstoken, user} = useSelector(state => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);
  const navigation = useNavigation();

  // const [page, setPage] = useState(1); // Current page
  const [dataList, setDataList] = useState([]); // List of all data
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  console.log('Accesstoken :: ' + accesstoken);
  console.log('User ID :: ' + user.userId);

  // const {isLoading, data, isError, refetch} = useGetAllWithdrawQuery({
  //   accesstoken,
  //   page, // current page number
  //   limit: 100, // number of items per page
  // });

  // States
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch,
    isFetching: fetchingPaginated,
  } = useGetAllWithdrawQuery({accesstoken, page, limit});

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data
      setPage(1); // ✅ Reset Page
      setHasMore(true); // ✅ Reset Load More
      refetch?.(); // ✅ Ensure Fresh Data
    }, [refetch]),
  );

  useEffect(() => {
    setLoading(true);
    if (paginatedData?.withdrawals) {
      // For paginated data, filter out duplicates before appending
      setFilteredData(prev => {
        const newData = paginatedData.withdrawals.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.withdrawals : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.withdrawals.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [paginatedData, page, updateKey]);

  const loadMore = () => {
    if (!loading && hasMore && !fetchingPaginated) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;

  // useFocusEffect(
  //   useCallback(() => {
  //     // Refetch the data when the screen is focused
  //     refetch();
  //   }, [refetch]),
  // );

  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [updateKey, isFocused]);

  // FOR UPDATING PAYMENT STATUS
  const [
    updateDepositPaymentStatus,
    {isLoading: updateStatusIsLoading, error: updateStatusError},
  ] = useUpdateDepositPaymentStatusMutation();

  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  console.log('Error happen');
  console.log(updateStatusError);

  useEffect(() => {
    if (updateStatusError !== undefined) {
      Toast.show({
        type: 'error',
        text1: updateStatusError?.data?.message,
      });
    }
  }, [updateStatusError]);

  const [filteredData, setFilteredData] = useState([]);

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     console.log('USE Effect running');
  //     setFilteredData(data.withdrawals);
  //   }
  // }, [isLoading, isFocused, refetch, updateKey]);

  const handleSearch = text => {
    if (data) {
      const filtered = data.withdrawals.filter(item =>
        item.userId.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  // FOR ACCEPTING

  // const acceptingData = async item => {
  //   console.log('Accepting Data');

  //   setSelectedItem(item._id);

  //   const body = {
  //     transactionId: item._id,
  //     paymentStatus: 'Completed',
  //   };

  //   const res = await updateDepositPaymentStatus({
  //     accesstoken: accesstoken,
  //     body: body,
  //   }).unwrap();

  //   refetch();

  //   if (!isLoading) {
  //     console.log('USE running');
  //     setFilteredData(data.deposits);
  //   }

  //   Toast.show({type: 'success', text1: 'Success', text2: res.message});
  // };

  // // FOR CANCELLING

  // const cancellingData = async item => {
  //   console.log('Cancelling Data');
  //   setSelectedItem(item._id);

  //   const body = {
  //     transactionId: item._id,
  //     paymentStatus: 'Cancelled',
  //   };

  //   const res = await updateDepositPaymentStatus({
  //     accesstoken: accesstoken,
  //     body: body,
  //   }).unwrap();

  //   refetch();

  //   if (!isLoading) {
  //     console.log('USE  running');
  //     setFilteredData(data.deposits);
  //   }

  //   Toast.show({type: 'success', text1: 'Success', text2: res.message});
  // };

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

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

  const [alertVisibleAccepted, setAlertVisibleAccepted] = useState(false);
  const [alertVisibleRejected, setAlertVisibleRejected] = useState(false);

  const showAlertAccepted = item => {
    setAlertVisibleAccepted(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
  };

  const closeAlertAccepted = () => {
    setAlertVisibleAccepted(false);
  };

  // const handleYesAccepted = () => {
  //   // Handle the Yes action here
  //   setAlertVisibleAccepted(false);
  //   acceptingData(selectedItem);
  //   console.log('Yes pressed');
  // };

  const handleYesAccepted = ({paymentUpdateNote, imageSource, amount}) => {
    // Handle the Yes action here
    setAlertVisibleAccepted(false);
    acceptingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log('Yes pressed');
  };

  // const showAlertRejected = item => {
  //   setAlertVisibleRejected(true);
  //   setSelectedItemId(item._id);
  //   setSelectedItem(item);
  // };

  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const [usercountry, setUserCountry] = useState(null);

  const showAlertRejected = item => {
    setAlertVisibleRejected(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);

    // Calculate the amount
    // const calculatedAmount = item.convertedAmount
    //   ? item.convertedAmount
    //   : multiplyStringNumbers(
    //       item.amount,
    //       item.currency !== undefined
    //         ? item.currency.countrycurrencyvaluecomparedtoinr
    //         : 1,
    //     );

    const calculatedAmount = item.amount;

    // Set the calculated amount and country
    setCalculatedAmount(calculatedAmount);
    setUserCountry(item.currency);

    console.log('Selceted data');
    console.log(calculatedAmount);
    console.log(JSON.stringify(usercountry));
  };

  const closeAlertRejected = () => {
    setAlertVisibleRejected(false);
  };

  // const handleYesRejected = () => {
  //   // Handle the Yes action here
  //   setAlertVisibleRejected(false);
  //   cancellingData(selectedItem);
  //   console.log('Yes pressed');
  // };

  const handleYesRejected = ({paymentUpdateNote, imageSource, amount}) => {
    // Handle the Yes action here
    setAlertVisibleRejected(false);
    cancellingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log('Yes pressed');
  };

  function formatAmount(value) {
    if (typeof value === 'string') {
      value = parseFloat(value); // Convert string to float if necessary
    }

    // Check if the number has decimals
    if (value % 1 === 0) {
      return value; // Return as is if it's a whole number
    } else {
      return parseFloat(value.toFixed(1)); // Return with one decimal point if it has decimals
    }
  }

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
                  All Withdraw
                </GradientTextWhite>
                {/* <View
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
                </View> */}

                {isLoading && page === 1 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={filteredData}
                    renderItem={({item}) => {
                      // const calculatedAmount = item.convertedAmount
                      //   ? item.convertedAmount
                      //   : multiplyStringNumbers(
                      //       item.amount,
                      //       item.currency !== undefined
                      //         ? item.currency.countrycurrencyvaluecomparedtoinr
                      //         : 1,
                      //     );

                      const calculatedAmount = item.amount;
                      const usercountry = item.currency;
                      const paymentType = item.paymentType;

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
                            minHeight: expandedItems[item._id]
                              ? heightPercentageToDP(40)
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
                                    {formatAmount(calculatedAmount)}{' '}
                                    {usercountry.countrycurrencysymbol}
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

                            {selectedItemId === item._id && (
                              <>
                                {/** FOR ACCEPTING */}
                                <CustomAlertForDeposit
                                  visible={alertVisibleAccepted}
                                  onClose={closeAlertAccepted}
                                  onYes={handleYesAccepted}
                                  defaultAmount={calculatedAmount}
                                  usercountry={usercountry}
                                  paymentType={paymentType}
                                />

                                {/** FOR REJECTING */}
                                <CustomAlertForDeposit
                                  visible={alertVisibleRejected}
                                  onClose={closeAlertRejected}
                                  onYes={handleYesRejected}
                                  defaultAmount={calculatedAmount}
                                  usercountry={usercountry}
                                  paymentType={paymentType}
                                />
                              </>
                            )}

                            {/* <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity
                              onPress={() => acceptingData(item)}
                              style={{
                                width: '40%',
                                paddingHorizontal: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <LinearGradient
                                colors={[COLORS.lightWhite, COLORS.white_s]}
                                style={styles.iconContainer}>
                                <AntDesign
                                  name={'check'}
                                  size={heightPercentageToDP(2)}
                                  color={COLORS.green}
                                />
                              </LinearGradient>
                            </TouchableOpacity>

                            <Text
                              style={{
                                fontFamily: FONT.Montserrat_Regular,
                                color: COLORS.black,
                                fontSize: heightPercentageToDP(1.2),
                                textAlignVertical: 'center',
                              }}>
                              {item.paymentStatus}
                            </Text>

                            <TouchableOpacity
                              onPress={() => cancellingData(item)}
                              style={{
                                width: '40%',
                                paddingHorizontal: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <LinearGradient
                                colors={[COLORS.lightWhite, COLORS.white_s]}
                                style={styles.iconContainer}>
                                <AntDesign
                                  name={'close'}
                                  size={heightPercentageToDP(2)}
                                  color={COLORS.red}
                                />
                              </LinearGradient>
                            </TouchableOpacity>
                          </View> */}
                          </TouchableOpacity>

                          {expandedItems[item._id] && (
                            <>
                              <View
                                style={{
                                  height: 1,
                                  backgroundColor: COLORS.white_s,
                                  marginHorizontal: heightPercentageToDP(2),
                                  marginBottom: heightPercentageToDP(1),
                                }}
                              />

                              {/** FOR PAYMENT METHOD */}
                              <View
                                style={{
                                  flex: 1,
                                  borderBottomLeftRadius:
                                    heightPercentageToDP(2),
                                  borderBottomEndRadius:
                                    heightPercentageToDP(2),
                                  flexDirection: 'row',
                                  paddingHorizontal: heightPercentageToDP(2),
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    width: widthPercentageToDP(20),
                                  }}>
                                  <Text
                                    style={{
                                      ...styles.detailLabel,
                                      width: '70%',
                                    }}>
                                    Payment Method
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flex: 1,

                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                  }}>
                                  <Text style={styles.detailValue}>
                                    {item.paymentType}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    ...styles.detailContainer,

                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                  }}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      copyToClipboard(item.paymentType)
                                    }>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
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

                              {/** FOR CRYPTO */}
                              {item.paymentType === 'Crypto' && (
                                <>
                                  <View
                                    style={{
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Wallet address
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.cryptoWalletAddress}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(
                                            item.cryptoWalletAddress,
                                          )
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Network
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.networkType}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.networkType)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                </>
                              )}

                              {/** FOR PAYPAL */}
                              {item.paymentType === 'Paypal' && (
                                <>
                                  <View
                                    style={{
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        email address
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.paypalEmail}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.paypalEmail)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                </>
                              )}

                              {/** FOR SKRILL */}
                              {item.paymentType === 'Skrill' && (
                                <>
                                  <View
                                    style={{
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Contact
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.skrillContact}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.skrillContact)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                </>
                              )}

                              {/** FOR BANK */}
                              {item.paymentType === 'Bank' && (
                                <>
                                  <View
                                    style={{
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Bank
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.bankName}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.bankName)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Holder name
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.accountHolderName}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(
                                            item.accountHolderName,
                                          )
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        IFSC code
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.bankIFSC}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.bankIFSC)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Account no.
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.bankAccountNumber}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(
                                            item.bankAccountNumber,
                                          )
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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

                                  {item.swiftcode && (
                                    <View
                                      style={{
                                        flex: 1,
                                        borderBottomLeftRadius:
                                          heightPercentageToDP(2),
                                        borderBottomEndRadius:
                                          heightPercentageToDP(2),
                                        flexDirection: 'row',
                                        paddingHorizontal:
                                          heightPercentageToDP(2),
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                      }}>
                                      <View
                                        style={{
                                          width: widthPercentageToDP(20),
                                        }}>
                                        <Text
                                          style={{
                                            ...styles.detailLabel,
                                            width: '70%',
                                          }}>
                                          Swift code
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          flex: 1,

                                          justifyContent: 'flex-start',
                                          alignItems: 'flex-start',
                                        }}>
                                        <Text style={styles.detailValue}>
                                          {item.swiftcode}
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          ...styles.detailContainer,

                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end',
                                        }}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            copyToClipboard(item.swiftcode)
                                          }>
                                          <LinearGradient
                                            colors={[
                                              COLORS.lightWhite,
                                              COLORS.white_s,
                                            ]}
                                            style={{
                                              padding:
                                                heightPercentageToDP(0.5),
                                              borderRadius:
                                                heightPercentageToDP(1),
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
                                  )}
                                </>
                              )}

                              {/** FOR UPI */}
                              {item.paymentType === 'Upi' && (
                                <>
                                  <View
                                    style={{
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        Holder name
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.upiHolderName}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.upiHolderName)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                      flex: 1,

                                      borderBottomLeftRadius:
                                        heightPercentageToDP(2),
                                      borderBottomEndRadius:
                                        heightPercentageToDP(2),
                                      flexDirection: 'row',
                                      paddingHorizontal:
                                        heightPercentageToDP(2),
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        width: widthPercentageToDP(20),
                                      }}>
                                      <Text
                                        style={{
                                          ...styles.detailLabel,
                                          width: '70%',
                                        }}>
                                        UPI ID
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,

                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text style={styles.detailValue}>
                                        {item.upiId}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        ...styles.detailContainer,

                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          copyToClipboard(item.upiId)
                                        }>
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          style={{
                                            padding: heightPercentageToDP(0.5),
                                            borderRadius:
                                              heightPercentageToDP(1),
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
                                </>
                              )}

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
                                  onPress={() => toggleItem(item._id)}
                                  style={{
                                    width: '40%',
                                    paddingHorizontal: 4,
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                    paddingEnd: heightPercentageToDP(5.5),
                                  }}>
                                  <LinearGradient
                                    colors={[COLORS.lightWhite, COLORS.white_s]}
                                    style={styles.expandIconContainer}>
                                    <Ionicons
                                      name={
                                        expandedItems[item._id]
                                          ? 'remove-outline'
                                          : 'add-outline'
                                      }
                                      size={heightPercentageToDP(2)}
                                      color={COLORS.darkGray}
                                    />
                                  </LinearGradient>
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </LinearGradient>
                      );
                    }}
                    keyExtractor={item => item._id}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={() =>
                      hasMore && isLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={COLORS.white_s}
                        />
                      ) : (
                        <View style={{height: heightPercentageToDP(10)}} />
                      )
                    }
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

export default AllWithdraw;

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
