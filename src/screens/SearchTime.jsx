import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {getTimeAccordingLocation} from '../redux/actions/timeAction';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const SearchTime = ({route}) => {
  const navigation = useNavigation();

  const {locationdata} = route.params;
  // console.log(locationdata);

  const [searchData, setSearchData] = useState('');

  const [showLoading, setLoading] = useState(false);

  const [data, setData] = useState([
    {id: '1', title: '08 : 00 AM'},
    {id: '2', title: '10 : 00 AM'},
    {id: '3', title: '12 : 00 PM'},
    {id: '4', title: '02 : 00 PM'},
    {id: '5', title: '04 : 00 PM'},
    {id: '6', title: '06 : 00 PM'},
    {id: '7', title: '08 : 00 PM'},
    {id: '8', title: '10 : 00 PM'},
  ]);

  const dispatch = useDispatch();

  const {accesstoken, user} = useSelector(state => state.user);
  const {loading, times} = useSelector(state => state.time);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = times.filter(item =>
      item.lottime.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };
  const focused = useIsFocused();

  useEffect(() => {
    dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(times); // Update filteredData whenever locations change
  }, [times]);

  const [selectedItem, setSelectedItem] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async item => {
    console.log('Item clicked :: ' + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);

    try {
      const url = `${UrlHelper.DELETE_TIME_API}/${item._id}`;
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
      dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
      setProgressBar(false);
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
            {/** Main Cointainer */}

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
                  height: heightPercentageToDP(15),
                  marginHorizontal: heightPercentageToDP(2),
                  marginVertical: heightPercentageToDP(1),
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <GradientTextWhite style={styles.textStyle}>
                    Search Time
                  </GradientTextWhite>
                  <GradientText
                    style={{
                      fontSize: heightPercentageToDP(2),
                      fontFamily: FONT.Montserrat_Bold,
                      marginEnd: heightPercentageToDP(2),
                    }}>
                    {locationdata?.maximumRange}
                  </GradientText>
                </View>

                {/** Search container */}

                <View
                  style={{
                    height: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.grayHalfBg,
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
                    placeholderTextColor={COLORS.black}
                    placeholder="Search for time"
                    label="Search"
                    onChangeText={handleSearch}
                  />
                </View>
              </View>

              <View
                style={{
                  marginHorizontal: heightPercentageToDP(2),
                  marginVertical: heightPercentageToDP(1),
                }}>
                <GradientTextWhite style={styles.textStyle}>
                  {locationdata.lotlocation}
                </GradientTextWhite>
              </View>

              <View
                style={{
                  flex: 2,
                }}>
                {loading ? (
                  <Loading />
                ) : filteredData.length === 0 ? (
                  <View style={{margin: heightPercentageToDP(2)}}>
                    <NoDataFound data={'No data available'} />
                  </View>
                ) : (
                  <FlatList
                    data={filteredData}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('SearchDate', {
                            timedata: item,
                            locationdata: locationdata,
                          })
                        }
                       >
                        <LinearGradient
                          colors={
                            index % 2 === 0
                              ? [COLORS.time_firstblue, COLORS.time_secondbluw]
                              : [
                                  COLORS.time_firstgreen,
                                  COLORS.time_secondgreen,
                                ]
                          }
                          start={{x: 0, y: 0}} // start from left
                          end={{x: 1, y: 0}} // end at right
                          style={{
                            ...styles.item,
                            backgroundColor:
                              index % 2 === 0
                                ? COLORS.lightDarkGray
                                : COLORS.grayHalfBg,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                color: COLORS.black,
                                fontFamily: FONT.HELVETICA_BOLD,
                                fontSize: heightPercentageToDP(2.5),
                              }}>
                              {item.lottime}
                            </Text>

                            {user && user.role === 'admin' ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: heightPercentageToDP(2),
                                }}>
                                {/** Update Locatiion */}

                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate('UpdateTime', {
                                      locationdata: locationdata,
                                      timedata: item,
                                    })
                                  }>
                                  {filteredData.length === 0 ? (
                                    selectedItem === item._id ? (
                                      <Loading />
                                    ) : (
                                      <LinearGradient
                                        colors={[
                                          COLORS.lightWhite,
                                          COLORS.white_s,
                                        ]}
                                        className="rounded-xl p-1">
                                        <MaterialCommunityIcons
                                          name={'circle-edit-outline'}
                                          size={heightPercentageToDP(3)}
                                          color={COLORS.darkGray}
                                        />
                                      </LinearGradient>
                                    )
                                  ) : (
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
                                      className="rounded-xl p-1">
                                      <MaterialCommunityIcons
                                        name={'circle-edit-outline'}
                                        size={heightPercentageToDP(3)}
                                        color={COLORS.darkGray}
                                      />
                                    </LinearGradient>
                                  )}
                                </TouchableOpacity>

                                {/** Delete Locatiion */}

                                <TouchableOpacity
                                  onPress={() => deleteLocationHandler(item)}>
                                  {showProgressBar ? (
                                    selectedItem === item._id ? (
                                      <Loading />
                                    ) : (
                                      <LinearGradient
                                        colors={[
                                          COLORS.lightWhite,
                                          COLORS.white_s,
                                        ]}
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
                                      colors={[
                                        COLORS.lightWhite,
                                        COLORS.white_s,
                                      ]}
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
                            ) : user && user.role === 'subadmin' ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: heightPercentageToDP(2),
                                }}>
                                {/** Update Locatiion */}

                                {user.subadminfeature.edittime && (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('UpdateTime', {
                                        locationdata: locationdata,
                                        timedata: item,
                                      })
                                    }>
                                    {filteredData.length === 0 ? (
                                      selectedItem === item._id ? (
                                        <Loading />
                                      ) : (
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
                                          className="rounded-xl p-1">
                                          <MaterialCommunityIcons
                                            name={'circle-edit-outline'}
                                            size={heightPercentageToDP(3)}
                                            color={COLORS.darkGray}
                                          />
                                        </LinearGradient>
                                      )
                                    ) : (
                                      <LinearGradient
                                        colors={[
                                          COLORS.lightWhite,
                                          COLORS.white_s,
                                        ]}
                                        className="rounded-xl p-1">
                                        <MaterialCommunityIcons
                                          name={'circle-edit-outline'}
                                          size={heightPercentageToDP(3)}
                                          color={COLORS.darkGray}
                                        />
                                      </LinearGradient>
                                    )}
                                  </TouchableOpacity>
                                )}

                                {/** Delete Locatiion */}

                                {user.subadminfeature.deletetime && (
                                  <TouchableOpacity
                                    onPress={() => deleteLocationHandler(item)}>
                                    {showProgressBar ? (
                                      selectedItem === item._id ? (
                                        <Loading />
                                      ) : (
                                        <LinearGradient
                                          colors={[
                                            COLORS.lightWhite,
                                            COLORS.white_s,
                                          ]}
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
                                        colors={[
                                          COLORS.lightWhite,
                                          COLORS.white_s,
                                        ]}
                                        className="rounded-xl p-1">
                                        <MaterialCommunityIcons
                                          name={'delete'}
                                          size={heightPercentageToDP(3)}
                                          color={COLORS.darkGray}
                                        />
                                      </LinearGradient>
                                    )}
                                  </TouchableOpacity>
                                )}
                              </View>
                            ) : null}
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    initialNumToRender={10} // Render initial 10 items
                    maxToRenderPerBatch={10} // Batch size to render
                    windowSize={10} // Number of items kept in memory
                  />
                )}
              </View>

              {/** Bottom Submit Container */}

              {user && user.role === 'admin' ? (
                <View
                  style={{
                    marginBottom: heightPercentageToDP(5),
                    marginHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  {/** container */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CreateTime', {
                        locationdata: locationdata,
                      })
                    }
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
                      Create Time
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : user &&
                user.role === 'subadmin' &&
                user.subadminfeature.createtime ? (
                <View
                  style={{
                    marginBottom: heightPercentageToDP(5),
                    marginHorizontal: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  {/** container */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CreateTime', {
                        locationdata: locationdata,
                      })
                    }
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
                      Create Time
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {/** end */}
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchTime;

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

// {/* <View
//           style={{
//             marginBottom: heightPercentageToDP(5),
//             marginHorizontal: heightPercentageToDP(2),
//             marginTop: heightPercentageToDP(2),
//           }}>
//           {/** Email container */}

//           <TouchableOpacity
//             onPress={submitHandler}
//             style={{
//               backgroundColor: COLORS.blue,
//               padding: heightPercentageToDP(2),
//               borderRadius: heightPercentageToDP(1),
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 color: COLORS.white,
//                 fontFamily: FONT.Montserrat_Regular,
//               }}>
//               Submit
//             </Text>
//           </TouchableOpacity>
//         </View> */}
