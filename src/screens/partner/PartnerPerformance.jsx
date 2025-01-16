import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import MainBackgound from '../../components/background/MainBackgound';
import PartnerPerformanceComp from '../../components/partnerperformance/PartnerPerformanceComp';
import {useNavigation} from '@react-navigation/native';

const PartnerPerformance = ({route}) => {
  const {timedata, locationdata} = route.params;

  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const item = {
    _id: 1,
    name: 'Test',
  };

  const navigation = useNavigation();

  return (
    <MainBackgound title={'Partner Performance'}>
      <PartnerPerformanceComp
        item={item}
        expandedItems={expandedItems}
        setExpandedItems={setExpandedItems}
        toggleItem={toggleItem}
      />
    </MainBackgound>
  );
};

export default PartnerPerformance;

const styles = StyleSheet.create({});
