import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../components/background/MainBackgound';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {TextInput} from 'react-native-paper';
import ProfitDeducationComp from '../../components/profitdeduction/ProfitDeducationComp';

const ProfitDeduction = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = allusers.filter(
      item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.userId?.toString() === text,
    );
    setFilteredData(filtered);
  };

  return (
    <MainBackgound title={'Profit Deduction'}>
      {/** SEARCH */}
      <View
        style={{
          height: heightPercentageToDP(7),
          flexDirection: 'row',
          backgroundColor: COLORS.white_s,
          alignItems: 'center',
          paddingHorizontal: heightPercentageToDP(2),
          borderRadius: heightPercentageToDP(1),
          marginTop: heightPercentageToDP(2),
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
            fontFamily: FONT.Montserrat_SemiBold,
            fontSize: heightPercentageToDP(2),
            color: COLORS.black,
            backgroundColor: COLORS.white_s
          }}
          placeholder="Search for User"
          placeholderTextColor={COLORS.black}
          onChangeText={handleSearch}
        />
      </View>

      <ProfitDeducationComp/>

      
    </MainBackgound>
  );
};

export default ProfitDeduction;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.white_s,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: heightPercentageToDP(20),
  },
  item: {
    padding: heightPercentageToDP(2),
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});
