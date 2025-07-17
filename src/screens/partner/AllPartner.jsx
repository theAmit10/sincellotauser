import React, {useEffect, useState, useCallback, useRef} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
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
import SortingPartner from '../../components/helpercComponent/SortingPartner';
import AllPartnerOrgComp from '../../components/allpartner/AllPartnerOrgComp';
import Toast from 'react-native-toast-message';

const AllPartner = () => {
  const {accesstoken, user} = useSelector(state => state.user);
  const flatListRef = useRef(null);

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSorting, setShowSorting] = useState(false);

  const isFoucsed = useIsFocused();

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
    },
  );

  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} = useSearchPartnerQuery(
    debouncedSearch.length > 0
      ? {accesstoken, searchTerm: debouncedSearch}
      : {skip: true},
  );

  // Mutation hooks
  const [updateSubPartnerStatus, {isLoading: profitActivationIsLoading}] =
    useUpdateSubPartnerStatusMutation();
  const [giveRechargeModule, {isLoading: rechargeActivationIsLoading}] =
    useGiveRechargeModuleMutation();
  const [deactivatePartnerRechargeModule, {isLoading: deactivateIsLoading}] =
    useDeactivatePartnerRechargeModuleMutation();
  const [activatePartnerRechargeModule, {isLoading: activateIsLoading}] =
    useActivatePartnerRechargeModuleMutation();

  // Reset State on Navigation Back
  // useFocusEffect(
  //   useCallback(() => {
  //     handleCompleteRefresh();
  //   }, [sortBy, sortOrder]),
  // );

  // Handle data updates from API responses
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
      setHasMore(paginatedData.partners.length >= limit);
    }

    setLoading(false);
  }, [searchData, paginatedData, debouncedSearch, page, sortBy, sortOrder]);

  // Complete refresh function - resets everything and fetches fresh data
  const handleCompleteRefresh = useCallback(async () => {
    try {
      setPage(1);
      setPartners([]);
      setHasMore(true);
      setSearchQuery('');
      setDebouncedSearch('');
      await refetchPaginated();
    } catch (error) {
      console.error('Error during complete refresh:', error);
    }
  }, [refetchPaginated]);

  // Update specific partner in the list without losing scroll position
  const updatePartnerInList = useCallback(updatedPartner => {
    setPartners(prevPartners =>
      prevPartners.map(partner =>
        partner._id === updatedPartner._id ? updatedPartner : partner,
      ),
    );
  }, []);

  // Background refresh for getting latest data without disrupting UI
  const backgroundRefresh = useCallback(async () => {
    try {
      if (debouncedSearch.length > 0) {
        return;
      }

      // Silently refetch current page data
      const response = await refetchPaginated();

      if (response.data?.partners) {
        // Update existing partners with fresh data while maintaining scroll position
        setPartners(prevPartners => {
          const updatedPartners = [...prevPartners];

          // Update each partner with fresh data from the first page
          response.data.partners.forEach(freshPartner => {
            const index = updatedPartners.findIndex(
              p => p._id === freshPartner._id,
            );
            if (index !== -1) {
              updatedPartners[index] = freshPartner;
            }
          });

          return updatedPartners;
        });
      }
    } catch (error) {
      console.error('Error during background refresh:', error);
    }
  }, [debouncedSearch, refetchPaginated]);

  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length === 0) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;

  // Profit toggle handler - Update UI immediately, then sync with server
  const toggleSwitchForProfit = async item => {
    setSelectedItem(item);

    // Optimistically update UI first
    const optimisticUpdate = {
      ...item,
      partnerStatus: !item.partnerStatus,
    };
    updatePartnerInList(optimisticUpdate);

    try {
      const body = {
        userId: item.userId,
        partnerStatus: !item.partnerStatus,
      };

      const res = await updateSubPartnerStatus({
        accesstoken,
        body,
      });

      if (res.data) {
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });

        // Optional: Do a background refresh to sync any other changes
        setTimeout(() => {
          backgroundRefresh();
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating partner status:', error);

      // Revert optimistic update on error
      updatePartnerInList(item);

      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setSelectedItem(null);
    }
  };

  // Recharge toggle handler - Update UI immediately, then sync with server
  const toggleSwitchForRecharge = async item => {
    setSelectedItem(item);

    // Optimistically update UI first
    const optimisticUpdate = {
      ...item,
      rechargeStatus: !item.rechargeStatus,
    };
    updatePartnerInList(optimisticUpdate);

    try {
      let res;

      if (item.rechargeStatus === true) {
        // Deactivate recharge module
        const body = {
          userId: item.userId,
          id: item?.rechargeModule,
        };

        res = await deactivatePartnerRechargeModule({
          accesstoken,
          body,
        });
      } else {
        // Activate recharge module
        const body = {
          userId: item.userId,
          rechargeStatus: true,
        };

        res = await giveRechargeModule({
          accesstoken,
          body,
        });

        // Also activate the module
        const bodyact = {
          userId: Number.parseInt(item.userId),
          id: res.data?.partner?.rechargeModule || item?.rechargeModule,
        };

        await activatePartnerRechargeModule({
          accesstoken,
          body: bodyact,
        });
      }

      if (res.data) {
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });

        // Optional: Do a background refresh to sync any other changes
        setTimeout(() => {
          backgroundRefresh();
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating recharge status:', error);

      // Revert optimistic update on error
      updatePartnerInList(item);

      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setSelectedItem(null);
    }
  };

  const handlePressForMenu = () => {
    setShowSorting(!showSorting);
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
            value={searchQuery}
            onChangeText={text => {
              setLoading(true);
              setSearchQuery(text);
            }}
          />
        </View>

        {/* SORTING OPTIONS */}
        {showSorting && (
          <SortingPartner
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            onClose={() => setShowSorting(false)}
          />
        )}

        {/* PARTNER USER LIST */}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              ref={flatListRef}
              data={partners}
              keyExtractor={item => item._id.toString()}
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
                  rechargeloading={
                    rechargeActivationIsLoading ||
                    activateIsLoading ||
                    deactivateIsLoading
                  }
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
              // These props help maintain scroll position
              removeClippedSubviews={false}
              // Improve performance
              windowSize={10}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              initialNumToRender={10}
            />
          )}
        </View>
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default AllPartner;

// import React, {useEffect, useState, useCallback, useRef} from 'react';
// import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {
//   useActivatePartnerRechargeModuleMutation,
//   useDeactivatePartnerRechargeModuleMutation,
//   useGetAllPartnerQuery,
//   useGiveRechargeModuleMutation,
//   useSearchPartnerQuery,
//   useUpdateSubPartnerStatusMutation,
// } from '../../helper/Networkcall';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import {COLORS, FONT} from '../../../assets/constants';
// import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// import AllPartnerComp from '../../components/allpartner/AllPartnerComp';
// import SortingPartner from '../../components/helpercComponent/SortingPartner';
// import AllPartnerOrgComp from '../../components/allpartner/AllPartnerOrgComp';
// import Toast from 'react-native-toast-message';

// const AllPartner = () => {
//   const {accesstoken, user} = useSelector(state => state.user);
//   const flatListRef = useRef(null);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   // States
//   const [partners, setPartners] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 20;
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [sortOrder, setSortOrder] = useState('');
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showSorting, setShowSorting] = useState(false);

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
//     isUninitialized: isPaginatedUninitialized,
//   } = useGetAllPartnerQuery(
//     {accesstoken, page, limit, sortBy, sortOrder},
//     {
//       skip: debouncedSearch.length > 0,
//       refetchOnMountOrArgChange: true,
//       forceRefetch: true,
//     },
//   );

