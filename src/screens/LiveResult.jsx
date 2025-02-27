import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgroundWithoutScrollview from '../components/background/MainBackgroundWithoutScrollview';
import Textinput from '../components/tlwinput/Textinput';
import Loading from '../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../assets/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useUpdateLiveResultLinkMutation} from '../helper/Networkcall';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const LiveResult = ({route}) => {
  const {accesstoken} = useSelector(state => state.user);
  const {locationdata, timedata} = route.params;
  const [resultLink, setResultLink] = useState(timedata?.liveresultlink);
  const [timer, setTimer] = useState(timedata?.liveresulttimer?.toString());

  const [updateLiveResultLink, {isLoading}] = useUpdateLiveResultLinkMutation();

  const updateSubmitHandler = async () => {
    try {
      if (!resultLink) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Result Link',
        });
        return;
      }

      if (!timer) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Timer',
        });
        return;
      }
      if (isNaN(timer)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Timer in Minutes',
        });
        return;
      }

      const body = {
        liveresultlink: resultLink,
        liveresulttimer: Number.parseInt(timer),
      };

      const res = await updateLiveResultLink({
        accesstoken,
        body,
        id: timedata._id,
      });

      console.log(res.data);
      Toast.show({
        type: 'success',
        text1: 'Successfully Updated Live Result',
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgroundWithoutScrollview title={'Live Result'}>
      {/* MINIMUM PROFIT PERCENTAGE */}
      <Textinput
        title="Result Link"
        value={resultLink}
        onChangeText={text => setResultLink(text)} // Updates inputValue state
        placeholder="Enter Result Link"
      />

      {/* MINIMUM RECHARGE PERCENTAGE */}
      <Textinput
        title="Timer (in Minutes)"
        value={timer}
        onChangeText={text => setTimer(text)} // Updates inputValue state
        placeholder="Enter Timer"
      />

      <View
        style={{
          flex: 1,
          marginBottom: heightPercentageToDP(5),
          marginVertical: heightPercentageToDP(2),
          justifyContent: 'flex-end',
        }}>
        {isLoading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={updateSubmitHandler}
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
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default LiveResult;

const styles = StyleSheet.create({});
