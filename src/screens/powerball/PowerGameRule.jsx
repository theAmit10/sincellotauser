import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';

const PowerGameRule = () => {
  return (
    <MainBackgound title={'Game Rule'}>
      {/* NUMBER RANGE  */}
      <PartnerDashComp
        navigate={'NumberRange'}
        title={'Number Range'}
        subtitle={'Six Ball Number Range'}
        fromicon={'MaterialCommunityIcons'}
        iconname={'vector-arrange-below'}
      />
      {/** WINNER PROFIT */}
      <PartnerDashComp
        navigate={'WinnerProfit'}
        title={'Winner Profit'}
        subtitle={'Result Profit Distribution '}
        fromicon={'FontAwesome6'}
        iconname={'business-time'}
      />
    </MainBackgound>
  );
};

export default PowerGameRule;

const styles = StyleSheet.create({});
