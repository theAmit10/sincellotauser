import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useGetAllPartnerQuery,
  useGetAllProfitDeductionQuery,
  useSearchPartnerQuery,
  useUpdatePartnerProfitDeductionMutation,
} from '../../helper/Networkcall';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, FONT} from '../../../assets/constants';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import AllPartnerComp from '../../components/allpartner/AllPartnerComp';
import ProfitDeducationComp from '../../components/profitdeduction/ProfitDeducationComp';
import Toast from 'react-native-toast-message';

const ProfitDeduction = () => {
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
  } = useGetAllProfitDeductionQuery(
    {accesstoken, page, limit},
    {skip: debouncedSearch.length > 0}, // Skip pagination if searching
  );

  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} = useSearchPartnerQuery(
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

    if (debouncedSearch.length > 0 && searchData?.profitDeductions) {
      // For search results, replace the existing data
      setPartners(searchData.profitDeductions);
      setHasMore(false); // Disable pagination when searching
    } else if (paginatedData?.profitDeductions) {
      // For paginated data, filter out duplicates before appending
      setPartners(prev => {
        const newData = paginatedData.profitDeductions.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1
          ? paginatedData.profitDeductions
          : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.profitDeductions.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [searchData, paginatedData, debouncedSearch, page]);

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Increment the page number when:
   * - not loading
   * - has more data
   * - no search query
   */
  /******  034c53da-d1cf-4204-814c-875277f9a8b5  *******/
  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length === 0) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;

  // [FOR UPDATING PROFIT DEDUCTION]

  const [expandedItems, setExpandedItems] = useState({});
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  // FOR UPDATING PAYMENT STATUS
  const [
    updatePartnerProfitDeduction,
    {isLoading: updateStatusIsLoading, error: updateStatusError},
  ] = useUpdatePartnerProfitDeductionMutation();

  // FOR ACCEPTING

  const handleComplete = item => {
    setSelectedItem(item);
    setSelectedItemId(item._id);
    // toggleItem(item._id);
    acceptingProfitDeduction(item);
  };

  const handleCancelled = item => {
    setSelectedItem(item);
    setSelectedItemId(item._id);
    // toggleItem(item._id);
    rejectedProfitDeduction(item);
  };

  const acceptingProfitDeduction = async item => {
    try {
      const body = {
        id: item._id,
        status: 'Completed',
        profitPercentage: item.profitPercentage,
      };

      const res = await updatePartnerProfitDeduction({accesstoken, body});
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      refetchPaginated?.();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  // FOR CANCELLING
  const rejectedProfitDeduction = async item => {
    try {
      const body = {
        id: item._id,
        status: 'Cancelled',
        profitPercentage: item.profitPercentage,
      };

      const res = await updatePartnerProfitDeduction({accesstoken, body});
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      refetchPaginated?.();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgroundWithoutScrollview title="Profit Deduction">
      <View style={{flex: 1}}>
        {/* SEARCH INPUT */}
        {/* <View
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
        </View> */}

        {/* PARTNER USER LIST */}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={partners}
              keyExtractor={item => item._id.toString()} // Ensure _id is unique
              renderItem={({item}) => (
                <ProfitDeducationComp
                  key={item.userId}
                  item={item}
                  expandedItems={expandedItems}
                  setExpandedItems={setExpandedItems}
                  toggleItem={toggleItem}
                  updateStatusIsLoading={updateStatusIsLoading}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  handleCancelled={handleCancelled}
                  handleComplete={handleComplete}
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

export default ProfitDeduction;

// import {StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import MainBackgound from '../../components/background/MainBackgound';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import {COLORS, FONT} from '../../../assets/constants';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import {TextInput} from 'react-native-paper';
// import ProfitDeducationComp from '../../components/profitdeduction/ProfitDeducationComp';

// const ProfitDeduction = () => {
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = text => {
//     const filtered = allusers.filter(
//       item =>
//         item.name.toLowerCase().includes(text.toLowerCase()) ||
//         item.userId?.toString() === text,
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <MainBackgound title={'Profit Deduction'}>
//       {/** SEARCH */}
//       <View
//         style={{
//           height: heightPercentageToDP(7),
//           flexDirection: 'row',
//           backgroundColor: COLORS.white_s,
//           alignItems: 'center',
//           paddingHorizontal: heightPercentageToDP(2),
//           borderRadius: heightPercentageToDP(1),
//           marginTop: heightPercentageToDP(2),
//         }}>
//         <Fontisto
//           name={'search'}
//           size={heightPercentageToDP(3)}
//           color={COLORS.darkGray}
//         />
//         <TextInput
//           style={{
//             marginStart: heightPercentageToDP(1),
//             flex: 1,
//             fontFamily: FONT.Montserrat_SemiBold,
//             fontSize: heightPercentageToDP(2),
//             color: COLORS.black,
//             backgroundColor: COLORS.white_s
//           }}
//           placeholder="Search for User"
//           placeholderTextColor={COLORS.black}
//           onChangeText={handleSearch}
//         />
//       </View>

//       <ProfitDeducationComp/>

//     </MainBackgound>
//   );
// };

// export default ProfitDeduction;

// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//     color: COLORS.white_s,
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     height: heightPercentageToDP(20),
//   },
//   item: {
//     padding: heightPercentageToDP(2),
//     marginVertical: heightPercentageToDP(1),
//     marginHorizontal: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(1),
//   },
//   title: {
//     color: COLORS.white_s,
//     fontFamily: FONT.SF_PRO_MEDIUM,
//   },
// });
