import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  useDeletePowerballTimeMutation,
  useGetAllPowerTimesQuery,
} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import NoDataFound from '../../components/helpercComponent/NoDataFound';
import Toast from 'react-native-toast-message';
import moment from 'moment-timezone';

const PowerAllTimes = ({route}) => {
  const {data: fromscreen} = route.params;
  const navigation = useNavigation();
  const {accesstoken} = useSelector(state => state.user);
  const [powertimes, setPowertimes] = useState(null);
  const {isLoading, data, error, refetch} = useGetAllPowerTimesQuery({
    accesstoken,
  });

  const [nextTime, setNextTime] = useState(null);
  useEffect(() => {
    if (!isLoading && data) {
      setPowertimes(data.powerTimes);
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

  const [deletePowerballTime, {isLoading: deleteTimeIsLoading}] =
    useDeletePowerballTimeMutation();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = item => {
    setSelectedItem(item);
    deletePowerballTimeFunc(item._id);
  };

  const deletePowerballTimeFunc = async id => {
    try {
      const res = await deletePowerballTime({accesstoken, id}).unwrap();

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res?.message,
      });

      refetch();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again later',
      });
    }
  };

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
          data={powertimes}
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
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              handleDelete={handleDelete}
              deleteTimeIsLoading={deleteTimeIsLoading}
              nextTime={nextTime}
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
