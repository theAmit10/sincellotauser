import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';
import {useSelector} from 'react-redux';
import {
  useGetSinglePartnerQuery,
  useGetSinglePartnerRechargeModuleQuery,
} from '../../helper/Networkcall';
import Loading from '../../components/helpercComponent/Loading';
import {useIsFocused} from '@react-navigation/native';

const PartnerDetails = ({route}) => {
  console.log('In the partner details screen');

  const {data} = route.params;
  console.log(data);

  const {accesstoken, user} = useSelector(state => state.user);

  const [partnerdata, setPartnerdata] = useState(null);

  const {
    isLoading,
    data: partner,
    refetch,
  } = useGetSinglePartnerQuery({
    accesstoken,
    userId: data.userId,
  });

  useEffect(() => {
    if (!isLoading && partner) {
      setPartnerdata(partner.partner);
    }
  }, [isLoading, partner]);

  const isFocused = useIsFocused();
  useEffect(() => {
    refetch();
  }, [isFocused]);

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
      lefttext={partnerdata?.name}
      righttext={partnerdata?.userId}>
      {/** PARTNER ACTIVATION */}
      {isLoading ? (
        <Loading />
      ) : (
        partnerdata && (
          <>
            {/* <PartnerDashComp
              navigate={'PartnerActivation'}
              title={'Partner Activation'}
              subtitle={'Active the partner account'}
              fromicon={'MaterialCommunityIcons'}
              iconname={'security'}
              data={partnerdata}
            /> */}

            {/** RECHARGE MODULE ACTIVATION */}
            {/* <PartnerDashComp
              navigate={'RechargeActivation'}
              title={'Recharge Activation'}
              subtitle={'Active the recharge account'}
              fromicon={'MaterialCommunityIcons'}
              iconname={'security'}
              data={partnerdata}
            /> */}

            {/** PARTNER PARTNER LIST */}

            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'PartnerPartnerList'}
                title={'Partner List'}
                subtitle={'Get all the partner list'}
                fromicon={'FontAwesome6'}
                iconname={'people-carry-box'}
                data={partnerdata}
                count={partnerdata?.partnerList?.length}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.partnerlist ? (
              <PartnerDashComp
                navigate={'PartnerPartnerList'}
                title={'Partner List'}
                subtitle={'Get all the partner list'}
                fromicon={'FontAwesome6'}
                iconname={'people-carry-box'}
                data={partnerdata}
                count={partnerdata?.partnerList?.length}
              />
            ) : null}
            {/** PARTNER USER LIST */}

            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'PartnerUserList'}
                title={'User List'}
                subtitle={'Get all the partner user list'}
                fromicon={'Ionicons'}
                iconname={'people'}
                data={partnerdata}
                count={partnerdata?.userList?.length}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.userlist ? (
              <PartnerDashComp
                navigate={'PartnerUserList'}
                title={'User List'}
                subtitle={'Get all the partner user list'}
                fromicon={'Ionicons'}
                iconname={'people'}
                data={partnerdata}
                count={partnerdata?.userList?.length}
              />
            ) : null}
            {/** UPDATE PERMISSION */}

            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'UpdatePermission'}
                title={'Update Permission'}
                subtitle={'Update Partner Permission'}
                fromicon={'MaterialCommunityIcons'}
                iconname={'security'}
                data={partnerdata}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.updatepermission ? (
              <PartnerDashComp
                navigate={'UpdatePermission'}
                title={'Update Permission'}
                subtitle={'Update Partner Permission'}
                fromicon={'MaterialCommunityIcons'}
                iconname={'security'}
                data={partnerdata}
              />
            ) : null}
            {/** Recharge Payment  */}
            {rechargeData?.rechargeModule?.activationStatus === true && (
              <>
                {user && user.role === 'admin' ? (
                  <PartnerDashComp
                    navigate={'RechargePayment'}
                    title={'Recharge Method'}
                    subtitle={'Update Partner Payment '}
                    fromicon={'FontAwesome6'}
                    iconname={'money-check'}
                    data={partnerdata}
                  />
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.rechargemethod ? (
                  <PartnerDashComp
                    navigate={'RechargePayment'}
                    title={'Recharge Method'}
                    subtitle={'Update Partner Payment '}
                    fromicon={'FontAwesome6'}
                    iconname={'money-check'}
                    data={partnerdata}
                  />
                ) : null}

                {/** Update Recharge Percentage */}

                {user && user.role === 'admin' ? (
                  <PartnerDashComp
                    navigate="UpdatePercentage"
                    title={'Recharge %'}
                    subtitle={'Update Recharge Percentage '}
                    fromicon={'MaterialCommunityIcons'}
                    iconname={'account-cash'}
                    data={{key1: 'recharge', key2: partnerdata}}
                  />
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.rechargepercentage ? (
                  <PartnerDashComp
                    navigate="UpdatePercentage"
                    title={'Recharge %'}
                    subtitle={'Update Recharge Percentage '}
                    fromicon={'MaterialCommunityIcons'}
                    iconname={'account-cash'}
                    data={{key1: 'recharge', key2: partnerdata}}
                  />
                ) : null}
                {/** Recharge History */}
                <PartnerDashComp
                  navigate={'RechargeHistory'}
                  title={'Recharge History'}
                  subtitle={'Update Partner Recharge '}
                  fromicon={'MaterialCommunityIcons'}
                  iconname={'human-capacity-decrease'}
                  data={partnerdata}
                />

                {/* {user && user.role === 'admin' ? (
                  <PartnerDashComp
                    navigate={'RechargeHistory'}
                    title={'Recharge History'}
                    subtitle={'Update Partner Recharge '}
                    fromicon={'MaterialCommunityIcons'}
                    iconname={'human-capacity-decrease'}
                    data={partnerdata}
                  />
                ) : user &&
                  user.role === 'subadmin' &&
                  user.subadminfeature.minimumpercentage ? (
                  <PartnerDashComp
                    navigate={'RechargeHistory'}
                    title={'Recharge History'}
                    subtitle={'Update Partner Recharge '}
                    fromicon={'MaterialCommunityIcons'}
                    iconname={'human-capacity-decrease'}
                    data={partnerdata}
                  />
                ) : null} */}
              </>
            )}

            {/** Update Profit Percentage */}

            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'UpdatePercentage'}
                title={'Profit Percentage'}
                subtitle={'Update Profit Percentage '}
                fromicon={'MaterialCommunityIcons'}
                iconname={'human-capacity-increase'}
                data={{key1: 'profit', key2: partnerdata}}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.profitpercentage ? (
              <PartnerDashComp
                navigate={'UpdatePercentage'}
                title={'Profit Percentage'}
                subtitle={'Update Profit Percentage '}
                fromicon={'MaterialCommunityIcons'}
                iconname={'human-capacity-increase'}
                data={{key1: 'profit', key2: partnerdata}}
              />
            ) : null}
            {/** Send Notification */}
            <PartnerDashComp
              navigate={'CreatePowerballNotification'}
              title={'Send Notification'}
              subtitle={'Send Notification for Partner'}
              fromicon={'Ionicons'}
              iconname={'notifications'}
              data={partnerdata}
            />

            {/** Add User */}

            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'AddUserToUserList'}
                title={'Add User'}
                subtitle={'Add user for Partner User List '}
                fromicon={'MaterialIcons'}
                iconname={'person-add'}
                data={partnerdata}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.adduser ? (
              <PartnerDashComp
                navigate={'AddUserToUserList'}
                title={'Add User'}
                subtitle={'Add user for Partner User List '}
                fromicon={'MaterialIcons'}
                iconname={'person-add'}
                data={partnerdata}
              />
            ) : null}

            {/** Remove User */}

            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'RemoveUserFromPartner'}
                title={'Remove User'}
                subtitle={'Remove user for Partner List '}
                fromicon={'MaterialCommunityIcons'}
                iconname={'delete-empty'}
                data={partnerdata}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.removeuser ? (
              <PartnerDashComp
                navigate={'RemoveUserFromPartner'}
                title={'Remove User'}
                subtitle={'Remove user for Partner List '}
                fromicon={'MaterialCommunityIcons'}
                iconname={'delete-empty'}
                data={partnerdata}
              />
            ) : null}

            {/** Promote User to top partner */}
            {user && user.role === 'admin' ? (
              <PartnerDashComp
                navigate={'MakeTopPartner'}
                title={'Make Top Partner'}
                subtitle={'Promote Sub Partner to Top Partner'}
                fromicon={'MaterialIcons'}
                iconname={'person-add'}
                data={partnerdata}
              />
            ) : user &&
              user.role === 'subadmin' &&
              user.subadminfeature.toppartner ? (
              <PartnerDashComp
                navigate={'MakeTopPartner'}
                title={'Make Top Partner'}
                subtitle={'Promote Sub Partner to Top Partner'}
                fromicon={'MaterialIcons'}
                iconname={'person-add'}
                data={partnerdata}
              />
            ) : null}
          </>
        )
      )}
    </MainBackgound>
  );
};

export default PartnerDetails;

const styles = StyleSheet.create({});
