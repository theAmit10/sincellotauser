import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT} from '../../../assets/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../helpercComponent/Loading';

const AllSubPartnerComp = ({
  navigate,
  userid,
  name,
  profitpercentage,
  rechargepercentage,
  noofumser,
  walletbalance,
  item,
  profitloading,
  rechargeloading,
  toggleSwitchRecharge,
  toggleSwitchProfit,
  selectedItem,
}) => {
  const navigation = useNavigation();

  console.log(JSON.stringify(item));

  const userdata = {
    userId: item.partnerId,
  };
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(item);
        navigation.navigate(navigate, {data: item});
      }}>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDetails', {
                  userdata: item,
                  fromscreen: 'partner',
                });
              }}
              style={{
                flex: 0.8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>User ID</Text>
              <Text style={styles.titleBold}>{userid}</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>Name</Text>
              <Text style={styles.titleBold} numberOfLines={1}>
                {name}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>Users</Text>
              <Text style={styles.titleBold} numberOfLines={1}>
                {noofumser}
              </Text>
            </View>

            <View
              style={{
                flex: 1.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular} numberOfLines={1}>
                Game Balance
              </Text>
              <Text
                style={styles.titleBold}
                numberOfLines={1}
                adjustsFontSizeToFit={true}>
                {walletbalance}
              </Text>
            </View>
          </View>
          <View style={styles.centerLine}></View>
          <View style={styles.bottomContainer}>
            <View
              style={{
                flex: 0.8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>Profit</Text>
              <Text style={styles.titleBold}>{profitpercentage}</Text>
            </View>
            <View
              style={{
                flex: 1.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>Recharge</Text>
              <Text style={styles.titleBold}>{rechargepercentage}</Text>
            </View>
            <View
              style={{
                flex: 1.25,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              {profitloading ? (
                selectedItem?._id === item?._id ? (
                  <Loading />
                ) : (
                  <>
                    <Text style={styles.titleRegular}>Profit</Text>
                    <Switch
                      thumbColor={
                        item.partnerStatus ? COLORS.blue : COLORS.white_s
                      }
                      ios_backgroundColor={
                        item.partnerStatus ? COLORS.blue : '#3e3e3e'
                      }
                      onValueChange={() => toggleSwitchProfit(item)}
                      value={item.partnerStatus}
                    />
                  </>
                )
              ) : (
                <>
                  <Text style={styles.titleRegular}>Profit</Text>
                  <Switch
                    thumbColor={
                      item.partnerStatus ? COLORS.blue : COLORS.white_s
                    }
                    ios_backgroundColor={
                      item.partnerStatus ? COLORS.blue : '#3e3e3e'
                    }
                    onValueChange={() => toggleSwitchProfit(item)}
                    value={item.partnerStatus}
                  />
                </>
              )}
            </View>
            <View
              style={{
                flex: 1.25,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              {rechargeloading ? (
                selectedItem?._id === item?._id ? (
                  <Loading />
                ) : (
                  <>
                    <Text style={styles.titleRegular}>Recharge</Text>
                    <Switch
                      thumbColor={
                        item.rechargeStatus ? COLORS.blue : COLORS.white_s
                      }
                      ios_backgroundColor={
                        item.rechargeStatus ? COLORS.blue : '#3e3e3e'
                      }
                      onValueChange={() => toggleSwitchRecharge(item)}
                      value={item.rechargeStatus}
                    />
                  </>
                )
              ) : (
                <>
                  <Text style={styles.titleRegular}>Recharge</Text>
                  <Switch
                    thumbColor={
                      item.rechargeStatus ? COLORS.blue : COLORS.white_s
                    }
                    ios_backgroundColor={
                      item.rechargeStatus ? COLORS.blue : '#3e3e3e'
                    }
                    onValueChange={() => toggleSwitchRecharge(item)}
                    value={item.rechargeStatus}
                  />
                </>
              )}
            </View>
          </View>

          {/** BOTTOM VIEW */}
          <View style={styles.bottomContainer}>
            {/* <View
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.titleRegular}>Top PartnerId</Text>
                <Text style={styles.titleBold}>{item.topParentId}</Text>
              </View> */}

            {item.parentParentPartnerId !== 1000 && (
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.titleRegular}>Top PartnerId</Text>
                <Text style={styles.titleBold}>
                  {item.parentParentPartnerId}
                </Text>
              </View>
            )}

            {/* <View
              style={{
                flex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>
                {item.parentParentPartnerId === 1000
                  ? 'Top Partner'
                  : 'Sub Partner'}
              </Text>
              <Text style={styles.titleBold}>{item.parentParentPartnerId}</Text>
            </View> */}
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleRegular}>
                {' '}
                {item.parentParentPartnerId === 1000
                  ? 'Top Partner'
                  : 'Sub Partner'}
              </Text>
              <Text style={styles.titleBold} numberOfLines={1}>
                {item.parentPartnerId}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              gap: heightPercentageToDP(1),
            }}>
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 5 / 2,
                backgroundColor: item.partnerStatus ? 'green' : COLORS.red,
              }}
            />
            <Text
              style={[
                styles.titleRegular,
                {
                  color: item.partnerStatus ? 'green' : COLORS.red,
                },
              ]}
              numberOfLines={1}>
              {item.partnerStatus ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AllSubPartnerComp;

const styles = StyleSheet.create({
  bottomView: {
    height: heightPercentageToDP(10),
    backgroundColor: 'pink',
    marginBottom: heightPercentageToDP(1),
    display: 'flex',
    flexDirection: 'row',
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingVertical: heightPercentageToDP(1),
  },
  bottomContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP(1),
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
