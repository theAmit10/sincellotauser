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
import {serverName} from '../redux/store';
import {
  useDeleteCurrencyMutation,
  useGetAllCountryQuery,
  useUpdateCurrencyMutation,
} from '../helper/Networkcall';
import Loading from '../components/helpercComponent/Loading';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import {HOVER} from 'nativewind/dist/utils/selector';

const AllCountry = () => {
  const signupwith = 'email';

  console.log(signupwith);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);

  const {data, isLoading, error, refetch} = useGetAllCountryQuery(accesstoken);

  const [deleteCurrency, {isLoading: deleteIsLoading, isError: deleteIsError}] =
    useDeleteCurrencyMutation();

  const [seletedItem, setSelectedItem] = useState('');

  console.log('Curriencies ::' + JSON.stringify(data));

  useFocusEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch]),
  );

  // FOR DELETING DATA

  const deletingData = async item => {
    console.log('Deleting Data');
    setSelectedItem(item._id);

    const res = await deleteCurrency({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    console.log(deleteIsError);

    Toast.show({type: 'success', text1: 'Success', text2: res.message});

    refetch();
  };

  const editingData = async item => {
    console.log('Editing Data');
    setSelectedItem(item._id);
    navigation.navigate('UpdateCountry', {
      item: item,
    });
  };

  const selectCountryHandler = country => {
    //   navigation.navigate('Register', { country,signupwith });
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
                height: heightPercentageToDP(10),
                margin: heightPercentageToDP(2),
              }}>
              <GradientTextWhite style={styles.textStyle}>
                Select Country
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
            ) : data.currencies.length === 0 ? (
              <View
                style={{
                  margin: heightPercentageToDP(1),
                }}>
                <NoDataFound data={'No Country Available'} />
              </View>
            ) : (
              <FlatList
                data={data.currencies}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      height: heightPercentageToDP(20),
                      flexDirection: 'column',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      marginHorizontal: heightPercentageToDP(2),
                      marginBottom: heightPercentageToDP(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: heightPercentageToDP(10),
                        width: widthPercentageToDP(80),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderRadius: 100,
                          overflow: 'hidden',
                          width: 40,
                          height: 40,
                        }}>
                        {item?.countryicon ? (
                          <Image
                            source={{
                              uri: `${serverName}/uploads/currency/${item.countryicon}`,
                            }}
                            resizeMode="cover"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/image/dark_user.png')}
                            resizeMode="cover"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                        }}>
                        {item.countryname}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          paddingEnd: heightPercentageToDP(2),
                          gap: heightPercentageToDP(2),
                        }}>
                        {/** EDIT BUTTON */}

                        <TouchableOpacity onPress={() => editingData(item)}>
                          <LinearGradient
                            colors={[COLORS.grayBg, COLORS.white_s]}
                            style={{borderRadius: 10, padding: 5}}>
                            <FontAwesome
                              name={'edit'}
                              size={heightPercentageToDP(3)}
                              color={COLORS.darkGray}
                            />
                          </LinearGradient>
                        </TouchableOpacity>

                        {/** DELETE BUTTON */}

                        {deleteIsLoading ? (
                          seletedItem === item._id ? (
                            <Loading color={COLORS.green} />
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
                          <TouchableOpacity onPress={() => deletingData(item)}>
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
                      }}>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_Regular,
                          color: COLORS.black,
                        }}>
                        Currency Name
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                        }}>
                        {item.countrycurrencysymbol}
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
                        Currency Value :
                      </Text>
                      <Text
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                        }}>
                        1 {item.countrycurrencysymbol} ={' '}
                        {item.countrycurrencyvaluecomparedtoinr} INR
                      </Text>
                    </View>
                  </TouchableOpacity>
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

            <View
              style={{
                margin: heightPercentageToDP(2),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Createcountry')}
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
                  Create new country
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default AllCountry;

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
