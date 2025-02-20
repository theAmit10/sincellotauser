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
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              handleDelete={handleDelete}
              deleteTimeIsLoading={deleteTimeIsLoading}
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
