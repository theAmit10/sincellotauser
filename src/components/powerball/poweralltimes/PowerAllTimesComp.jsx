import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT} from '../../../../assets/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../helpercComponent/Loading';

const PowerAllTimesComp = ({
  time,
  fromicon,
  iconname,
  fromIconDelete,
  iconNameDelete,
  navigate,
  forprocess,
  item,
  selectedItem,
  setSelectedItem,
  handleDelete,
  deleteTimeIsLoading,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <LinearGradient
        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
        start={{x: 0, y: 0}} // start from left
        end={{x: 1, y: 0}} // end at right
        style={{
          justifyContent: 'flex-start',
          height: heightPercentageToDP(10),
          borderRadius: heightPercentageToDP(2),
          marginTop: heightPercentageToDP(2),
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            paddingHorizontal: heightPercentageToDP(2),
          }}>
          <Text
            style={{
              fontFamily: FONT.Montserrat_Bold,
              fontSize: heightPercentageToDP(2),
              color: COLORS.black,
            }}>
            {time}
          </Text>
        </View>
        {deleteTimeIsLoading ? (
          selectedItem && selectedItem._id === item._id ? (
            <Loading />
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingEnd: heightPercentageToDP(1),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(navigate, {item})}
                style={{
                  padding: heightPercentageToDP(1),
                  backgroundColor: COLORS.white_s,
                  justifyContent: 'center',
                  margin: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                {fromicon === 'FontAwesome6' && (
                  <FontAwesome6
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                )}
                {fromicon === 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromicon === 'FontAwesome5' && (
                  <FontAwesome5
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromicon === 'FontAwesome' && (
                  <FontAwesome
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}

                {fromicon === 'Ionicons' && (
                  <Ionicons
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={{
                  padding: heightPercentageToDP(1),
                  backgroundColor: COLORS.white_s,
                  justifyContent: 'center',
                  margin: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                {fromIconDelete === 'FontAwesome6' && (
                  <FontAwesome6
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                )}
                {fromIconDelete === 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromIconDelete === 'FontAwesome5' && (
                  <FontAwesome5
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromIconDelete === 'FontAwesome' && (
                  <FontAwesome
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}

                {fromIconDelete === 'Ionicons' && (
                  <Ionicons
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>
            </View>
          )
        ) : (
          fromicon && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingEnd: heightPercentageToDP(1),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(navigate, {item})}
                style={{
                  padding: heightPercentageToDP(1),
                  backgroundColor: COLORS.white_s,
                  justifyContent: 'center',
                  margin: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                {fromicon === 'FontAwesome6' && (
                  <FontAwesome6
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                )}
                {fromicon === 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromicon === 'FontAwesome5' && (
                  <FontAwesome5
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromicon === 'FontAwesome' && (
                  <FontAwesome
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}

                {fromicon === 'Ionicons' && (
                  <Ionicons
                    name={iconname}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={{
                  padding: heightPercentageToDP(1),
                  backgroundColor: COLORS.white_s,
                  justifyContent: 'center',
                  margin: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                {fromIconDelete === 'FontAwesome6' && (
                  <FontAwesome6
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                  />
                )}
                {fromIconDelete === 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromIconDelete === 'FontAwesome5' && (
                  <FontAwesome5
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
                {fromIconDelete === 'FontAwesome' && (
                  <FontAwesome
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}

                {fromIconDelete === 'Ionicons' && (
                  <Ionicons
                    name={iconNameDelete}
                    size={heightPercentageToDP(3)}
                    color={COLORS.darkGray}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>
            </View>
          )
        )}
      </LinearGradient>
    </View>
  );
};

export default PowerAllTimesComp;

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
});
