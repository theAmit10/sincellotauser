import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginBackground from '../components/login/LoginBackground';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getDateAccordingToLocationAndTime } from '../redux/actions/dateAction';

const SearchDate = ({ route }) => {
  const navigation = useNavigation();

  const { timedata,locationdata } = route.params;

  const [searchData, setSearchData] = useState('');
  const [showLoading, setLoading]= useState(false);
  const [data, setData] = useState([
    {id: '1', title: '22 jan 2024'},
    {id: '2', title: '23 jan 2024'},
    {id: '3', title: '24 jan 2024'},
    {id: '4', title: '25 jan 2024'},
    {id: '5', title: '26 jan 2024'},
    {id: '6', title: '27 jan 2024'},
    {id: '7', title: '28 jan 2024'},
    {id: '8', title: '29 jan 2024'},
  ]);


  const dispatch = useDispatch();

  const { accesstoken } = useSelector(state => state.user);
  const { loading, dates } = useSelector(state => state.date);
  const [filteredData, setFilteredData] = useState([]);
  
  const handleSearch = text => {
    const filtered = dates.filter(item =>
      item.lotdate.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused()


  useEffect(() => {
    dispatch(getDateAccordingToLocationAndTime(accesstoken,timedata._id,timedata.lotlocation._id))
  },[dispatch,focused])


  useEffect(() => {
    setFilteredData(dates); // Update filteredData whenever locations change
  }, [dates]);

  const submitHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'Searching',
    });
  };

  return (
    <View style={{flex: 1}}>
      <Background />

      {/** Main Cointainer */}


      <View
        style={{
          height: heightPercentageToDP(85),
          width: widthPercentageToDP(100),
          backgroundColor: COLORS.white_s,
          borderTopLeftRadius: heightPercentageToDP(5),
          borderTopRightRadius: heightPercentageToDP(5),
        }}>
        {/** Top Style View */}
        <View
          style={{
            height: heightPercentageToDP(5),
            width: widthPercentageToDP(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: widthPercentageToDP(20),
              height: heightPercentageToDP(0.8),
              backgroundColor: COLORS.grayBg,
              borderRadius: heightPercentageToDP(2),
            }}></View>
        </View>

        {/** Content Container */}

        

        <View
          style={{
            height: heightPercentageToDP(15),
            margin: heightPercentageToDP(2),
          }}>
          <GradientText style={styles.textStyle}>Search Date</GradientText>

          {/** Search container */}

          <View
            style={{
              height: heightPercentageToDP(7),
              flexDirection: 'row',
              backgroundColor: COLORS.grayHalfBg,
              alignItems: 'center',
              paddingHorizontal: heightPercentageToDP(2),
              borderRadius: heightPercentageToDP(1),
              marginTop: heightPercentageToDP(2),
            }}>
            <Fontisto
              name={'search'}
              size={heightPercentageToDP(3)}
              color={COLORS.white}
            />
            <TextInput
              style={{
                marginStart: heightPercentageToDP(1),
                flex: 1,
                fontFamily: FONT.SF_PRO_REGULAR,
                fontSize: heightPercentageToDP(2)
              }}
              placeholder="Search for date"
              label="Search"
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <View style={{margin: heightPercentageToDP(2)}}>
        <GradientText style={styles.textStyle}>{locationdata.lotlocation}</GradientText>
        <GradientText style={styles.textStyle}>{timedata.lottime}</GradientText>
        </View>

        <View
          style={{
            flex: 2,
          }}>
            {
                loading ? (<Loading/>) : (<FlatList
                    data={filteredData}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                      onPress={() => navigation.navigate("Result",{
                        datedata: item,
                      })}
                        style={{
                          ...styles.item,
                          backgroundColor:
                            index % 2 === 0 ? COLORS.lightDarkGray : COLORS.grayHalfBg,
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.HELVETICA_BOLD,
                            fontSize: heightPercentageToDP(2),
                          }}>
                          {item.lotdate}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    initialNumToRender={10} // Render initial 10 items
                    maxToRenderPerBatch={10} // Batch size to render
                    windowSize={10} // Number of items kept in memory
                  />)
            }
          
        </View>

        {/** Bottom Submit Container */}

        

        {/** end */}
      </View>
    </View>
  );
};

export default SearchDate;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
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


// {/* <View
//           style={{
//             marginBottom: heightPercentageToDP(5),
//             marginHorizontal: heightPercentageToDP(2),
//             marginTop: heightPercentageToDP(2),
//           }}>
//           {/** Email container */}

//           <TouchableOpacity
//             onPress={submitHandler}
//             style={{
//               backgroundColor: COLORS.blue,
//               padding: heightPercentageToDP(2),
//               borderRadius: heightPercentageToDP(1),
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 color: COLORS.white,
//                 fontFamily: FONT.Montserrat_Regular,
//               }}>
//               Submit
//             </Text>
//           </TouchableOpacity>
//         </View> */}
