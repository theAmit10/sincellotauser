import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';
import {useSelector} from 'react-redux';
import {useGetPowerballQuery} from '../../helper/Networkcall';
import Loading from '../../components/helpercComponent/Loading';

const PowerballDashboard = () => {
  const {user, accesstoken} = useSelector(state => state.user);

  const [powerball, setPowerball] = useState(null);
  // Network call
  const {data, error, isLoading} = useGetPowerballQuery({accesstoken});

  useEffect(() => {
    if (!isLoading && data) {
      setPowerball(data.games[0]);
    }
  }, [data, isLoading]); // Correct dependencies

  return (
    <MainBackgound title={`${powerball ? powerball?.name : ''} Dashboard`}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* GAME INSGINTS  */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'PowerTime'}
              title={'Live Result Desk'}
              subtitle={'Create Result for Game'}
              fromicon={'FontAwesome6'}
              iconname={'circle-info'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.liveresultdesk ? (
            <PartnerDashComp
              navigate={'PowerTime'}
              title={'Live Result Desk'}
              subtitle={'Create Result for Game'}
              fromicon={'FontAwesome6'}
              iconname={'circle-info'}
            />
          ) : null}

          {/** ALL TIME */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'PowerAllTimes'}
              title={'All Time'}
              subtitle={'List of Time for Game'}
              fromicon={'FontAwesome6'}
              iconname={'business-time'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.powerballtime ? (
            <PartnerDashComp
              navigate={'PowerAllTimes'}
              title={'All Time'}
              subtitle={'List of Time for Game'}
              fromicon={'FontAwesome6'}
              iconname={'business-time'}
            />
          ) : null}
          {/* UPDATE NAME  */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'PowerUpdateName'}
              title={'Update Name'}
              subtitle={'Update Game Name '}
              fromicon={'MaterialCommunityIcons'}
              iconname={'update'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.powerballupdatename ? (
            <PartnerDashComp
              navigate={'PowerUpdateName'}
              title={'Update Name'}
              subtitle={'Update Game Name '}
              fromicon={'MaterialCommunityIcons'}
              iconname={'update'}
            />
          ) : null}
          {/* UPDATE GAME RULE  */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'PowerGameRule'}
              title={'Update Game Rule'}
              subtitle={'Update all rule of Game '}
              fromicon={'MaterialCommunityIcons'}
              iconname={'account-arrow-up'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.powerballupdategamerule ? (
            <PartnerDashComp
              navigate={'PowerGameRule'}
              title={'Update Game Rule'}
              subtitle={'Update all rule of Game '}
              fromicon={'MaterialCommunityIcons'}
              iconname={'account-arrow-up'}
            />
          ) : null}
          {/* ALL MULTIPLIER */}

          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'PowerAllMultiplier'}
              title={'All Multiplier'}
              subtitle={'Jackpot Multiplier '}
              fromicon={'FontAwesome6'}
              iconname={'window-restore'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.powerballallmultiplier ? (
            <PartnerDashComp
              navigate={'PowerAllMultiplier'}
              title={'All Multiplier'}
              subtitle={'Jackpot Multiplier '}
              fromicon={'FontAwesome6'}
              iconname={'window-restore'}
            />
          ) : null}
          {/** ALL Result */}
          {user && user.role === 'admin' ? (
            <PartnerDashComp
              navigate={'PowerAllResult'}
              title={'All Result History'}
              subtitle={'List of result for Game'}
              fromicon={'FontAwesome6'}
              iconname={'trophy'}
            />
          ) : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.powerballallresult ? (
            <PartnerDashComp
              navigate={'PowerAllResult'}
              title={'All Result History'}
              subtitle={'List of result for Game'}
              fromicon={'FontAwesome6'}
              iconname={'trophy'}
            />
          ) : null}
        </>
      )}
    </MainBackgound>
  );
};

export default PowerballDashboard;

const styles = StyleSheet.create({});
