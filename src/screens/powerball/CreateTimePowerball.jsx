import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import Loading from '../../components/helpercComponent/Loading';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';

const CreateTimePowerball = ({route}) => {
  const {forprocess} = route.params;

  console.log(forprocess);

  const [createtime, settime] = useState('');
  const [updatetime, setupdatetime] = useState('');

  return (
    <>
      {forprocess === 'create' && (
        <MainBackgound title={'Create Time'}>
          <Textinput
            title="Time"
            value={createtime}
            onChangeText={text => settime(text)} // Updates inputValue state
            placeholder="Enter time"
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
        <MainBackgound title={'Update Time'}>
          <Textinput
            title="Time"
            value={updatetime}
            onChangeText={text => setupdatetime(text)} // Updates inputValue state
            placeholder="Enter time"
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

export default CreateTimePowerball;

const styles = StyleSheet.create({});
