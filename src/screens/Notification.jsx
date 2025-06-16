import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  useCheckNotificationSeenMutation,
  useGetAllNotificationQuery,
  useGetSingleUserNotificationQuery,
} from '../helper/Networkcall';
import MainBackgroundWithoutScrollview from '../components/background/MainBackgroundWithoutScrollview';

const Notification = () => {
  const {accesstoken} = useSelector(state => state.user);

  const [selectedItem, setSelectedItem] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async item => {
    console.log('Item clicked :: ' + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);

    try {
      const url = `${UrlHelper.DELETE_NOTIFICATION_API}/${item._id}`;
      const {data} = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log('datat :: ' + data);

      Toast.show({
        type: 'success',
        text1: data.message,
      });
      setProgressBar(false);
      // Reset states to fetch fresh data from page 1
      setNotifications([]); // clear current list
      setPage(1); // reset pagination
      setHasMore(true); // allow further loading
      refetchPaginated(); // trigger re-fetch
    } catch (error) {
      console.log(error.response.data.message);
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please, try after sometime',
      });
      console.log(error);
    }
  };

  // States
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const id = 1000;
  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: refetchPaginated,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
  } = useGetSingleUserNotificationQuery(
    {accesstoken, id: id, page, limit},
    {refetchOnMountOrArgChange: true}, // Disable caching
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

    if (paginatedData?.notifications) {
      // For paginated data, filter out duplicates before appending
      setNotifications(prev => {
        const newData = paginatedData.notifications.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id),
        );
        return page === 1 ? paginatedData.notifications : [...prev, ...newData];
      });

      // Update `hasMore` based on the length of the new data
      if (paginatedData.notifications.length < limit) {
        setHasMore(false); // No more data to fetch
      } else {
        setHasMore(true); // More data available
      }
    }

    setLoading(false);
  }, [paginatedData, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;

  const navigation = useNavigation();

  const [checkNotificationSeen, {error}] = useCheckNotificationSeenMutation();

  const submitHandler = async () => {
    try {
      const res = await checkNotificationSeen({
        accessToken: accesstoken,
        id: id,
      }).unwrap();

      console.log('seen status res :: ' + JSON.stringify(res));
    } catch (error) {
      console.log('Error during submitHandler:', error);
    }
  };

  useEffect(() => {
    if (!loadingPaginated && paginatedData) {
      submitHandler();
    }
  }, [loadingPaginated, paginatedData]);

  return (
    <MainBackgroundWithoutScrollview title="Notification">
      <View style={{flex: 1}}>
        {/* PARTNER USER LIST */}
        <View style={{flex: 1}}>
          {isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.white_s} />
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={item => item._id.toString()} // Ensure _id is unique
              renderItem={({item}) => (
                <View
                  key={item => item._id.toString()}
                  style={{
                    minHeight: heightPercentageToDP(10),
                    backgroundColor: COLORS.grayBg,
                    marginBottom: heightPercentageToDP(2),
                    padding: heightPercentageToDP(2),
                    borderRadius: heightPercentageToDP(2),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 4,
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_SemiBold,
                        fontSize: heightPercentageToDP(2),
                      }}
                      numberOfLines={1}>
                      {item.title}
                    </Text>

                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_Regular,
                      }}>
                      {item.description}
                    </Text>
                    {item.userId && (
                      <Text
                        onPress={() =>
                          navigation.navigate('UserDetails', {
                            userdata: item,
                            fromscreen: 'notification',
                          })
                        }
                        style={{
                          color: COLORS.black,
                          fontFamily: FONT.Montserrat_SemiBold,
                          fontSize: heightPercentageToDP(2),
                          alignSelf: 'flex-start',
                          marginTop: heightPercentageToDP(1),
                        }}
                        numberOfLines={1}>
                        User ID : {item.userId}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    {/** For Deleting Notification */}
                    {selectedItem === item._id ? (
                      <Loading />
                    ) : (
                      <TouchableOpacity
                        style={{
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          marginBottom: heightPercentageToDP(2),
                        }}
                        onPress={() => deleteLocationHandler(item)}>
                        <LinearGradient
                          colors={[COLORS.gray2, COLORS.white_s]}
                          className="rounded-xl p-1">
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={heightPercentageToDP(3)}
                            color={COLORS.darkGray}
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
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

export default Notification;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: heightPercentageToDP(20),
  },
  item: {
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});
