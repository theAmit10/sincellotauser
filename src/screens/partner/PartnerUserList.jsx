import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useGetPartnerUserListQuery,
  useSearchPartnerUserListQuery,
} from '../../helper/Networkcall';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, FONT} from '../../../assets/constants';
import PartnerUserListComp from '../../components/PartnerUserListComp';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

const PartnerUserList = ({route}) => {
  const {accesstoken} = useSelector(state => state.user);
  const {data: item} = route.params;

  // States
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce Effect for Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: refetchPaginated,
    isFetching: fetchingPaginated,
  } = useGetPartnerUserListQuery(
    {accesstoken, userId: item.userId, page, limit},
    {skip: debouncedSearch.length > 0},
  );

  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} =
    useSearchPartnerUserListQuery(
      debouncedSearch.length > 0
        ? {accesstoken, userId: item.userId, query: debouncedSearch}
        : {skip: true},
    );

  // Update Data When Search or Pagination Changes
  useEffect(() => {
    setLoading(true);

    if (debouncedSearch.length > 0) {
      if (searchData?.userList) {
        setPartners(searchData.userList);
        setHasMore(false);
      }
    } else {
      if (paginatedData?.userList) {
        setPartners(prev =>
          page === 1
            ? paginatedData.userList
            : [...prev, ...paginatedData.userList],
        );
        setHasMore(paginatedData.userList.length === limit);
      }
    }

    setLoading(false);
  }, [searchData, debouncedSearch, paginatedData]);

  // Refetch Data on Screen Focus
  useFocusEffect(
    useCallback(() => {
      refetchPaginated();
    }, [refetchPaginated]),
  );

  // Load More Function
  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length === 0) {
      setPage(prev => prev + 1);
    }
  };

  // Clear Search and Reset Pagination
  useEffect(() => {
    if (searchQuery.length === 0) {
      setPartners([]);
      setPage(1);
      setHasMore(true);
      // refetchPaginated();
    }
  }, [searchQuery]);

  return (
    <MainBackgroundWithoutScrollview title="Partner User List">
      <View style={{flex: 1}}>
        {/* SEARCH INPUT */}
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
            name="search"
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
            onChangeText={text => {
              setLoading(true);
              setSearchQuery(text);
            }}
          />
        </View>

        {/* PARTNER USER LIST */}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          {loading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={partners}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <PartnerUserListComp
                  key={item._id}
                  navigate="PartnerSubPartner"
                  name={item.name}
                  userid={item.userId}
                  noofumser={item.userList?.length}
                  profitpercentage={item.profitPercentage}
                  walletbalance={item.walletTwo?.balance}
                  rechargepercentage={item.rechargePercentage}
                />
              )}
              onEndReached={loadMore}
              onEndReachedThreshold={0.2}
              ListFooterComponent={() =>
                hasMore || loading ? (
                  <ActivityIndicator size="large" color={COLORS.white_s} />
                ) : null
              }
            />
          )}
        </View>
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default PartnerUserList;
