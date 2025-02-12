import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';

const PowerAllTimes = () => {
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

  const Footer = () => {
    return (
      <View
        style={{
          marginVertical: heightPercentageToDP(2),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateTimePowerball', {forprocess: 'create'})
          }
          style={{
            backgroundColor: COLORS.blue,
            padding: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(1),
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONT.Montserrat_Regular,
            }}>
            Create New Time
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MainBackgroundWithoutScrollview title={'All Time'}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={alltimes}
        renderItem={({item}) => (
          <PowerAllTimesComp
            key={item.id}
            time={item.time}
            fromicon={'FontAwesome'}
            iconname={'edit'}
            fromIconDelete={'MaterialCommunityIcons'}
            iconNameDelete={'delete'}
            navigation={navigation}
            
          />
        )}
      />
      <Footer />
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerAllTimes;

const styles = StyleSheet.create({});
