import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useGetAllPartnerQuery,
  useGetAllSubPartnerQuery,
  useSearchPartnerQuery,
  useSearchSubPartnerQuery,
} from '../../helper/Networkcall';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, FONT} from '../../../assets/constants';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import AllPartnerComp from '../../components/allpartner/AllPartnerComp';

const AllSubPartner = () => {
  const {accesstoken} = useSelector(state => state.user);

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
  } = useGetAllSubPartnerQuery(
    {accesstoken, page, limit},
    {skip: debouncedSearch.length > 0}, // Skip pagination if searching
  );

  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} =
    useSearchSubPartnerQuery(
      debouncedSearch.length > 0
        ? {accesstoken, searchTerm: debouncedSearch}
        : {skip: true},
    );

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data
      setPage(1); // ✅ Reset Page
      setHasMore(true); // ✅ Reset Load More
      refetchPaginated?.(); // ✅ Ensure Fresh Data
    }, [refetchPaginated]),
  );

  useEffect(() => {
    setLoading(true);

    if (debouncedSearch.length > 0 && searchData?.subpartners) {
      // For search results, replace the existing data
      setPartners(searchData.subpartners);
      setHasMore(false); // Disable pagination when searching
    } else if (paginatedData?.subpartners) {
      // For paginated data, filter out duplicates before appending
      setPartners(prev => {
        const newData = paginatedData.subpartners.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.subpartners : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.subpartners.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [searchData, paginatedData, debouncedSearch, page]);

  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length === 0) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;

  return (
    <MainBackgroundWithoutScrollview title="All Sub Partner">
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
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={partners}
              keyExtractor={item => item._id.toString()} // Ensure _id is unique
              renderItem={({item}) => (
                <AllPartnerComp
                  key={item.userId}
                  navigate={'PartnerDetails'}
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
              onEndReachedThreshold={0.2}
              ListFooterComponent={() =>
                hasMore && isLoading ? (
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

export default AllSubPartner;