//   // Fetch Search Data
//   const {data: searchData, isFetching: fetchingSearch} = useSearchPartnerQuery(
//     debouncedSearch.length > 0
//       ? {accesstoken, searchTerm: debouncedSearch}
//       : {skip: true},
//   );

//   // Mutation hooks
//   const [updateSubPartnerStatus, {isLoading: profitActivationIsLoading}] =
//     useUpdateSubPartnerStatusMutation();
//   const [giveRechargeModule, {isLoading: rechargeActivationIsLoading}] =
//     useGiveRechargeModuleMutation();
//   const [deactivatePartnerRechargeModule, {isLoading: deactivateIsLoading}] =
//     useDeactivatePartnerRechargeModuleMutation();
//   const [activatePartnerRechargeModule, {isLoading: activateIsLoading}] =
//     useActivatePartnerRechargeModuleMutation();

//   // Reset State on Navigation Back
//   useFocusEffect(
//     useCallback(() => {
//       handleCompleteRefresh();
//     }, [sortBy, sortOrder]),
//   );

//   // Handle data updates from API responses
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
//       setHasMore(paginatedData.partners.length >= limit);
//     }

//     setLoading(false);
//   }, [searchData, paginatedData, debouncedSearch, page, sortBy, sortOrder]);

//   // Complete refresh function - resets everything and fetches fresh data
//   const handleCompleteRefresh = useCallback(async () => {
//     try {
//       setPage(1);
//       setPartners([]);
//       setHasMore(true);
//       setSearchQuery('');
//       setDebouncedSearch('');
//       await refetchPaginated();
//     } catch (error) {
//       console.error('Error during complete refresh:', error);
//     }
//   }, [refetchPaginated]);

