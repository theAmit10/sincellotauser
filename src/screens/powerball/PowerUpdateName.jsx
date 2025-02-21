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
  useUpdateGameBasicMutation,
} from '../../helper/Networkcall';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const PowerUpdateName = () => {
  const {accesstoken} = useSelector(state => state.user);

  const {data, isLoading, refetch, errror} = useGetPowerBallGameQuery({
    accesstoken,
  });

  const [updatename, setupdatename] = useState('');

  useEffect(() => {
    if (!isLoading && data) {
      setupdatename(data?.games[0]?.name);
    }
  }, [isLoading, data]);

  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const [updateGameBasic, {isLoading: updateGameBasicIsLoading}] =
    useUpdateGameBasicMutation();

  const updateGameBasicFunc = async () => {
    try {
      const body = {
        name: updatename,
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
  };

  return (
    <MainBackgound title={'Update Name'}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
            {updateGameBasicIsLoading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={() => updateGameBasicFunc()}
                disabled={updateGameBasicIsLoading}
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

export default PowerUpdateName;

const styles = StyleSheet.create({});
