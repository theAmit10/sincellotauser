import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import Loading from '../../components/helpercComponent/Loading';
import {useNavigation} from '@react-navigation/native';
import PowerballAllDateComp from '../../components/powerball/powerballalldates/PowerballAllDateComp';
import {useGetPowerDateBasedUponPowerTimeQuery} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import moment from 'moment-timezone';
const PowerAllDate = ({route}) => {
  const navigation = useNavigation();

  const {item: powertime} = route.params;

  console.log('item :: ' + JSON.stringify(powertime));

  const [allPowerDate, setPowerDate] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 10;

  const {accesstoken} = useSelector(state => state.user);

  const {
    isLoading,
    data: dateData,
    isError,
  } = useGetPowerDateBasedUponPowerTimeQuery({
    accesstoken,
    id: powertime._id,
    page,
    limit,
  });

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     setPowerDate(data.powerDates);
  //   }
  // }, [isLoading, data]);

  // useEffect(() => {
  //   if (data) {
  //     const currentDate = moment().startOf('day');
  //     const nextDate = currentDate.clone().add(1, 'days');

  //     // Filter out items where the lotdate is the next day
  //     const filtered = data.powerDates.filter(item => {
  //       const itemDate = moment(item.powerdate, 'DD-MM-YYYY'); // Adjust format as needed
  //       return !itemDate.isSame(nextDate, 'day');
  //     });

  //     setPowerDate(filtered); // Update filteredData whenever dates change
  //   }
  // }, [data]);

  useEffect(() => {
    if (dateData) {
      // Get current, previous, and next dates
      const currentDate = moment().startOf('day');
      const previousDate = currentDate.clone().subtract(1, 'days');
      const nextDate = currentDate.clone().add(1, 'days');

      // Get the current time
      const currentTime = moment();
      const isWithinTimeRange = currentTime.isBetween(
        moment().set({hour: 23, minute: 0}), // 11:00 PM
        moment().add(1, 'days').startOf('day'), // 12:00 AM
      );

      const filtered = dateData?.powerDates.filter(item => {
        const itemDate = moment(item.powerdate, 'DD-MM-YYYY');

        // Always include the previous date and current date
        if (
          itemDate.isSame(previousDate, 'day') ||
          itemDate.isSame(currentDate, 'day')
        ) {
          return true;
        }

        // Include the next date if it's between 11:00 PM - 12:00 AM
        if (itemDate.isSame(nextDate, 'day') && isWithinTimeRange) {
          return true;
        }

        return false; // Exclude all other dates
      });

      setPowerDate(filtered); // Update the filtered data with the three dates
    }
  }, [dateData]);

  return (
    <MainBackgroundWithoutScrollview title={'All Date'}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={allPowerDate}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <PowerballAllDateComp
              key={item._id}
              time={item.powerdate}
              fromicon={'FontAwesome'}
              iconname={'edit'}
              fromIconDelete={'MaterialCommunityIcons'}
              iconNameDelete={'delete'}
              navigation={navigation}
              navigate={'PowerGameInsights'}
              item={item}
              powertime={powertime}
            />
          )}
        />
      )}
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerAllDate;

const styles = StyleSheet.create({});