//   // Smart refresh after mutations - preserves current state but gets fresh data
//   const handleSmartRefresh = useCallback(async () => {
//     try {
//       if (debouncedSearch.length > 0) {
//         // If we're in search mode, just refetch search results
//         // Search data will auto-refresh due to RTK Query
//         return;
//       }

//       // For paginated data, we need to refresh all pages up to current page
//       const currentPage = page;
//       setPage(1);
//       setPartners([]);

//       // Refetch from page 1 to current page
//       await refetchPaginated();

//       // If we were beyond page 1, we need to reload additional pages
//       if (currentPage > 1) {
//         for (let i = 2; i <= currentPage; i++) {
//           setTimeout(() => {
//             setPage(i);
//           }, 100 * (i - 1)); // Small delay to prevent rapid API calls
//         }
//       }
//     } catch (error) {
//       console.error('Error during smart refresh:', error);
//     }
//   }, [debouncedSearch, page, refetchPaginated]);

//   const loadMore = () => {
//     if (!loading && hasMore && debouncedSearch.length === 0) {
//       setPage(prev => prev + 1);
//     }
//   };

//   // Combined Loading State
//   const isLoading = fetchingPaginated || fetchingSearch || loading;

//   // Profit toggle handler
//   const toggleSwitchForProfit = async item => {
//     setSelectedItem(item);
//     await submitHandlerForActivationProfit(item);
//   };

//   // Recharge toggle handler
//   const toggleSwitchForRecharge = async item => {
//     setSelectedItem(item);
//     await submitHandlerForRechargeActivation(item);
//   };

//   // Profit activation/deactivation
//   const submitHandlerForActivationProfit = async item => {
//     try {
//       const body = {
//         userId: item.userId,
//         partnerStatus: !item.partnerStatus,
//       };

//       const res = await updateSubPartnerStatus({
//         accesstoken,
//         body,
//       });

//       if (res.data) {
//         Toast.show({
//           type: 'success',
//           text1: res.data.message,
//         });

//         // Refresh data after successful update
//         await handleSmartRefresh();
//       }
//     } catch (error) {
//       console.error('Error updating partner status:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Something went wrong',
//       });
//     } finally {
//       setSelectedItem(null);
//     }
//   };

//   // Recharge activation/deactivation
//   const submitHandlerForRechargeActivation = async item => {
//     try {
//       let res;

//       if (item.rechargeStatus === true) {
//         // Deactivate recharge module
//         const body = {
//           userId: item.userId,
//           id: item?.rechargeModule,
//         };

//         res = await deactivatePartnerRechargeModule({
//           accesstoken,
//           body,
//         });
//       } else {
//         // Activate recharge module
//         const body = {
//           userId: item.userId,
//           rechargeStatus: true,
//         };

//         res = await giveRechargeModule({
//           accesstoken,
//           body,
//         });

//         // Also activate the module
//         const bodyact = {
//           userId: Number.parseInt(item.userId),
//           id: item?.rechargeModule,
//         };

//         await activatePartnerRechargeModule({
//           accesstoken,
//           body: bodyact,
//         });
//       }

//       if (res.data) {
//         Toast.show({
//           type: 'success',
//           text1: res.data.message,
//         });

