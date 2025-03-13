import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import Loading from '../../components/helpercComponent/Loading';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import {useAddMultiplierMutation} from '../../helper/Networkcall';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const CreateNewMultiplier = ({route}) => {
  const {forprocess} = route.params;

  console.log(forprocess);

  const [createmultiplier, setmultiplier] = useState('');
  const [updatemultiplier, setupdatemultiplier] = useState('');

  const {accesstoken} = useSelector(state => state.user);
  const [addMultiplier, {isLoading}] = useAddMultiplierMutation();

  const submitHandler = async () => {
    if (!createmultiplier) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Multiplier',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Processing ',
      });

      try {
        const body = {
          value: createmultiplier,
        };

        const res = await addMultiplier({
          accesstoken: accesstoken,
          body: body,
        }).unwrap(); // <-- Ensures we get clean response data

        console.log(JSON.stringify(res));

        Toast.show({
          type: 'success',
          text1: res.message,
        });
      } catch (error) {
        console.log('Error during create powertime:', error);
        Toast.show({
          type: 'error',
          text1: error.data.message,
        });
      }
    }
  };

  return (
    <>
      {forprocess === 'create' && (
        <MainBackgound title={'Create Multiplier'}>
          <Textinput
            title="Multplier"
            value={createmultiplier}
            onChangeText={text => setmultiplier(text)} // Updates inputValue state
            placeholder="For eg : 3X"
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
                onPress={submitHandler}
                disabled={isLoading}
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
