import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import GradientText from '../components/helpercComponent/GradientText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllUsers} from '../redux/actions/userAction';
import {serverName} from '../redux/store';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import LinearGradient from 'react-native-linear-gradient';
import {useGetAllSubAdminQuery} from '../helper/Networkcall';
import Toast from 'react-native-toast-message';
import UrlHelper from '../helper/UrlHelper';
import axios from 'axios';

const ModifySubadmin = ({route}) => {
  const {userdata} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);

  const {
    isLoading: loadingAll,
    data: allusers,
    isError,
    refetch,
  } = useGetAllSubAdminQuery(accesstoken);

  const focused = useIsFocused();

  useEffect(() => {
    setFilteredData(allusers?.users); // Update filteredData whenever locations change
  }, [allusers]);

  const {accesstoken, singleuser, loadingSingleUser} = useSelector(
    state => state.user,
  );

  // FOR UPDATING ROLE

//   useEffect(() => {
//     if (singleuser ) {
//       setSelectedRole(userdata.role);
//     }
//   }, [singleuser]);

  const [loadingUpdateRole, setLoadingUpdateRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(userdata.role);

  const settingRoleForSubAdmin = role => {
    setSelectedRole(role);
    updateProfileRoleHandler(role);
  };

  // FOR ROLE
  const updateProfileRoleHandler = async role => {
    if (!role) {
      Toast.show({
        type: 'error',
        text1: 'Please select a role',
      });
    } else {
      setLoadingUpdateRole(true);

      try {
        const {data} = await axios.put(
          UrlHelper.UPDATE_SUBADMIN_ROLE_API,
          {
            id: userdata._id,
            role: role,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accesstoken}`,
            },
          },
        );

        console.log('datat :: ' + data);

        refetch();

        Toast.show({
          type: 'success',
          text1: data.message,
        });
        navigation.goBack();
        setLoadingUpdateRole(false);
      } catch (error) {
        setLoadingUpdateRole(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
          source={require('../../assets/image/tlwbg.jpg')}
          style={{
            width: '100%',
            height: heightPercentageToDP(85),
          }}
          imageStyle={{
            borderTopLeftRadius: heightPercentageToDP(5),
            borderTopRightRadius: heightPercentageToDP(5),
          }}>
          {/** Main Cointainer */}

          <View
            style={{
              height: heightPercentageToDP(85),
              width: widthPercentageToDP(100),
              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
            {/** Top Style View */}
            <View
              style={{
                height: heightPercentageToDP(5),
                width: widthPercentageToDP(100),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: widthPercentageToDP(20),
                  height: heightPercentageToDP(0.8),
                  backgroundColor: COLORS.grayBg,
                  borderRadius: heightPercentageToDP(2),
                }}></View>
            </View>

            {/** Content Container */}

            <View
              style={{
                height: heightPercentageToDP(15),
                margin: heightPercentageToDP(2),
              }}>
              <GradientTextWhite style={styles.textStyle}>
                Update Role
              </GradientTextWhite>
            </View>

            <View
              style={{
                flex: 2,
              }}>
              {loadingAll ? (
                <Loading />
              ) : loadingUpdateRole ? (
                <Loading />
              ) : (
                <>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      paddingStart: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_SemiBold,
                        fontSize: heightPercentageToDP(2.5),
                        textAlignVertical: 'center',
                      }}>
                      Current Role
                    </Text>
                  </View>

                  <LinearGradient
                    colors={[COLORS.lightyellow, COLORS.darkyellow]}
                    start={{x: 0, y: 0}} // start from left
                    end={{x: 1, y: 0}} // end at right
                    style={{
                      ...styles.item,
                      backgroundColor: COLORS.lightDarkGray,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: heightPercentageToDP(2),
                      }}>
                      {/** User Name */}

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: heightPercentageToDP(2.5),
                            textAlignVertical: 'center',
                          }}>
                          {selectedRole === "subadmin" ? "Sub Admin" : selectedRole}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      paddingStart: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: FONT.Montserrat_SemiBold,
                        fontSize: heightPercentageToDP(2.5),
                        textAlignVertical: 'center',
                      }}>
                      Select a role
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => settingRoleForSubAdmin('admin')}>
                    <LinearGradient
                      colors={[COLORS.lightblue, COLORS.midblue]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        ...styles.item,
                        backgroundColor: COLORS.lightDarkGray,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: heightPercentageToDP(2),
                        }}>
                        {/** User Name */}

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: COLORS.black,
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(2.5),
                              textAlignVertical: 'center',
                            }}>
                            Admin
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => settingRoleForSubAdmin('subadmin')}>
                    <LinearGradient
                      colors={[COLORS.lightblue, COLORS.midblue]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        ...styles.item,
                        backgroundColor: COLORS.lightDarkGray,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: heightPercentageToDP(2),
                        }}>
                        {/** User Name */}

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: COLORS.black,
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(2.5),
                              textAlignVertical: 'center',
                            }}>
                            Sub Admin
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => settingRoleForSubAdmin('user')}>
                    <LinearGradient
                      colors={[COLORS.lightblue, COLORS.midblue]}
                      start={{x: 0, y: 0}} // start from left
                      end={{x: 1, y: 0}} // end at right
                      style={{
                        ...styles.item,
                        backgroundColor: COLORS.lightDarkGray,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: heightPercentageToDP(2),
                        }}>
                        {/** User Name */}

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: COLORS.black,
                              fontFamily: FONT.Montserrat_SemiBold,
                              fontSize: heightPercentageToDP(2.5),
                              textAlignVertical: 'center',
                            }}>
                            User
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/** Bottom Submit Container */}

            {/** end */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default ModifySubadmin;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.white_s,
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
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});
