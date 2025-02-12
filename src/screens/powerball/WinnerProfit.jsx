import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';

const WinnerProfit = () => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');
  const [sixth, setSixth] = useState('');

  return (
    <MainBackgound title={'Winner Profit'}>
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
        {false ? (
          <Loading />
        ) : (
          <TouchableOpacity
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
    </MainBackgound>
  );
};

export default WinnerProfit;

const styles = StyleSheet.create({});
