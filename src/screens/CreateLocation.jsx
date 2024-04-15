import {
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
import { useNavigation } from '@react-navigation/native';
import { HOVER } from 'nativewind/dist/utils/selector';

const CreateLocation = () => {
  const [enterData, setEnterData] = useState('');
  const [rangeData, setRangeData] = useState('');
  const {accesstoken} = useSelector(state => state.user);
  const {loading, location} = useSelector(state => state.location);

  const dispatch = useDispatch();
  const navigation = useNavigation()

  useEffect(() => {
    
    setEnterData("")

    dispatch({
      type: 'clearCreateLocationMessage',
    });


  },[loading,dispatch])

  const submitHandler = () => {
    console.log('Working on login ');
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Location Name',
      });
    }else if (!rangeData) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Maximum Range for this location',
      });
    }
     else {
      Toast.show({
        type: 'success',
        text1: 'Processing '
      });
      dispatch(createLocation(accesstoken, enterData,rangeData));
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Create</GradientText>
        <GradientText style={styles.textStyle}>Location</GradientText>
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

        <View style={{padding: heightPercentageToDP(2)}}>
          <GradientText
            style={{
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
              marginBottom: heightPercentageToDP(1),
            }}>
            Location Name
          </GradientText>

          <View
            style={{
              height: heightPercentageToDP(7),
              flexDirection: 'row',
              backgroundColor: COLORS.grayHalfBg,
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
                fontSize: heightPercentageToDP(2.5)
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
              backgroundColor: COLORS.grayHalfBg,
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
                fontSize: heightPercentageToDP(2.5)
              }}
              placeholder="Enter Maximum Range"
              label="maximum range"
              placeholderTextColor={COLORS.darkGray}
              value={rangeData}
              onChangeText={text => setRangeData(text)}
            />
          </View>

        </View>

              {
                loading ? (<View style={{flex: 1}}><Loading/></View>) : (<View
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
                </View>) 
              }
        
      </View>
    </View>
  );
};

export default CreateLocation;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
