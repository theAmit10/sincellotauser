import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import Textinput from '../../components/tlwinput/Textinput';
import {useSelector} from 'react-redux';
import {
  useCreatePowerballResultMutation,
  useGetPowerballQuery,
} from '../../helper/Networkcall';
import Toast from 'react-native-toast-message';
import Loading from '../../components/helpercComponent/Loading';

function formatJackpotData(
  jackpotNumber,
  powertime,
  powerdate,
  firstprizeAmount,
  firstprizeTotalUser,
  secondprizeAmount,
  secondPrizeTotalUser,
  thirdprizeAmount,
  thirdPrizeTotalUser,
  fourthprizeAmount,
  fourthPrizeTotalUser,
  fifthprizeAmount,
  fifthPrizeTotalUser,
  sixthprizeAmount,
  sixthPrizeTotalUser,
) {
  return {
    jackpotnumber: jackpotNumber.split(' ').map(Number),
    powertime,
    powerdate,
    prize: {
      firstprize: {amount: firstprizeAmount, totaluser: firstprizeTotalUser},
      secondprize: {amount: secondprizeAmount, totaluser: secondPrizeTotalUser},
      thirdprize: {amount: thirdprizeAmount, totaluser: thirdPrizeTotalUser},
      fourthprize: {amount: fourthprizeAmount, totaluser: fourthPrizeTotalUser},
      fifthprize: {amount: fifthprizeAmount, totaluser: fifthPrizeTotalUser},
      sixthprize: {amount: sixthprizeAmount, totaluser: sixthPrizeTotalUser},
    },
  };
}

const CreatePowerResult = ({route}) => {
  const {item, powertime} = route.params;
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');
  const [sixth, setSixth] = useState('');
  const [jackpot, setJackpot] = useState('');

  const {user, accesstoken} = useSelector(state => state.user);

  const [powerball, setPowerball] = useState(null);
  // Network call
  const {data, error, isLoading} = useGetPowerballQuery({accesstoken});

  useEffect(() => {
    if (!isLoading && data) {
      setPowerball(data.games[0]);
      console.log(data?.games[0]);
    }

    if (error) {
      console.error('Error fetching powerball data:', error);
    }
  }, [data, isLoading, error]); // Correct dependencies

  console.log(powerball?.winnerPrize?.firstprize);

  const [createPowerballResult, {isLoading: createPowerballResultIsLoading}] =
    useCreatePowerballResultMutation();

  const isValidNumberString = str => {
    const regex = /^\d+\s\d+\s\d+\s\d+\s\d+\s\d+$/;
    return regex.test(str);
  };

  function isValidSixNumbers(input) {
    // Split the input string by space
    const numbers = input.trim().split(/\s+/);

    // Check if exactly 6 numbers are present
    return numbers.length === 6;
  }

  function areNumbersUnderMax(input, maxNumber) {
    // Split the string and convert to numbers
    const numbers = input.trim().split(/\s+/).map(Number);

    // Check if all numbers are ≤ maxNumber
    const allUnderMax = numbers.every(num => num <= maxNumber);

    // Check if all numbers are unique
    const allUnique = new Set(numbers).size === numbers.length;

    return allUnderMax && allUnique;
  }

  const submitHandler = async () => {
    try {
      if (!first || !second || !third || !fourth || !fifth || !sixth) {
        Toast.show({
          type: 'error',
          text1: 'All field mandatory',
          text2: 'Please fill all the fields',
        });
        return;
      }

      if (
        isNaN(first) ||
        isNaN(second) ||
        isNaN(third) ||
        isNaN(fourth) ||
        isNaN(fifth) ||
        isNaN(sixth)
      ) {
        Toast.show({
          type: 'error',
          text1: 'Enter number only',
          text2: 'Please fill all the fields',
        });

        return;
      }
      const cleanedJackpot = jackpot.trim().replace(/\s+/g, ' ');
      if (!isValidNumberString(cleanedJackpot)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Jackpot formate',
          text2: 'For Eg: 9 34 35 45 50 60',
        });
        return;
      }

      if (!isValidSixNumbers(cleanedJackpot)) {
        Toast.show({
          type: 'error',
          text1: 'Jackpot must have 6 numbers',
        });
        return;
      }

      if (!areNumbersUnderMax(cleanedJackpot, powerball?.range?.endRange)) {
        Toast.show({
          type: 'error',
          text1: `Number must be less then ${powerball?.range?.endRange} and Unique`,
        });
        return;
      }

      // Example usage:
      const body = formatJackpotData(
        cleanedJackpot,
        powertime._id,
        item._id,
        powerball?.winnerPrize?.firstprize,
        first,
        powerball?.winnerPrize?.secondPrize,
        second,
        powerball?.winnerPrize?.thirdprize,
        third,
        powerball?.winnerPrize?.fourthPrize,
        fourth,
        powerball?.winnerPrize?.fifthprize,
        fifth,
        powerball?.winnerPrize?.sixthPrize,
        sixth,
      );

      console.log(body);

      const res = await createPowerballResult({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));

      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgound
      title={'Create Result'}
      lefttext={item.powerdate}
      righttext={powertime.powertime}>
      {createPowerballResultIsLoading || isLoading ? (
        <Loading />
      ) : (
        <>
          <Textinput
            title="Jackpot"
            value={jackpot}
            onChangeText={text => setJackpot(text)} // Updates inputValue state
            placeholder="For Eg: 9 34 35 45 50 60"
          />
          <Textinput
            title="First Prize Winners"
            value={first}
            onChangeText={text => setFirst(text)} // Updates inputValue state
            placeholder="How many people won the 1st prize"
            keyboardType="numeric"
          />
          <Textinput
            title="Second Prize Winners"
            value={second}
            onChangeText={text => setSecond(text)} // Updates inputValue state
            placeholder="How many people won the 2nd prize"
            keyboardType="numeric"
          />
          <Textinput
            title="Third Prize Winners"
            value={third}
            onChangeText={text => setThird(text)} // Updates inputValue state
            placeholder="How many people won the 3rd prize"
            keyboardType="numeric"
          />
          <Textinput
            title="Fourth Prize Winners"
            value={fourth}
            onChangeText={text => setFourth(text)} // Updates inputValue state
            placeholder="How many people won the 4th prize"
            keyboardType="numeric"
          />
          <Textinput
            title="Fifth Prize Winners"
            value={fifth}
            onChangeText={text => setFifth(text)} // Updates inputValue state
            placeholder="How many people won the 5th prize"
            keyboardType="numeric"
          />
          <Textinput
            title="Sixth Prize Winners"
            value={sixth}
            onChangeText={text => setSixth(text)} // Updates inputValue state
            placeholder="How many people won the 6th prize"
            keyboardType="numeric"
          />

          <View
            style={{
              flex: 1,
              marginBottom: heightPercentageToDP(5),
              marginVertical: heightPercentageToDP(2),
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={submitHandler}
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
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </MainBackgound>
  );
};

export default CreatePowerResult;

const styles = StyleSheet.create({});
