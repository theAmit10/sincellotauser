import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../../assets/constants';
import Loading from '../../helpercComponent/Loading';

const PowerGameInsightsComp = ({
  item,
  expandedItems,
  setExpandedItems,
  toggleItem,
  navigation,
  index,
}) => {
  return (
    <LinearGradient
      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
      start={{x: 0, y: 0}} // start from left
      end={{x: 1, y: 0}} // end at right
      style={{
        justifyContent: 'flex-start',

        borderRadius: heightPercentageToDP(1),
        marginTop: heightPercentageToDP(2),
      }}>
      <TouchableOpacity
        onPress={() => toggleItem(index)}
        style={{
          flex: 1,
          borderTopLeftRadius: heightPercentageToDP(2),
          borderTopEndRadius: heightPercentageToDP(2),
          marginBottom: heightPercentageToDP(1),
          gap: heightPercentageToDP(0.5),
          paddingStart: heightPercentageToDP(1),
        }}>
        <View
          style={{
            flex: 1,

            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.5,

              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>No.</Text>
          </View>
          <View
            style={{
              flex: 0.8,

              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>User ID</Text>
          </View>
          <View
            style={{
              flex: 2,

              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>Ticket</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>Amout</Text>
          </View>
        </View>

        {item.tickets.map((titem, tindex) => (
          <View
            key={tindex}
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingVertical: heightPercentageToDP(0.5),
            }}>
            <View
              style={{
                flex: 0.5,

                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleData}>{index}</Text>
            </View>
            <View
              style={{
                flex: 0.8,

                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleData}>{item.userId}</Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleData}>
                {titem.usernumber.join('  ')}{' '}
                {titem.multiplier > 1 ? ` - ${titem.multiplier}X ` : ''}
              </Text>
            </View>
            <View
              style={{
                flex: 1,

                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.titleData}>{titem.amount}</Text>
            </View>
          </View>
        ))}
      </TouchableOpacity>

      {expandedItems[index] && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.white_s,
              marginHorizontal: heightPercentageToDP(2),
            }}
          />

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
                flex: 2,
              }}>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.title}>Name</Text>
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>{item.username}</Text>
              </View>
            </View>
            {/* <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.title}>Multiplier</Text>
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>2X</Text>
              </View>
            </View> */}
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default PowerGameInsightsComp;

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
