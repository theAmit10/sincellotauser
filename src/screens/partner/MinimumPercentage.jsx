import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import Textinput from '../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useSelector} from 'react-redux';
import {
  useGetDefaultProfitAndRechargePercentageQuery,
  useUpdateDefaultProfitAndRechargePercentageMutation,
} from '../../helper/Networkcall';
import Toast from 'react-native-toast-message';

const MinimumPercentage = () => {
  const [minimumpercentage, setminimumpercentage] = useState('');
  const [minimumrecharge, setminimumrecharge] = useState('');
  const {accesstoken} = useSelector(state => state.user);

  const {isLoading, data, refetch} =
    useGetDefaultProfitAndRechargePercentageQuery({accesstoken});

  // console.log(JSON.stringify(data.settings));

  useEffect(() => {
    if (!isLoading && data) {
      setminimumpercentage(data.settings.minProfitPercentage.toString());
      setminimumrecharge(data.settings.minRechargePercentage.toString());
    }
  }, [isLoading, data]);

  const [
    updateDefaultProfitAndRechargePercentage,
    {isLoading: updateIsLoading},
  ] = useUpdateDefaultProfitAndRechargePercentageMutation();

  const updateSubmitHandler = async () => {
    try {
      if (!minimumpercentage) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Minimum Percentage',
        });
        return;
      }
      if (isNaN(minimumpercentage)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Percentage',
        });
        return;
      }
      if (!minimumrecharge) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Minimum Recharge Percentage',
        });
        return;
      }
      if (isNaN(minimumrecharge)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Recharge Percentage',
        });
        return;
      }

      const body = {
        minProfitPercentage: minimumpercentage,
        minRechargePercentage: minimumrecharge,
      };

      const res = await updateDefaultProfitAndRechargePercentage({
        accesstoken,
        body,
      });

      console.log(res.data);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await refetch();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgound title={'Minimum Percentage'}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* MINIMUM PROFIT PERCENTAGE */}
          <Textinput
            title="Minimum Profit Percentage"
            value={minimumpercentage}
            onChangeText={text => setminimumpercentage(text)} // Updates inputValue state
            placeholder="Enter Profit Percentage"
          />

          {/* MINIMUM RECHARGE PERCENTAGE */}
          <Textinput
            title="Minimum Recharge Percentage"
            value={minimumrecharge}
            onChangeText={text => setminimumrecharge(text)} // Updates inputValue state
            placeholder="Enter Recharge Percentage"
          />

          <View
            style={{
              flex: 1,
              marginBottom: heightPercentageToDP(5),
              marginVertical: heightPercentageToDP(2),
              justifyContent: 'flex-end',
            }}>
            {updateIsLoading ? (
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
        </>
      )}
    </MainBackgound>
  );
};

export default MinimumPercentage;

const styles = StyleSheet.create({});
