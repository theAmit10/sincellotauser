import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import PowerballAllDateComp from '../../components/powerball/powerballalldates/PowerballAllDateComp';

const PowerAllDate = ({route}) => {
  const alltimes = [
    {
      id: 1,
      time: '09-12-2024',
    },
    {
      id: 2,
      time: '10-12-2024',
    },
    {
      id: 3,
      time: '11-12-2024',
    },
  ];

  const navigation = useNavigation();

  const {item} = route.params;

  console.log('item :: ' + JSON.stringify(item));

  return (
    <MainBackgroundWithoutScrollview title={'All Date'}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={alltimes}
        renderItem={({item}) => (
          <PowerballAllDateComp
            key={item.id}
            time={item.time}
            fromicon={'FontAwesome'}
            iconname={'edit'}
            fromIconDelete={'MaterialCommunityIcons'}
            iconNameDelete={'delete'}
            navigation={navigation}
            navigate={'PowerGameInsights'}
          />
        )}
      />
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerAllDate;

const styles = StyleSheet.create({});
