import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';
import {useSelector} from 'react-redux';
import {useGetSinglePartnerRechargeModuleQuery} from '../../helper/Networkcall';

const PartnerDetails = ({route}) => {
  console.log('In the partner details screen');

  const {data} = route.params;
  console.log(data);

  const {accesstoken} = useSelector(state => state.user);
  const {
    isLoading: rechargeIsLoading,
    data: rechargeData,
    refetch: rechargeRefetch,
  } = useGetSinglePartnerRechargeModuleQuery(
    {accesstoken, id: data?.rechargeModule},
    {skip: data?.rechargeModule === null || undefined},
  );

  return (
    <MainBackgound
      title={'Partner Details'}
      lefttext={data?.name}
      righttext={data?.userId}>
      {/** PARTNER ACTIVATION */}
      <PartnerDashComp
        navigate={'PartnerActivation'}
        title={'Partner Activation'}
        subtitle={'Active the partner account'}
        fromicon={'MaterialCommunityIcons'}
        iconname={'security'}
        data={data}
      />
      {/** PARTNER USER LIST */}
      <PartnerDashComp
        navigate={'PartnerUserList'}
        title={'User List'}
        subtitle={'Get all the partner user list'}
        fromicon={'MaterialCommunityIcons'}
        iconname={'security'}
        data={data}
      />
      {/** PARTNER PARTNER LIST */}
      <PartnerDashComp
        navigate={'PartnerPartnerList'}
        title={'Partner List'}
        subtitle={'Get all the partner list'}
        fromicon={'MaterialCommunityIcons'}
        iconname={'security'}
        data={data}
      />
      {/** UPDATE PERMISSION */}
      <PartnerDashComp
        navigate={'UpdatePermission'}
        title={'Update Permission'}
        subtitle={'Update Partner Permission'}
        fromicon={'MaterialCommunityIcons'}
        iconname={'security'}
        data={data}
      />
      {/** Recharge Payment  */}
      {rechargeData?.rechargeModule?.activationStatus === true && (
        <>
          <PartnerDashComp
            navigate={'RechargePayment'}
            title={'Recharge Payment'}
            subtitle={'Update Partner Payment '}
            fromicon={'FontAwesome6'}
            iconname={'money-check'}
            data={data}
          />

          {/** Update Recharge Percentage */}
          <PartnerDashComp
            navigate="UpdatePercentage"
            title={'Recharge Percentage'}
            subtitle={'Update Recharge Percentage '}
            fromicon={'MaterialCommunityIcons'}
            iconname={'account-cash'}
            data={{key1: 'recharge', key2: data}}
          />
          {/** Recharge History */}
          <PartnerDashComp
            navigate={'RechargeHistory'}
            title={'Recharge History'}
            subtitle={'Update Partner Recharge '}
            fromicon={'MaterialCommunityIcons'}
            iconname={'human-capacity-decrease'}
            data={data}
          />
        </>
      )}

      {/** Send Notification */}
      <PartnerDashComp
        navigate={'CreatePowerballNotification'}
        title={'Send Notification'}
        subtitle={'Send Notification for Partner'}
        fromicon={'Ionicons'}
        iconname={'notifications'}
        data={data}
      />
      {/** Update Profit Percentage */}
      <PartnerDashComp
        navigate={'UpdatePercentage'}
        title={'Profit Percentage'}
        subtitle={'Update Profit Percentage '}
        fromicon={'MaterialCommunityIcons'}
        iconname={'human-capacity-increase'}
        data={{key1: 'profit', key2: data}}
      />

      {/** Remove User */}
      <PartnerDashComp
        navigate={'RemoveUserFromPartner'}
        title={'Remove User'}
        subtitle={'Remove user for Partner List '}
        fromicon={'MaterialCommunityIcons'}
        iconname={'delete-empty'}
        data={data}
      />
    </MainBackgound>
  );
};

export default PartnerDetails;

const styles = StyleSheet.create({});
