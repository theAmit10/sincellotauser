import {
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
import {HOVER} from 'nativewind/dist/utils/selector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Background from '../components/background/Background';
import {useDispatch, useSelector} from 'react-redux';
import {getResultAccordingToLocationTimeDate} from '../redux/actions/resultAction';
import Loading from '../components/helpercComponent/Loading';
import NoDataFound from '../components/helpercComponent/NoDataFound';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';

const Result = ({route}) => {
  const {datedata, locationdata, timedata} = route.params;

  console.log("Date Data :: "+JSON.stringify(datedata))
  console.log("time Data :: "+JSON.stringify(timedata))
  console.log("location Data :: "+JSON.stringify(locationdata))

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);
  const {loadingResult, results} = useSelector(state => state.result);
  const [filteredData, setFilteredData] = useState([]);

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        datedata._id,
        datedata.lottime._id,
        datedata.lottime.lotlocation,
      ),
    );
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(results); // Update filteredData whenever locations change
  }, [results]);

  const submitHandler = () => {
    console.log('Working on login ');
    Toast.show({
      type: 'success',
      text1: 'Processing',
    });
  };

  const [selectedItem, setSelectedItem] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async () => {
    
    setProgressBar(true);
    

    try {
      const url = `${UrlHelper.DELETE_LOT_RESULT_API}/${filteredData[0]._id}`;
      console.log(url)
      
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

      navigation.goBack()
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Result</GradientText>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <GradientText style={styles.textStyle}>Details</GradientText>
          <GradientText
            style={{
              fontSize: heightPercentageToDP(2),
              fontFamily: FONT.Montserrat_Bold,
              marginEnd: heightPercentageToDP(2),
            }}>
            {locationdata?.maximumRange}
          </GradientText>
        </View>
      </View>

      {/** Login Cointainer */}

      <View
        style={{
          height: heightPercentageToDP(65),
          width: widthPercentageToDP(100),
          backgroundColor: COLORS.white_s,
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

        {/** Result Main Container */}

        {loadingResult ? (
          <Loading />
        ) : filteredData.length == 0 ? (
          <View
            style={{
              flex: 1,
              margin: heightPercentageToDP(2),
              justifyContent: 'space-between',
            }}>
            <NoDataFound data={'No Result Found'} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateResult', {
                  datedata: datedata,
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
                Create Result
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              margin: heightPercentageToDP(2),
            }}>
            <View
              style={{
                gap: heightPercentageToDP(2),
              }}>
              <View
                style={{
                  height: heightPercentageToDP(35),
                  backgroundColor: COLORS.grayHalfBg,

                  borderRadius: heightPercentageToDP(1),
                }}>
                <View
                  style={{
                    height: heightPercentageToDP(25),
                    borderRadius: heightPercentageToDP(1),
                    flexDirection: 'row',
                  }}>
                  {/** Top view left container */}
                  <View
                    style={{
                      flex: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.Montserrat_Regular,
                        fontSize: heightPercentageToDP(3),
                        marginTop: heightPercentageToDP(1),
                        color: COLORS.black,
                      }}>
                      {filteredData[0].lotlocation.lotlocation}
                    </Text>

                    <GradientText
                      style={{
                        fontSize: heightPercentageToDP(11),
                        color: COLORS.black,
                      }}>
                      {filteredData[0].resultNumber}
                    </GradientText>
                  </View>

                  {/** Top view right container */}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.gray2,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        transform: [{rotate: '90deg'}],
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_SemiBold,
                        fontSize: heightPercentageToDP(2),
                      }}>
                      {filteredData[0]?.lottime?.lottime}
                    </Text>
                  </View>
                </View>

                {/** Big Result bottom container */}

                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.white_s,
                    margin: heightPercentageToDP(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: heightPercentageToDP(1),
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.grayHalfBg,
                      padding: heightPercentageToDP(1),
                      borderRadius: heightPercentageToDP(1),
                      marginStart: heightPercentageToDP(-3),
                    }}>
                    <Ionicons
                      name={'calendar'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                  </View>

                  <Text
                    style={{
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(2),
                      color: COLORS.black,
                    }}>
                    {filteredData[0].lotdate.lotdate}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UpdateResult', {
                    locationdata: locationdata,
                    timedata: timedata,
                    datedata: datedata,
                    resultdata: filteredData[0],
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
                  Update Result
                </Text>
              </TouchableOpacity>

              {showProgressBar ? (
                <View style={{flex: 1, marginTop: heightPercentageToDP(2)}}>
                  <Loading />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={deleteLocationHandler}
                  style={{
                    backgroundColor: COLORS.darkGray,
                    padding: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONT.Montserrat_Regular,
                    }}>
                    Delete Result
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
