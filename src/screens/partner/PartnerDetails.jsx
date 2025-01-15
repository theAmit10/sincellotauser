import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';

const PartnerDetails = () => {
  return (
    <MainBackgound title={'Partner Details'} lefttext={"Aryan"} righttext={1090}>
      {/** UPDATE PERMISSION */}
      <PartnerDashComp
        navigate={'UpdatePermission'}
        title={'Update Permission'}
        subtitle={'Update Partner Permission'}
        fromicon={'MaterialCommunityIcons'}
        iconname={'security'}
      />
      {/** Recharge Payment  */}
      <PartnerDashComp
        navigate={'RechargePayment'}
        title={'Recharge Payment'}
        subtitle={'Update Partner Payment '}
        fromicon={'FontAwesome6'}
        iconname={'money-check'}
      />
      {/** Send Notification */}
      <PartnerDashComp
        navigate={'AllUsersPartner'}
        title={'Send Notification'}
        subtitle={'Send Notification for Partner'}
        fromicon={'Ionicons'}
        iconname={'notifications'}
      />
      {/** Update Profit Percentage */}
      <PartnerDashComp
        navigate={'UpdatePercentage'}
        title={'Profit Percentage'}
        subtitle={'Update Profit Percentage '}
        fromicon={'MaterialCommunityIcons'}
        iconname={'human-capacity-increase'}
        data={{ key1: 'profit'}}
      />
      {/** Update Recharge Percentage */}
      <PartnerDashComp
        navigate='UpdatePercentage'
        title={'Recharge Percentage'}
        subtitle={'Update Recharge Percentage '}
        fromicon={'MaterialCommunityIcons'}
        iconname={'account-cash'}
        data={{ key1: 'recharge'}}
      />
      {/** Recharge History */}
      <PartnerDashComp
        navigate={'RechargeHistory'}
        title={'Recharge History'}
        subtitle={'Update Partner Recharge '}
        fromicon={'MaterialCommunityIcons'}
        iconname={'human-capacity-decrease'}
      />
      {/** Remove User */}
      <PartnerDashComp
        navigate={'UpdatePercentage'}
        title={'Remove User'}
        subtitle={'Remove user for Partner List '}
        fromicon={'MaterialCommunityIcons'}
        iconname={'delete-empty'}
        data={{ key1: 'removeuser'}}
      />
    </MainBackgound>
  );
};

export default PartnerDetails;

const styles = StyleSheet.create({});
