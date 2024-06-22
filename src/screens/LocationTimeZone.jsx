import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    heightPercentageToDP,
    widthPercentageToDP,
  } from 'react-native-responsive-screen';
  import {COLORS, FONT} from '../../assets/constants';
  import GradientText from '../components/helpercComponent/GradientText';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import Toast from 'react-native-toast-message';
  import {useIsFocused, useNavigation} from '@react-navigation/native';
  import Background from '../components/background/Background';
  import Loading from '../components/helpercComponent/Loading';
  import {useDispatch, useSelector} from 'react-redux';

  import {getTimeAccordingLocation} from '../redux/actions/timeAction';
  import NoDataFound from '../components/helpercComponent/NoDataFound';

  import UrlHelper from '../helper/UrlHelper';
  import axios from 'axios';
  
  const LocationTimeZone = ({route}) => {
    const navigation = useNavigation();
  
    const {datedata, locationdata, timedata} = route.params;
    
    const dispatch = useDispatch();
  
    const {accesstoken} = useSelector(state => state.user);
    const {loading, times} = useSelector(state => state.time);
    const [filteredData, setFilteredData] = useState([]);
  
    const handleSearch = text => {
      const filtered = times.filter(item =>
        item.lottime.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    };
  
    const focused = useIsFocused();
  
    useEffect(() => {
      dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
    }, [dispatch, focused]);
  
    useEffect(() => {
      setFilteredData(times); // Update filteredData whenever locations change
    }, [times]);
  
    // console.log('times :: ' + times);
    // console.log('Filter length :: ' + filteredData.length);
  
    const submitHandler = () => {
      Toast.show({
        type: 'success',
        text1: 'Searching',
      });
    };
  
    const [selectedItem, setSelectedItem] = useState('');
    const [showProgressBar, setProgressBar] = useState(false);
  
    const deleteLocationHandler = async item => {
      console.log('Item clicked :: ' + item._id);
      setProgressBar(true);
      setSelectedItem(item._id);
  
      try {
        const url = `${UrlHelper.DELETE_TIME_API}/${item._id}`;
        const {data} = await axios.delete(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },
        });
  
        console.log('datat :: ' + data);
  
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        setProgressBar(false);
  
      } catch (error) {
        setProgressBar(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please, try after sometime',
        });
        console.log(error);
      }
    };
  
    return (
      <SafeAreaView style={{flex: 1}}>
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
              marginHorizontal: heightPercentageToDP(2),
              marginVertical: heightPercentageToDP(1)
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
              }}>
              <GradientText style={styles.textStyle}>Search Time</GradientText>
              <GradientText
                style={{
                  fontSize: heightPercentageToDP(2),
                  fontFamily: FONT.Montserrat_Bold,
                  marginEnd: heightPercentageToDP(2)
                }}>
                {locationdata?.maximumRange}
              </GradientText>
            </View>
  
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
                color={COLORS.darkGray}
              />
              <TextInput
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_SemiBold,
                  fontSize: heightPercentageToDP(2),
                  color: COLORS.black,
                }}
                placeholderTextColor={COLORS.black}
                placeholder="Search for time"
                label="Search"
                onChangeText={handleSearch}
              />
            </View>
          </View>
  
          <View
            style={{
              marginHorizontal: heightPercentageToDP(2),
              marginVertical: heightPercentageToDP(1),
            }}>
            <GradientText style={styles.textStyle}>
              {locationdata.lotlocation}
            </GradientText>
          </View>
  
          <View
            style={{
              flex: 2,
            }}>
            {loading ? (
              <Loading />
            ) : filteredData.length === 0 ? (
              <View style={{margin: heightPercentageToDP(2)}}>
                <NoDataFound data={'No data available'} />
              </View>
            ) : (
              <FlatList
                data={filteredData}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('CreateResultFromTimeZone', {
                            datedata: datedata,
                            locationdata: locationdata,
                            timedata: item,
                          })
                    }
                    style={{
                      ...styles.item,
                      backgroundColor:
                        index % 2 === 0
                          ? COLORS.lightDarkGray
                          : COLORS.grayHalfBg,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontFamily: FONT.HELVETICA_BOLD,
                          fontSize: heightPercentageToDP(2.5),
                        }}>
                        {item.lottime}
                      </Text>
  
                      
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                initialNumToRender={10} // Render initial 10 items
                maxToRenderPerBatch={10} // Batch size to render
                windowSize={10} // Number of items kept in memory
              />
            )}
          </View>
  
          {/** Bottom Submit Container */}
  
       
  
          {/** end */}
        </View>
      </SafeAreaView>
    );
  };
  
  export default LocationTimeZone;
  
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
  

  