import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../../components/background/MainBackgound';
import UpdatePermissionComp from '../../../components/updatepermisssion/UpdatePermissionComp';
import {useSelector} from 'react-redux';
import {
  useActivatePartnerRechargeModuleMutation,
  useDeactivatePartnerRechargeModuleMutation,
  useGetSinglePartnerQuery,
  useGetSinglePartnerRechargeModuleQuery,
  useUpdatePartnerPlayAndTransactionPermissionMutation,
  useUpdateRechargePaymentMethodPermissionMutation,
} from '../../../helper/Networkcall';
import Loading from '../../../components/helpercComponent/Loading';
import Toast from 'react-native-toast-message';

const UpdatePermission = ({route}) => {
  const {accesstoken} = useSelector(state => state.user);

  const {data: partnerdata} = route.params;

  const {isLoading, data, refetch} = useGetSinglePartnerQuery({
    accesstoken,
    userId: partnerdata.userId,
  });

  const [selectedItem, setSelectedItem] = useState('');

  const [
    updatePartnerPlayAndTransactionPermission,
    {isLoading: updateIsLoading},
  ] = useUpdatePartnerPlayAndTransactionPermissionMutation();

  //[FOR RECHAREGE MODULE ACTIVATION]
  const [activatePartnerRechargeModule, {isLoading: activateIsLoading}] =
    useActivatePartnerRechargeModuleMutation();

  //[FOR RECHAREGE MODULE DEACTIVATION]
  const [deactivatePartnerRechargeModule, {isLoading: deactivateIsLoading}] =
    useDeactivatePartnerRechargeModuleMutation();

  const {
    isLoading: rechargeIsLoading,
    data: rechargeData,
    refetch: rechargeRefetch,
  } = useGetSinglePartnerRechargeModuleQuery(
    {accesstoken, id: data?.partner?.rechargeModule},
    {skip: data?.partner?.rechargeModule === null || undefined},
  );

  //[FOR RECHAREGE MODULE PAYMENT METHOD PERMISSION UPDATE]
  const [
    updateRechargePaymentMethodPermission,
    {isLoading: updateRechargePermissionIsLoading},
  ] = useUpdateRechargePaymentMethodPermissionMutation();

  // console.log(JSON.stringify(rechargeData));

  const updateSubmitHandler = async item => {
    try {
      setSelectedItem(item);
      let body = {};

      if (item === 'Play History') {
        body = {
          userId: partnerdata.userId,
          playHistoryPermission: data?.partner?.playHistoryPermission
            ? false
            : true,
        };
      } else {
        body = {
          userId: partnerdata.userId,
          transactionHistoryPermission: data?.partner
            ?.transactionHistoryPermission
            ? false
            : true,
        };
      }

      const res = await updatePartnerPlayAndTransactionPermission({
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
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const activateRechargeModule = async item => {
    try {
      setSelectedItem(item);

      const activationstatus = rechargeData?.rechargeModule?.activationStatus;

      if (activationstatus === true) {
        const body = {
          userId: partnerdata.userId,
          id: data?.partner?.rechargeModule,
        };
        console.log('IF');
        console.log(partnerdata.userId);
        console.log(data?.partner?.rechargeModule);
        const res = await deactivatePartnerRechargeModule({
          accesstoken,
          body,
        });

        console.log(JSON.stringify(res));
        console.log('Success IF');
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
      } else {
        console.log('else');
        console.log(partnerdata.userId);
        console.log(data?.partner?.rechargeModule);
        const body = {
          userId: Number.parseInt(partnerdata.userId),
          id: data?.partner?.rechargeModule,
        };
        const res = await activatePartnerRechargeModule({
          accesstoken,
          body,
        });

        console.log('Success');
        console.log(JSON.stringify(res));
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
      }

      await rechargeRefetch();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const updateSubmitHandlerForRecharge = async item => {
    try {
      setSelectedItem(item);
      let body = {};

      if (item === 'UPI') {
        body = {
          upiPermission: rechargeData?.rechargeModule?.upiPermission
            ? false
            : true,
        };
      }
      if (item === 'Bank') {
        body = {
          bankPermission: rechargeData?.rechargeModule?.bankPermission
            ? false
            : true,
        };
      }
      if (item === 'Paypal') {
        body = {
          paypalPermission: rechargeData?.rechargeModule?.paypalPermission
            ? false
            : true,
        };
      }
      if (item === 'Skrill') {
        body = {
          skrillPermission: rechargeData?.rechargeModule?.skrillPermission
            ? false
            : true,
        };
      }
      if (item === 'Crypto') {
        body = {
          cryptoPermission: rechargeData?.rechargeModule?.cryptoPermission
            ? false
            : true,
        };
      }
      if (item === 'Other Payment') {
        body = {
          otherPaymentPermission: rechargeData?.rechargeModule
            ?.otherPaymentPermission
            ? false
            : true,
        };
      }

      const res = await updateRechargePaymentMethodPermission({
        accesstoken,
        body,
        id: rechargeData?.rechargeModule?._id,
      });

      console.log(res.data);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await rechargeRefetch();
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
      title={'Update Permission'}
      lefttext={partnerdata.name}
      righttext={partnerdata.userId}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UpdatePermissionComp
            title={'Play History'}
            active={data?.partner?.playHistoryPermission}
            updateSubmitHandler={updateSubmitHandler}
            updateIsLoading={updateIsLoading}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <UpdatePermissionComp
            title={'Transaction History'}
            active={data?.partner?.transactionHistoryPermission}
            updateSubmitHandler={updateSubmitHandler}
            updateIsLoading={updateIsLoading}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          {data?.partner?.rechargeModule && (
            <>
              {!rechargeIsLoading && rechargeData && (
                <>
                  <UpdatePermissionComp
                    title={'Recharge'}
                    active={rechargeData?.rechargeModule?.activationStatus}
                    updateSubmitHandler={activateRechargeModule}
                    updateIsLoading={
                      rechargeData?.rechargeModule?.activationStatus
                        ? deactivateIsLoading
                        : activateIsLoading
                    }
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <UpdatePermissionComp
                    title={'UPI'}
                    active={rechargeData?.rechargeModule?.upiPermission}
                    updateSubmitHandler={updateSubmitHandlerForRecharge}
                    updateIsLoading={updateRechargePermissionIsLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <UpdatePermissionComp
                    title={'Bank'}
                    active={rechargeData?.rechargeModule.bankPermission}
                    updateSubmitHandler={updateSubmitHandlerForRecharge}
                    updateIsLoading={updateRechargePermissionIsLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <UpdatePermissionComp
                    title={'Paypal'}
                    active={rechargeData?.rechargeModule.paypalPermission}
                    updateSubmitHandler={updateSubmitHandlerForRecharge}
                    updateIsLoading={updateRechargePermissionIsLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <UpdatePermissionComp
                    title={'Skrill'}
                    active={rechargeData?.rechargeModule.skrillPermission}
                    updateSubmitHandler={updateSubmitHandlerForRecharge}
                    updateIsLoading={updateRechargePermissionIsLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <UpdatePermissionComp
                    title={'Crypto'}
                    active={rechargeData?.rechargeModule.cryptoPermission}
                    updateSubmitHandler={updateSubmitHandlerForRecharge}
                    updateIsLoading={updateRechargePermissionIsLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <UpdatePermissionComp
                    title={'Other Payment'}
                    active={rechargeData?.rechargeModule.otherPaymentPermission}
                    updateSubmitHandler={updateSubmitHandlerForRecharge}
                    updateIsLoading={updateRechargePermissionIsLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </MainBackgound>
  );
};

export default UpdatePermission;

const styles = StyleSheet.create({});
