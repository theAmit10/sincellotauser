import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import {useGetHistoryQuery} from '../../helper/Networkcall';

import moment from 'moment';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {useGetAllDepositQuery} from '../helper/Networkcall';
import { nanoid } from '@reduxjs/toolkit';
import { HOVER } from 'nativewind/dist/utils/selector';

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

const AllDeposit = () => {
  const {accesstoken, user} = useSelector(state => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const navigation = useNavigation()

  console.log('Accesstoken :: ' + accesstoken);
  console.log('User ID :: ' + user.userId);

  const {isLoading, data, isError, refetch} =
    useGetAllDepositQuery(accesstoken);

  useFocusEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch]),
  );

  console.log('IS loaging :: ', isLoading);


  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDateTime = dateTimeString => {
    return moment(dateTimeString).format('MMMM DD, YYYY hh:mm A');
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      console.log('USE Effect running');
      setFilteredData(data.deposits);
    }
  }, [isLoading]);

  const handleSearch = text => {
    if (data) {
      const filtered = data.deposits.filter(item =>
        item.userId.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  // FOR ACCEPTING

  const acceptingData = async item => {
    console.log('Accepting Data');
    // setSelectedItem(item._id);

    // const res = await deletePaypalAccount({
    //   accesstoken: accesstoken,
    //   id: item._id,
    // }).unwrap();

    // // allTheDepositData();

    // Toast.show({type: 'success', text1: 'Success', text2: res.message});
  };

  // FOR CANCELLING

  const cancellingData = async item => {
    console.log('Cancelling Data');
    // setSelectedItem(item._id);

    // const res = await deletePaypalAccount({
    //   accesstoken: accesstoken,
    //   id: item._id,
    // }).unwrap();

    // // allTheDepositData();

    // Toast.show({type: 'success', text1: 'Success', text2: res.message});
  };

  // FOR SHOWING RECEIPT
  const showingReceipt = async item => {
    console.log("Showing receipt")
    navigation.navigate("ShowingReceipt", {
        item: item
    })
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
                ) : historyapidatas.length === 0 ? (
                  <View>
                    <NoDataFound data={'No History Found'} />
                  </View>
                ) : (
                  <FlatList
                    data={filteredData}
                    renderItem={({item}) => (
                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
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
                            marginBottom: heightPercentageToDP(1)
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
                                  {item.userId}
                                </Text>
                              </View>
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
                                  {item.amount}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={{flex: 1, flexDirection: 'row'}}>
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
                                borderBottomLeftRadius: heightPercentageToDP(2),
                                borderBottomEndRadius: heightPercentageToDP(2),
                                flexDirection: 'row',
                                padding: heightPercentageToDP(1),
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View style={styles.detailContainer}>
                                <Text 
                                 style={{...styles.detailLabel, width: '70%'}}>
                                  Payment Method
                                </Text>
                                <Text style={styles.detailValue}>
                                  {item.paymentType}
                                </Text>
                              </View>

                              <View style={styles.detailContainer}>
                                <Text
                                  style={{...styles.detailLabel, width: '70%'}}>
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

                            {/** BOTTOM DEPOSIT DETAILS CONTAINER  */}

                             
                            <View
                              style={{
                                flex: 1,
                                borderBottomLeftRadius: heightPercentageToDP(2),
                                borderBottomEndRadius: heightPercentageToDP(2),
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
                                onPress={() => showingReceipt(item)}
                                style={styles.detailContainer}>
                                <Text style={styles.detailLabel}>Receipt</Text>
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
                    )}
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
