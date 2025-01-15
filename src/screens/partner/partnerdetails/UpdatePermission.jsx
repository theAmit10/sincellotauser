import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../../components/background/MainBackgound';
import UpdatePermissionComp from '../../../components/updatepermisssion/UpdatePermissionComp';

const UpdatePermission = () => {
  return (
    <MainBackgound
      title={'Update Permission'}
      lefttext={'Aryan'}
      righttext={'1090'}>
      <UpdatePermissionComp title={'Play History'} />
      <UpdatePermissionComp title={'Transaction History'} />
      <UpdatePermissionComp title={'Recharge'} active={true} />
      <UpdatePermissionComp title={'UPI'} active={true} />
      <UpdatePermissionComp title={'Bank'} active={true} />
      <UpdatePermissionComp title={'Paypal'} active={true} />
      <UpdatePermissionComp title={'Skrill'} active={true} />
      <UpdatePermissionComp title={'Crypto'} active={true} />
      <UpdatePermissionComp title={'Other Payment'} active={true} />
    </MainBackgound>
  );
};

export default UpdatePermission;

const styles = StyleSheet.create({});
