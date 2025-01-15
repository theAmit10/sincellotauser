import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../helpercComponent/Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfitDeducationComp = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const item = {
    _id: 1,
    userId: 1909,
    paymentStatus: 'Pending',
  };

  return (
    <LinearGradient
      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
      start={{x: 0, y: 0}} // start from left
      end={{x: 1, y: 0}} // end at right
      style={{
        justifyContent: 'flex-start',
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
          paddingVertical: heightPercentageToDP(2),
        }}>
        <View
          style={{
            width: widthPercentageToDP(50),

            flexDirection: 'row',
            borderTopLeftRadius: heightPercentageToDP(2),
            borderTopEndRadius: heightPercentageToDP(2),
          }}>
          <View
            style={{
              flex: 1,
              paddingStart: heightPercentageToDP(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(1.6),
                  color: COLORS.black,
                }}>
                User ID
              </Text>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONT.Montserrat_SemiBold,
                  fontSize: heightPercentageToDP(1.8),
                  color: COLORS.black,
                }}>
                {item.userId}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: heightPercentageToDP(1.6),
                  color: COLORS.black,
                }}>
                Parent ID
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONT.Montserrat_SemiBold,
                  fontSize: heightPercentageToDP(1.8),
                  color: COLORS.black,
                }}>
                8948
              </Text>
            </View>
          </View>
        </View>

        {/** Right View */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          {false && item._id === '999' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loading />
            </View>
          ) : (
            <>
              {item.paymentStatus === 'Pending' && (
                <TouchableOpacity
                  onPress={() => showAlertAccepted(item)}
                  style={{
                    width: '40%',
                    paddingHorizontal: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    style={styles.iconContainer}>
                    <AntDesign
                      name={'check'}
                      size={heightPercentageToDP(2)}
                      color={COLORS.green}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {/** PAYMENT STATUS TEXT */}
              {item.paymentStatus === 'Pending' ? (
                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    color: COLORS.black,
                    fontSize: heightPercentageToDP(1.2),
                    textAlignVertical: 'center',
                    alignSelf: 'center',
                  }}>
                  {item.paymentStatus}
                </Text>
              ) : item.paymentStatus === 'Completed' ? (
                <View
                  style={{
                    backgroundColor: COLORS.green,
                    borderRadius: heightPercentageToDP(1),
                    margin: heightPercentageToDP(2),
                    alignSelf: 'center',
                    padding: heightPercentageToDP(1),
                    flex: 1, // Ensure the view takes up space if necessary
                  }}>
                  <Text
                    style={{
                      fontFamily: FONT.Montserrat_SemiBold,
                      color: COLORS.white_s,
                      fontSize: heightPercentageToDP(1.5),
                      textAlignVertical: 'center',
                      textAlign: 'center',
                    }}>
                    {item.paymentStatus}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.red,
                    borderRadius: heightPercentageToDP(2),
                    margin: heightPercentageToDP(2),
                    alignSelf: 'center',
                    padding: heightPercentageToDP(1),
                  }}>
                  <Text
                    style={{
                      fontFamily: FONT.Montserrat_SemiBold,
                      color: COLORS.white_s,
                      fontSize: heightPercentageToDP(1.5),
                      textAlignVertical: 'center',
                      textAlign: 'center',
                    }}>
                    {item.paymentStatus}
                  </Text>
                </View>
              )}

              {item.paymentStatus === 'Pending' && (
                <TouchableOpacity
                  onPress={() => showAlertRejected(item)}
                  style={{
                    width: '40%',
                    paddingHorizontal: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LinearGradient
                    colors={[COLORS.lightWhite, COLORS.white_s]}
                    style={styles.iconContainer}>
                    <AntDesign
                      name={'close'}
                      size={heightPercentageToDP(2)}
                      color={COLORS.red}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </>
          )}
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
              flex: 1,
              borderBottomLeftRadius: heightPercentageToDP(2),
              borderBottomEndRadius: heightPercentageToDP(2),
              flexDirection: 'row',
              paddingHorizontal: heightPercentageToDP(2),
              alignItems: 'center',
              justifyContent: 'center',

              paddingVertical: heightPercentageToDP(1),
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  ...styles.detailLabel,
                }}>
                Name
              </Text>
              <Text style={styles.detailValue} adjustsFontSizeToFit={true}>
                Ali Khan
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={{...styles.detailLabel}}>Profit Percentage</Text>
              <Text style={styles.detailValue}>20 %</Text>
            </View>
          </View>

          {/** FOR SHOWING RECEIPT */}

          {/** BOTTOM DEPOSIT DETAILS CONTAINER  */}

          <View
            style={{
              flex: 1,
              borderBottomLeftRadius: heightPercentageToDP(2),
              borderBottomEndRadius: heightPercentageToDP(2),
              flexDirection: 'row',
              paddingHorizontal: heightPercentageToDP(2),
              alignItems: 'center',
              paddingBottom: heightPercentageToDP(2),
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={{...styles.detailLabel}}>Reason</Text>
              <Text style={styles.detailValue}>
                SerializableStateInvariantMiddleware took 194ms, which is more
                than the warning threshold of 32ms. If your state or actions are
                very large, you may want to disable the middleware as it might
                cause too much of a slowdown in development mode. See
                https://redux-toolkit.js.org/api/getDefaultMiddleware for
              </Text>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default ProfitDeducationComp;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  iconContainer: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
  },
  expandIconContainer: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    width: '33%',
    paddingStart: heightPercentageToDP(1),
  },
  detailLabel: {
    fontFamily: FONT.Montserrat_Regular,
    color: COLORS.black,
    fontSize: heightPercentageToDP(1.5),
  },
  detailValue: {
    fontFamily: FONT.Montserrat_SemiBold,
    color: COLORS.black,
    fontSize: heightPercentageToDP(1.8),
  },
});
