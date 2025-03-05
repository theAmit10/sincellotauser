import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PartnerDashComp from '../../components/partnerdashboard/PartnerDashComp';

const PartnerPerformanceDashboard = () => {
  return (
    <MainBackgroundWithoutScrollview title={'Partner Performance Dashboard'}>
      {/** PARTNER PERFORMANCE */}

      <PartnerDashComp
        navigate={'AllLocation'}
        title={'Playarena Performance'}
        subtitle={'List of all Partner Performace'}
        fromicon={'FontAwesome6'}
        iconname={'people-group'}
      />
      {/** PARTNER PERFORMANCE */}

      <PartnerDashComp
        navigate={'PowerTime'}
        title={'Powerball Performance'}
        subtitle={'List of all Partner Performace'}
        fromicon={'FontAwesome6'}
        iconname={'people-group'}
        data={'powerball'}
      />
    </MainBackgroundWithoutScrollview>
  );
};

export default PartnerPerformanceDashboard;

const styles = StyleSheet.create({});
