import {
  FlatList,
  Image,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllUsers} from '../redux/actions/userAction';
import { serverName } from '../redux/store';

const AllUsers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accesstoken} = useSelector(state => state.user);
  const {loadingAll, allusers} = useSelector(state => state.user);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = allusers.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const focused = useIsFocused();

  useEffect(() => {
    dispatch(loadAllUsers(accesstoken));
  }, [dispatch, focused]);

  useEffect(() => {
    setFilteredData(allusers); // Update filteredData whenever locations change
  }, [allusers]);

  

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
          <GradientText style={styles.textStyle}>All Users</GradientText>

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
                color: COLORS.black
              }}
              placeholder="Search for User"
              label="Search"
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <View
          style={{
            flex: 2,
          }}>
          {loadingAll ? (
            <Loading />
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserDetails', {
                      userdata: item,
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
                      gap: heightPercentageToDP(2),
                    }}>
                    {/** Profile Image Container */}
                    <TouchableOpacity
                      style={{
                        borderRadius: 100,
                        overflow: 'hidden',
                        width: 60,
                        height: 60,
                      }}>
                      {item.avatar?.url ? (
                        <Image
                          source={{ uri: `${serverName}/uploads/${item.avatar.url}` }}
                          resizeMode="cover"
                          style={{
                            height: 60,
                            width: 60,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/image/dark_user.png')}
                          resizeMode="cover"
                          style={{
                            height: 60,
                            width: 60,
                          }}
                        />
                      )}
                    </TouchableOpacity>

                    {/** User Name */}

                    <View style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start'
                    }}>
                      <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_SemiBold,
                        fontSize: heightPercentageToDP(2.5),
                        textAlignVertical: 'center',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_Regular,
                        fontSize: heightPercentageToDP(2),
                        textAlignVertical: 'center',
                      }}>
                      User Id - {item.userId}
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
    </View>
  );
};

export default AllUsers;

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
