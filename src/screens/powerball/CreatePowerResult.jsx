import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import Textinput from '../../components/tlwinput/Textinput';

const CreatePowerResult = () => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');
  const [sixth, setSixth] = useState('');
  const [jackpot, setJackpot] = useState('');
  return (
    <MainBackgound
      title={'Create Result'}
      lefttext="10-12-2024"
      righttext={'09:00 PM'}>
         <Textinput
        title="Jackpot"
        value={jackpot}
        onChangeText={text => setJackpot(text)} // Updates inputValue state
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <Textinput
        title="First Prize Winners"
        value={first}
        onChangeText={text => setFirst(text)} // Updates inputValue state
        placeholder="Enter number"
        keyboardType="numeric"
      />
      <Textinput
        title="Second Prize Winners"
        value={second}
        onChangeText={text => setSecond(text)} // Updates inputValue state
        placeholder="Enter number"
        keyboardType="numeric"
      />
      <Textinput
        title="Third Prize Winners"
        value={third}
        onChangeText={text => setThird(text)} // Updates inputValue state
        placeholder="Enter number"
        keyboardType="numeric"
      />
      <Textinput
        title="Fourth Prize Winners"
        value={fourth}
        onChangeText={text => setFourth(text)} // Updates inputValue state
        placeholder="Enter number"
        keyboardType="numeric"
      />
      <Textinput
        title="Fifth Prize Winners"
        value={fifth}
        onChangeText={text => setFifth(text)} // Updates inputValue state
        placeholder="Enter number"
        keyboardType="numeric"
      />
      <Textinput
        title="Sixth Prize Winners"
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

export default CreatePowerResult;

const styles = StyleSheet.create({});
