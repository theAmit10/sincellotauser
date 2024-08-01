import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginBackground from '../components/login/LoginBackground';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {getDateAccordingToLocationAndTime} from '../redux/actions/dateAction';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const SearchDate = ({route}) => {
  const navigation = useNavigation();

  const {timedata, locationdata} = route.params;

  const [searchData, setSearchData] = useState('');
  const [showLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);
  const {loading, dates} = useSelector(state => state.date);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = dates.filter(item =>
      item.lotdate.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(
      getDateAccordingToLocationAndTime(
        accesstoken,
        timedata._id,
        timedata.lotlocation._id,
      ),
    );
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(dates); // Update filteredData whenever locations change
  }, [dates]);

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
      const url = `${UrlHelper.DELETE_DATE_API}/${item._id}`;

      console.log('URL :: ' + url);

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
          {/** Main Cointainer */}

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
                height: heightPercentageToDP(15),
                margin: heightPercentageToDP(2),
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <GradientTextWhite style={styles.textStyle}>
                  Search Date
                </GradientTextWhite>
                <GradientTextWhite
                  style={{
                    fontSize: heightPercentageToDP(2),
                    fontFamily: FONT.Montserrat_Bold,
                    marginEnd: heightPercentageToDP(2),
                    color: COLORS.white_s,
                  }}>
                  {locationdata?.maximumRange}
                </GradientTextWhite>
              </View>

              {/** Search container */}

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
                  placeholder="Search for date"
                  placeholderTextColor={COLORS.black}
                  label="Search"
                  onChangeText={handleSearch}
                />
              </View>
            </View>

            <View style={{margin: heightPercentageToDP(2)}}>
              <GradientText style={styles.textStyle}>
                {locationdata.lotlocation}
              </GradientText>
              <GradientText style={styles.textStyle}>
                {timedata.lottime}
              </GradientText>
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
                        navigation.navigate('Result', {
                          datedata: item,
                          locationdata: locationdata,
                          timedata: timedata,
                        })
                      }>
                      <LinearGradient
                        colors={
                          index % 2 === 0
                            ? [COLORS.time_firstblue, COLORS.time_secondbluw]
                            : [COLORS.time_firstgreen, COLORS.time_secondgreen]
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
                            {item.lotdate}
                          </Text>

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
                                navigation.navigate('UpdateDate', {
                                  locationdata: locationdata,
                                  timedata: timedata,
                                  datedata: item,
                                })
                              }>
                              {filteredData.length === 0 ? (
                                selectedItem === item._id ? (
                                  <Loading />
                                ) : (
                                  <LinearGradient
                                    colors={[COLORS.lightWhite, COLORS.white_s]}
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
                                  colors={[COLORS.lightWhite, COLORS.white_s]}
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

            <View
              style={{
                marginBottom: heightPercentageToDP(5),
                marginHorizontal: heightPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
              }}>
              {/** Email container */}

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CreateDate', {
                    locationdata: locationdata,
                    timedata: timedata,
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
                  Create Date
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

export default SearchDate;

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
