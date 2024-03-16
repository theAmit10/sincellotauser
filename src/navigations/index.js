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
import Createlocation from '../screens/admin/Createlocation';
import UpdateProfile from '../screens/UpdateProfile';
import HomeLoading from '../components/background/HomeLoading';


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
                <Stack.Screen  name="Createlocation" component={Createlocation}/>
                <Stack.Screen  name="UpdateProfile" component={UpdateProfile}/>
                <Stack.Screen  name="HomeLoading" component={HomeLoading}/>
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