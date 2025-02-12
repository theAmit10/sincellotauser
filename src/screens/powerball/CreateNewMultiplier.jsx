import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import Loading from '../../components/helpercComponent/Loading';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';

const CreateNewMultiplier = ({route}) => {
  const {forprocess} = route.params;

  console.log(forprocess);

  const [createmultiplier, setmultiplier] = useState('');
  const [updatemultiplier, setupdatemultiplier] = useState('');

  return (
    <>
      {forprocess === 'create' && (
        <MainBackgound title={'Create Multiplier'}>
          <Textinput
            title="Multplier"
            value={createmultiplier}
            onChangeText={text => setmultiplier(text)} // Updates inputValue state
            placeholder="Enter Multiplier"
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
      )}

      {forprocess === 'update' && (
        <MainBackgound title={'Update Multiplier'}>
          <Textinput
            title="Multipler"
            value={updatemultiplier}
            onChangeText={text => setupdatemultiplier(text)} // Updates inputValue state
            placeholder="Enter Multiplier"
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
      )}
    </>
  );
};

export default CreateNewMultiplier;

const styles = StyleSheet.create({});
