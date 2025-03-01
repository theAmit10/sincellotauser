import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import {useSelector} from 'react-redux';
import {
  useGetSinglePartnerQuery,
  useUpdateSubPartnerStatusMutation,
} from '../../helper/Networkcall';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONT} from '../../../assets/constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import Toast from 'react-native-toast-message';

const PartnerActivation = ({route}) => {
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

  return (
    <MainBackgroundWithoutScrollview title={'Partner Activation'}>
      {isLoading || updateSubPartnerStatusLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name={'admin-panel-settings'}
            size={heightPercentageToDP(20)}
            color={COLORS.black}
          />
          <Text
            style={{
              fontFamily: FONT.Montserrat_Bold,
              fontSize: heightPercentageToDP(2),
              color: COLORS.white_s,
            }}>
            Current Status :{' '}
            {partnerdata.partner.partnerStatus === true ? 'Active' : 'Inactive'}
          </Text>
          {partnerdata.partner.partnerStatus === true ? (
            <TouchableOpacity
              onPress={submitHandler}
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
                Deactivate
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={submitHandler}
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
                Activate Now
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </MainBackgroundWithoutScrollview>
  );
};

export default PartnerActivation;

const styles = StyleSheet.create({});
