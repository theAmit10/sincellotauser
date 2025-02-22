import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {
  useGetPowerBallGameQuery,
  useUpdateGameBasicMutation,
} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const NumberRange = () => {
  const [startfrom, setsetfrom] = useState('');
  const [endat, setendat] = useState('');

  const {accesstoken} = useSelector(state => state.user);

  const {data, isLoading, refetch, errror} = useGetPowerBallGameQuery({
    accesstoken,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setsetfrom(String(data?.games[0].range.startRange || ''));
      setendat(String(data.games[0].range.endRange || ''));
    }
  }, [isLoading, data]);

  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const [updateGameBasic, {isLoading: updateGameBasicIsLoading}] =
    useUpdateGameBasicMutation();

  const updateGameBasicFunc = async () => {
    if (!startfrom) {
      Toast.show({
        type: 'error',
        text1: 'Enter number range start from',
      });
    }
    if (!endat) {
      Toast.show({
        type: 'error',
        text1: 'Enter number range end at',
      });
    }
    if (isNaN(startfrom)) {
      Toast.show({
        type: 'error',
        text1: 'Enter number range start from',
      });
    }
    if (isNaN(startfrom)) {
      Toast.show({
        type: 'error',
        text1: 'Enter number range start from',
      });
    } else {
      try {
        const body = {
          startRange: startfrom,
          endRange: endat,
        };

        const res = await updateGameBasic({
          accesstoken,
          body,
        }).unwrap();
        console.log(JSON.stringify(res));

        refetch();
        Toast.show({
          type: 'success',
          text1: res.message,
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'success',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      }
    }
  };

  return (
    <MainBackgound title={'Number Range'}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Textinput
            title="Number Range Start From"
            value={startfrom}
            onChangeText={text => setendat(text)} // Updates inputValue state
            placeholder="Enter number"
          />
          <Textinput
            title=" Number Range End At"
            value={endat}
            onChangeText={text => setendat(text)} // Updates inputValue state
            placeholder="Enter number"
            keyboardType="numeric"
          />

          <View
            style={{
              flex: 1,
              marginBottom: heightPercentageToDP(5),
              marginVertical: heightPercentageToDP(2),
              justifyContent: 'flex-end',
            }}>
            {updateGameBasicIsLoading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={updateGameBasicFunc}
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
        </>
      )}
    </MainBackgound>
  );
};

export default NumberRange;

const styles = StyleSheet.create({});
