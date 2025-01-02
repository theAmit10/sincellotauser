import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Background from '../components/background/Background';
import Loading from '../components/helpercComponent/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllUsers, loadSingleUser} from '../redux/actions/userAction';
import {serverName} from '../redux/store';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {
  useDeleteSubAdminMutation,
  useGetAllSubAdminQuery,
  useResetSubAdminPasswordMutation,
  useUpdateSubAdminFeatureMutation,
} from '../helper/Networkcall';
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

  const {accesstoken, singleuser, loadingSingleUser, user} = useSelector(
    state => state.user,
  );

  useEffect(() => {
    dispatch(loadSingleUser(accesstoken, userdata._id));
  }, []);

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

  //  ALL FEATUERS PERMISSION STATES
  const [alllocation, setalllocation] = useState(false);
  const [createlocation, setcreatelocation] = useState(false);
  const [createtime, setcreatetime] = useState(false);
  const [edittime, setedittime] = useState(false);
  const [deletetime, setdeletetime] = useState(false);
  const [users, setusers] = useState(false);
  const [withdrawalletbalanceedit, setwithdrawalletbalanceedit] =
    useState(false);
  const [gamewalletbalnceedit, setgamewalletbalnceedit] = useState(false);
  const [useridedit, setuseridedit] = useState(false);
  const [notificationsend, setnotificationsend] = useState(false);
  const [play, setplay] = useState(false);
  const [createresult, setcreateresult] = useState(false);
  const [results, setresults] = useState(false);
  const [deposits, setdeposit] = useState(false);
  const [withdraws, setwithdraws] = useState(false);
  const [paymentoption, setpaymentoption] = useState(false);
  const [wallet, setwallet] = useState(false);
  const [gamedescription, setgamedescription] = useState(false);
  const [promotions, setpromotions] = useState(false);
  const [pushnotification, setpushnotification] = useState(false);
  const [transcationhistory, settransactionhistory] = useState(false);
  const [allcountry, setallcountry] = useState(false);
  const [createcountry, setcreatecountry] = useState(false);
  const [editanddeletecountry, seteditanddeletecountry] = useState(false);
  const [updateprofile, setupdateprofile] = useState(false);
  const [changepassword, setchangepassword] = useState(false);
  const [applinks, setapplinks] = useState(false);
  const [aboutus, setaboutus] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showSettingContiner, setShowSettingContainer] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (singleuser && !loadingSingleUser) {
      if (singleuser.role === 'subadmin') {
        setalllocation(singleuser?.subadminfeature?.alllocation);
        setcreatelocation(singleuser?.subadminfeature?.createlocation);
        setcreatetime(singleuser?.subadminfeature?.createtime);
        setedittime(singleuser?.subadminfeature?.edittime);
        setdeletetime(singleuser?.subadminfeature?.deletetime);
        setusers(singleuser?.subadminfeature?.users);
        setwithdrawalletbalanceedit(
          singleuser?.subadminfeature?.withdrawalletbalanceedit,
        );
        setgamewalletbalnceedit(
          singleuser?.subadminfeature?.gamewalletbalnceedit,
        );
        setuseridedit(singleuser?.subadminfeature?.useridedit);
        setnotificationsend(singleuser?.subadminfeature?.notificationsend);
        setplay(singleuser?.subadminfeature?.play);
        setcreateresult(singleuser?.subadminfeature?.createresult);
        setresults(singleuser?.subadminfeature?.results);
        setdeposit(singleuser?.subadminfeature?.deposits);
        setwithdraws(singleuser?.subadminfeature?.withdraws);
        setpaymentoption(singleuser?.subadminfeature?.paymentoption);
        setwallet(singleuser?.subadminfeature?.wallet);
        setgamedescription(singleuser?.subadminfeature?.gamedescription);
        setpromotions(singleuser?.subadminfeature?.promotions);
        setpushnotification(singleuser?.subadminfeature?.pushnotification);
        settransactionhistory(singleuser?.subadminfeature?.transcationhistory);
        setallcountry(singleuser?.subadminfeature?.allcountry);
        setcreatecountry(singleuser?.subadminfeature?.createcountry);
        seteditanddeletecountry(
          singleuser?.subadminfeature?.editanddeletecountry,
        );
        setupdateprofile(singleuser?.subadminfeature?.updateprofile);
        setchangepassword(singleuser?.subadminfeature?.changepassword);
        setapplinks(singleuser?.subadminfeature?.applinks);
        setaboutus(singleuser?.subadminfeature?.aboutus);
      }
    }
  }, [singleuser, loadingSingleUser]);

  const settingShowSettingConatainer = () => {
    setShowSettingContainer(prevState => !prevState);
  };

  const togglePasswordVisibilityforNEWPASSWORD = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const togglePasswordVisibilityCONFIRMPASSWORD = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleCheckboxChange = (name, checked) => {
    // Dynamically update the state
    switch (name) {
      case 'alllocation':
        setalllocation(checked);
        break;
      case 'createlocation':
        setcreatelocation(checked);
        break;
      case 'createtime':
        setcreatetime(checked);
        break;
      case 'edittime':
        setedittime(checked);
        break;
      case 'deletetime':
        setdeletetime(checked);
        break;
      case 'users':
        setusers(checked);
        break;
      case 'withdrawalletbalanceedit':
        setwithdrawalletbalanceedit(checked);
        break;
      case 'gamewalletbalnceedit':
        setgamewalletbalnceedit(checked);
        break;
      case 'useridedit':
        setuseridedit(checked);
        break;
      case 'notificationsend':
        setnotificationsend(checked);
        break;
      case 'play':
        setplay(checked);
        break;
      case 'createresult':
        setcreateresult(checked);
        break;
      case 'results':
        setresults(checked);
        break;
      case 'deposits':
        setdeposit(checked);
        break;
      case 'withdraws':
        setwithdraws(checked);
        break;
      case 'paymentoption':
        setpaymentoption(checked);
        break;
      case 'wallet':
        setwallet(checked);
        break;
      case 'gamedescription':
        setgamedescription(checked);
        break;
      case 'promotions':
        setpromotions(checked);
        break;
      case 'pushnotification':
        setpushnotification(checked);
        break;
      case 'transcationhistory':
        settransactionhistory(checked);
        break;
      case 'allcountry':
        setallcountry(checked);
        break;
      case 'createcountry':
        setcreatecountry(checked);
        break;
      case 'editanddeletecountry':
        seteditanddeletecountry(checked);
        break;
      case 'updateprofile':
        setupdateprofile(checked);
        break;
      case 'changepassword':
        setchangepassword(checked);
        break;
      case 'applinks':
        setapplinks(checked);
        break;
      case 'aboutus':
        setaboutus(checked);
        break;
      default:
        break;
    }
  };

  // FOR ROLE

  const [
    resetSubAdminPassword,
    {isLoading: resetIsLoading, isError: resetIsError},
  ] = useResetSubAdminPasswordMutation();

  const changePasswordHandler = async () => {
    if (!newPassword) {
      Toast.show({
        type: 'error',
        text1: 'Please enter your new password',
      });
    } else if (!confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Please enter your confirm password',
      });
    } else if (newPassword != confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'New password and confirm password not matched',
      });
    } else {
      try {
        const body = {
          newPassword: newPassword,
        };

        console.log('JSON BODY :: ', JSON.stringify(body));

        const res = await resetSubAdminPassword({
          accesstoken: accesstoken,
          userId: singleuser.userId,
          body: body,
        }).unwrap();

        Toast.show({
          type: 'success',
          text1: res.message,
        });

        setNewPassword('');
        setConfirmPassword('');
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
        console.log(error);
      }
    }
  };

  const [
    updateSubAdminFeature,
    {isLoading: updateIsLoading, isError: updateIsError},
  ] = useUpdateSubAdminFeatureMutation();

  const submitUpdateRequest = async () => {
    try {
      const body = {
        alllocation: alllocation,
        createlocation: createlocation,
        createtime: createtime,
        edittime: edittime,
        deletetime: deletetime,
        users: users,
        withdrawalletbalanceedit: withdrawalletbalanceedit,
        gamewalletbalnceedit: gamewalletbalnceedit,
        useridedit: useridedit,
        notificationsend: notificationsend,
        play: play,
        createresult: createresult,
        results: results,
        deposits: deposits,
        withdraws: withdraws,
        paymentoption: paymentoption,
        wallet: wallet,
        gamedescription: gamedescription,
        promotions: promotions,
        pushnotification: pushnotification,
        transcationhistory: transcationhistory,
        allcountry: allcountry,
        createcountry: createcountry,
        editanddeletecountry: editanddeletecountry,
        updateprofile: updateprofile,
        changepassword: changepassword,
        applinks: applinks,
        aboutus: aboutus,
      };

      console.log('JSON BODY :: ', JSON.stringify(body));

      const res = await updateSubAdminFeature({
        accesstoken: accesstoken,
        userId: singleuser.userId,
        body: body,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: res.message,
      });
    } catch (error) {
      console.log('Error during deposit:', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const [deleteSubAdmin, {isLoading: deleteIsLoading, isError: deleteIsError}] =
    useDeleteSubAdminMutation();

  // FOR DELETE SUBADMIN
  const deleteSubAdminHandler = async () => {
    try {
      const res = await deleteSubAdmin({
        accesstoken: accesstoken,
        userId: singleuser.userId,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: res.message,
      });
      // refetch();
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-60}>
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
            {/** Main Container */}
            <View
              style={{
                flex: 1, // Take up all available space
                borderTopLeftRadius: heightPercentageToDP(5),
                borderTopRightRadius: heightPercentageToDP(5),
              }}>
              {/** Top Style View */}
              <View
                style={{
                  height: heightPercentageToDP(5),
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
                  marginHorizontal: heightPercentageToDP(2),
                  marginTop: heightPercentageToDP(-1),
                  marginBottom: heightPercentageToDP(1),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <GradientTextWhite style={styles.textStyle}>
                  All Feature
                </GradientTextWhite>
                <TouchableOpacity onPress={settingShowSettingConatainer}>
                  <Ionicons
                    name={
                      showSettingContiner ? 'close-circle-outline' : 'settings'
                    }
                    size={heightPercentageToDP(4)}
                    color={COLORS.white_s}
                  />
                </TouchableOpacity>
              </View>

              {/** ScrollView Container */}

              {showSettingContiner ? (
                <View style={{flex: 1}}>
                  {deleteIsLoading ? (
                    <Loading />
                  ) : (
                    <TouchableOpacity onPress={deleteSubAdminHandler}>
                      <LinearGradient
                        colors={[COLORS.lightblue, COLORS.midblue]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          ...styles.item,
                          backgroundColor: COLORS.lightDarkGray,
                        }}>
                        <Text style={styles.featureLabel}>Delete SubAdmin</Text>
                        <View style={styles.saFContentContainer}>
                          <MaterialCommunityIcons
                            name="delete"
                            size={heightPercentageToDP(4)}
                            color={COLORS.black}
                          />
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      marginHorizontal: heightPercentageToDP(2),

                      marginBottom: heightPercentageToDP(1),
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: heightPercentageToDP(1),
                    }}>
                    <GradientTextWhite style={styles.textStyle}>
                      Change Password
                    </GradientTextWhite>

                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        flexDirection: 'row',
                        backgroundColor: COLORS.white_s,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                      }}>
                      <Entypo
                        name={'lock'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.black}
                      />
                      <TextInput
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.SF_PRO_REGULAR,
                          color: COLORS.black,
                        }}
                        placeholderTextColor={COLORS.black}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        secureTextEntry={!newPasswordVisible}
                      />
                      <Entypo
                        onPress={togglePasswordVisibilityforNEWPASSWORD}
                        name={newPasswordVisible ? 'eye' : 'eye-with-line'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.black}
                      />
                    </View>

                    {/** Confirm  Password container */}
                    <View
                      style={{
                        height: heightPercentageToDP(7),
                        flexDirection: 'row',
                        backgroundColor: COLORS.white_s,
                        alignItems: 'center',
                        paddingHorizontal: heightPercentageToDP(2),
                        borderRadius: heightPercentageToDP(1),
                      }}>
                      <Entypo
                        name={'lock'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.black}
                      />
                      <TextInput
                        style={{
                          marginStart: heightPercentageToDP(1),
                          flex: 1,
                          fontFamily: FONT.SF_PRO_REGULAR,
                          color: COLORS.black,
                        }}
                        placeholder="Confirm Password"
                        placeholderTextColor={COLORS.black}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry={!confirmPasswordVisible}
                      />
                      <Entypo
                        onPress={togglePasswordVisibilityCONFIRMPASSWORD}
                        name={confirmPasswordVisible ? 'eye' : 'eye-with-line'}
                        size={heightPercentageToDP(3)}
                        color={COLORS.black}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      margin: heightPercentageToDP(2),
                    }}>
                    {resetIsLoading ? (
                      <View style={{padding: heightPercentageToDP(2)}}>
                        <Loading />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={changePasswordHandler}
                        style={{
                          backgroundColor: COLORS.blue,
                          padding: heightPercentageToDP(2),
                          borderRadius: heightPercentageToDP(1),
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            fontFamily: FONT.Montserrat_Regular,
                          }}>
                          Submit
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  {user && user.role === 'admin' ? (
                    <>
                      {updateIsLoading ? (
                        <Loading />
                      ) : (
                        <>
                          <ScrollView contentContainerStyle={{flexGrow: 1}}>
                            <View
                              style={{
                                flex: 1,
                              }}>
                              {loadingAll ? (
                                <Loading />
                              ) : loadingUpdateRole ? (
                                <Loading />
                              ) : (
                                <>
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        All location
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={alllocation}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'alllocation',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {alllocation
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Create Location */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Create Location
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={createlocation}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'createlocation',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {createlocation
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Create Time */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Create Time
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={createtime}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'createtime',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {createtime
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Edit Time */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Edit Time
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={edittime}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'edittime',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {edittime ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Delete Time */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Delete Time
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={deletetime}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'deletetime',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {deletetime
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Users */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Users
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={users}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'users',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {users ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Withdraw Wallet Balance Edit */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Withdraw W. Bal. Edit
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={withdrawalletbalanceedit}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'withdrawalletbalanceedit',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {withdrawalletbalanceedit
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Game Wallet Balance Edit */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Game W. Bal Edit
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={gamewalletbalnceedit}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'gamewalletbalnceedit',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {gamewalletbalnceedit
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* User ID Edit */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        User ID Edit
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={useridedit}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'useridedit',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {useridedit
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Notification Send */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Notification Send
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={notificationsend}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'notificationsend',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {notificationsend
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  {/* Play */}
                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Play
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={play}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'play',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {play ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Create Result
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={createresult}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'createresult',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {createresult
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Results
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={results}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'results',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {results ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Deposits
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={deposits}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'deposits',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {deposits ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Withdraws
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={withdraws}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'withdraws',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {withdraws
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Payment Option
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={paymentoption}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'paymentoption',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {paymentoption
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Wallet
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={wallet}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'wallet',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {wallet ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Game Description
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={gamedescription}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'gamedescription',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {gamedescription
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Promotions
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={promotions}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'promotions',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {promotions
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Push Notification
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={pushnotification}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'pushnotification',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {pushnotification
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Transaction History
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={transcationhistory}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'transcationhistory',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {transcationhistory
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        All Country
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={allcountry}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'allcountry',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {allcountry
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Create Country
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={createcountry}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'createcountry',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {createcountry
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Edit & Delete Country
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={editanddeletecountry}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'editanddeletecountry',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {editanddeletecountry
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Update Profile
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={updateprofile}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'updateprofile',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {updateprofile
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        Change Password
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={changepassword}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'changepassword',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {changepassword
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        App Links
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={applinks}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'applinks',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {applinks ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <LinearGradient
                                      colors={[
                                        COLORS.lightblue,
                                        COLORS.midblue,
                                      ]}
                                      start={{x: 0, y: 0}}
                                      end={{x: 1, y: 0}}
                                      style={{
                                        ...styles.item,
                                        backgroundColor: COLORS.lightDarkGray,
                                      }}>
                                      <Text style={styles.featureLabel}>
                                        About Us
                                      </Text>
                                      <View style={styles.saFContentContainer}>
                                        <CheckBox
                                          value={aboutus}
                                          onValueChange={checked =>
                                            handleCheckboxChange(
                                              'aboutus',
                                              checked,
                                            )
                                          }
                                          tintColors={{
                                            true: COLORS.black,
                                            false: COLORS.black,
                                          }} // checkbox color
                                        />
                                        <Text
                                          style={{
                                            ...styles.featureLabel,
                                            color: COLORS.black,
                                          }}>
                                          {aboutus ? 'Allowed' : 'Not Allowed'}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </TouchableOpacity>
                                </>
                              )}
                            </View>
                          </ScrollView>

                          <View
                            style={{
                              marginBottom: heightPercentageToDP(5),
                              marginHorizontal: heightPercentageToDP(2),
                              marginTop: heightPercentageToDP(2),
                            }}>
                            {/** Create location container */}

                            <TouchableOpacity
                              onPress={submitUpdateRequest}
                              style={{
                                backgroundColor: COLORS.blue,
                                padding: heightPercentageToDP(2),
                                borderRadius: heightPercentageToDP(1),
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: COLORS.white,
                                  fontFamily: FONT.Montserrat_Regular,
                                }}>
                                Update Feature
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </>
                  ) : null}
                </View>
              )}

              {/** Bottom Submit Container */}
              {/** Add your bottom button or submission components here */}
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
  saFContainer: {},
  saFContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: heightPercentageToDP(2), // If gap is supported in your version of React Native, otherwise use margin
  },
  featureLabel: {
    color: COLORS.black,
    fontFamily: FONT.Montserrat_SemiBold, // Retaining your given font style
    fontSize: heightPercentageToDP(2), // Adjusted to match the heightPercentageToDP(2.5) from your original code
    textAlignVertical: 'center',
  },
});
