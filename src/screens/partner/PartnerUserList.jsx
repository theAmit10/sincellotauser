import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
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
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Paginated Data
  const {data: paginatedData} = useGetPartnerUserListQuery(
    {accesstoken, userId: item.userId, page, limit},
    {skip: debouncedSearch.length > 1}, // Skip pagination if searching
  );

  // Fetch Search Data
  const {data: searchData} = useSearchPartnerUserListQuery(
    debouncedSearch.length > 1
      ? {accesstoken, userId: item.userId, query: debouncedSearch}
      : {skip: true},
  );

  // Handle Data Updates
  useEffect(() => {
    if (debouncedSearch.length > 1 && searchData?.userList) {
      // Search mode: Replace data
      setPartners(searchData.userList);
      setHasMore(false); // Stop pagination in search
    } else if (paginatedData?.userList) {
      setPartners(prevPartners => {
        // Prevent duplicates by checking userId
        const newData = paginatedData.userList.filter(
          newItem =>
            !prevPartners.some(
              existingItem => existingItem.userId === newItem.userId,
            ),
        );

        return page === 1 ? newData : [...prevPartners, ...newData];
      });

      // Update hasMore flag
      setHasMore(paginatedData.userList.length === limit);
    }

    setLoading(false);
  }, [searchData, debouncedSearch, paginatedData, page]);

  // Load more function (Only for Pagination)
  const loadMore = () => {
    if (!loading && hasMore && debouncedSearch.length < 1) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <MainBackgroundWithoutScrollview title="Partner User List">
      <View style={{flex: 1}}>
        {/* SEARCH PARTNER */}
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
            onChangeText={setSearchQuery} // Updates search query state
          />
        </View>

        {/* PARTNER USER LIST */}
        <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
          <FlatList
            data={partners}
            keyExtractor={item => item.userId.toString()}
            renderItem={({item}) => (
              <PartnerUserListComp
                key={item.userId}
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
            onEndReachedThreshold={0.2} // Prevents multiple triggers
            ListFooterComponent={() =>
              loading ? (
                <ActivityIndicator size="large" color={COLORS.white_s} />
              ) : null
            }
          />
        </View>
      </View>
    </MainBackgroundWithoutScrollview>
  );
};

export default PartnerUserList;

// import React, {useEffect, useState} from 'react';
// import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {
//   useGetPartnerUserListQuery,
//   useSearchPartnerUserListQuery,
// } from '../../helper/Networkcall';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import {COLORS, FONT} from '../../../assets/constants';
// import PartnerUserListComp from '../../components/PartnerUserListComp';
// import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

// const PartnerUserList = ({route}) => {
//   const {accesstoken} = useSelector(state => state.user);
//   const {data: item} = route.params;

//   // State Variables
//   const [partners, setPartners] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   // Search States
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');

//   // Debounce Effect for Search Input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Fetch Paginated Data
//   const {data: paginatedData, isFetching: paginatedLoading} =
//     useGetPartnerUserListQuery({
//       accesstoken,
//       userId: item.userId,
//       page,
//       limit,
//     });

//   // Fetch Search Data
//   const {data: searchData, isFetching: searchLoading} =
//     useSearchPartnerUserListQuery(
//       debouncedSearch.length > 1
//         ? {accesstoken, userId: item.userId, query: debouncedSearch}
//         : {skip: true},
//     );

//   // Update Partners List on API Response
//   useEffect(() => {
//     if (debouncedSearch.length > 1) {
//       // When searching, update partners with search results
//       setPartners(searchData?.userList || []);
//     } else if (paginatedData?.userList) {
//       // When search is cleared, reset to paginated data
//       if (page === 1) {
//         setPartners(paginatedData?.userList);
//       } else {
//         setPartners(prev => [...prev, ...paginatedData?.userList]);
//       }
//     }
//   }, [searchData, debouncedSearch, paginatedData, page]);

//   // Load More Data for Pagination
//   const loadMore = () => {
//     if (!loading && hasMore && !searchQuery) {
//       setLoading(true);
//       setPage(prevPage => prevPage + 1);
//     }
//   };

//   return (
//     <MainBackgroundWithoutScrollview title={'Partner User List'}>
//       <View style={{flex: 1}}>
//         {/** SEARCH INPUT */}
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
//             name={'search'}
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
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         {/** PARTNER USER LIST */}
//         <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
//           <FlatList
//             data={partners}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}) => (
//               <PartnerUserListComp
//                 key={item.userId}
//                 navigate={'PartnerSubPartner'}
//                 name={item.name}
//                 userid={item.userId}
//                 noofumser={item.userList?.length}
//                 profitpercentage={item.profitPercentage}
//                 walletbalance={item.walletTwo?.balance}
//                 rechargepercentage={item.rechargePercentage}
//               />
//             )}
//             onEndReached={loadMore}
//             onEndReachedThreshold={0.5}
//             ListFooterComponent={() =>
//               loading ? (
//                 <ActivityIndicator size="large" color={COLORS.white_s} />
//               ) : null
//             }
//           />
//         </View>
//       </View>
//     </MainBackgroundWithoutScrollview>
//   );
// };

// export default PartnerUserList;

// // import React, {useEffect, useState} from 'react';
// // import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
// // import {useSelector} from 'react-redux';
// // import {
// //   useGetPartnerUserListQuery,
// //   useSearchPartnerUserListQuery,
// // } from '../../helper/Networkcall';
// // import {heightPercentageToDP} from 'react-native-responsive-screen';
// // import Fontisto from 'react-native-vector-icons/Fontisto';
// // import {COLORS, FONT} from '../../../assets/constants';
// // import PartnerUserListComp from '../../components/PartnerUserListComp';
// // import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

// // const PartnerUserList = ({route}) => {
// //   const {accesstoken} = useSelector(state => state.user);
// //   const {data: item} = route.params;

// //   // Pagination States
// //   const [partners, setPartners] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const limit = 5;
// //   const [hasMore, setHasMore] = useState(true);
// //   const [loading, setLoading] = useState(false);

// //   // Search States
// //   const [searchQuery, setSearchQuery] = useState(''); // Stores user's input
// //   const [debouncedSearch, setDebouncedSearch] = useState(''); // Used for API calls

// //   // Debouncing Effect (Triggers API call only after user stops typing)
// //   useEffect(() => {
// //     const handler = setTimeout(() => {
// //       if (searchQuery.length > 1) {
// //         setDebouncedSearch(searchQuery);
// //       }
// //     }, 500); // Delay of 500ms

// //     return () => clearTimeout(handler);
// //   }, [searchQuery]);

// //   // Fetch Paginated Data
// //   const {data: paginatedData} = useGetPartnerUserListQuery({
// //     accesstoken,
// //     userId: item.userId,
// //     page,
// //     limit,
// //   });

// //   // Fetch Search Data (Only if query length > 1)
// //   const {data: searchData, isFetching: searchLoading} =
// //     useSearchPartnerUserListQuery(
// //       debouncedSearch.length > 1
// //         ? {accesstoken, userId: item.userId, query: debouncedSearch}
// //         : {skip: true}, // Skip API call if query is empty
// //     );

// //   // Handle Pagination Data Update
// //   useEffect(() => {
// //     if (paginatedData?.userList) {
// //       const newData =
// //         page === 1
// //           ? paginatedData.userList
// //           : [...partners, ...paginatedData.userList];
// //       setPartners(newData);
// //       setHasMore(paginatedData.userList.length === limit);
// //     } else {
// //       setHasMore(false);
// //     }
// //     setLoading(false);
// //   }, [paginatedData, page]);

// //   // Handle Search Data Update (Overrides pagination results when searching)
// //   //   useEffect(() => {
// //   //     if (debouncedSearch.length > 1 && searchData?.userList) {
// //   //       setPartners(searchData.userList);
// //   //     } else if (debouncedSearch.length === 0) {
// //   //       setPartners(paginatedData?.userList || []);
// //   //     }
// //   //   }, [searchData, debouncedSearch]);

// //   // Handle Search Data Update (Overrides pagination results when searching)
// //   useEffect(() => {
// //     if (debouncedSearch.length > 1 && searchData?.userList) {
// //       setPartners(searchData.userList);
// //     } else if (debouncedSearch.length === 0) {
// //       setPartners(paginatedData?.userList || []); // Restore paginated data when search is cleared
// //     }
// //   }, [searchData, debouncedSearch, paginatedData]);

// //   // Load more function (Only for Pagination)
// //   const loadMore = () => {
// //     if (!loading && hasMore && !searchQuery) {
// //       setLoading(true);
// //       setPage(prevPage => prevPage + 1);
// //     }
// //   };

// //   return (
// //     <MainBackgroundWithoutScrollview title={'Partner User List'}>
// //       <View style={{flex: 1}}>
// //         {/** SEARCH PARTNER */}
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
// //             name={'search'}
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
// //             onChangeText={setSearchQuery} // Updates search query state
// //           />
// //         </View>

// //         {/** PARTNER USER LIST */}
// //         <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
// //           <FlatList
// //             data={partners}
// //             keyExtractor={(item, index) => index.toString()}
// //             renderItem={({item}) => (
// //               <PartnerUserListComp
// //                 key={item.userId}
// //                 navigate={'PartnerSubPartner'}
// //                 name={item.name}
// //                 userid={item.userId}
// //                 noofumser={item.userList?.length}
// //                 profitpercentage={item.profitPercentage}
// //                 walletbalance={item.walletTwo?.balance}
// //                 rechargepercentage={item.rechargePercentage}
// //               />
// //             )}
// //             onEndReached={loadMore}
// //             onEndReachedThreshold={0.5}
// //             ListFooterComponent={() =>
// //               loading ? (
// //                 <ActivityIndicator size="large" color={COLORS.white_s} />
// //               ) : null
// //             }
// //           />
// //         </View>
// //       </View>
// //     </MainBackgroundWithoutScrollview>
// //   );
// // };

// // export default PartnerUserList;