//         // Refresh data after successful update
//         await handleSmartRefresh();
//       }
//     } catch (error) {
//       console.error('Error updating recharge status:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Something went wrong',
//       });
//     } finally {
//       setSelectedItem(null);
//     }
//   };

//   const handlePressForMenu = () => {
//     setShowSorting(!showSorting);
//   };

//   const navigation = useNavigation();
//   const handlerSecondTitlePress = () => {
//     navigation.navigate('AllSubPartner');
//   };

//   return (
//     <MainBackgroundWithoutScrollview
//       title="All Partner"
//       showMenu={true}
//       showSecondTitle={true}
//       handlerSecondTitlePress={handlerSecondTitlePress}
//       secontTitle={
//         user && user.role === 'admin'
//           ? 'Sub Partner'
//           : user &&
//             user.role === 'subadmin' &&
//             user.subadminfeature.allsubpartner
//           ? 'Sub Partner'
//           : null
//       }
//       handlerPress={handlePressForMenu}>
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
//             value={searchQuery}
//             onChangeText={text => {
//               setLoading(true);
//               setSearchQuery(text);
//             }}
//           />
//         </View>

//         {/* SORTING OPTIONS */}
//         {showSorting && (
//           <SortingPartner
//             setSortBy={setSortBy}
//             setSortOrder={setSortOrder}
//             onClose={() => setShowSorting(false)}
//           />
//         )}

//         {/* PARTNER USER LIST */}
//         <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
//           {isLoading && page === 1 ? (
//             <ActivityIndicator size="large" color={COLORS.white_s} />
//           ) : (
//             <FlatList
//               data={partners}
//               keyExtractor={item => item._id.toString()}
//               renderItem={({item}) => (
//                 <AllPartnerOrgComp
//                   key={item.userId}
//                   navigate={'PartnerDetails'}
//                   name={item.name}
//                   userid={item.userId}
//                   noofumser={item.userList.length}
//                   profitpercentage={item.profitPercentage}
//                   walletbalance={`${item.walletTwo?.balance?.toFixed(0)} ${
//                     item.country ? item.country?.countrycurrencysymbol : ''
//                   }`}
//                   rechargepercentage={item.rechargePercentage}
//                   item={item}
//                   toggleSwitchProfit={toggleSwitchForProfit}
//                   toggleSwitchRecharge={toggleSwitchForRecharge}
//                   profitloading={profitActivationIsLoading}
//                   rechargeloading={
//                     rechargeActivationIsLoading ||
//                     activateIsLoading ||
//                     deactivateIsLoading
//                   }
//                   selectedItem={selectedItem}
//                 />
//               )}
//               onEndReached={loadMore}
//               onEndReachedThreshold={0.2}
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

// // import React, {useEffect, useState, useCallback} from 'react';
// // import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
// // import {useSelector} from 'react-redux';
// // import {useFocusEffect, useNavigation} from '@react-navigation/native';
// // import {
// //   useActivatePartnerRechargeModuleMutation,
// //   useDeactivatePartnerRechargeModuleMutation,
// //   useGetAllPartnerQuery,
// //   useGiveRechargeModuleMutation,
// //   useSearchPartnerQuery,
// //   useUpdateSubPartnerStatusMutation,
// // } from '../../helper/Networkcall';
// // import {heightPercentageToDP} from 'react-native-responsive-screen';
// // import Fontisto from 'react-native-vector-icons/Fontisto';
// // import {COLORS, FONT} from '../../../assets/constants';
// // import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
// // import AllPartnerComp from '../../components/allpartner/AllPartnerComp';
// // import SortingPartner from '../../components/helpercComponent/SortingPartner';
// // import AllPartnerOrgComp from '../../components/allpartner/AllPartnerOrgComp';
// // import Toast from 'react-native-toast-message';

// // const AllPartner = () => {
// //   const {accesstoken, user} = useSelector(state => state.user);

// //   // States
// //   const [partners, setPartners] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const limit = 20;
// //   const [hasMore, setHasMore] = useState(true);
// //   const [loading, setLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [debouncedSearch, setDebouncedSearch] = useState('');
// //   const [sortBy, setSortBy] = useState('');
// //   const [sortOrder, setSortOrder] = useState('');
// //   const [forReload, setForReload] = useState(false);
// //   const [updateKey, setUpdateKey] = useState(0);

