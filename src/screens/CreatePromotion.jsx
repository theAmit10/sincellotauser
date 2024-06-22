import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Image,
  SafeAreaView,
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

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import mime from 'mime';

const CreatePromotion = () => {
  const [enterData, setEnterData] = useState('');
  const {accesstoken} = useSelector(state => state.user);
  const {loading, location} = useSelector(state => state.location);
  const [titleValue, setTitle] = useState('');
  const [discriptionValue, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showProgressBar, setProgressBar] = useState(false);
  const [imageSource, setImageSource] = useState(
    require('../../assets/image/dark_user.png'),
  );

  const checkAndRequestPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (result === RESULTS.DENIED) {
      if (Platform.OS === 'android' && Platform.Version <= 29) {
        // Target Android 10 and above
        const permissionResult = await request(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('Permission not granted!');
          Toast.show({
            type: 'info',
            text1: 'Permission not granted!',
          });
          return;
        }
      }
    }
    // Call your DocumentPicker.pick() function here
    selectDoc();
  };

  // For Opening PhoneStorage
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      // const doc = await DocumentPicker.pickSingle()
      // const doc = await DocumentPicker.pickMultiple({
      //   type: [ DocumentPicker.types.images]
      // })
      if (doc) {
        console.log(doc);
        console.log(doc[0].uri);
        setImageSource({uri: doc[0].uri});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

 // for uploading Profile content
 const handleUpdateProfile = async () => {
  if (!imageSource) {
    Toast.show({
      type: 'error',
      text1: 'Please, add promotion picture',
    });
  } else {
    setProgressBar(true);

    try {
     
      const formData = new FormData();
      console.log('Image URI :: ' + imageSource.uri);

      if(!imageSource.uri)
      {
        Toast.show({
          type: 'error',
          text1: 'Please select a image'
        })
        setProgressBar(false);

      }else{

         // Resize the image
      try {
        console.log('Started Compressing Image');
        const resizedImage = await ImageResizer.createResizedImage(
          imageSource.uri,
          400, // Adjust the dimensions as needed
          400, // Adjust the dimensions as needed
          'JPEG',
          100, // Image quality (0-100)
          0, // Rotation (0 = no rotation)
          null,
        );

        console.log('Compressed Image :: ' + resizedImage.size);
        setImageSource(resizedImage);

        if (imageSource) {
          formData.append('file', {
            uri: resizedImage.uri,
            type: mime.getType(resizedImage.uri),
            name: 'profile.jpg',
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error resizing the image',
          text2: error,
        });
        // console.error('Error resizing the image:', error);
      }

      const response = await axios.post(
        UrlHelper.CREATE_PROMOTIONS_API,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Promotion added successfully:', response.data);
      // console.warn('Profile updated successfully:');
      Toast.show({
        type: 'success',
        text1: 'Promotion added successfully',
      });
      setProgressBar(false);
      navigation.goBack();

      }

     
    } catch (error) {
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

      <View
        style={{
          margin: heightPercentageToDP(2),
          backgroundColor: 'transparent',
        }}>
        <GradientText style={styles.textStyle}>Create</GradientText>
        <GradientText style={styles.textStyle}>Promotion</GradientText>
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
            Upload Promotion
          </GradientText>


          {/** Top View Rectangle View */}

          <TouchableOpacity
            style={{
              ...styles.item,
            }}>
            <View
              style={{
                backgroundColor: COLORS.grayHalfBg,
                height: heightPercentageToDP(20),
                borderRadius: heightPercentageToDP(2),
              }}>
              <Image
                // source={{
                //   uri:
                //     'https://sincelott.onrender.com/uploads/promotion/' +
                //     item.url,
                // }}
                source={imageSource}
                resizeMode="cover"
                style={{
                  height: heightPercentageToDP(20),
                  width: '100%',
                  borderRadius: heightPercentageToDP(2),
                }}
              />
            </View>
          </TouchableOpacity>


          <View
          style={{
            marginBottom: heightPercentageToDP(5),
            marginHorizontal: heightPercentageToDP(2),
            marginTop: heightPercentageToDP(2),
          }}>
          {/** Email container */}

          <TouchableOpacity
            onPress={checkAndRequestPermission}
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
              Add Image
            </Text>
          </TouchableOpacity>
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
              onPress={handleUpdateProfile}
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

export default CreatePromotion;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: heightPercentageToDP(20),
  },
  item: {
    marginVertical: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    color: COLORS.white_s,
    fontFamily: FONT.SF_PRO_MEDIUM,
  },
});
