import {
  FlatList,
  ImageBackground,
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
import {getAllLocations} from '../redux/actions/locationAction';
import {getAllResult} from '../redux/actions/resultAction';
import LinearGradient from 'react-native-linear-gradient';

const AllResult = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {accesstoken} = useSelector(state => state.user);
  // const {loading, locations} = useSelector(state => state.location);
  const {loading, results} = useSelector(state => state.result);

  // const [filteredData, setFilteredData] = useState(locations);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = results.filter(item =>
      item.lotdate.lotdate.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(getAllResult(accesstoken));
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(results); // Update filteredData whenever locations change
  }, [results]);

  const submitHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'Searching',
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>All</GradientText>
          <GradientText style={styles.textStyle}>Result</GradientText>
        </View>

        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(70),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          {/** Main Cointainer */}

          <View
            style={{
              height: heightPercentageToDP(70),
              width: widthPercentageToDP(100),

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
                height: heightPercentageToDP(10),
                margin: heightPercentageToDP(2),
              }}>
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
                  }}
                  placeholder="Search Result Date"
                  placeholderTextColor={COLORS.black}
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
                        navigation.navigate('ResultDetails', {data: item})
                      }
                      style={{
                        ...styles.item,
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.white_s,
                          height: heightPercentageToDP(15),
                          borderRadius: heightPercentageToDP(2),
                        }}>
                        <LinearGradient
                          colors={
                            index % 2 === 0
                              ? [COLORS.lightblue, COLORS.midblue]
                              : [COLORS.lightyellow, COLORS.darkyellow]
                          }
                          start={{x: 0, y: 0}} // start from left
                          end={{x: 1, y: 0}} // end at right
                          style={{
                            backgroundColor:
                              index % 2 === 0
                                ? COLORS.lightDarkGray
                                : COLORS.grayBg,
                            height: heightPercentageToDP(4),
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: heightPercentageToDP(1),
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_Bold,
                              fontSize: heightPercentageToDP(2),
                              color: COLORS.black,
                            }}>
                            {item?.lotlocation?.lotlocation}
                          </Text>
                        </LinearGradient>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: heightPercentageToDP(1),
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_Bold,
                              fontSize: heightPercentageToDP(5),
                              color: COLORS.darkGray,
                            }}>
                            {item?.resultNumber}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: heightPercentageToDP(4),
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            paddingHorizontal: heightPercentageToDP(1),
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(2),
                              color: COLORS.black,
                            }}>
                            {item?.lotdate?.lotdate}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONT.Montserrat_Regular,
                              fontSize: heightPercentageToDP(2),
                              color: COLORS.black,
                            }}>
                            {item?.lottime?.lottime}
                          </Text>
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

            {/** end */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default AllResult;

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
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});
