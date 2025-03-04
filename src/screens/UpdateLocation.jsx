import {
  ImageBackground,
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
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Background from '../components/background/Background';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../components/helpercComponent/Loading';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const UpdateLocation = ({route}) => {
  const {locationdata} = route.params;

  console.log(JSON.stringify(locationdata));
  const [enterData, setEnterData] = useState('');
  const [bettinglimit, setbettinglimit] = useState(locationdata.bettinglimit);

  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {accesstoken} = useSelector(state => state.user);

  useEffect(() => {
    setEnterData('');
  }, [loading]);

  const submitHandler = () => {
    console.log('Working on login ');
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Location Name',
      });
    }
    else if (!bettinglimit) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Betting Limit for this location',
      });
    }
     else {
      Toast.show({
        type: 'success',
        text1: 'Processing ',
      });

      updateLocationName(accesstoken, locationdata);
    }
  };

  const updateLocationName = async (accesstoken, locationdata) => {
    try {
      setLoading(true);

      const url = `${UrlHelper.UPDATE_LOCATION_API}/${locationdata._id}`;

      console.log('URL :: ' + url);

      const {data} = await axios.put(
        url,
        {
          lotlocation: enterData,
          bettinglimit: bettinglimit,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Data :: ' + data.message);

      Toast.show({
        type: 'success',
        text1: data.message,
      });
      setEnterData('');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(' Err :: ' + error);
      console.log(error.response.data.message);
      Toast.show({
        type: 'error',
        text1: 'Something went Wrong',
        text2: 'Please try again',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>Update</GradientText>
          <GradientText style={styles.textStyle}>Location</GradientText>
        </View>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(65),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          <View
            style={{
              height: heightPercentageToDP(65),
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

            {/** Result Main Container */}

            <View style={{padding: heightPercentageToDP(2)}}>
              <GradientTextWhite
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(3),
                  color: COLORS.black,
                }}>
                Current Location Name
              </GradientTextWhite>
              <GradientTextWhite style={styles.textStyle}>
                {locationdata.lotlocation}
              </GradientTextWhite>

              <View
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                  marginTop: heightPercentageToDP(5),
                }}>
                <Entypo
                  name={'location'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.darkGray}
                />
                <TextInput
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                    color: COLORS.black,
                  }}
                  placeholder="Enter new location"
                  placeholderTextColor={COLORS.black}
                  label="location"
                  value={enterData}
                  onChangeText={text => setEnterData(text)}
                />
              </View>

              {/** FOR BETTING LIMIT */}
              <GradientText
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                  marginBottom: heightPercentageToDP(1),
                  marginTop: heightPercentageToDP(2),
                }}>
                Betting Limit
              </GradientText>

              <View
                style={{
                  height: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.white_s,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                <Entypo
                  name={'area-graph'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.darkGray}
                />
                <TextInput
                  style={{
                    marginStart: heightPercentageToDP(1),
                    flex: 1,
                    fontFamily: FONT.Montserrat_Regular,
                    color: COLORS.black,
                    fontSize: heightPercentageToDP(2.5),
                  }}
                  placeholder="For example:  2"
                  label="betting limit"
                  placeholderTextColor={COLORS.darkGray}
                  value={bettinglimit}
                  onChangeText={text => setbettinglimit(text)}
                />
              </View>
            </View>
            {/** Submit container */}

            {loading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Loading />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'flex-end',
                  flex: 1,
                  alignItems: 'flex-end',
                  paddingVertical: heightPercentageToDP(4),
                  paddingHorizontal: heightPercentageToDP(2),
                }}>
                <TouchableOpacity
                  onPress={submitHandler}
                  className="rounded-full"
                  style={{
                    height: heightPercentageToDP(7),
                    width: heightPercentageToDP(7),
                    flexDirection: 'row',
                    backgroundColor: COLORS.blue,
                    alignItems: 'center',
                    paddingHorizontal: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(1),
                  }}>
                  <Ionicons
                    name={'send'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default UpdateLocation;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
});
