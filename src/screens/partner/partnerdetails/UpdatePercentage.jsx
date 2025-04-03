import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../../components/background/MainBackgound';
import Loading from '../../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../../assets/constants';
import Textinput from '../../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  useGetSinglePartnerQuery,
  useRemoveUserFromPartnerUserListMutation,
  useUpdateProfitMutation,
  useUpdateRechargeMutation,
} from '../../../helper/Networkcall';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const UpdatePercentage = ({route}) => {
  const {data} = route.params;
  const {accesstoken} = useSelector(state => state.user);

  const partner = data.key2;

  console.log(JSON.stringify(data));
  const [userid, setuserid] = useState(partner.userId.toString());
  const [profitpercentage, setprofitpercentage] = useState('');
  const [rechargepercentage, setrechargepercenge] = useState('');
  const [topPartnerUserid, setTopPartnerUserid] = useState('');
  const [subPartnerUserid, setSubPartnerUserid] = useState('');
  const [subSubPartnerUserid, setSubSubPartnerUserid] = useState('');

  const [updateProfit, {isLoading}] = useUpdateProfitMutation();
  const [updateRecharge, {isLoading: rechargeIsLoading}] =
    useUpdateRechargeMutation();

  const {
    isLoading: partnerIsLoading,
    data: partnerData,
    refetch,
  } = useGetSinglePartnerQuery({accesstoken, userId: partner.userId});

  useEffect(() => {
    if (!partnerIsLoading && partnerData) {
      setprofitpercentage(partnerData.partner.profitPercentage.toString());
      setrechargepercenge(partnerData.partner.rechargePercentage.toString());
    }
  }, [partnerIsLoading, partnerData]);

  const updateSubmitHandler = async () => {
    try {
      if (!profitpercentage) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Profit Percentage',
        });
        return;
      }
      if (isNaN(profitpercentage)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Percentage',
        });
        return;
      }
      if (
        !checkValidPercentageCriteria(
          profitpercentage,
          partnerData?.partner?.rechargePercentage,
        )
      ) {
        Toast.show({
          type: 'error',
          text1: 'Percentage is too high',
        });
        return;
      }

      const body = {
        partnerId: partner.userId,
        profitPercentage: Number.parseInt(profitpercentage),
      };

      const res = await updateProfit({
        accesstoken,
        body,
      });

      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await refetch();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const updateSubmitHandlerForRecharge = async () => {
    try {
      if (!rechargepercentage) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Recharge Percentage',
        });
        return;
      }
      if (isNaN(rechargepercentage)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Percentage',
        });
        return;
      }
      if (
        !checkValidPercentageCriteria(
          rechargepercentage,
          partnerData?.partner?.profitPercentage,
        )
      ) {
        Toast.show({
          type: 'error',
          text1: 'Percentage is too high',
        });
        return;
      }

      const body = {
        partnerId: partner.userId,
        rechargePercentage: Number.parseInt(rechargepercentage),
      };

      const res = await updateRecharge({
        accesstoken,
        body,
      });

      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await refetch();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgound
      title={data.key1 === 'removeuser' ? 'Remove User' : 'Update Percentage'}
      lefttext={partner.name}
      righttext={partner.userId}>
      {/** USER ID */}
      <Textinput
        title="User ID"
        value={userid}
        onChangeText={text => setuserid(text)} // Updates inputValue state
        placeholder="Enter user id"
        editable={false}
      />

      {/* PROFIT PERCENTAGE */}
      {data.key1 === 'profit' && (
        <Textinput
          title="Profit Percentage"
          value={profitpercentage}
          onChangeText={text => setprofitpercentage(text)} // Updates inputValue state
          placeholder="Enter Profit Percentage"
        />
      )}

      {/* RECHARGE PERCENTAGE */}
      {data.key1 === 'recharge' && (
        <Textinput
          title="Recharge Percentage"
          value={rechargepercentage}
          onChangeText={text => setrechargepercenge(text)} // Updates inputValue state
          placeholder="Enter Recharge Percentage"
        />
      )}

      {/* TOP PARTNER USER ID */}
      {data.key1 === 'removeuser' && (
        <Textinput
          title="Top Partner User ID"
          value={topPartnerUserid}
          onChangeText={text => setTopPartnerUserid(text)} // Updates inputValue state
          placeholder="Enter Top Partner User ID"
        />
      )}

      {/* SUB PARTNER USER ID */}
      {data.key1 === 'removeuser' && (
        <Textinput
          title="Sub Partner User ID"
          value={subPartnerUserid}
          onChangeText={text => setSubPartnerUserid(text)} // Updates inputValue state
          placeholder="Enter Sub Partner User ID"
        />
      )}

      {/* SUB SUB PARTNER USER ID */}
      {data.key1 === 'removeuser' && (
        <Textinput
          title="Sub Sub Partner User ID"
          value={subSubPartnerUserid}
          onChangeText={text => setSubSubPartnerUserid(text)} // Updates inputValue state
          placeholder="Enter Sub Sub Partner User ID"
        />
      )}

      {data.key1 === 'recharge' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          {rechargeIsLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={updateSubmitHandlerForRecharge}
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
      )}

      {data.key1 === 'profit' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          {isLoading ? (
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
      )}
    </MainBackgound>
  );
};

export default UpdatePercentage;

const styles = StyleSheet.create({});
export const checkValidPercentageCriteria = (profit, recharge) => {
  const numProfit = Number(profit);
  const numRecharge = Number(recharge);

  if (isNaN(numProfit) || isNaN(numRecharge)) {
    console.error('Invalid input: Both values must be numbers');
    return false;
  }

  return numProfit + numRecharge <= 100;
};
