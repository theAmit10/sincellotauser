import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT} from '../../../assets/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Loading from '../helpercComponent/Loading';

const AllUserToUserListComp = ({
  item,
  navigate,
  createPartnerSubmitHandler,
  seletedItem,
  removePartnerSubmitHandler,
  isRemoving,
  isCreating,
  parentPartnerId,
}) => {
  const navigation = useNavigation();

  const handleUserClick = () => {
    if (item.partnerType === 'user') {
      navigation.navigate('UserDetails', {
        userdata: item,
        formscreen: 'AllUsersPartner',
      });
    } else {
      navigation.navigate('PartnerDetails', {
        data: item,
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleUserClick}>
      <LinearGradient
        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
        start={{x: 0, y: 0}} // start from left
        end={{x: 1, y: 0}} // end at right
        style={styles.paymentOption}>
        <View
          style={{
            flex: 1,
            height: '100%',
          }}>
          <View style={styles.topContainer}>
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>User ID</Text>
              <Text style={styles.titleBold}>{item.userId}</Text>
            </View>
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>Partner ID</Text>
              <Text style={styles.titleBold}>{item.parentPartnerId}</Text>
            </View>
            <View
              style={{
                flex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>Name</Text>
              <Text style={styles.titleBold} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={styles.centerLine}></View>
          <View style={styles.bottomContainer}>
            {item.partnerType === 'user' ? (
              isCreating ? (
                seletedItem._id === item._id ? (
                  <Loading />
                ) : (
                  <TouchableOpacity
                    onPress={() => createPartnerSubmitHandler(item)}
                    style={{
                      borderRadius: heightPercentageToDP(2),
                    }}>
                    <LinearGradient
                      colors={[COLORS.user_firstgreen, COLORS.time_secondgreen]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        padding: heightPercentageToDP(1.5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: heightPercentageToDP(2),
                        flexDirection: 'row',
                        gap: heightPercentageToDP(1),
                      }}>
                      <FontAwesome
                        name={'edit'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.black}
                        style={styles.icon}
                      />

                      <Text style={styles.titleSemiBold}>Make User</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity
                  onPress={() => createPartnerSubmitHandler(item)}
                  style={{
                    borderRadius: heightPercentageToDP(2),
                  }}>
                  <LinearGradient
                    colors={[COLORS.user_firstgreen, COLORS.time_secondgreen]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={{
                      padding: heightPercentageToDP(1.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: heightPercentageToDP(2),
                      flexDirection: 'row',
                      gap: heightPercentageToDP(1),
                    }}>
                    <FontAwesome
                      name={'edit'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.black}
                      style={styles.icon}
                    />

                    <Text style={styles.titleSemiBold}>Make User</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            ) : isRemoving ? (
              seletedItem._id === item._id ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  onPress={() => removePartnerSubmitHandler(item)}
                  style={{
                    borderRadius: heightPercentageToDP(2),
                  }}>
                  <LinearGradient
                    colors={[COLORS.red, COLORS.red]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={{
                      padding: heightPercentageToDP(1.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: heightPercentageToDP(2),
                      flexDirection: 'row',
                      gap: heightPercentageToDP(1),
                    }}>
                    <MaterialCommunityIcons
                      name={'delete'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.black}
                      style={styles.icon}
                    />

                    <Text style={styles.titleSemiBold}>Remove User</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={() => removePartnerSubmitHandler(item)}
                style={{
                  borderRadius: heightPercentageToDP(2),
                }}>
                <LinearGradient
                  colors={[COLORS.red, COLORS.red]}
                  start={{x: 0, y: 0}} // start from left
                  end={{x: 1, y: 0}} // end at right
                  style={{
                    padding: heightPercentageToDP(1.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: heightPercentageToDP(2),
                    flexDirection: 'row',
                    gap: heightPercentageToDP(1),
                  }}>
                  <MaterialCommunityIcons
                    name={'delete'}
                    size={heightPercentageToDP(3)}
                    color={COLORS.black}
                    style={styles.icon}
                  />

                  <Text style={styles.titleSemiBold}>Remove User</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AllUserToUserListComp;

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
    padding: heightPercentageToDP(2),
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  paymentOption: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentageToDP(15),
    borderRadius: heightPercentageToDP(2),
    alignItems: 'center',
    gap: heightPercentageToDP(3),
    paddingStart: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
  },
  iconContainer: {
    backgroundColor: COLORS.white_s,
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(1),
  },
  icon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: heightPercentageToDP(1.5),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  topContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    height: 1,
    backgroundColor: COLORS.white_s,
  },
  titleRegular: {
    fontSize: heightPercentageToDP(1.5),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  titleBold: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Bold,
  },
  titleSemiBold: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.white_s,
    fontFamily: FONT.Montserrat_Bold,
  },
  acceptBtn: {
    backgroundColor: COLORS.green,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentageToDP(0.5),
    borderRadius: heightPercentageToDP(2),
  },
});
