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
import AdminDashboard from '../screens/AdminDashboard';
import AllUsers from '../screens/AllUsers';
import UserDetails from '../screens/UserDetails';
import EditUserWallet from '../screens/EditUserWallet';
import GameDescription from '../screens/GameDescription';
import GameDescritptionDetails from '../screens/GameDescritptionDetails';
import LocationDescription from '../screens/LocationDescription';
import Onboard from '../screens/Onboard';
import UpdateLocation from '../screens/UpdateLocation';
import UpdateTime from '../screens/UpdateTime';
import UpdateDate from '../screens/UpdateDate';
import UpdateResult from '../screens/UpdateResult';
import AllPromotion from '../screens/AllPromotion';
import Notification from '../screens/Notification';
import CreatePromotion from '../screens/CreatePromotion';
import AboutUs from '../screens/AboutUs';
import CreateAboutUs from '../screens/CreateAboutUs';
import UploadProfilePicture from '../screens/UploadProfilePicture';
import ChangePassword from '../screens/ChangePassword';
import ChangeEmail from '../screens/ChangeEmail';
import ForgotPassword from '../screens/ForgotPassword';
import WalletModification from '../screens/WalletModification';
import AllWallet from '../screens/AllWallet';
import ChangeUserId from '../screens/ChangeUserId';



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
                <Stack.Screen  name="AdminDashboard" component={AdminDashboard}/>
                <Stack.Screen  name="AllUsers" component={AllUsers}/>
                <Stack.Screen  name="UserDetails" component={UserDetails}/>
                <Stack.Screen  name="EditUserWallet" component={EditUserWallet}/>
                <Stack.Screen  name="GameDescription" component={GameDescription}/>
                <Stack.Screen  name="GameDescritptionDetails" component={GameDescritptionDetails}/>
                <Stack.Screen  name="LocationDescription" component={LocationDescription}/>
                <Stack.Screen  name="Onboard" component={Onboard}/>
                <Stack.Screen  name="UpdateLocation" component={UpdateLocation}/>
                <Stack.Screen  name="UpdateTime" component={UpdateTime}/>
                <Stack.Screen  name="UpdateDate" component={UpdateDate}/>
                <Stack.Screen  name="UpdateResult" component={UpdateResult}/>
                <Stack.Screen  name="AllPromotion" component={AllPromotion}/>
                <Stack.Screen  name="Notification" component={Notification}/>
                <Stack.Screen  name="CreatePromotion" component={CreatePromotion}/>
                <Stack.Screen  name="AboutUs" component={AboutUs}/>
                <Stack.Screen  name="CreateAboutUs" component={CreateAboutUs}/>
                <Stack.Screen  name="UploadProfilePicture" component={UploadProfilePicture}/>
                <Stack.Screen  name="ChangePassword" component={ChangePassword}/>
                <Stack.Screen  name="ChangeEmail" component={ChangeEmail}/>
                <Stack.Screen  name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen  name="WalletModification" component={WalletModification}/>
                <Stack.Screen  name="AllWallet" component={AllWallet}/>
                <Stack.Screen  name="ChangeUserId" component={ChangeUserId}/>

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