import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import PartnerPerformanceComp from '../../components/partnerperformance/PartnerPerformanceComp';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  useGetPartnerPerformancePowerballQuery,
  useGetPartnerPerformanceQuery,
} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../../assets/constants';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

const PartnerPerformancePowerball = ({route}) => {
  const {powertime, item: powerdate} = route.params;

  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigation = useNavigation();
  const {accesstoken} = useSelector(state => state.user);
  const [performancData, setPerformancData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    isLoading: partnerperformanceisLoading,
    isFetching: fetchingPaginated,
    data: partnerperformance,
    refetch: refetchPaginated,
  } = useGetPartnerPerformancePowerballQuery({
    accesstoken,
    powertime: powertime._id,
    powerdate: powerdate._id,
    page,
    limit,
  });

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      setPerformancData([]); // Reset data
      setPage(1); // Reset page
      setHasMore(true); // Reset load more
      refetchPaginated(); // Ensure fresh data
    }, [refetchPaginated]),
  );

  // Fetch data on initial load
  useEffect(() => {
    setLoading(true);
    refetchPaginated(); // Explicitly refetch data on initial load
  }, []);

  // Update performancData when partnerperformance changes
  useEffect(() => {
    if (partnerperformance?.performances) {
      setPerformancData(prev => {
        const newData = partnerperformance.performances.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1
          ? partnerperformance.performances
          : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (partnerperformance.performances.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [partnerperformance, page]);

  // Load more data
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || loading || partnerperformanceisLoading;

  // Render empty state if no data is available
  //   if (!isLoading && performancData.length === 0) {
  //     return (
  //       <View style={styles.emptyContainer}>
  //         <Text style={styles.emptyText}>No data available</Text>
  //       </View>
  //     );
  //   }

  return (
    <MainBackgroundWithoutScrollview
      lefttext={powertime.powertime}
      righttext={powerdate.powerdate}
      title={'Partner Performance'}>
      <View style={{flex: 1}}>
        {isLoading && page === 1 ? (
          <ActivityIndicator size="large" color={COLORS.white_s} />
        ) : (
          <FlatList
            data={performancData}
            keyExtractor={item => item._id.toString()} // Ensure _id is unique
            renderItem={({item}) => (
              <PartnerPerformanceComp
                item={item}
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                toggleItem={toggleItem}
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
    </MainBackgroundWithoutScrollview>
  );
};

export default PartnerPerformancePowerball;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.white_s,
    fontSize: 16,
  },
});

// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useCallback, useEffect, useState} from 'react';

// import PartnerPerformanceComp from '../../components/partnerperformance/PartnerPerformanceComp';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {
//   useGetPartnerPerformancePowerballQuery,
//   useGetPartnerPerformanceQuery,
// } from '../../helper/Networkcall';
// import {useSelector} from 'react-redux';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import {COLORS} from '../../../assets/constants';
// import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

// const PartnerPerformancePowerball = ({route}) => {
//   const {powertime, item: powerdate} = route.params;

//   // console.log('timedata', timedata);
//   // console.log('locationdata', locationdata);

//   const [expandedItems, setExpandedItems] = useState({});
//   const toggleItem = id => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const navigation = useNavigation();
//   const {accesstoken} = useSelector(state => state.user);
//   const [performancData, setPerformancData] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const {
//     isLoading: partnerperformanceisLoading,
//     isFetching: fetchingPaginated,
//     data: partnerperformance,
//     refetch: refetchPaginated,
//   } = useGetPartnerPerformancePowerballQuery({
//     accesstoken,
//     powertime: powertime._id,
//     powerdate: powerdate._id,
//     page,
//     limit,
//   });

//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   // Reset State on Navigation Back
//   useFocusEffect(
//     useCallback(() => {
//       // setPartners([]); // ✅ Reset Data
//       setPage(1); // ✅ Reset Page
//       setHasMore(true); // ✅ Reset Load More
//       refetchPaginated?.(); // ✅ Ensure Fresh Data
//     }, [refetchPaginated]),
//   );

//   // useEffect(() => {
//   //   if (!partnerperformanceisLoading && partnerperformance) {
//   //     setPerformancData(partnerperformance.performances);
//   //   }
//   // }, [partnerperformance, partnerperformanceisLoading]);

//   useEffect(() => {
//     setLoading(true);

//     if (partnerperformance?.performances) {
//       // For paginated data, filter out duplicates before appending
//       setPerformancData(prev => {
//         const newData = partnerperformance.performances.filter(
//           newItem => !prev.some(prevItem => prevItem._id === newItem._id),
//         );
//         return page === 1
//           ? partnerperformance.performances
//           : [...prev, ...newData];
//       });

//       // Update `hasMore` based on the length of the new data
//       if (partnerperformance.performances.length < limit) {
//         setHasMore(false); // No more data to fetch
//       } else {
//         setHasMore(true); // More data available
//       }
//     }

//     setLoading(false);
//   }, [performancData, page]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage(prev => prev + 1);
//     }
//   };

//   // Combined Loading State
//   const isLoading = fetchingPaginated || loading || partnerperformanceisLoading;

//   return (
//     <MainBackgroundWithoutScrollview
//       lefttext={powertime.powertime}
//       righttext={powerdate.powerdate}
//       title={'Partner Performance'}>
//       <View style={{flex: 1, padding: heightPercentageToDP(1)}}>
//         {isLoading && page === 1 ? (
//           <ActivityIndicator size="large" color={COLORS.white_s} />
//         ) : (
//           <FlatList
//             data={performancData}
//             keyExtractor={item => item._id.toString()} // Ensure _id is unique
//             renderItem={({item}) => (
//               <PartnerPerformanceComp
//                 item={item}
//                 expandedItems={expandedItems}
//                 setExpandedItems={setExpandedItems}
//                 toggleItem={toggleItem}
//               />
//             )}
//             onEndReached={loadMore}
//             onEndReachedThreshold={0.2}
//             ListFooterComponent={() =>
//               hasMore && isLoading ? (
//                 <ActivityIndicator size="large" color={COLORS.white_s} />
//               ) : null
//             }
//           />
//         )}
//       </View>
//     </MainBackgroundWithoutScrollview>
//   );
// };

// export default PartnerPerformancePowerball;
