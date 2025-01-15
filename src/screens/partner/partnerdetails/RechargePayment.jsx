import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../../components/background/MainBackgound';
import RechargePaymentComp from '../../../components/rechargepayment/RechargePaymentComp';

const RechargePayment = () => {
  return (
    <MainBackgound title={'Recharge Payment'}>
      <RechargePaymentComp title={"Crypto"} navigate={"AllCryptoDepositPayment"}  />
      <RechargePaymentComp title={"Paypal"} navigate={"AllPaypalDepositPayment"}  />
      <RechargePaymentComp title={"Skrill"} navigate={"AllSkrillPaymentPayment"}  />
      <RechargePaymentComp title={"Bank"} navigate={"AllBankDepositPayment"}  />
      <RechargePaymentComp title={"Upi"} navigate={"AllUpiDepositPayment"}  />
    </MainBackgound>
  );
};

export default RechargePayment;

const styles = StyleSheet.create({});
