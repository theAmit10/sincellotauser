import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainBackgroundWithoutScrollview from '../components/background/MainBackgroundWithoutScrollview';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useCreateNotificationMutation} from '../helper/Networkcall';
import Toast from 'react-native-toast-message';
import Loading from '../components/helpercComponent/Loading';
import {useNavigation} from '@react-navigation/native';

const CreatePowerballNotification = ({route}) => {
  const {data} = route.params;

  const {accesstoken} = useSelector(state => state.user);
  const navigation = useNavigation();

  const [titleValue, setTitle] = useState('');
  const [discriptionValue, setDescription] = useState('');

  const [createNotification, {isLoading}] = useCreateNotificationMutation();

  const updateSubmitHandler = async () => {
    try {
      if (!titleValue) {
        Toast.show({
          type: 'error',
          text1: 'Please enter title',
        });
        return;
      }
      if (!discriptionValue) {
        Toast.show({
          type: 'error',
          text1: 'Please enter description',
        });
        return;
      }

      const body = {
        title: titleValue,
        description: discriptionValue,
        userId: data.userId,
      };

      const res = await createNotification({
        accesstoken,
        body,
      });

      console.log(JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      navigation.goBack();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <MainBackgroundWithoutScrollview
      title={'Create Notification'}
      lefttext={data.userId}
      righttext={data.name}>
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
            color: COLORS.black,
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
          marginTop: heightPercentageToDP(2),
        }}>
        <TextInput
          style={{
            marginStart: heightPercentageToDP(1),
            flex: 1,
            fontFamily: FONT.Montserrat_Regular,
            minHeight: heightPercentageToDP(20),
            textAlignVertical: 'top',
            color: COLORS.black,
          }}
          placeholder="Enter Description"
          placeholderTextColor={COLORS.black}
          label="location"
          value={discriptionValue}
          onChangeText={text => setDescription(text)}
          multiline={true}
        />
      </View>

      {isLoading ? (
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
            onPress={updateSubmitHandler}
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
    </MainBackgroundWithoutScrollview>
  );
};

export default CreatePowerballNotification;

const styles = StyleSheet.create({});
