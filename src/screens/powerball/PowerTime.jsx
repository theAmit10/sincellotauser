import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

import Loading from '../../components/helpercComponent/Loading';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone';
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
  const [powertimes, setPowertimes] = useState(null);
  const [nextTime, setNextTime] = useState(null);
  useEffect(() => {
    if (!isLoading && data) {
      let alltime = [];

      alltime = [...data.powerTimes].sort((a, b) => {
        // Helper function to convert time to minutes for comparison
        const timeToMinutes = timeStr => {
          const [time, period] = timeStr.split(' ');
          const [hours, minutes] = time.split(':').map(Number);
          let total = hours * 60 + minutes;
          if (period === 'PM' && hours !== 12) total += 12 * 60;
          if (period === 'AM' && hours === 12) total -= 12 * 60;
          return total;
        };

        return timeToMinutes(a.powertime) - timeToMinutes(b.powertime);
      });
      setPowertimes(alltime);
      console.log(data);

      const nextTime = getNextTimeForHighlights(
        data.powerTimes,
        'Asia/Kolkata',
      );
      setNextTime(nextTime);
      console.log(data);
    }

    if (error) {
      console.error('Error fetching powerball data:', error);
    }
  }, [data, isLoading, error]); // Correct dependencies

  const getNextTimeForHighlights = (times, userTimezone) => {
    if (times.length === 1) {
      return times[0];
    }

    // Get the current time in the user's timezone
    const currentRiyadhTime = moment().tz(userTimezone).format('hh:mm A');
    console.log('Current time in Riyadh timezone:', currentRiyadhTime);

    // Convert each time from IST to user timezone (Asia/Riyadh)
    const convertedTimes = times.map(item => {
      const timeInIST = moment.tz(item.powertime, 'hh:mm A', 'Asia/Kolkata');
      const timeInRiyadh = timeInIST.clone().tz(userTimezone).format('hh:mm A');
      return {...item, convertedTime: timeInRiyadh};
    });

    console.log('Converted times to Riyadh timezone:', convertedTimes);

    // Sort the times in the user's timezone
    const sortedTimes = convertedTimes.sort((a, b) =>
      moment(a.convertedTime, 'hh:mm A').diff(
        moment(b.convertedTime, 'hh:mm A'),
      ),
    );

    console.log('Sorted times:', sortedTimes);

    // Find the next available time
    for (let i = 0; i < sortedTimes.length; i++) {
      if (
        moment(currentRiyadhTime, 'hh:mm A').isBefore(
          moment(sortedTimes[i].convertedTime, 'hh:mm A'),
        )
      ) {
        console.log('Next available time found:', sortedTimes[i]);
        return sortedTimes[i]; // Return the first future time
      }
    }

    console.log(
      'No future time found, returning the first sorted time:',
      sortedTimes[0],
    );
    // If no future time found, return the first time (next day scenario)
    return sortedTimes[0];
  };

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
          data={powertimes}
          renderItem={({item}) => (
            <PowerTimeGameInsightComp
              key={item._id}
              time={item.powertime}
              item={item}
              navigate={fromscreen ? 'PowerDatePerformance' : 'PowerAllDate'}
              nextTime={nextTime}
            />
          )}
        />
      )}
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerTime;

const styles = StyleSheet.create({});
