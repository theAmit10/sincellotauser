import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT} from '../../assets/constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [searchData, setSearchData] = useState('');

  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: COLORS.white_s,
        padding: heightPercentageToDP(2),
      }}>
      {/** TOP HEADER CONTAINER */}
      <View
        style={{
          height: heightPercentageToDP(10),
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 3,
            backgroundColor: COLORS.grayBg,
            flexDirection: 'row',
            alignItems: 'center',
            gap: heightPercentageToDP(1),
          }}>
          {/** Profile Image Container */}
          <View
            style={{
              borderRadius: 100,
              overflow: 'hidden',
              width: 70,
              height: 70,
            }}>
            <Image
              // source={{ uri: 'https://imgs.search.brave.com/bNjuaYsTPw2b4yerAkKyk82fwZ9sNFwkwb3JMnX7qBg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDU5OTYxMjQtMDUw/MWViYWU4NGQwP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4TWpCOGZHWmhZ/MlY4Wlc1OE1IeDhN/SHg4ZkRBPQ.jpeg' }}
              source={require('../../assets/image/profileplaceholder.jpg')}
              resizeMode="cover"
              style={{
                height: 70,
                width: 70,
              }}
            />
          </View>

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
              Wasu
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

          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Entypo
              name={'menu'}
              size={heightPercentageToDP(3)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/** SEARCH CONTAINER */}
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
          }}
          placeholder="Search for location"
          label="Search"
          value={searchData}
          onChangeText={text => setSearchData(text)}
        />
      </View>

      {/** WALLET CONTAINER */}
      <View
        style={{
          height: heightPercentageToDP(15),
          backgroundColor: COLORS.grayHalfBg,
          marginTop: heightPercentageToDP(2),
          borderRadius: heightPercentageToDP(1),
          flexDirection: 'row',
        }}>
        <View
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
        </View>
      </View>

      {/** PROMOTION CONTAINER */}

      {/** BIG RESULT  */}

      {/** BOTTOM RESULT CONTAINER */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
