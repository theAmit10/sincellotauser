
  
    import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
    import React, { useState } from 'react';
    import {
      heightPercentageToDP,
      widthPercentageToDP,
    } from 'react-native-responsive-screen';
  
    import Ionicons from 'react-native-vector-icons/Ionicons';
    import { useNavigation } from '@react-navigation/native';
   
    import { useSelector } from 'react-redux';
    import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
    import Toast from 'react-native-toast-message';
    import DocumentPicker from 'react-native-document-picker';
    import ImageResizer from '@bam.tech/react-native-image-resizer';
import GradientText from '../components/helpercComponent/GradientText';
import { COLORS, FONT } from '../../assets/constants';
    
    const UserDetails  = ({userdata}) => {
      const navigation = useNavigation();
    
      const { user, accesstoken, loading } = useSelector(state => state.user);
    
      const source = require('../../assets/image/dummy_user.jpeg');
      const [imageSource, setImageSource] = useState(source);
    
      const [showProgressBar, setProgressBar] = useState(false);
    
      const checkAndRequestPermission = async () => {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    
        if (result === RESULTS.DENIED) {
          if (Platform.OS === 'android' && Platform.Version <= 29) { // Target Android 10 and above
            const permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            if (permissionResult !== RESULTS.GRANTED) {
              console.log('Permission not granted!');
              Toast.show({
                type: 'info',
                text1: 'Permission not granted!'
              })
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
            setImageSource({ uri: doc[0].uri });
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
            text1: 'Add profile picture',
          });
          
        } else {
          setProgressBar(true);
    
          try {
            const bearerToken =
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';
    
            const formData = new FormData();
            formData.append('first_name', firstNameVal);
            formData.append('last_name', secondNameVal);
            formData.append('phone', '987654312');
            formData.append('country', 'India');
            formData.append('gender', 'Male');
    
            console.log('Image URI :: ' + imageSource.uri);
    
            // Resize the image
            try {
              console.log('Started Compressing Image');
              const resizedImage = await ImageResizer.createResizedImage(
                imageSource.uri,
                200, // Adjust the dimensions as needed
                200, // Adjust the dimensions as needed
                'JPEG',
                100, // Image quality (0-100)
                0, // Rotation (0 = no rotation)
                null,
              );
    
              console.log('Compressed Image :: ' + resizedImage.size);
              setImageSource(resizedImage);
    
              if (imageSource) {
                formData.append('photo', {
                  uri: resizedImage.uri,
                  type: 'image/jpeg',
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
              'https://www.hostmansa.com/crypto/public/api/update-profile',
              formData,
              {
                headers: {
                  userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
                  Authorization: `Bearer ${ACCESS_TOKEN.data}`,
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
    
            console.log('Profile updated successfully:', response.data);
            // console.warn('Profile updated successfully:');
            Toast.show({
              type: 'error',
              text1: 'Profile updated successfully',
            });
            setProgressBar(false);
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
    
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white_s,
          }}>
          {/** Top View Rectangle View */}
          <View
            style={{
              width: heightPercentageToDP(30),
              height: heightPercentageToDP(30),
              backgroundColor: COLORS.grayHalfBg,
              position: 'absolute',
              borderRadius: heightPercentageToDP(5),
              zIndex: 1,
              top: heightPercentageToDP(10),
              left: widthPercentageToDP(20),
              elevation: heightPercentageToDP(1)
            }}>
            {/** User Profile Image */}
            <TouchableOpacity
            onPress={checkAndRequestPermission}
              style={{
                borderRadius: 100,
                overflow: 'hidden',
                width: heightPercentageToDP(20),
                height: heightPercentageToDP(20),
                zIndex: 2,
                position: 'absolute',
                top: heightPercentageToDP(-2),
                left: heightPercentageToDP(4),
              }}>
              <Image
                // source={{ uri: 'https://imgs.search.brave.com/bNjuaYsTPw2b4yerAkKyk82fwZ9sNFwkwb3JMnX7qBg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDU5OTYxMjQtMDUw/MWViYWU4NGQwP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4TWpCOGZHWmhZ/MlY4Wlc1OE1IeDhN/SHg4ZkRBPQ.jpeg' }}
                source={imageSource}
                resizeMode="cover"
                style={{
                  height: heightPercentageToDP(20),
                  width: heightPercentageToDP(20),
                }}
              />
            </TouchableOpacity>
    
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                zIndex: 3,
                alignSelf: 'stretch',
                marginTop: heightPercentageToDP(14)
              }}>
              <GradientText style={{...styles.textStyle}}>{userdata? userdata.name: ""}</GradientText>
              <GradientText style={styles.textStyleEmail}>
              {userdata? userdata.email: ""}
              </GradientText>
            </View>
    
            {/** Username */}
    
    
    
    
    
            {/** Email */}
    
            <View
              style={{
                width: heightPercentageToDP(15),
                height: heightPercentageToDP(30),
                backgroundColor: COLORS.grayHalfBg,
                position: 'absolute',
                zIndex: 1,
                borderTopLeftRadius: heightPercentageToDP(5),
                borderBottomLeftRadius: heightPercentageToDP(5),
              }}></View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.profileDarkGray,
              width: widthPercentageToDP(100),
              height: heightPercentageToDP(30),
              opacity: 80,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="rounded-md p-2"
              style={{
                backgroundColor: COLORS.white_s,
                width: widthPercentageToDP(10),
                margin: heightPercentageToDP(2),
              }}>
              <Ionicons
                name={'chevron-back'}
                size={heightPercentageToDP(3)}
                color={COLORS.black}
              />
            </TouchableOpacity>
    
            <View
              className="rounded-full h-5 w-5"
              style={{
                margin: heightPercentageToDP(3),
                backgroundColor: COLORS.background,
              }}></View>
          </View>
        </View>
      );
    };
    
    export default UserDetails ;
    
    const styles = StyleSheet.create({
      textStyle: {
        fontSize: heightPercentageToDP(4),
        fontFamily: FONT.Montserrat_Bold,
      },
      textStyleEmail: {
        fontSize: heightPercentageToDP(2),
        fontFamily: FONT.Montserrat_Bold,
      },
    });
    