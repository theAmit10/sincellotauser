import {
  FlatList,
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
import {getAllLocations} from '../redux/actions/locationAction';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);
  const {loading, locations} = useSelector(state => state.location);
  

  // const [filteredData, setFilteredData] = useState(locations);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = locations.filter(item =>
      item.lotlocation.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(getAllLocations(accesstoken));
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(locations); // Update filteredData whenever locations change
  }, [locations]);

  const submitHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'Searching',
    });
  };
  
  const [selectedItem, setSelectedItem] = useState("");
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async (item) => {
    console.log("Item clicked :: "+item._id)
    setProgressBar(true);
    setSelectedItem(item._id)

    try {
      const url = `${UrlHelper.DELETE_LOCATION_API}/${item._id}`;
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

      navigation.reset({
        index: 0,
        routes: [{name: 'AdminDashboard'}],
      });
    } catch (error) {
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please, try after sometime'
      });
      console.log(error);
    }
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
          <GradientText style={styles.textStyle}>All Locations</GradientText>

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
                fontSize: heightPercentageToDP(2),
              }}
              placeholder="Search for location"
              label="Search"
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <View
          style={{
            flex: 2,
          }}>
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SearchTime', {
                      locationdata: item,
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
                        fontSize: heightPercentageToDP(2),
                      }}>
                      {item.lotlocation}
                    </Text>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',gap: heightPercentageToDP(2)}}>
                      {/** Update Locatiion */}

                    <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateLocation',{
                      locationdata : item
                    })}
                    >
                      {
                        filteredData.length === 0 ? ( selectedItem === item._id ? (<Loading/>) :(<LinearGradient
                          colors={[COLORS.lightWhite, COLORS.white_s]}
                          className="rounded-xl p-1">
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>) ) : (
                        <LinearGradient
                          colors={[COLORS.lightWhite, COLORS.white_s]}
                          className="rounded-xl p-1">
                          <MaterialCommunityIcons
                            name={'circle-edit-outline'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>)
                      }
                      
                    </TouchableOpacity>

                      {/** Delete Locatiion */}

                    <TouchableOpacity
                    onPress={() => deleteLocationHandler(item)}
                    >
                      {
                        showProgressBar ? ( selectedItem === item._id ? (<Loading/>) :(<LinearGradient
                          colors={[COLORS.lightWhite, COLORS.white_s]}
                          className="rounded-xl p-1">
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>) ) : (
                        <LinearGradient
                          colors={[COLORS.lightWhite, COLORS.white_s]}
                          className="rounded-xl p-1">
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>)
                      }
                      
                    </TouchableOpacity>


                    </View>

                    
                    


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

        <View
          style={{
            marginBottom: heightPercentageToDP(5),
            marginHorizontal: heightPercentageToDP(2),
            marginTop: heightPercentageToDP(2),
          }}>
          {/** Email container */}

          <TouchableOpacity
            onPress={() => navigation.navigate('CreateLocation')}
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
              Create Location
            </Text>
          </TouchableOpacity>
        </View>

        {/** end */}
      </View>
    </View>
  );
};

export default Search;

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
