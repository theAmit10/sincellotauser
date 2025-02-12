import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';

const PowerUpdateName = () => {
  const [updatename, setupdatename] = useState('Powerball');

  return (
    <MainBackgound title={'Update Name'}>
      <Textinput
        title="Name"
        value={updatename}
        onChangeText={text => setupdatename(text)} // Updates inputValue state
        placeholder="Enter name"
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

export default PowerUpdateName;

const styles = StyleSheet.create({});
