import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../assets/constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import GradientText from '../components/helpercComponent/GradientText';
import Wallet from '../components/home/Wallet';
import {useDispatch, useSelector} from 'react-redux';
import {loadProfile} from '../redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/helpercComponent/Loading';
import { isNewBackTitleImplementation } from 'react-native-screens';

const Home = () => {
  const [searchData, setSearchData] = useState('');
  const {user, accesstoken, loading} = useSelector(state => state.user);

  const navigation = useNavigation();
  const [showLoading, setLoading] = useState(false);

  const [data, setData] = useState([
    {id: '1', result: '7894', location: 'Pune', time: '01:00 PM'},
    {id: '2', result: '1839', location: 'Sikkim', time: '01:00 PM'},
    {id: '3', result: '7456', location: 'Bhopal', time: '01:00 PM'},
  ]);

  // Getting User Profile

  const dispatch = useDispatch();

  useEffect(() => {
    // getUserAccessToken()
    dispatch(loadProfile(accesstoken));
  }, [dispatch]);

  console.log('Welcome :: ' + JSON.stringify(user));
  console.log('Welcome Access token :: ' + accesstoken);

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: COLORS.white,
        padding: heightPercentageToDP(2),
      }}>
      {loading ? (
        <Loading />
      ) : (
        user && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/** TOP HEADER CONTAINER */}
            <View
              style={{
                height: heightPercentageToDP(10),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 3,

                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: heightPercentageToDP(1),
                }}>
                {/** Profile Image Container */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{
                    borderRadius: 100,
                    overflow: 'hidden',
                    width: 70,
                    height: 70,
                  }}>
                  <Image
                    // source={{ uri: 'https://imgs.search.brave.com/bNjuaYsTPw2b4yerAkKyk82fwZ9sNFwkwb3JMnX7qBg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDU5OTYxMjQtMDUw/MWViYWU4NGQwP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4TWpCOGZHWmhZ/MlY4Wlc1OE1IeDhN/SHg4ZkRBPQ.jpeg' }}
                    source={require('../../assets/image/dummy_user.jpeg')}
                    resizeMode="cover"
                    style={{
                      height: 70,
                      width: 70,
                    }}
                  />
                </TouchableOpacity>

                {/** Profile name Container */}
                <View>
                  <Text
                    style={{
                      fontFamily: FONT.Montserrat_Regular,
                      color: COLORS.black,
                    }}>
                    Hello
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.HELVETICA_BOLD,
                      color: COLORS.black,
                      fontSize: heightPercentageToDP(2),
                    }}>
                    {user.name}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: heightPercentageToDP(2),
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <Ionicons
                    name={'notifications'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.black}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}>
                  <Entypo
                    name={'menu'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/** SEARCH CONTAINER */}
            <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
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
              <Text
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.SF_PRO_REGULAR,
                }}>
                Search for location
              </Text>
            </TouchableOpacity>

            {/** WALLET CONTAINER */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Wallet wallet={user.walletOne} />
              <Wallet wallet={user.walletTwo} />
            </ScrollView>

            {/** PROMOTION CONTAINER */}
            <View
              style={{
                height: heightPercentageToDP(25),
                backgroundColor: COLORS.grayHalfBg,
                marginTop: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: heightPercentageToDP(2),
              }}>
              <GradientText
                style={{
                  fontSize: heightPercentageToDP(4),
                  fontFamily: FONT.Montserrat_Bold,
                }}>
                Promotions
              </GradientText>
            </View>

            {/** BIG RESULT  */}

            <View
              style={{
                height: heightPercentageToDP(25),
                backgroundColor: COLORS.grayHalfBg,
                marginTop: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
              }}>
              <View
                style={{
                  height: heightPercentageToDP(15),
                  borderRadius: heightPercentageToDP(1),
                  flexDirection: 'row',
                }}>
                {/** Top view left container */}
                <View
                  style={{
                    flex: 5,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FONT.Montserrat_Regular,
                      fontSize: heightPercentageToDP(3),
                      marginTop: heightPercentageToDP(2),
                    }}>
                    Sikkim
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.SF_PRO_REGULAR,
                      fontSize: heightPercentageToDP(11),
                      color: COLORS.black,
                      marginTop: heightPercentageToDP(-2),
                    }}>
                    89
                  </Text>
                </View>

                {/** Top view right container */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.gray2,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      transform: [{rotate: '90deg'}],
                      color: COLORS.black,
                      fontFamily: FONT.Montserrat_SemiBold,
                      fontSize: heightPercentageToDP(1.5),
                    }}>
                    07:00 PM
                  </Text>
                </View>
              </View>

              {/** Big Result bottom container */}

              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.white_s,
                  margin: heightPercentageToDP(1),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: heightPercentageToDP(1),
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.grayHalfBg,
                    padding: heightPercentageToDP(1),
                    borderRadius: heightPercentageToDP(1),
                    marginStart: heightPercentageToDP(-3),
                  }}>
                  <Ionicons
                    name={'calendar'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                </View>

                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: heightPercentageToDP(2),
                  }}>
                  12-02-2024
                </Text>
              </View>
            </View>

            {/** BOTTOM RESULT CONTAINER */}

            <View
              style={{
                height: heightPercentageToDP(5),

                marginVertical: heightPercentageToDP(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <GradientText
                style={{
                  fontSize: heightPercentageToDP(4),
                  fontFamily: FONT.Montserrat_Bold,
                }}>
                Results
              </GradientText>

              <Text
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(2),
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                See all
              </Text>
            </View>

            {/** BOTTOM RESULT CONTENT CONTAINER */}

            <View
              style={{
                height: heightPercentageToDP(25),

                borderRadius: heightPercentageToDP(1),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: heightPercentageToDP(2),
              }}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}>
                {data.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Result')}
                    key={index}
                    style={{
                      height: heightPercentageToDP(20),
                      width: widthPercentageToDP(30),
                      borderRadius: heightPercentageToDP(1),
                      backgroundColor: 'gray',
                      ...styles.resultContentContainer,
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor:
                          index % 2 === 0
                            ? COLORS.grayHalfBg
                            : COLORS.lightDarkGray,
                        borderTopRightRadius: heightPercentageToDP(1),
                        borderTopLeftRadius: heightPercentageToDP(1),
                        paddingTop: heightPercentageToDP(1),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          fontSize: heightPercentageToDP(2),
                          textAlign: 'center',
                        }}>
                        {item.location}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: 'transparent',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          fontSize: heightPercentageToDP(5),
                          textAlign: 'center',
                        }}>
                        {item.result}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        backgroundColor: COLORS.white_s,
                        borderBottomRightRadius: heightPercentageToDP(1),
                        borderBottomLeftRadius: heightPercentageToDP(1),
                        justifyContent: 'flex-end',
                        margin: heightPercentageToDP(0.5),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_Regular,
                          fontSize: heightPercentageToDP(2),
                          textAlign: 'center',
                          padding: heightPercentageToDP(0.5),
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  resultContentContainer: {
    // Add shadow properties
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
    // Add border radius and margin properties
    borderRadius: 8,
    margin: 10,
    // Add background color and any other styles you need
    backgroundColor: '#fff',
  },
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

{
  /* <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              transform: [{rotate: '90deg'}],
              color: COLORS.black,
              fontFamily: FONT.SF_PRO_MEDIUM,
              fontSize: heightPercentageToDP(2),
            }}>
            Balance
          </Text>
          <Text
            style={{
              transform: [{rotate: '90deg'}],
              color: COLORS.black,
              fontFamily: FONT.SF_PRO_MEDIUM,
              fontSize: heightPercentageToDP(2),
              marginStart: -20,
            }}>
            Total
          </Text>
        </View> */
}
