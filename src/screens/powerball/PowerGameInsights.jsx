import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';
import PowerAllTimesComp from '../../components/powerball/poweralltimes/PowerAllTimesComp';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import PowerGameInsightsComp from '../../components/powerball/gameinsights/PowerGameInsightsComp';
import {
  useGetPowerballGameInsightsQuery,
  useGetResultBasedDateTimePowerResultQuery,
  useSearchJackpotGameInsightsQuery,
} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';
import {skipToken} from '@reduxjs/toolkit/query';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const PowerGameInsights = ({route}) => {
  const {item, powertime} = route.params;

  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {accesstoken} = useSelector(state => state.user);
  const [gameInsightsData, setGameInsightsData] = useState([]);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const handleBackPress = () => {
      return true; // Prevent back navigation on space key press
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  console.log(powertime._id);
  console.log(item._id);

  // [CHECKING FOR RESULT ALREADY CREATED OR NOT]
  const {
    isLoading: resultIsLoading,
    data: resultData,
    error: resultError,
    refetch: resultRefetch,
  } = useGetResultBasedDateTimePowerResultQuery({
    accesstoken,
    powertimeid: powertime._id,
    powerdateid: item._id,
  });

  console.log(JSON.stringify(resultData));
  console.log(resultData);

  const [resultFound, setResultFound] = useState(false);

  useEffect(() => {
    if (!resultIsLoading && resultData) {
      if (resultData.message === 'PowerResult retrieved successfully') {
        setResultFound(false);
      } else {
        setResultFound(true);
      }
    }
    if (
      resultError?.data?.message ===
      'No PowerResult found for the given powertime and powerdate'
    ) {
      setResultFound(true);
    }
  }, [resultData, resultIsLoading, resultError]);

  const Footer = () => {
    return (
      <View
        style={{
          marginVertical: heightPercentageToDP(2),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreatePowerResult', {
              forprocess: 'create',
              powertime,
              item,
            })
          }
          style={{
            backgroundColor: COLORS.blue,
            padding: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(1),
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONT.Montserrat_Regular,
            }}>
            Create New Result
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const copyToClipboard = val => {
    Clipboard.setString(val);
    Toast.show({
      type: 'success',
      text1: 'Text Copied',
      text2: 'The text has been copied to your clipboard!',
    });
  };

  const Header = () => {
    return (
      <View
        style={{
          height: heightPercentageToDP(7),
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            width: widthPercentageToDP(50),
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
          {/* <TextInput
            style={{
              marginStart: heightPercentageToDP(1),
              flex: 1,
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
            }}
            placeholder="Search Jackpot"
            placeholderTextColor={COLORS.black}
            value={searchQuery} // Ensure TextInput is controlled
            onChangeText={text => {
              setSearchQuery(text);
            }}
          /> */}

          <TextInput
            style={{
              marginStart: heightPercentageToDP(1),
              flex: 1,
              fontFamily: FONT.Montserrat_Regular,
              fontSize: heightPercentageToDP(2.5),
              color: COLORS.black,
            }}
            placeholder="Search Jackpot"
            placeholderTextColor={COLORS.black}
            value={searchQuery} // ✅ Ensure controlled input
            onChangeText={text => setSearchQuery(text)} // ✅ Direct state update
            keyboardType="default"
            returnKeyType="done" // ✅ Helps prevent unnecessary behaviors
            blurOnSubmit={false} // ✅ Prevents closing keyboard on enter
            onSubmitEditing={() => console.log('Submitted')} // ✅ Handles submission properly
          />
        </View>
        <TouchableOpacity
          onPress={() => copyToClipboard(searchQuery)}
          style={{
            backgroundColor: COLORS.white_s,
            margin: heightPercentageToDP(1),
            padding: heightPercentageToDP(1),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: heightPercentageToDP(1),
          }}>
          <Feather
            name={'copy'}
            size={heightPercentageToDP(3)}
            color={COLORS.darkGray}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // States

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce Effect for Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // FOR ALL BET DATA

  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: refetchPaginated,
    isFetching: fetchingPaginated,
  } = useGetPowerballGameInsightsQuery(
    {
      accesstoken,
      powerdateId: item._id,
      powertimeId: powertime._id,
      page,
      limit,
    },
    {skip: debouncedSearch.length > 0}, // Skip pagination if searching
  );

  // Fetch Search Data
  // Fetch Search Data
  const {data: searchData, isFetching: fetchingSearch} =
    useSearchJackpotGameInsightsQuery(
      debouncedSearch.length > 0
        ? {accesstoken, id: gameId, jackpot: debouncedSearch}
        : {skip: true},
    );

  // console.log('Search data');
  // console.log(gameInsightsData?._id);
  // console.log(gameId);
  // console.log(JSON.stringify(searchData));
  // const {data: searchData, isFetching: fetchingSearch} =
  //   useSearchJackpotGameInsightsQuery(
  //     debouncedSearch.length > 0
  //       ? {accesstoken, searchTerm: debouncedSearch}
  //       : {skip: true},
  //   );

  // Reset State on Navigation Back
  useFocusEffect(
    useCallback(() => {
      // setPartners([]); // ✅ Reset Data
      setPage(1); // ✅ Reset Page
      setHasMore(true); // ✅ Reset Load More
      refetchPaginated?.(); // ✅ Ensure Fresh Data
      resultRefetch();
    }, [refetchPaginated]),
  );

  useEffect(() => {
    setLoading(true);

    if (
      debouncedSearch.length > 0 &&
      searchData?.tickets.length > 0 &&
      searchData?.tickets[0].alltickets
    ) {
      // For search results, replace the existing data
      setGameInsightsData(searchData?.tickets[0].alltickets);
      setHasMore(false); // Disable pagination when searching
    } else if (
      paginatedData?.tickets.length > 0 &&
      paginatedData?.tickets[0].alltickets
    ) {
      setGameId(paginatedData.tickets[0]._id);
      // For paginated data, filter out duplicates before appending
      setGameInsightsData(prev => {
        const newData = paginatedData.tickets[0].alltickets.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1
          ? paginatedData.tickets[0].alltickets
          : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (
        paginatedData?.tickets.length > 0 &&
        paginatedData.tickets[0].alltickets.length < limit
      ) {
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

  // TESTING FOR THE WINNING AMOUNT AND ALL

  // Step 3: Get all tickets from the found power game
  // const allTickets = [
  //   {
  //     userId: 1042,
  //     username: 'Naina',
  //     currency: '67a344d34150a729e57269e9',
  //     tickets: [
  //       {
  //         amount: 50,
  //         convertedAmount: 50,
  //         multiplier: 1,
  //         usernumber: [13, 54, 67, 68, 31, 8],
  //         _id: '67c79a7a842474a46585f8cd',
  //         createdAt: '2025-03-05T00:27:38.655Z',
  //       },
  //       {
  //         amount: 50,
  //         convertedAmount: 50,
  //         multiplier: 1,
  //         usernumber: [9, 70, 23, 21, 5, 44],
  //         _id: '67c79a7a842474a46585f8ce',
  //         createdAt: '2025-03-05T00:27:38.655Z',
  //       },
  //     ],
  //     _id: '67c79a7a842474a46585f8cc',
  //     createdAt: '2025-03-05T00:27:38.663Z',
  //     updatedAt: '2025-03-05T00:27:38.663Z',
  //   },
  //   {
  //     userId: 1048,
  //     username: 'sunaina',
  //     currency: '67a344d34150a729e57269e9',
  //     tickets: [
  //       {
  //         amount: 100,
  //         convertedAmount: 100,
  //         multiplier: 2,
  //         usernumber: [2, 25, 35, 4, 66, 29],
  //         _id: '67c79abe842474a46585f98b',
  //         createdAt: '2025-03-05T00:28:46.997Z',
  //       },
  //     ],
  //     _id: '67c79abe842474a46585f98a',
  //     createdAt: '2025-03-05T00:28:46.998Z',
  //     updatedAt: '2025-03-05T00:28:46.998Z',
  //   },
  //   {
  //     userId: 1045,
  //     username: 'Elena',
  //     currency: '67a344d34150a729e57269e9',
  //     tickets: [
  //       {
  //         amount: 100,
  //         convertedAmount: 100,
  //         multiplier: 2,
  //         usernumber: [23, 68, 38, 20, 8, 41],
  //         _id: '67c79b10842474a46585fa4a',
  //         createdAt: '2025-03-05T00:30:08.307Z',
  //       },
  //       {
  //         amount: 50,
  //         convertedAmount: 50,
  //         multiplier: 1,
  //         usernumber: [56, 42, 57, 46, 12, 37],
  //         _id: '67c79b10842474a46585fa4b',
  //         createdAt: '2025-03-05T00:30:08.308Z',
  //       },
  //     ],
  //     _id: '67c79b10842474a46585fa49',
  //     createdAt: '2025-03-05T00:30:08.311Z',
  //     updatedAt: '2025-03-05T00:30:08.311Z',
  //   },
  //   {
  //     userId: 1046,
  //     username: 'Divya',
  //     currency: '67a344d34150a729e57269e9',
  //     tickets: [
  //       {
  //         amount: 50,
  //         convertedAmount: 50,
  //         multiplier: 1,
  //         usernumber: [21, 4, 23, 41, 2, 7],
  //         _id: '67c79b5e842474a46585fb60',
  //         createdAt: '2025-03-05T00:31:26.174Z',
  //       },
  //     ],
  //     _id: '67c79b5e842474a46585fb5f',
  //     createdAt: '2025-03-05T00:31:26.176Z',
  //     updatedAt: '2025-03-05T00:31:26.176Z',
  //   },
  //   {
  //     userId: 1047,
  //     username: 'abhilash',
  //     currency: '67a344d34150a729e57269e9',
  //     tickets: [
  //       {
  //         amount: 50,
  //         convertedAmount: 50,
  //         multiplier: 1,
  //         usernumber: [8, 26, 55, 25, 17, 34],
  //         _id: '67c79ba6842474a46585fc2a',
  //         createdAt: '2025-03-05T00:32:38.732Z',
  //       },
  //     ],
  //     _id: '67c79ba6842474a46585fc29',
  //     createdAt: '2025-03-05T00:32:38.736Z',
  //     updatedAt: '2025-03-05T00:32:38.736Z',
  //   },
  //   {
  //     userId: 1012,
  //     username: 'Karan',
  //     currency: '67a344d34150a729e57269e9',
  //     tickets: [
  //       {
  //         amount: 50,
  //         convertedAmount: 50,
  //         multiplier: 1,
  //         usernumber: [44, 67, 22, 31, 55, 30],
  //         _id: '67c79be0842474a46585fcef',
  //         createdAt: '2025-03-05T00:33:36.139Z',
  //       },
  //     ],
  //     _id: '67c79be0842474a46585fcee',
  //     createdAt: '2025-03-05T00:33:36.142Z',
  //     updatedAt: '2025-03-05T00:33:36.142Z',
  //   },
  // ];

  // // Step 4: Function to distribute prize

  // // const allTickets = powerGame.alltickets;
  // const jackpotnumber = [2, 10, 19, 29, 39, 49];
  // let winningAmount = 0;

  // console.log('Winning amount: ', winningAmount);

  // const distributePrize = async (matchCount, prizeAmount) => {
  //   for (let ticketHolder of allTickets) {
  //     for (let ticket of ticketHolder.tickets) {
  //       // Count the number of matching numbers
  //       const matches = ticket.usernumber.filter(num =>
  //         jackpotnumber.includes(num),
  //       ).length;

  //       if (matches === matchCount) {
  //         let wonAmount = prizeAmount * ticket.multiplier;
  //         if (matchCount === 3) {
  //           wonAmount = ticket.convertedAmount * parseFloat(prizeAmount);
  //         }
  //         if (matchCount === 2) {
  //           wonAmount = ticket.convertedAmount * parseFloat(prizeAmount);
  //         }
  //         if (matchCount === 1) {
  //           wonAmount = ticket.convertedAmount * parseFloat(prizeAmount);
  //         }

  //         winningAmount += wonAmount;
  //       }
  //     }
  //   }
  // };

  // Step 5: Distribute prizes based on matches
  //  await distributePrize(6, prize.firstprize.amount);
  //  await distributePrize(5, prize.secondprize.amount);
  //  await distributePrize(4, prize.thirdprize.amount);
  //  await distributePrize(3, prize.fourthprize.amount);
  //  await distributePrize(2, prize.fifthprize.amount);
  //  await distributePrize(1, prize.sixthprize.amount);

  // distributePrize(6, 100000);
  // distributePrize(5, 50000);
  // distributePrize(4, 25000);
  // distributePrize(3, 4);
  // distributePrize(2, 3);
  // distributePrize(1, 2);
  // console.log('Winning amount After: ', winningAmount);

  return (
    <MainBackgroundWithoutScrollview
      lefttext={item.powerdate}
      righttext={powertime.powertime}
      title={'Game Insights'}>
      <Header />
      {isLoading && page === 1 ? (
        <Loading />
      ) : (
        <FlatList
          key={item => item._id}
          keyExtractor={item => item._id.toString()}
          data={gameInsightsData}
          renderItem={({item}) => (
            <PowerGameInsightsComp
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

      {resultFound && <Footer />}
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerGameInsights;

const styles = StyleSheet.create({});