// //   // Debounce Effect for Search
// //   useEffect(() => {
// //     const handler = setTimeout(() => {
// //       setDebouncedSearch(searchQuery);
// //     }, 500);
// //     return () => clearTimeout(handler);
// //   }, [searchQuery]);

// //   // Fetch Paginated Data
// //   const {
// //     data: paginatedData,
// //     refetch: refetchPaginated,
// //     isFetching: fetchingPaginated,
// //     isUninitialized: isPaginatedUninitialized,
// //   } = useGetAllPartnerQuery(
// //     {accesstoken, page, limit, sortBy, sortOrder},
// //     {
// //       skip: debouncedSearch.length > 0,
// //       refetchOnMountOrArgChange: true,
// //       forceRefetch: true,
// //     }, // Skip pagination if searching
// //   );

// //   // Fetch Search Data
// //   const {data: searchData, isFetching: fetchingSearch} = useSearchPartnerQuery(
// //     debouncedSearch.length > 0
// //       ? {accesstoken, searchTerm: debouncedSearch}
// //       : {skip: true},
// //   );

// //   // Reset State on Navigation Back
// //   useFocusEffect(
// //     useCallback(() => {
// //       // setPartners([]); // ✅ Reset Data
// //       try {
// //         setPage(1); // ✅ Reset Page
// //         setHasMore(true); // ✅ Reset Load More
// //         refetchPaginated?.(); // ✅ Ensure Fresh Data
// //       } catch (e) {
// //         console.log(e);
// //       }
// //     }, [refetchPaginated, sortBy, sortOrder]),
// //   );

// //   useEffect(() => {
// //     setLoading(true);

// //     if (debouncedSearch.length > 0 && searchData?.partners) {
// //       // For search results, replace the existing data
// //       setPartners(searchData.partners);
// //       setHasMore(false); // Disable pagination when searching
// //     } else if (paginatedData?.partners) {
// //       // For paginated data, filter out duplicates before appending
// //       setPartners(prev => {
// //         const newData = paginatedData.partners.filter(
// //           newItem => !prev.some(prevItem => prevItem._id === newItem._id),
// //         );
// //         return page === 1 ? paginatedData.partners : [...prev, ...newData];
// //       });

// //       // Update `hasMore` based on the length of the new data
// //       if (paginatedData.partners.length < limit) {
// //         setHasMore(false); // No more data to fetch
// //       } else {
// //         setHasMore(true); // More data available
// //       }
// //     }

// //     setLoading(false);
// //   }, [
// //     searchData,
// //     paginatedData,
// //     debouncedSearch,
// //     page,
// //     sortBy,
// //     sortOrder,
// //     updateKey,
// //   ]);

// //   const loadMore = () => {
// //     if (!loading && hasMore && debouncedSearch.length === 0) {
// //       setPage(prev => prev + 1);
// //     }
// //   };

// //   // Combined Loading State
// //   const isLoading = fetchingPaginated || fetchingSearch || loading;

// //   useEffect(() => {
// //     refetchPaginated();
// //   }, [updateKey]);

// //   const [showSorting, setShowSorting] = useState(false);
// //   const [selectedItem, setSelectedItem] = useState(null);
// //   const handlePressForMenu = () => {
// //     setShowSorting(!showSorting);
// //   };
// //   const toggleSwitchForProfit = async item => {
// //     setSelectedItem(item);
// //     submitHandlerForActivationProfit(item);
// //   };

// //   const toggleSwitchForRecharge = async item => {
// //     setSelectedItem(item);
// //     submitHandlerForRechargeActivation(item);
// //   };

// //   const [updateSubPartnerStatus, {isLoading: profitActivationIsLoading}] =
// //     useUpdateSubPartnerStatusMutation();

// //   const submitHandlerForActivationProfit = async item => {
// //     try {
// //       const body = {
// //         userId: item.userId,
// //         partnerStatus: item.partnerStatus === true ? false : true,
// //       };

// //       const res = await updateSubPartnerStatus({
// //         accesstoken,
// //         body,
// //       });

// //       console.log(JSON.stringify(res));

