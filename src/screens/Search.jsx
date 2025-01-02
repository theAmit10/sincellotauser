import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Switch,
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {getAllLocations} from '../redux/actions/locationAction';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import {useUpdateLocationAutomationMutation} from '../helper/Networkcall';
import CustomAlertForSearch from '../components/helpercComponent/CustomAlertForSearch';

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken, user} = useSelector(state => state.user);
  const {loading, locations} = useSelector(state => state.location);

  // const [filteredData, setFilteredData] = useState(locations);
  const [filteredData, setFilteredData] = useState([]);

  const [updateLocationAutomation, {isLoading, error}] =
    useUpdateLocationAutomationMutation();

  const handleSearch = text => {
    const filtered = locations.filter(item =>
      item.lotlocation.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(getAllLocations(accesstoken));
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(locations); // Update filteredData whenever locations change
  }, [locations]);

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
      const url = `${UrlHelper.DELETE_LOCATION_API}/${item._id}`;
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
      dispatch(getAllLocations(accesstoken));
    } catch (error) {
      console.log(error.response.data.message);
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please, try after sometime',
      });
      console.log(error);
    }
  };

  // FOR AUTOMATION SWITCH
  const [isEnabled, setIsEnabled] = useState(false);

  // Toggle switch handler
  const toggleSwitch = async item => {
    showAlertAccepted(item);

    callApiFunction(); // Call your API function here
  };

  // Example API function to call
  const callApiFunction = async item => {
    console.log('working');
    console.log('Iteme :: ' + JSON.stringify(item));

    let automation = item.automation;

    if (automation === 'automatic') {
      automation = 'manual';
    } else {
      automation = 'automatic';
    }

    console.log('Automation :: ' + automation);

    try {
      const formData = {
        automation: automation,
      };

      console.log('FORM DATA :: ' + JSON.stringify(formData));

      const res = await updateLocationAutomation({
        accesstoken: accesstoken,
        id: item._id,
        body: formData,
      }).unwrap();

      console.log('Res :: ' + res);
      console.log('Res String :: ' + JSON.stringify(res));

      Toast.show({type: 'success', text1: 'Success', text2: res.message});
      dispatch(getAllLocations(accesstoken));
    } catch (error) {
      console.log(error);
    }

    // try {
    //   // Replace with your API call
    //   await axios.post('YOUR_API_ACTION_ENDPOINT_HERE', { automationStatus: isEnabled ? 'manual' : 'automatic' });
    // } catch (error) {
    //   console.error('Error calling API function:', error);
    // }
  };

  const [alertVisibleAccepted, setAlertVisibleAccepted] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const showAlertAccepted = item => {
    setAlertVisibleAccepted(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
    setIsEnabled(previousState => !previousState);
  };

  const closeAlertAccepted = () => {
    setAlertVisibleAccepted(false);
  };

  const handleYesAccepted = () => {
    // Handle the Yes action here
    setAlertVisibleAccepted(false);

    callApiFunction(selectedItem);
    console.log('Yes pressed');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      {/** Main Cointainer */}

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
                marginBottom: heightPercentageToDP(2),
              }}>
              <GradientTextWhite style={styles.textStyle}>
                All Locations
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
                  placeholder="Search for location"
                  placeholderTextColor={COLORS.black}
                  label="Search"
                  onChangeText={handleSearch}
                />
              </View>
            </View>

            <View
              style={{
                flex: 2,
              }}>
              {loading ? (
                <Loading />
              ) : (
                <FlatList
                  data={filteredData}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SearchTime', {
                          locationdata: item,
                        })
                      }>
                      <LinearGradient
                        colors={
                          index % 2 === 0
                            ? [COLORS.lightblue, COLORS.midblue]
                            : [COLORS.lightyellow, COLORS.darkyellow]
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
                            {item.lotlocation}
                          </Text>

                          {/** FOR ACCEPTING */}
                          <CustomAlertForSearch
                            visible={alertVisibleAccepted}
                            onClose={closeAlertAccepted}
                            onYes={handleYesAccepted}
                          />

                          {/** Checking the user is admin or not */}
                          {user && user.role === 'admin' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: heightPercentageToDP(2),
                              }}>
                              {/** automation switch */}

                              <Switch
                                thumbColor={
                                  item.automation === 'automatic'
                                    ? '#f5dd4b'
                                    : '#f4f3f4'
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => toggleSwitch(item)}
                                value={item.automation === 'automatic'}
                              />

                              {/** Update Locatiion */}

                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('UpdateLocation', {
                                    locationdata: item,
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
                {/** Create location container */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateLocation')}
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
                    Create Location
                  </Text>
                </TouchableOpacity>
              </View>
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.createlocation ? (
              <View
                style={{
                  marginBottom: heightPercentageToDP(5),
                  marginHorizontal: heightPercentageToDP(2),
                  marginTop: heightPercentageToDP(2),
                }}>
                {/** Create location container */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateLocation')}
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
                    Create Location
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {/** end */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Search;

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
