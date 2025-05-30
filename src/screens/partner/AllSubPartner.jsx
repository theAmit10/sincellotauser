import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useGetAllSubPartnerQuery,
  useGiveRechargeModuleMutation,
  useSearchSubPartnerQuery,
  useUpdateSubPartnerStatusMutation,
} from '../../helper/Networkcall';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, FONT} from '../../../assets/constants';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import AllPartnerComp from '../../components/allpartner/AllPartnerComp';
import AllSubPartnerComp from '../../components/allpartner/AllSubPartnerComp';
import SortingOptions from '../../components/helpercComponent/SortingOptions';
import SortingPartner from '../../components/helpercComponent/SortingPartner';
import Toast from 'react-native-toast-message';

const AllSubPartner = () => {
  const {accesstoken} = useSelector(state => state.user);

  // States
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [forReload, setForReload] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);
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
    isUninitialized: isPaginatedUninitialized,
  } = useGetAllSubPartnerQuery(
    {accesstoken, page, limit, sortBy, sortOrder},
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
    }, [refetchPaginated, sortBy, sortOrder]),
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
  }, [
    searchData,
    paginatedData,
    debouncedSearch,
    page,
    sortBy,
    sortOrder,
    updateKey,
  ]);

  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length === 0) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;
  useEffect(() => {
    refetchPaginated();
  }, [updateKey]);
  const [showSorting, setShowSorting] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handlePressForMenu = () => {
    setShowSorting(!showSorting);
  };

  const toggleSwitchForProfit = async item => {
    setSelectedItem(item);
    submitHandlerForActivationProfit(item);
  };

  const toggleSwitchForRecharge = async item => {
    setSelectedItem(item);
    submitHandlerForRechargeActivation(item);
  };

  const [updateSubPartnerStatus, {isLoading: profitActivationIsLoading}] =
    useUpdateSubPartnerStatusMutation();

  const submitHandlerForActivationProfit = async item => {
    try {
      const body = {
        userId: item.userId,
        partnerStatus: item.partnerStatus === true ? false : true,
      };

      const res = await updateSubPartnerStatus({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));

      await refetchPaginated();
      setUpdateKey(prevKey => prevKey + 1);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      // if (!isPaginatedUninitialized) {
      //   await refetchPaginated();
      // }
      setForReload(!forReload);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const [giveRechargeModule, {isLoading: rechargeActivationIsLoading}] =
    useGiveRechargeModuleMutation();

  const submitHandlerForRechargeActivation = async item => {
    try {
      const body = {
        userId: item.userId,
        rechargeStatus: item.rechargeStatus === true ? false : true,
      };

      const res = await giveRechargeModule({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));

      await refetchPaginated();
      setUpdateKey(prevKey => prevKey + 1);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      setForReload(!forReload);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgroundWithoutScrollview
      title="All Sub Partner"
      showMenu={true}
      handlerPress={handlePressForMenu}>
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
        {showSorting && (
          <SortingPartner
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            onClose={() => setShowSorting(false)} // Close sorting options
          />
        )}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={partners}
              keyExtractor={item => item._id.toString()} // Ensure _id is unique
              renderItem={({item}) => (
                <AllSubPartnerComp
                  key={item.userId}
                  navigate={'PartnerDetails'}
                  name={item.name}
                  userid={item.userId}
                  noofumser={item.userList.length}
                  profitpercentage={item.profitPercentage}
                  walletbalance={item.walletTwo?.balance?.toFixed(0)}
                  rechargepercentage={item.rechargePercentage}
                  item={item}
                  toggleSwitchProfit={toggleSwitchForProfit}
                  toggleSwitchRecharge={toggleSwitchForRecharge}
                  profitloading={profitActivationIsLoading}
                  rechargeloading={rechargeActivationIsLoading}
                  selectedItem={selectedItem}
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
