import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
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
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/background/Background';
import {COLORS, FONT} from '../../../assets/constants';
import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
import GradientText from '../../components/helpercComponent/GradientText';
import Loading from '../../components/helpercComponent/Loading';
import AllPartnerComp from '../../components/allpartner/AllPartnerComp';
import {useGetAllPartnerQuery} from '../../helper/Networkcall';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

const AllPartner = () => {
  const navigation = useNavigation();
  const {accesstoken} = useSelector(state => state.user);

  // Pagination States
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch data using Redux Query
  const {data, isFetching} = useGetAllPartnerQuery({accesstoken, page, limit});

  useEffect(() => {
    if (data?.partners) {
      setPartners(prev =>
        page === 1 ? data.partners : [...prev, ...data.partners],
      ); // Reset on first page
      setHasMore(data.partners.length === limit);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [data, page]);

  // Handle Load More
  const loadMore = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  // Search Function
  const handleSearch = text => {
    const filtered = partners.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setPartners(filtered);
  };

  return (
    <MainBackgroundWithoutScrollview title={'All Partner'}>
      <View
        style={{
          height: heightPercentageToDP(7),
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
          placeholder="Search for User"
          placeholderTextColor={COLORS.black}
          label="Search"
          onChangeText={handleSearch}
        />
      </View>

      {/** Content Container */}

      <View
        style={{
          flex: 1,
          padding: heightPercentageToDP(1),
        }}>
        <FlatList
          data={partners}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <AllPartnerComp
              key={item.userId}
              navigate={'PartnerSubPartner'}
              name={item.name}
              userid={item.userId}
              noofumser={item.userList.length}
              profitpercentage={item.profitPercentage}
              walletbalance={item.walletTwo?.balance}
              rechargepercentage={item.rechargePercentage}
              item={item}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5} // Trigger when user scrolls near the end
          ListFooterComponent={() =>
            loading ? (
              <ActivityIndicator size="large" color={COLORS.white_s} />
            ) : null
          }
        />
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default AllPartner;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
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
  paymentOption: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentageToDP(15),
    borderRadius: heightPercentageToDP(2),
    alignItems: 'center',
    gap: heightPercentageToDP(3),
    paddingStart: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
  },
  iconContainer: {
    backgroundColor: COLORS.white_s,
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(1),
  },
  icon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: heightPercentageToDP(1.5),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  topContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    height: 1,
    backgroundColor: COLORS.white_s,
  },
  titleRegular: {
    fontSize: heightPercentageToDP(1.5),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  titleBold: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Bold,
  },
  titleSemiBold: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.white_s,
    fontFamily: FONT.Montserrat_Bold,
  },
  acceptBtn: {
    backgroundColor: COLORS.green,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentageToDP(0.5),
    borderRadius: heightPercentageToDP(2),
  },
});
