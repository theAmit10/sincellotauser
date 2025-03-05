import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import PowerTimeComp from '../../components/powerball/powertime/PowerTimeComp';
import {useSelector} from 'react-redux';
import {useGetAllPowerTimesQuery} from '../../helper/Networkcall';
import NoDataFound from '../../components/helpercComponent/NoDataFound';
import PowerTimeGameInsightComp from '../../components/PowerTimeGameInsightComp';

const PowerTime = ({route}) => {
  const {data: fromscreen} = route.params;
  const navigation = useNavigation();

  const {accesstoken} = useSelector(state => state.user);
  const {isLoading, data, error, refetch} = useGetAllPowerTimesQuery({
    accesstoken,
  });

  console.log(fromscreen);

  const isFocused = useIsFocused();
  useEffect(() => {
    refetch();
  }, [isFocused]);

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
            <PowerTimeGameInsightComp
              key={item._id}
              time={item.powertime}
              item={item}
              navigate={fromscreen ? 'PowerDatePerformance' : 'PowerAllDate'}
            />
          )}
        />
      )}
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerTime;

const styles = StyleSheet.create({});
