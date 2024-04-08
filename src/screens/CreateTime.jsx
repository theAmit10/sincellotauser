import {
  RefreshControlBase,
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
import {createTime} from '../redux/actions/timeAction';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/helpercComponent/Loading';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import { assets } from '../../react-native.config';

const CreateTime = ({route}) => {
  const {locationdata} = route.params;
  const [enterData, setEnterData] = useState('');
  const dispatch = useDispatch();
  const {accesstoken} = useSelector(state => state.user);

  const [loading,setLoading] = useState(false);


  // const {loading, message,error} = useSelector(state => state.time);

  const navigation = useNavigation();

 
  const submitHandler = () => {
    console.log('Working on login ');
    if (!enterData) {
      Toast.show({
        type: 'error',
        text1: 'Please enter location time',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing ',
      });

      createTimeForLocation(accesstoken, locationdata._id, enterData)
    }
  };


  const createTimeForLocation = async (accesstoken, lotlocation, lottime) =>{
    try {
     setLoading(true)
      const {data} = await axios.post(
        UrlHelper.CREATE_TIME_API,
        {
          lottime,
          lotlocation,
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
        text1: data.message
      })
      setEnterData("")   
      navigation.goBack()
    } catch (error) {
      setLoading(false)
      console.log(" Err :: "+error);
      console.log(error.response.data.message);
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      })
      
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
        <GradientText style={styles.textStyle}>Time</GradientText>
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
            Enter Time
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
              color={COLORS.white}
            />
            <TextInput
              style={{
                marginStart: heightPercentageToDP(1),
                flex: 1,
                fontFamily: FONT.SF_PRO_REGULAR,
                color: COLORS.black
              }}
              placeholder="For Example 09-00 AM"
              label="time"
              value={enterData}
              onChangeText={text => setEnterData(text)}
            />
          </View>
        </View>


        {
          loading ? (<View style={{justifyContent: 'center', alignItems: 'center',flex: 1}}><Loading/></View>) : (     <View
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

export default CreateTime;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
});
