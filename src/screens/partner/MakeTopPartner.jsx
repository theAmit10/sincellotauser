import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import {useSelector} from 'react-redux';
import {
  useCreatePartnerMutation,
  useGetSinglePartnerQuery,
  usePromotePartnerToTopPartnerMutation,
  useRemoveTopPartnerMutation,
  useUpdateSubPartnerStatusMutation,
} from '../../helper/Networkcall';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONT} from '../../../assets/constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import Toast from 'react-native-toast-message';

const MakeTopPartner = ({route}) => {
  const {data} = route.params;
  const {accesstoken} = useSelector(state => state.user);

  const [updateSubPartnerStatus, {isLoading: updateSubPartnerStatusLoading}] =
    useUpdateSubPartnerStatusMutation();

  const {
    isLoading,
    data: partnerdata,
    refetch = {refetch},
  } = useGetSinglePartnerQuery({
    accesstoken,
    userId: data.userId,
  });

  const submitHandler = async () => {
    try {
      const body = {
        userId: data.userId,
        partnerStatus:
          partnerdata.partner.partnerStatus === true ? false : true,
      };

      const res = await updateSubPartnerStatus({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      await refetch();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const [promotePartnerToTopPartner, {isLoading: isCreating}] =
    usePromotePartnerToTopPartnerMutation();
  const [removeTopPartner, {isLoading: isRemoving}] =
    useRemoveTopPartnerMutation();

  const [seletedItem, setSelectedItem] = useState('');

  const createPartnerSubmitHandler = item => {
    setSelectedItem(item);
    makePartnerHandler(item);
  };

  const makePartnerHandler = async item => {
    try {
      const body = {
        userId: item.userId,
      };
      const res = await promotePartnerToTopPartner({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      console.log('Refetching data...');
      await refetch();
      console.log('Data refetched');
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const removePartnerSubmitHandler = item => {
    setSelectedItem(item);
    removePartnerHandler(item);
  };

  const removePartnerHandler = async item => {
    try {
      const body = {
        userId: item.userId,
      };
      const res = await removeTopPartner({
        accesstoken,
        body,
      });
      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });

      console.log('Refetching data...');
      await refetch();
      console.log('Data refetched');
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgroundWithoutScrollview title={'Make Top Partner'}>
      {isLoading || isCreating || isRemoving ? (
        <Loading />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name={'account-tie-hat'}
            size={heightPercentageToDP(20)}
            color={COLORS.black}
          />
          <Text
            style={{
              fontFamily: FONT.Montserrat_Bold,
              fontSize: heightPercentageToDP(2),
              color: COLORS.white_s,
            }}>
            Current Status : {partnerdata.partner.partnerType}
          </Text>
          {partnerdata.partner.partnerType === 'partner' ? (
            <TouchableOpacity
              onPress={() => removePartnerSubmitHandler(partnerdata.partner)}
              style={{
                height: heightPercentageToDP(7),
                backgroundColor: COLORS.red,
                width: widthPercentageToDP(90),
                borderRadius: heightPercentageToDP(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.white_s,
                }}>
                Remove Partner
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => createPartnerSubmitHandler(partnerdata.partner)}
              style={{
                height: heightPercentageToDP(7),
                backgroundColor: COLORS.green,
                width: widthPercentageToDP(90),
                borderRadius: heightPercentageToDP(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.white_s,
                }}>
                Add Top Partner
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </MainBackgroundWithoutScrollview>
  );
};

export default MakeTopPartner;

const styles = StyleSheet.create({});
