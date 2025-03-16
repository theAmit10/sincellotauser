import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../../components/background/MainBackgound';
import RechargePaymentComp from '../../../components/rechargepayment/RechargePaymentComp';
import {useSelector} from 'react-redux';
import {useGetSinglePartnerRechargeModuleQuery} from '../../../helper/Networkcall';
import Loading from '../../../components/helpercComponent/Loading';

const RechargePayment = ({route}) => {
  const {data} = route.params;

  console.log('Loading Recharge Payment');
  console.log(JSON.stringify(data));
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
    <MainBackgound title={'Recharge Payment'}>
      {rechargeIsLoading ? (
        <Loading />
      ) : (
        <>
          {rechargeData?.rechargeModule.cryptoPermission === true && (
            <RechargePaymentComp
              title={'Crypto'}
              navigate={'PartnerCryptoPaymentMethod'}
              data={data}
            />
          )}
          {rechargeData?.rechargeModule.skrillPermission === true && (
            <RechargePaymentComp
              title={'Skrill'}
              navigate={'PartnerSkrillPaymentMethod'}
              data={data}
            />
          )}

          {rechargeData?.rechargeModule.paypalPermission === true && (
            <RechargePaymentComp
              title={'Paypal'}
              navigate={'PartnerPaypalPaymentMethod'}
              data={data}
            />
          )}

          {rechargeData?.rechargeModule.bankPermission === true && (
            <RechargePaymentComp
              title={'Bank'}
              navigate={'ParrtnerBankPaymentMethod'}
              data={data}
            />
          )}

          {rechargeData?.rechargeModule?.upiPermission === true && (
            <RechargePaymentComp
              title={'Upi'}
              navigate={'PartnerUpiPaymentMethod'}
              data={data}
            />
          )}

          {rechargeData?.rechargeModule?.otherPaymentPermission === true && (
            <RechargePaymentComp
              title={'Other'}
              navigate={'PartnerOtherPaymentMethod'}
              data={data}
            />
          )}
        </>
      )}
    </MainBackgound>
  );
};

export default RechargePayment;

const styles = StyleSheet.create({});
