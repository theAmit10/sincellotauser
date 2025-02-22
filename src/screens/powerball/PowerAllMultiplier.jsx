import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useGetPowerBallGameQuery,
  useRemoveMultiplierMutation,
} from '../../helper/Networkcall';
import Toast from 'react-native-toast-message';
import PowerballMultiplierComp from '../../components/powerball/poweralltimes/PowerballMultiplierComp';

const PowerAllMultiplier = () => {
  const navigation = useNavigation();

  const Footer = () => {
    return (
      <View
        style={{
          marginVertical: heightPercentageToDP(2),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateNewMultiplier', {forprocess: 'create'})
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
            Create New Multiplier
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const {accesstoken} = useSelector(state => state.user);

  const {data, isLoading, refetch, errror} = useGetPowerBallGameQuery({
    accesstoken,
  });

  const [allmultiplier, setAllMultiplier] = useState([]);

  useEffect(() => {
    if (!isLoading && data) {
      console.log(JSON.stringify(data.games[0]?.multiplier));
      console.log(JSON.stringify(data.games[0]?.multiplier[0].value));
      setAllMultiplier(data?.games[0]?.multiplier);
    }
  }, [isLoading, data]);

  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const [removeMultiplier, {isLoading: deleteMultiplierIsLoading}] =
    useRemoveMultiplierMutation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDelete = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    deletePowerballMultiplierFunc(item);
  };

  const deletePowerballMultiplierFunc = async item => {
    try {
      const body = {
        value: item.value,
      };

      const res = await removeMultiplier({accesstoken, body}).unwrap();

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

  return (
    <MainBackgroundWithoutScrollview title={'All Multiplier'}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={item => item._id.toString()}
          data={allmultiplier}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <PowerballMultiplierComp
              key={item._id}
              time={item.value}
              item={item}
              fromicon={'FontAwesome'}
              iconname={'edit'}
              fromIconDelete={'MaterialCommunityIcons'}
              iconNameDelete={'delete'}
              navigation={navigation}
              navigate={'CreateNewMultiplier'}
              forprocess={'update'}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              handleDelete={handleDelete}
              deleteMultiplierIsLoading={deleteMultiplierIsLoading}
            />
          )}
        />
      )}

      <Footer />
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerAllMultiplier;

const styles = StyleSheet.create({});
