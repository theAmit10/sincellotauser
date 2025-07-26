import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import Loading from '../helpercComponent/Loading';
import {useNavigation} from '@react-navigation/native';

const getTotalAmount = users => {
  return users.reduce((total, user) => total + (user.amount || 0), 0);
};

const PartnerPerformanceComp = ({
  item,
  expandedItems,
  setExpandedItems,
  toggleItem,
}) => {
  const navigation = useNavigation();

  const data = {
    userId: item.partnerId,
    name: item.name,
  };

  return (
    <LinearGradient
      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
      start={{x: 0, y: 0}} // start from left
      end={{x: 1, y: 0}} // end at right
      style={{
        justifyContent: 'flex-start',
        height: expandedItems[item._id]
          ? heightPercentageToDP(25)
          : heightPercentageToDP(10),
        borderRadius: heightPercentageToDP(2),
        marginTop: heightPercentageToDP(2),
      }}>
      <TouchableOpacity
        onPress={() => toggleItem(item._id)}
        style={{
          flex: 1,
          borderTopLeftRadius: heightPercentageToDP(2),
          borderTopEndRadius: heightPercentageToDP(2),
          flexDirection: 'row',
          marginBottom: heightPercentageToDP(1),
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PartnerDetails', {
              data: data,
            });
          }}
          style={{
            flex: 1,
            padding: heightPercentageToDP(1),
          }}>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.title}>Partner ID</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData}>{item.partnerId}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.title}>Contribution Amount</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData}>{getTotalAmount(item.users)}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.title}>Contribution Percentage</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData}>
              {item.contributionPercentage.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.title}>Profit</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData} adjustsFontSizeToFit={true}>
              {item.profitAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {expandedItems[item._id] && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.white_s,
              marginHorizontal: heightPercentageToDP(2),
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              padding: heightPercentageToDP(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={styles.titleData}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              {item.name}
            </Text>
          </View>

          {/** BOTTOM DEPOSIT DETAILS CONTAINER  */}

          <View
            style={{
              flex: 1,
              borderBottomLeftRadius: heightPercentageToDP(2),
              borderBottomEndRadius: heightPercentageToDP(2),
              flexDirection: 'row',
              padding: heightPercentageToDP(1),
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.title}>Total no. of users</Text>
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>{item.users.length}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.title}>Currency</Text>
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>
                  {item?.currency?.countrycurrencysymbol}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.title}>Profit Percentage</Text>
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>{item.profitPercentage}%</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.title}>Recharge Percentage</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>{item.rechargePercentage}%</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default PartnerPerformanceComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentageToDP(15),
    borderRadius: heightPercentageToDP(2),
    alignItems: 'center',
    gap: heightPercentageToDP(3),
    paddingStart: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
  },
  title: {
    fontFamily: FONT.Montserrat_Regular,
    fontSize: heightPercentageToDP(1.6),
    color: COLORS.black,
  },
  titleData: {
    fontFamily: FONT.Montserrat_Bold,
    fontSize: heightPercentageToDP(1.7),
    color: COLORS.black,
  },
});
