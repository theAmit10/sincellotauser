import {
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
  import Toast from 'react-native-toast-message';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Background from '../components/background/Background';
  import Entypo from 'react-native-vector-icons/Entypo';
  import {useDispatch, useSelector} from 'react-redux';
  import {createLocation} from '../redux/actions/locationAction';
  import Loading from '../components/helpercComponent/Loading';
  import {useNavigation} from '@react-navigation/native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import LinearGradient from 'react-native-linear-gradient';
  import UrlHelper from '../helper/UrlHelper';
  import axios from 'axios';
  
  const CreateNotification = ({route}) => {
    const {userdata} = route.params;
    const [enterData, setEnterData] = useState('');
    const {accesstoken} = useSelector(state => state.user);
    const {loading, location} = useSelector(state => state.location);
    const [titleValue, setTitle] = useState('');
    const [discriptionValue, setDescription] = useState('');
  
    const dispatch = useDispatch();
    const navigation = useNavigation();
  
   
    const [showProgressBar, setProgressBar] = useState(false);
  
    const updateProfileHandler = async () => {
      if (!titleValue) {
        Toast.show({
          type: 'error',
          text1: 'Enter Title',
        });
      } else if (!discriptionValue) {
        Toast.show({
          type: 'error',
          text1: 'Enter Discription',
        });
      } else {
        setProgressBar(true);
  
        try {
          const url = `${UrlHelper.SEND_NOTIFICATION_SINGLE_USER}`;
          const {data} = await axios.post(
            url,
            {
                title: titleValue,
                description: discriptionValue,
                devicetoken: userdata?.devicetoken
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accesstoken}`,
              },
            },
          );
  
          console.log('datat :: ' + data);
  
          Toast.show({
            type: 'success',
            text1: data.message,
          });
          setProgressBar(false);
  
          navigation.goBack()
          
        } catch (error) {
          setProgressBar(false);
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
          });
          console.log(error);
          console.log(error.response.data.message);
        }
      }
    };
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <Background />
  
        <View
          style={{
            margin: heightPercentageToDP(2),
            backgroundColor: 'transparent',
          }}>
          <GradientText style={styles.textStyle}>Push</GradientText>
          <GradientText style={styles.textStyle}>Notification</GradientText>
        </View>
  
        {/** Login Cointainer */}
  
        <View
          style={{
            height: heightPercentageToDP(65),
            width: widthPercentageToDP(100),
            backgroundColor: COLORS.white_s,
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
  
          {/** Result Main Container */}
  
          <View style={{padding: heightPercentageToDP(2)}}>
            <GradientText
              style={{
                fontFamily: FONT.Montserrat_Regular,
                fontSize: heightPercentageToDP(2.5),
                color: COLORS.black,
                marginBottom: heightPercentageToDP(1),
              }}>
              Send Notification
            </GradientText>
  
            {/** Title container */}
  
            <View
              style={{
                height: heightPercentageToDP(7),
                flexDirection: 'row',
                backgroundColor: COLORS.grayHalfBg,
                alignItems: 'center',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
      
              }}>
              <LinearGradient
                colors={[COLORS.lightWhite, COLORS.white_s]}
                className="rounded-xl p-1">
                <MaterialIcons
                  name={'description'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.black}
                />
              </LinearGradient>
              <TextInput
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  color: COLORS.black
                }}
                placeholder="Enter Title"
                placeholderTextColor={COLORS.black}
                label="location"
                value={titleValue}
                onChangeText={text => setTitle(text)}
              />
            </View>
  
            {/** Description Containter */}
  
            <View
              style={{
                height: heightPercentageToDP(20),
                flexDirection: 'row',
                backgroundColor: COLORS.grayHalfBg,
                alignItems: 'flex-start',
                paddingHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                marginTop: heightPercentageToDP(2)
              }}>
              <TextInput
                style={{
                  marginStart: heightPercentageToDP(1),
                  flex: 1,
                  fontFamily: FONT.Montserrat_Regular,
                  minHeight: heightPercentageToDP(20),
                  textAlignVertical: 'top',
                  color:COLORS.black
                }}
                placeholder="Enter Description"
                placeholderTextColor={COLORS.black}
                label="location"
                value={discriptionValue}
                onChangeText={text => setDescription(text)}
                multiline={true}
              />
            </View>
          </View>
  
          {showProgressBar ? (
            <View style={{flex: 1}}>
              <Loading />
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                alignItems: 'flex-end',
                paddingVertical: heightPercentageToDP(4),
                paddingHorizontal: heightPercentageToDP(2),
              }}>
              <TouchableOpacity
                onPress={updateProfileHandler}
                className="rounded-full"
                style={{
                  height: heightPercentageToDP(7),
                  width: heightPercentageToDP(7),
                  flexDirection: 'row',
                  backgroundColor: COLORS.blue,
                  alignItems: 'center',
                  paddingHorizontal: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(1),
                }}>
                <Ionicons
                  name={'send'}
                  size={heightPercentageToDP(3)}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };
  
  export default CreateNotification;
  
  const styles = StyleSheet.create({
    textStyle: {
      fontSize: heightPercentageToDP(4),
      fontFamily: FONT.Montserrat_Bold,
    },
  });
  