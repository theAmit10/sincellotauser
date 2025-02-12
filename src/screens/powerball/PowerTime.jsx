import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import PowerTimeComp from '../../components/powerball/powertime/PowerTimeComp';

const PowerTime = () => {
  const alltimes = [
    {
      id: 1,
      time: '09: 00 AM',
    },
    {
      id: 2,
      time: '10: 00 AM',
    },
    {
      id: 3,
      time: '11: 00 AM',
    },
  ];

  const navigation = useNavigation();

  return (
    <MainBackgroundWithoutScrollview title={'All Time'}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={alltimes}
        renderItem={({item}) => (
          <PowerTimeComp
            key={item.id}
            time={item.time}
            navigation={navigation}
            navigate={"PowerAllDate"}
            
          />
        )}
      />
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerTime;

const styles = StyleSheet.create({});