// //       // await refetchPaginated();
// //       // await refetchPaginated({page});

// //       handleRefresh();

// //       setUpdateKey(prevKey => prevKey + 1);
// //       Toast.show({
// //         type: 'success',
// //         text1: res.data.message,
// //       });
// //       // resetPage();
// //       // if (!isPaginatedUninitialized) {
// //       //   await refetchPaginated();
// //       // }
// //       // setForReload(!forReload);
// //     } catch (error) {
// //       console.log(error);
// //       Toast.show({
// //         type: 'error',
// //         text1: 'Something went wrong',
// //       });
// //     }
// //   };

// //   const resetPage = async () => {
// //     setPage(1); // Reset to first page
// //     setSearchQuery(''); // Clear any active search
// //     setDebouncedSearch('');
// //     await refetchPaginated();
// //   };

// //   const handleRefresh = async () => {
// //     setPage(1);
// //     setPartners([]);
// //     setHasMore(true);
// //     await refetchPaginated();
// //   };

// //   const [giveRechargeModule, {isLoading: rechargeActivationIsLoading}] =
// //     useGiveRechargeModuleMutation();

// //   //[FOR RECHAREGE MODULE DEACTIVATION]
// //   const [deactivatePartnerRechargeModule, {isLoading: deactivateIsLoading}] =
// //     useDeactivatePartnerRechargeModuleMutation();
// //   const [activatePartnerRechargeModule, {isLoading: activateIsLoading}] =
// //     useActivatePartnerRechargeModuleMutation();

// //   const submitHandlerForRechargeActivation = async item => {
// //     try {
// //       if (item.rechargeStatus === true) {
// //         const body = {
// //           userId: item.userId,
// //           id: item?.rechargeModule,
// //         };

// //         const res = await deactivatePartnerRechargeModule({
// //           accesstoken,
// //           body,
// //         });

// //         Toast.show({
// //           type: 'success',
// //           text1: res.data.message,
// //         });
// //         await refetchPaginated();
// //         setUpdateKey(prevKey => prevKey + 1);

// //         return;
// //       }

// //       const body = {
// //         userId: item.userId,
// //         rechargeStatus: item.rechargeStatus === true ? false : true,
// //       };

// //       const res = await giveRechargeModule({
// //         accesstoken,
// //         body,
// //       });

// //       const bodyact = {
// //         userId: Number.parseInt(item.userId),
// //         id: item?.rechargeModule,
// //       };
// //       const resact = await activatePartnerRechargeModule({
// //         accesstoken,
// //         body: bodyact,
// //       });

// //       console.log(JSON.stringify(res));
// //       await refetchPaginated();

// //       setUpdateKey(prevKey => prevKey + 1);
// //       Toast.show({
// //         type: 'success',
// //         text1: res.data.message,
// //       });

// //       setForReload(!forReload);
// //     } catch (error) {
// //       console.log(error);
// //       Toast.show({
// //         type: 'error',
// //         text1: 'Something went wrong',
// //       });
// //     }
// //   };

// //   const activateRechargeModule = async item => {
// //     try {
// //       setSelectedItem(item);

// //       const activationstatus = rechargeData?.rechargeModule?.activationStatus;

// //       if (activationstatus === true) {
// //         const body = {
// //           userId: partnerdata.userId,
// //           id: data?.partner?.rechargeModule,
// //         };
// //         console.log('IF');
// //         console.log(partnerdata.userId);
// //         console.log(data?.partner?.rechargeModule);
// //         const res = await deactivatePartnerRechargeModule({
// //           accesstoken,
// //           body,
// //         });

// //         console.log(JSON.stringify(res));
// //         console.log('Success IF');
// //         Toast.show({
// //           type: 'success',
// //           text1: res.data.message,
// //         });
// //       } else {
// //         console.log('else');
// //         console.log(partnerdata.userId);
// //         console.log(data?.partner?.rechargeModule);
// //         const body = {
// //           userId: Number.parseInt(partnerdata.userId),
// //           id: data?.partner?.rechargeModule,
// //         };
// //         const res = await activatePartnerRechargeModule({
// //           accesstoken,
// //           body,
// //         });

// //         console.log('Success');
// //         console.log(JSON.stringify(res));
// //         Toast.show({
// //           type: 'success',
// //           text1: res.data.message,
// //         });
// //       }

