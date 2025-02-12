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
}) => {
  return (
    <LinearGradient
      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
      start={{x: 0, y: 0}} // start from left
      end={{x: 1, y: 0}} // end at right
      style={{
        justifyContent: 'flex-start',
        height: expandedItems[item._id]
          ? heightPercentageToDP(18)
          : heightPercentageToDP(9),
        borderRadius: heightPercentageToDP(1),
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
        <View
          style={{
            flex: 1,
            padding: heightPercentageToDP(1),
          }}>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>User ID</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData}>7828</Text>
          </View>
        </View>
        <View
          style={{
            flex: 2,
          }}>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'flex-start',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>Ticket</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData}>8 7 98 67 45 34</Text>
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
            <Text style={styles.title}>Amout</Text>
          </View>
          <View
            style={{
              flex: 1,

              justifyContent: 'flex-start',
            }}>
            <Text style={styles.titleData}>800</Text>
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
                <Text style={styles.titleData}>Aryan khna</Text>
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
                <Text style={styles.title}>Multiplier</Text>
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.titleData}>2X</Text>
              </View>
            </View>
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
