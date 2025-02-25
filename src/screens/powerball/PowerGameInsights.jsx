import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import PowerGameInsightsComp from '../../components/powerball/gameinsights/PowerGameInsightsComp';

const PowerGameInsights = ({route}) => {
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

  const {item} = route.params;

  console.log('item :: ' + JSON.stringify(item));

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = times.filter(item =>
      item.lottime.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  //  const {timedata, locationdata} = route.params;

  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const item = {
  //   _id: 1,
  //   name: 'Test',
  // };

  const navigation = useNavigation();

  const Footer = () => {
    return (
      <View
        style={{
          marginVertical: heightPercentageToDP(2),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreatePowerResult', {forprocess: 'create'})
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
            Create New Result
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Header = () => {
    return (
      <View
        style={{
          height: heightPercentageToDP(7),
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            width: widthPercentageToDP(50),
            flexDirection: 'row',
            backgroundColor: COLORS.white_s,
            alignItems: 'center',
            paddingHorizontal: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(1),
            marginHorizontal: heightPercentageToDP(1),
          }}>
          <Fontisto
            name={'search'}
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
          <TextInput
            style={{
              marginStart: heightPercentageToDP(1),
              flex: 1,
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
            }}
            placeholder="Enter jackpot number"
            placeholderTextColor={COLORS.black}
            label="Search"
            onChangeText={handleSearch}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.white_s,
            margin: heightPercentageToDP(1),
            padding: heightPercentageToDP(1),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: heightPercentageToDP(1),
          }}>
          <Feather
            name={'copy'}
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
        </View>
      </View>
    );
  };

  return (
    <MainBackgroundWithoutScrollview
      lefttext={'10-10-2024'}
      righttext={'09:00 PM'}
      title={'Game Insights'}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={alltimes}
        ListHeaderComponent={<Header />}
        renderItem={({item}) => (
          <PowerGameInsightsComp
            item={item}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
            toggleItem={toggleItem}
          />
        )}
      />
      <Footer />
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerGameInsights;

const styles = StyleSheet.create({});
