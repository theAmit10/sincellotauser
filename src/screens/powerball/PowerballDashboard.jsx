import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';

const PowerballDashboard = () => {
  return (
    <MainBackgound title={'Powerball Dashboard'}>
         {/** ALL Result */}
      <PartnerDashComp
        navigate={'PowerAllResult'}
        title={'All Result'}
        subtitle={'List of resultfor Game'}
        fromicon={'FontAwesome6'}
        iconname={'trophy'}
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
      {/* GAME INSGINTS  */}
      <PartnerDashComp
        navigate={'PowerTime'}
        title={'Game Insights'}
        subtitle={'Create Result for Game'}
        fromicon={'FontAwesome6'}
        iconname={'circle-info'}
      />
    </MainBackgound>
  );
};

export default PowerballDashboard;

const styles = StyleSheet.create({});
