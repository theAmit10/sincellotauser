import { StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Toast from 'react-native-toast-message';
import OtpVerification from '../screens/OtpVerification';
import Search from '../screens/Search';
import Setting from '../screens/Setting';
import SearchTime from '../screens/SearchTime';
import SearchDate from '../screens/SearchDate';
import Result from '../screens/Result';
import ProfileBackground from '../components/background/ProfileBackground';
import Profile from '../screens/Profile';
import SplashScreen from '../screens/SplashScreen';
import UpdateProfile from '../screens/UpdateProfile';
import HomeLoading from '../components/background/HomeLoading';
import AllResult from '../screens/AllResult';
import ResultDetails from '../screens/ResultDetails';
import WalletBalance from '../screens/WalletBalance';
import CreateLocation from '../screens/CreateLocation';
import CreateTime from '../screens/CreateTime';
import CreateDate from '../screens/CreateDate';
import CreateResult from '../screens/CreateResult';


const Stack = createNativeStackNavigator()

const Main = () => {

  


  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen"
        >
            <Stack.Group>
                <Stack.Screen  name="Home" component={Home}/>
                <Stack.Screen  name="Login" component={Login}/>
                <Stack.Screen  name="Register" component={Register}/>
                <Stack.Screen  name="OtpVerification" component={OtpVerification}/>
                <Stack.Screen  name="Search" component={Search}/>
                <Stack.Screen  name="Setting" component={Setting}/>
                <Stack.Screen  name="SearchTime" component={SearchTime}/>
                <Stack.Screen  name="SearchDate" component={SearchDate}/>
                <Stack.Screen  name="Result" component={Result}/>
                <Stack.Screen  name="ProfileBackground" component={ProfileBackground}/>
                <Stack.Screen  name="Profile" component={Profile}/>
                <Stack.Screen  name="SplashScreen" component={SplashScreen}/>
              
                <Stack.Screen  name="UpdateProfile" component={UpdateProfile}/>
                <Stack.Screen  name="AllResult" component={AllResult}/>
                <Stack.Screen  name="ResultDetails" component={ResultDetails}/>
                <Stack.Screen  name="WalletBalance" component={WalletBalance}/>
                <Stack.Screen  name="HomeLoading" component={HomeLoading}/>
                <Stack.Screen  name="CreateLocation" component={CreateLocation}/>
                <Stack.Screen  name="CreateTime" component={CreateTime}/>
                <Stack.Screen  name="CreateDate" component={CreateDate}/>
                <Stack.Screen  name="CreateResult" component={CreateResult}/>

            </Stack.Group>
        </Stack.Navigator>

        <Toast
          position="top"
          autoHide={true}
          visibilityTime={2000}
          onPress={() => Toast.hide()}
        />
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({})