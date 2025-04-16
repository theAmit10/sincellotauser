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
import {useNavigation} from '@react-navigation/native';

const ProfitDeducationComp = ({
  item,
  expandedItems,
  setExpandedItems,
  toggleItem,
  updateStatusIsLoading,
  selectedItem,
  setSelectedItem,
  selectedItemId,
  setSelectedItemId,
  handleComplete,
  handleCancelled,
}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
      start={{x: 0, y: 0}} // start from left
      end={{x: 1, y: 0}} // end at right
      style={{
        justifyContent: 'flex-start',
        borderRadius: heightPercentageToDP(2),
        marginTop: heightPercentageToDP(1),
      }}>
      <TouchableOpacity
        onPress={() => toggleItem(item._id)}
        style={{
          flex: 1,
          borderTopLeftRadius: heightPercentageToDP(2),
          borderTopEndRadius: heightPercentageToDP(2),
          flexDirection: 'row',
          marginBottom: heightPercentageToDP(1),
          paddingVertical: heightPercentageToDP(1),
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
                Partner ID
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
                {item.partnerId}
              </Text>
            </View>
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
                User ID
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDetails', {
                  userdata: item,
                  fromscreen: 'partner',
                });
              }}
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
        </View>

        {/** Right View */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          {updateStatusIsLoading && item._id === selectedItemId ? (
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
              {item.status === 'Pending' && (
                <TouchableOpacity
                  onPress={() => handleComplete(item)}
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
              {item.status === 'Pending' ? (
                <Text
                  style={{
                    fontFamily: FONT.Montserrat_Regular,
                    color: COLORS.black,
                    fontSize: heightPercentageToDP(1.2),
                    textAlignVertical: 'center',
                    alignSelf: 'center',
                  }}>
                  {item.status}
                </Text>
              ) : item.status === 'Completed' ? (
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
                    {item.status}
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
                    {item.status}
                  </Text>
                </View>
              )}

              {item.status === 'Pending' && (
                <TouchableOpacity
                  onPress={() => handleCancelled(item)}
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
                {item.name}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={{...styles.detailLabel}}>Old Profit % </Text>
              <Text style={styles.detailValue}>{item.oldProfitPercentage}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={{...styles.detailLabel}}>Reduce %</Text>
              <Text style={styles.detailValue}>{item.profitPercentage}</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={{...styles.detailLabel}}>New Profit %</Text>
              <Text style={styles.detailValue}>{item.newProfitPercentage}</Text>
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
              <Text style={styles.detailValue}>{item.reason}</Text>
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
