import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  useActivatePartnerRechargeModuleMutation,
  useDeactivatePartnerRechargeModuleMutation,
  useGetAllPartnerQuery,
  useGiveRechargeModuleMutation,
  useSearchPartnerQuery,
  useUpdateSubPartnerStatusMutation,
} from '../../helper/Networkcall';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, FONT} from '../../../assets/constants';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import AllPartnerComp from '../../components/allpartner/AllPartnerComp';
import SortingPartner from '../../components/helpercComponent/SortingPartner';
import AllPartnerOrgComp from '../../components/allpartner/AllPartnerOrgComp';
import Toast from 'react-native-toast-message';

const AllPartner = () => {
  const {accesstoken, user} = useSelector(state => state.user);

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
  } = useGetAllPartnerQuery(
    {accesstoken, page, limit, sortBy, sortOrder},
    {
      skip: debouncedSearch.length > 0,
      refetchOnMountOrArgChange: true,
      forceRefetch: true,
    }, // Skip pagination if searching
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
      try {
        setPage(1); // ✅ Reset Page
        setHasMore(true); // ✅ Reset Load More
        refetchPaginated?.(); // ✅ Ensure Fresh Data
      } catch (e) {
        console.log(e);
      }
    }, [refetchPaginated, sortBy, sortOrder]),
  );

  useEffect(() => {
    setLoading(true);

    if (debouncedSearch.length > 0 && searchData?.partners) {
      // For search results, replace the existing data
      setPartners(searchData.partners);
      setHasMore(false); // Disable pagination when searching
    } else if (paginatedData?.partners) {
      // For paginated data, filter out duplicates before appending
      setPartners(prev => {
        const newData = paginatedData.partners.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.partners : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.partners.length < limit) {
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

      // await refetchPaginated();
      // await refetchPaginated({page});

      handleRefresh();

      setUpdateKey(prevKey => prevKey + 1);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      // resetPage();
      // if (!isPaginatedUninitialized) {
      //   await refetchPaginated();
      // }
      // setForReload(!forReload);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const resetPage = async () => {
    setPage(1); // Reset to first page
    setSearchQuery(''); // Clear any active search
    setDebouncedSearch('');
    await refetchPaginated();
  };

  const handleRefresh = async () => {
    setPage(1);
    setPartners([]);
    setHasMore(true);
    await refetchPaginated();
  };

  const [giveRechargeModule, {isLoading: rechargeActivationIsLoading}] =
    useGiveRechargeModuleMutation();

  //[FOR RECHAREGE MODULE DEACTIVATION]
  const [deactivatePartnerRechargeModule, {isLoading: deactivateIsLoading}] =
    useDeactivatePartnerRechargeModuleMutation();
  const [activatePartnerRechargeModule, {isLoading: activateIsLoading}] =
    useActivatePartnerRechargeModuleMutation();

  const submitHandlerForRechargeActivation = async item => {
    try {
      if (item.rechargeStatus === true) {
        const body = {
          userId: item.userId,
          id: item?.rechargeModule,
        };

        const res = await deactivatePartnerRechargeModule({
          accesstoken,
          body,
        });

        Toast.show({
          type: 'success',
          text1: res.data.message,
        });

        await refetchPaginated();

        return;
      }

      const body = {
        userId: item.userId,
        rechargeStatus: item.rechargeStatus === true ? false : true,
      };

      const res = await giveRechargeModule({
        accesstoken,
        body,
      });

      const bodyact = {
        userId: Number.parseInt(item.userId),
        id: item?.rechargeModule,
      };
      const resact = await activatePartnerRechargeModule({
        accesstoken,
        body: bodyact,
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

  const activateRechargeModule = async item => {
    try {
      setSelectedItem(item);

      const activationstatus = rechargeData?.rechargeModule?.activationStatus;

      if (activationstatus === true) {
        const body = {
          userId: partnerdata.userId,
          id: data?.partner?.rechargeModule,
        };
        console.log('IF');
        console.log(partnerdata.userId);
        console.log(data?.partner?.rechargeModule);
        const res = await deactivatePartnerRechargeModule({
          accesstoken,
          body,
        });

        console.log(JSON.stringify(res));
        console.log('Success IF');
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
      } else {
        console.log('else');
        console.log(partnerdata.userId);
        console.log(data?.partner?.rechargeModule);
        const body = {
          userId: Number.parseInt(partnerdata.userId),
          id: data?.partner?.rechargeModule,
        };
        const res = await activatePartnerRechargeModule({
          accesstoken,
          body,
        });

        console.log('Success');
        console.log(JSON.stringify(res));
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
      }

      await rechargeRefetch();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const navigation = useNavigation();
  const handlerSecondTitlePress = () => {
    navigation.navigate('AllSubPartner');
  };

  return (
    <MainBackgroundWithoutScrollview
      title="All Partner"
      showMenu={true}
      showSecondTitle={true}
      handlerSecondTitlePress={handlerSecondTitlePress}
      secontTitle={
        user && user.role === 'admin'
          ? 'Sub Partner'
          : user &&
            user.role === 'subadmin' &&
            user.subadminfeature.allsubpartner
          ? 'Sub Partner'
          : null
      }
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
        {/* PARTNER USER LIST */}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={partners}
              keyExtractor={item => item._id.toString()} // Ensure _id is unique
              renderItem={({item}) => (
                <AllPartnerOrgComp
                  key={item.userId}
                  navigate={'PartnerDetails'}
                  name={item.name}
                  userid={item.userId}
                  noofumser={item.userList.length}
                  profitpercentage={item.profitPercentage}
                  walletbalance={`${item.walletTwo?.balance?.toFixed(0)} ${
                    item.country ? item.country?.countrycurrencysymbol : ''
                  }`}
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

export default AllPartner;

// import React, {useEffect, useState, useCallback} from 'react';
// import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {useFocusEffect} from '@react-navigation/native';
// import {
//   useGetAllPartnerQuery,
//   useSearchPartnerQuery,
// } from '../../helper/Networkcall';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import {COLORS, FONT} from '../../../assets/constants';
// import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// import AllPartnerComp from '../../components/allpartner/AllPartnerComp';

// const AllPartner = () => {
//   const {accesstoken} = useSelector(state => state.user);

//   // States
//   const [partners, setPartners] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [refresh, setRefresh] = useState(false); // State to trigger a re-fetch

//   // Debounce Effect for Search
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Fetch Paginated Data
//   const {
//     data: paginatedData,
//     refetch: refetchPaginated,
//     isFetching: fetchingPaginated,
//   } = useGetAllPartnerQuery(
//     {accesstoken, page, limit},
//     {skip: debouncedSearch.length > 0 || refresh}, // Skip pagination if searching or refreshing
//   );

//   // Fetch Search Data
//   const {data: searchData, isFetching: fetchingSearch} = useSearchPartnerQuery(
//     debouncedSearch.length > 0
//       ? {accesstoken, searchTerm: debouncedSearch}
//       : {skip: true},
//   );

//   // Reset State on Navigation Back
//   useFocusEffect(
//     useCallback(() => {
//       setPartners([]); // ✅ Reset Data
//       setPage(1); // ✅ Reset Page
//       setHasMore(true); // ✅ Reset Load More
//       setRefresh(prev => !prev); // ✅ Force Re-fetch
//     }, []),
//   );

//   useEffect(() => {
//     setLoading(true);

//     if (debouncedSearch.length > 0 && searchData?.partners) {
//       // For search results, replace the existing data
//       setPartners(searchData.partners);
//       setHasMore(false); // Disable pagination when searching
//     } else if (paginatedData?.partners) {
//       // For paginated data, filter out duplicates before appending
//       setPartners(prev => {
//         const newData = paginatedData.partners.filter(
//           newItem => !prev.some(prevItem => prevItem._id === newItem._id),
//         );
//         return page === 1 ? paginatedData.partners : [...prev, ...newData];
//       });

//       // Update `hasMore` based on the length of the new data
//       if (paginatedData.partners.length < limit) {
//         setHasMore(false); // No more data to fetch
//       } else {
//         setHasMore(true); // More data available
//       }
//     }

//     setLoading(false);
//   }, [searchData, paginatedData, debouncedSearch, page]);

//   const loadMore = () => {
//     if (!loading && hasMore && debouncedSearch.length === 0) {
//       setPage(prev => prev + 1);
//     }
//   };

//   // Pull-to-refresh function
//   const onRefresh = () => {
//     setLoading(true);
//     setPartners([]); // ✅ Clear Data
//     setPage(1); // ✅ Reset Page
//     refetchPaginated(); // ✅ Trigger API Call
//     setLoading(false);
//   };

//   // Combined Loading State
//   const isLoading = fetchingPaginated || fetchingSearch || loading;

//   return (
//     <MainBackgroundWithoutScrollview title="All Partner">
//       <View style={{flex: 1}}>
//         {/* SEARCH INPUT */}
//         <View
//           style={{
//             height: heightPercentageToDP(7),
//             flexDirection: 'row',
//             backgroundColor: COLORS.white_s,
//             alignItems: 'center',
//             paddingHorizontal: heightPercentageToDP(2),
//             borderRadius: heightPercentageToDP(1),
//             marginHorizontal: heightPercentageToDP(1),
//           }}>
//           <Fontisto
//             name="search"
//             size={heightPercentageToDP(3)}
//             color={COLORS.darkGray}
//           />
//           <TextInput
//             style={{
//               marginStart: heightPercentageToDP(1),
//               flex: 1,
//               fontFamily: FONT.Montserrat_Regular,
//               fontSize: heightPercentageToDP(2.5),
//               color: COLORS.black,
//             }}
//             placeholder="Search for User"
//             placeholderTextColor={COLORS.black}
//             onChangeText={text => {
//               setLoading(true);
//               setSearchQuery(text);
//             }}
//           />
//         </View>

//         {/* PARTNER USER LIST */}
//         <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
//           {isLoading && page === 1 ? (
//             <ActivityIndicator size="large" color={COLORS.white_s} />
//           ) : (
//             <FlatList
//               data={partners}
//               keyExtractor={item => item._id.toString()} // Ensure _id is unique
//               renderItem={({item}) => (
//                 <AllPartnerComp
//                   key={item.userId}
//                   navigate={'PartnerDetails'}
//                   name={item.name}
//                   userid={item.userId}
//                   noofumser={item.userList.length}
//                   profitpercentage={item.profitPercentage}
//                   walletbalance={item.walletTwo?.balance}
//                   rechargepercentage={item.rechargePercentage}
//                   item={item}
//                 />
//               )}
//               onEndReached={loadMore}
//               onEndReachedThreshold={0.2}
//               refreshing={isLoading}
//               onRefresh={onRefresh} // ✅ Pull-to-Refresh
//               ListFooterComponent={() =>
//                 hasMore && isLoading ? (
//                   <ActivityIndicator size="large" color={COLORS.white_s} />
//                 ) : null
//               }
//             />
//           )}
//         </View>
//       </View>
//     </MainBackgroundWithoutScrollview>
//   );
// };

// export default AllPartner;
