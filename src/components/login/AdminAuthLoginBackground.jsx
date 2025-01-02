




import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONT } from '../../../assets/constants';
import { useNavigation } from '@react-navigation/native';


const AdminAuthLoginBackground = () => {
  const navigation = useNavigation();

  let [countVal, setCountVal] = useState(0);

  const navigateToRegister = () => {
    console.log('count :: ' + countVal);
    setCountVal(countVal + 1);
    if (countVal >= 5) {
      navigation.navigate('Register');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grayBg,
      }}>

        <ImageBackground
        source={require("../../../assets/image/tlwbg.jpg")}
        style={{
          width: '100%',
          height: '100%',
        }}
        >

        
        {/** Top View Rectangle View */}
      <View
        style={{
          width: heightPercentageToDP(30),
          height: heightPercentageToDP(30),
          backgroundColor: COLORS.white_s,
          position: 'absolute',
          borderRadius: heightPercentageToDP(5),
          zIndex: 1,
          top: heightPercentageToDP(10),
          left: widthPercentageToDP(20),
        }}>
        <View
          style={{
            width: heightPercentageToDP(15),
            height: heightPercentageToDP(30),
            backgroundColor: COLORS.lightWhite,
            position: 'absolute',
            zIndex: 1,
            borderTopLeftRadius: heightPercentageToDP(5),
            borderBottomLeftRadius: heightPercentageToDP(5),
          }}></View>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(128, 128, 128, 0.5)',
          width: widthPercentageToDP(50),
          flex: 1,
          opacity: 80,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: heightPercentageToDP(0.5),
          }}>
          <Text
            onPress={navigateToRegister}
            style={{
              fontFamily: FONT.ZCOOL_Regular,
              fontSize: heightPercentageToDP(2.5),
              paddingVertical: heightPercentageToDP(2),
              paddingStart: heightPercentageToDP(2),
              color: COLORS.white_s,
            }}>
            Since
          </Text>
          <Text
            style={{
              fontFamily: FONT.ZCOOL_Regular,
              fontSize: heightPercentageToDP(2.5),
              paddingVertical: heightPercentageToDP(2),
              paddingEnd: heightPercentageToDP(2),
              color: COLORS.white_s,
            }}>
            2001
          </Text>
        </View>

        <View
          className="rounded-full h-5 w-5"
          style={{
            margin: heightPercentageToDP(3),
            backgroundColor: COLORS.background,
          }}></View>
      </View>
      </ImageBackground>
      
    </View>
  );
};

export default AdminAuthLoginBackground;

const styles = StyleSheet.create({});


// import {Text, View} from 'react-native';
// import React, {useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {COLORS, FONT} from '../../../assets/constants';
// import {useNavigation} from '@react-navigation/native';

// const AdminAuthLoginBackground = () => {
//   const navigation = useNavigation();

//   let [countVal, setCountVal] = useState(0);

//   const navigateToRegister = () => {
//     console.log('count :: ' + countVal);
//     setCountVal(countVal + 1);
//     if (countVal >= 5) {
//       navigation.navigate('Register');
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.grayBg,
//       }}>
//       {/** Top View Rectangle View */}
//       <View
//         style={{
//           width: heightPercentageToDP(30),
//           height: heightPercentageToDP(30),
//           backgroundColor: COLORS.white_s,
//           position: 'absolute',
//           borderRadius: heightPercentageToDP(5),
//           zIndex: 1,
//           top: heightPercentageToDP(10),
//           left: widthPercentageToDP(20),
//         }}>
//         <View
//           style={{
//             width: heightPercentageToDP(15),
//             height: heightPercentageToDP(30),
//             backgroundColor: COLORS.lightWhite,
//             position: 'absolute',
//             zIndex: 1,
//             borderTopLeftRadius: heightPercentageToDP(5),
//             borderBottomLeftRadius: heightPercentageToDP(5),
//           }}></View>
//       </View>
//       <View
//         style={{
//           backgroundColor: COLORS.grayHalfBg,
//           width: widthPercentageToDP(50),
//           flex: 1,
//           opacity: 80,
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'flex-start',
//             justifyContent: 'flex-start',
//             gap: heightPercentageToDP(0.5),
//           }}>
//           <Text
//             onPress={navigateToRegister}
//             style={{
//               fontFamily: FONT.ZCOOL_Regular,
//               fontSize: heightPercentageToDP(2.5),
//               paddingVertical: heightPercentageToDP(2),
//               paddingStart: heightPercentageToDP(2),
//               color: COLORS.white_s,
//             }}>
//             Since
//           </Text>
//           <Text
//             style={{
//               fontFamily: FONT.ZCOOL_Regular,
//               fontSize: heightPercentageToDP(2.5),
//               paddingVertical: heightPercentageToDP(2),
//               paddingEnd: heightPercentageToDP(2),
//               color: COLORS.white_s,
//             }}>
//             2001
//           </Text>
//         </View>

//         <View
//           className="rounded-full h-5 w-5"
//           style={{
//             margin: heightPercentageToDP(3),
//             backgroundColor: COLORS.background,
//           }}></View>
//       </View>
//     </View>
//   );
// };

// export default AdminAuthLoginBackground;


