import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useSelector} from 'react-redux';
import {
  useGetPowerBallGameQuery,
  useUpdateWinnerPrizeMutation,
} from '../../helper/Networkcall';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const WinnerProfit = () => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');
  const [sixth, setSixth] = useState('');

  const {accesstoken} = useSelector(state => state.user);

  const {data, isLoading, refetch, errror} = useGetPowerBallGameQuery({
    accesstoken,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setFirst(String(data?.games[0].winnerPrize.firstprize || ''));
      setSecond(String(data.games[0].winnerPrize.secondPrize || ''));
      setThird(String(data.games[0].winnerPrize.thirdprize || ''));
      setFourth(String(data.games[0].winnerPrize.fourthPrize || ''));
      setFifth(String(data.games[0].winnerPrize.fifthprize || ''));
      setSixth(String(data.games[0].winnerPrize.sixthPrize || ''));
    }
  }, [isLoading, data]);

  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const [updateWinnerPrize, {isLoading: updateGameBasicIsLoading}] =
    useUpdateWinnerPrizeMutation();

  const updateGameBasicFunc = async () => {
    if (!first) {
      Toast.show({
        type: 'error',
        text1: 'Enter first prize',
      });
    }
    if (!second) {
      Toast.show({
        type: 'error',
        text1: 'Enter second prize',
      });
    }
    if (!third) {
      Toast.show({
        type: 'error',
        text1: 'Enter third prize',
      });
    }
    if (!fourth) {
      Toast.show({
        type: 'error',
        text1: 'Enter fourth prize',
      });
    }
    if (!fifth) {
      Toast.show({
        type: 'error',
        text1: 'Enter fifth prize',
      });
    }
    if (!sixth) {
      Toast.show({
        type: 'error',
        text1: 'Enter sixth prize',
      });
    }
    if (isNaN(first || second || third || fourth || fifth || sixth)) {
      Toast.show({
        type: 'error',
        text1: 'Enter number only',
      });
    } else {
      try {
        const body = {
          firstprize: first,
          secondPrize: second,
          thirdprize: third,
          fourthPrize: fourth,
          fifthprize: fifth,
          sixthPrize: sixth,
        };

        const res = await updateWinnerPrize({
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
    <MainBackgound title={'Winner Profit'}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Textinput
            title="First Prize"
            value={first}
            onChangeText={text => setFirst(text)} // Updates inputValue state
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <Textinput
            title="Second Prize"
            value={second}
            onChangeText={text => setSecond(text)} // Updates inputValue state
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <Textinput
            title="Third Prize"
            value={third}
            onChangeText={text => setThird(text)} // Updates inputValue state
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <Textinput
            title="Fourth Prize"
            value={fourth}
            onChangeText={text => setFourth(text)} // Updates inputValue state
            placeholder="Enter number"
            keyboardType="numeric"
          />
          <Textinput
            title="Fifth Prize"
            value={fifth}
            onChangeText={text => setFifth(text)} // Updates inputValue state
            placeholder="Enter number"
            keyboardType="numeric"
          />
          <Textinput
            title="Sixth Prize"
            value={sixth}
            onChangeText={text => setSixth(text)} // Updates inputValue state
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

export default WinnerProfit;

const styles = StyleSheet.create({});
