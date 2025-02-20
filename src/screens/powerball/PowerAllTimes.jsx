import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useGetAllPowerTimesQuery} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import NoDataFound from '../../components/helpercComponent/NoDataFound';

const PowerAllTimes = () => {
  const navigation = useNavigation();
  const {accesstoken} = useSelector(state => state.user);
  const {isLoading, data, error, refetch} = useGetAllPowerTimesQuery({
    accesstoken,
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    refetch();
  }, [isFocused]);

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
      {isLoading ? (
        <Loading />
      ) : data?.powerTimes.length === 0 ? (
        <NoDataFound title="No data found" />
      ) : (
        <FlatList
          keyExtractor={item => item._id.toString()}
          data={data.powerTimes}
          renderItem={({item}) => (
            <PowerAllTimesComp
              key={item._id}
              time={item.powertime}
              fromicon={'FontAwesome'}
              iconname={'edit'}
              fromIconDelete={'MaterialCommunityIcons'}
              iconNameDelete={'delete'}
              item={item}
              navigate={'UpdatePowerballTime'}
              forprocess={'edit'}
            />
          )}
        />
      )}

      <Footer />
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerAllTimes;

const styles = StyleSheet.create({});
