import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useCreatePartnerMutation,
  useGetAllUserQuery,
  useRemoveTopPartnerMutation,
  useSearchUserQuery,
} from '../../helper/Networkcall';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, FONT} from '../../../assets/constants';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import AllUserPartnerComp from '../../components/alluserpartner/AllUserPartnerComp';
import Toast from 'react-native-toast-message';

const AllUsersPartner = () => {
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
  } = useGetAllUserQuery(
    {accesstoken, page, limit},
    {skip: debouncedSearch.length > 0}, // Skip pagination if searching
  );

  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} = useSearchUserQuery(
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

    if (debouncedSearch.length > 0 && searchData?.users) {
      // For search results, replace the existing data
      setPartners(searchData.users);
      setHasMore(false); // Disable pagination when searching
    } else if (paginatedData?.users) {
      // For paginated data, filter out duplicates before appending
      setPartners(prev => {
        const newData = paginatedData.users.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.users : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.users.length < limit) {
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

  const [createPartner, {isLoading: isCreating}] = useCreatePartnerMutation();
  const [removeTopPartner, {isLoading: isRemoving}] =
    useRemoveTopPartnerMutation();

  const [seletedItem, setSelectedItem] = useState('');

  const createPartnerSubmitHandler = item => {
    setSelectedItem(item);
    makePartnerHandler(item);
  };

  const makePartnerHandler = async item => {
    try {
      const body = {
        userId: item.userId,
      };
      const res = await createPartner({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      console.log('Refetching data...');
      setPartners([]); // clear current list
      setPage(1); // reset pagination
      setHasMore(true); // allow further loading
      refetchPaginated(); // trigger re-fetch
      console.log('Data refetched');
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const removePartnerSubmitHandler = item => {
    setSelectedItem(item);
    removePartnerHandler(item);
  };

  const removePartnerHandler = async item => {
    try {
      const body = {
        userId: item.userId,
      };
      const res = await removeTopPartner({
        accesstoken,
        body,
      });
      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });

      console.log('Refetching data...');
      await refetchPaginated();
      console.log('Data refetched');
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgroundWithoutScrollview title="All Users">
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
                <AllUserPartnerComp
                  navigate={'CreatePartner'}
                  item={item}
                  key={item._id}
                  seletedItem={seletedItem}
                  createPartnerSubmitHandler={createPartnerSubmitHandler}
                  removePartnerSubmitHandler={removePartnerSubmitHandler}
                  isCreating={isCreating}
                  isRemoving={isRemoving}
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

export default AllUsersPartner;

// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Toast from 'react-native-toast-message';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import Background from '../../components/background/Background';
// import {COLORS, FONT} from '../../../assets/constants';
// import GradientTextWhite from '../../components/helpercComponent/GradientTextWhite';
// import GradientText from '../../components/helpercComponent/GradientText';
// import Loading from '../../components/helpercComponent/Loading';
// import AllUserPartnerComp from '../../components/alluserpartner/AllUserPartnerComp';

// const AllUsersPartner = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const {accesstoken} = useSelector(state => state.user);

//   const dummeyAllUsers = [
//     {
//       userid: '1090',
//       name: 'Babu Roa',
//       partner: true,
//     },
//     {
//       userid: '1091',
//       name: 'Arjuna',
//       partner: true,
//     },
//     {
//       userid: '1092',
//       name: 'Mark Jone',
//       partner: false,
//     },
//     {
//       userid: '1093',
//       name: 'Janny Mona',
//       partner: true,
//     },
//     {
//       userid: '1094',
//       name: 'Lucy cina',
//       partner: true,
//     },
//   ];

//   const [filteredData, setFilteredData] = useState([]);

//   // Example usage:
//   // This will return the date and time in 'America/New_York' timezone.
//   // This will return the date and time in 'America/New_York' timezone.

//   const handleSearch = text => {
//     const filtered = times.filter(item =>
//       item.lottime.toLowerCase().includes(text.toLowerCase()),
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Background />

//       {/** Main Cointainer */}

//       <View style={{flex: 1, justifyContent: 'flex-end'}}>
//         <GradientText
//           style={{
//             ...styles.textStyle,
//             paddingLeft: heightPercentageToDP(2),
//           }}>
//           All Users
//         </GradientText>
//         <ImageBackground
//           source={require('../../../assets/image/tlwbg.jpg')}
//           style={{
//             width: '100%',
//             height: heightPercentageToDP(80),
//           }}
//           imageStyle={{
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderTopRightRadius: heightPercentageToDP(5),
//           }}>
//           <View
//             style={{
//               height: heightPercentageToDP(80),
//               width: widthPercentageToDP(100),

//               borderTopLeftRadius: heightPercentageToDP(5),
//               borderTopRightRadius: heightPercentageToDP(5),
//             }}>
//             {/** Top Style View */}
//             <View
//               style={{
//                 height: heightPercentageToDP(5),
//                 width: widthPercentageToDP(100),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   width: widthPercentageToDP(20),
//                   height: heightPercentageToDP(0.8),
//                   backgroundColor: COLORS.grayBg,
//                   borderRadius: heightPercentageToDP(2),
//                 }}></View>
//             </View>

//             <View
//               style={{
//                 height: heightPercentageToDP(7),
//                 flexDirection: 'row',
//                 backgroundColor: COLORS.white_s,
//                 alignItems: 'center',
//                 paddingHorizontal: heightPercentageToDP(2),
//                 borderRadius: heightPercentageToDP(1),
//                 marginHorizontal: heightPercentageToDP(1),
//               }}>
//               <Fontisto
//                 name={'search'}
//                 size={heightPercentageToDP(3)}
//                 color={COLORS.darkGray}
//               />
//               <TextInput
//                 style={{
//                   marginStart: heightPercentageToDP(1),
//                   flex: 1,
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: heightPercentageToDP(2.5),
//                   color: COLORS.black,
//                 }}
//                 placeholder="Search for User"
//                 placeholderTextColor={COLORS.black}
//                 label="Search"
//                 onChangeText={handleSearch}
//               />
//             </View>

//             {/** Content Container */}

//             <View
//               style={{
//                 flex: 1,
//                 padding: heightPercentageToDP(1),
//               }}>
//               <ScrollView
//                 contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}
//                 showsVerticalScrollIndicator={false}>
//                 {/** User content */}
//                 {false ? (
//                   <Loading />
//                 ) : (
//                   dummeyAllUsers.map((item, index) => (
{
  /* <AllUserPartnerComp navigate={'CreatePartner'} item={item} key={index} />; */
}
//                   ))
//                 )}
//               </ScrollView>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// export default AllUsersPartner;

// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize: heightPercentageToDP(4),
//     fontFamily: FONT.Montserrat_Bold,
//     color: COLORS.black,
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
//   paymentOption: {
//     backgroundColor: 'pink',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: heightPercentageToDP(15),
//     borderRadius: heightPercentageToDP(2),
//     alignItems: 'center',
//     gap: heightPercentageToDP(3),
//     paddingStart: heightPercentageToDP(2),
//     marginTop: heightPercentageToDP(2),
//   },
//   iconContainer: {
//     backgroundColor: COLORS.white_s,
//     padding: heightPercentageToDP(1.5),
//     borderRadius: heightPercentageToDP(1),
//   },
//   icon: {
//     height: 25,
//     width: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textStyleContent: {
//     fontSize: heightPercentageToDP(3),
//     fontFamily: FONT.Montserrat_Bold,
//     color: COLORS.black,
//   },
//   subtitle: {
//     fontSize: heightPercentageToDP(1.5),
//     color: COLORS.black,
//     fontFamily: FONT.Montserrat_Regular,
//   },
//   topContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   bottomContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerLine: {
//     height: 1,
//     backgroundColor: COLORS.white_s,
//   },
//   titleRegular: {
//     fontSize: heightPercentageToDP(1.5),
//     color: COLORS.black,
//     fontFamily: FONT.Montserrat_Regular,
//   },
//   titleBold: {
//     fontSize: heightPercentageToDP(2),
//     color: COLORS.black,
//     fontFamily: FONT.Montserrat_Bold,
//   },
//   titleSemiBold: {
//     fontSize: heightPercentageToDP(2),
//     color: COLORS.white_s,
//     fontFamily: FONT.Montserrat_Bold,
//   },
//   acceptBtn: {
//     backgroundColor: COLORS.green,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: heightPercentageToDP(0.5),
//     borderRadius: heightPercentageToDP(2),
//   },
// });
