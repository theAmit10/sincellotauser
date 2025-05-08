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
          <PartnerDashComp
            navigate={'PowerTime'}
            title={'Live Result Desk'}
            subtitle={'Create Result for Game'}
            fromicon={'FontAwesome6'}
            iconname={'circle-info'}
          />

          {/** ALL TIME */}
          <PartnerDashComp
            navigate={'PowerAllTimes'}
            title={'All Time'}
            subtitle={'List of Time for Game'}
            fromicon={'FontAwesome6'}
            iconname={'business-time'}
          />
          {/* UPDATE NAME  */}
          <PartnerDashComp
            navigate={'PowerUpdateName'}
            title={'Update Name'}
            subtitle={'Update Game Name '}
            fromicon={'MaterialCommunityIcons'}
            iconname={'update'}
          />
          {/* UPDATE GAME RULE  */}
          <PartnerDashComp
            navigate={'PowerGameRule'}
            title={'Update Game Rule'}
            subtitle={'Update all rule of Game '}
            fromicon={'MaterialCommunityIcons'}
            iconname={'account-arrow-up'}
          />
          {/* ALL MULTIPLIER */}
          <PartnerDashComp
            navigate={'PowerAllMultiplier'}
            title={'All Multiplier'}
            subtitle={'Jackpot Multiplier '}
            fromicon={'FontAwesome6'}
            iconname={'window-restore'}
          />
          {/** ALL Result */}
          <PartnerDashComp
            navigate={'PowerAllResult'}
            title={'All Result History'}
            subtitle={'List of result for Game'}
            fromicon={'FontAwesome6'}
            iconname={'trophy'}
          />
        </>
      )}
    </MainBackgound>
  );
};

export default PowerballDashboard;

const styles = StyleSheet.create({});