// //       await rechargeRefetch();
// //     } catch (e) {
// //       console.log(e);
// //       Toast.show({
// //         type: 'error',
// //         text1: 'Something went wrong',
// //       });
// //     }
// //   };

// //   const navigation = useNavigation();
// //   const handlerSecondTitlePress = () => {
// //     navigation.navigate('AllSubPartner');
// //   };

// //   return (
// //     <MainBackgroundWithoutScrollview
// //       title="All Partner"
// //       showMenu={true}
// //       showSecondTitle={true}
// //       handlerSecondTitlePress={handlerSecondTitlePress}
// //       secontTitle={
// //         user && user.role === 'admin'
// //           ? 'Sub Partner'
// //           : user &&
// //             user.role === 'subadmin' &&
// //             user.subadminfeature.allsubpartner
// //           ? 'Sub Partner'
// //           : null
// //       }
// //       handlerPress={handlePressForMenu}>
// //       <View style={{flex: 1}}>
// //         {/* SEARCH INPUT */}
// //         <View
// //           style={{
// //             height: heightPercentageToDP(7),
// //             flexDirection: 'row',
// //             backgroundColor: COLORS.white_s,
// //             alignItems: 'center',
// //             paddingHorizontal: heightPercentageToDP(2),
// //             borderRadius: heightPercentageToDP(1),
// //             marginHorizontal: heightPercentageToDP(1),
// //           }}>
// //           <Fontisto
// //             name="search"
// //             size={heightPercentageToDP(3)}
// //             color={COLORS.darkGray}
// //           />
// //           <TextInput
// //             style={{
// //               marginStart: heightPercentageToDP(1),
// //               flex: 1,
// //               fontFamily: FONT.Montserrat_Regular,
// //               fontSize: heightPercentageToDP(2.5),
// //               color: COLORS.black,
// //             }}
// //             placeholder="Search for User"
// //             placeholderTextColor={COLORS.black}
// //             onChangeText={text => {
// //               setLoading(true);
// //               setSearchQuery(text);
// //             }}
// //           />
// //         </View>

// //         {/* PARTNER USER LIST */}
// //         {showSorting && (
// //           <SortingPartner
// //             setSortBy={setSortBy}
// //             setSortOrder={setSortOrder}
// //             onClose={() => setShowSorting(false)} // Close sorting options
// //           />
// //         )}
// //         {/* PARTNER USER LIST */}
// //         <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
// //           {isLoading && page === 1 ? (
// //             <ActivityIndicator size="large" color={COLORS.white_s} />
// //           ) : (
// //             <FlatList
// //               data={partners}
// //               keyExtractor={item => item._id.toString()} // Ensure _id is unique
// //               renderItem={({item}) => (
// //                 <AllPartnerOrgComp
// //                   key={item.userId}
// //                   navigate={'PartnerDetails'}
// //                   name={item.name}
// //                   userid={item.userId}
// //                   noofumser={item.userList.length}
// //                   profitpercentage={item.profitPercentage}
// //                   walletbalance={`${item.walletTwo?.balance?.toFixed(0)} ${
// //                     item.country ? item.country?.countrycurrencysymbol : ''
// //                   }`}
// //                   rechargepercentage={item.rechargePercentage}
// //                   item={item}
// //                   toggleSwitchProfit={toggleSwitchForProfit}
// //                   toggleSwitchRecharge={toggleSwitchForRecharge}
// //                   profitloading={profitActivationIsLoading}
// //                   rechargeloading={
// //                     rechargeActivationIsLoading ||
// //                     activateIsLoading ||
// //                     deactivateIsLoading
// //                   }
// //                   selectedItem={selectedItem}
// //                 />
// //               )}
// //               onEndReached={loadMore}
// //               onEndReachedThreshold={0.2}
// //               ListFooterComponent={() =>
// //                 hasMore && isLoading ? (
// //                   <ActivityIndicator size="large" color={COLORS.white_s} />
// //                 ) : null
// //               }
// //             />
// //           )}
// //         </View>
// //       </View>
// //     </MainBackgroundWithoutScrollview>
// //   );
// // };

// // export default AllPartner;
