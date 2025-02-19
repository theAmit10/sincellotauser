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
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {createLocation} from '../redux/actions/locationAction';
import Loading from '../components/helpercComponent/Loading';
import {useNavigation} from '@react-navigation/native';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';

const CreateLocation = () => {
  const [enterData, setEnterData] = useState('');
  const [rangeData, setRangeData] = useState('');
  const [maximumReturn, setmaximumReturn] = useState('');
  const {accesstoken} = useSelector(state => state.user);
  const {loading, location} = useSelector(state => state.location);
  const [bettinglimit, setbettinglimit] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setEnterData('');

    dispatch({
      type: 'clearCreateLocationMessage',
    });
  }, [loading, dispatch]);

  // FUNCTION TO ADD THE MAXIMUM NUMBER
  const removeLastCharacter = (input) => {
    if (input && input.length > 0) {
      return input.slice(0, -1);
    }
    return input;
  };

  function getNumberBeforeDash(inputString) {
    // Split the input string by the hyphen
    const parts = inputString.split(" - ");

    // Convert the first part to an integer and return it
    return parseInt(parts[0]);
  }

  const submitHandler = () => {
    console.log('Working on login ');
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Location Name',
      });
    } else if (!rangeData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Maximum Range for this location',
      });
    } else if (!maximumReturn) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Maximum Return for this location',
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

      // const maximumNumber = removeLastCharacter(maximumReturn);
      const maximumNumber = getNumberBeforeDash(rangeData);

      dispatch(createLocation(accesstoken, enterData, rangeData,maximumNumber,maximumReturn,bettinglimit ));
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
          <GradientText style={styles.textStyle}>Create</GradientText>
          <GradientText style={styles.textStyle}>Location</GradientText>
        </View>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(70),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          {/** Login Cointainer */}

          <View
            style={{
              height: heightPercentageToDP(70),
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
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                  marginBottom: heightPercentageToDP(1),
                }}>
                Location Name
              </GradientTextWhite>

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
                  name={'location'}
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
                  placeholder="Enter location"
                  label="location"
                  placeholderTextColor={COLORS.darkGray}
                  value={enterData}
                  onChangeText={text => setEnterData(text)}
                />
              </View>

              <GradientText
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                  marginBottom: heightPercentageToDP(1),
                  marginTop: heightPercentageToDP(2),
                }}>
                Maximum Range
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
                  placeholder="For example:  4 - 2x"
                  label="maximum range"
                  placeholderTextColor={COLORS.darkGray}
                  value={rangeData}
                  onChangeText={text => setRangeData(text)}
                />
              </View>

              {/** FOR MAXIMUM RETURN */}
              <GradientText
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2.5),
                  color: COLORS.black,
                  marginBottom: heightPercentageToDP(1),
                  marginTop: heightPercentageToDP(2),
                }}>
                Maximum Return
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
                  placeholder="For example:  2x"
                  label="maximum range"
                  placeholderTextColor={COLORS.darkGray}
                  value={maximumReturn}
                  onChangeText={text => setmaximumReturn(text)}
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

            {loading ? (
              <View style={{flex: 1}}>
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

export default CreateLocation;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.white_s,
  },
});
