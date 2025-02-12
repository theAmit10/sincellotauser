import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import NewUser from '../screens/NewUser';
import ResetPassword from '../screens/ResetPassword';
import GoogleAuthPassword from '../screens/GoogleAuthPassword';
import SendNotification from '../screens/SendNotification';
import CreateNotification from '../screens/CreateNotification';
import CreateNotificationForAllUsers from '../screens/CreateNotificationForAllUsers';
import LocationTimeZone from '../screens/LocationTimeZone';
import CreateResultFromTimeZone from '../screens/CreateResultFromTimeZone';
import UpdateAboutUs from '../screens/UpdateAboutUs';
import Payment from '../screens/payment/Payment';
import AllUpiDepositPayment from '../screens/payment/AllUpiDepositPayment';
import UpiDeposit from '../screens/payment/UpiDeposit';
import AllBankDepositPayment from '../screens/payment/AllBankDepositPayment';
import BankDeposit from '../screens/payment/BankDeposit';
import AllPaypalDepositPayment from '../screens/payment/AllPaypalDepositPayment';
import AllCryptoDepositPayment from '../screens/payment/AllCryptoDepositPayment';
import AllSkrillPaymentPayment from '../screens/payment/AllSkrillPaymentPayment';
import PaypalDeposit from '../screens/payment/PaypalDeposit';
import Skrill from '../screens/payment/Skrill';
import CryptoDeposit from '../screens/payment/CryptoDeposit';
import AllDeposit from '../screens/AllDeposit';
import ShowingReceipt from '../components/helpercComponent/ShowingReceipt';
import AllWithdraw from '../screens/AllWithdraw';
import AllCountry from '../screens/AllCountry';
import Createcountry from '../screens/Createcountry';
import UpdateCountry from '../screens/UpdateCountry';
import PlayArenaLocation from '../screens/PlayArenaLocation';
import PlayArena from '../screens/PlayArena';
import PlayArenaDate from '../screens/PlayArenaDate';
import PlayArenaAdmin from '../screens/PlayArenaAdmin';
import PlayArenaInsights from '../screens/PlayArenaInsights';
import BalanceSheet from '../screens/BalanceSheet';
import AllSubAdmin from '../screens/AllSubAdmin';
import SelectCountry from '../components/helpercComponent/SelectCountry';
import ModifySubadmin from '../screens/ModifySubadmin';
import PlayHistory from '../screens/payment/PlayHistory';
import History from '../screens/payment/History';
import Applink from '../screens/Applink';
import UpdateApplink from '../screens/UpdateApplink';
import AllPartner from '../screens/partner/AllPartner';
import PartnerDashboard from '../screens/partner/PartnerDashboard';
import AllSubPartner from '../screens/partner/AllSubPartner';
import AllRecharge from '../screens/partner/AllRecharge';
import MinimumPercentage from '../screens/partner/MinimumPercentage';
import PartnerPerformance from '../screens/partner/PartnerPerformance';
import ProfitDeduction from '../screens/partner/ProfitDeduction';
import PartnerSubPartner from '../screens/partner/PartnerSubPartner';
import PartnerSubSubPartner from '../screens/partner/PartnerSubSubPartner';
import AllUsersPartner from '../screens/partner/AllUsersPartner';
import CreatePartner from '../screens/partner/CreatePartner';
import PartnerDetails from '../screens/partner/PartnerDetails';
import UpdatePermission from '../screens/partner/partnerdetails/UpdatePermission';
import UpdatePercentage from '../screens/partner/partnerdetails/UpdatePercentage';
import RechargeHistory from '../screens/partner/partnerdetails/RechargeHistory';
import RechargePayment from '../screens/partner/partnerdetails/RechargePayment';
import AllLocation from '../screens/partner/AllLocation';
import AllDate from '../screens/partner/AllDate';
import PowerballDashboard from '../screens/powerball/PowerballDashboard';
import PowerAllTimes from '../screens/powerball/PowerAllTimes';
import PowerAllMultiplier from '../screens/powerball/PowerAllMultiplier';
import PowerGameRule from '../screens/powerball/PowerGameRule';
import PowerGameInsights from '../screens/powerball/PowerGameInsights';
import PowerUpdateName from '../screens/powerball/PowerUpdateName';
import CreateTimePowerball from '../screens/powerball/CreateTimePowerball';
import NumberRange from '../screens/powerball/NumberRange';
import WinnerProfit from '../screens/powerball/WinnerProfit';
import CreateNewMultiplier from '../screens/powerball/CreateNewMultiplier';
import PowerTime from '../screens/powerball/PowerTime';
import PowerAllDate from '../screens/powerball/PowerAllDate';
import CreatePowerResult from '../screens/powerball/CreatePowerResult';
import PowerAllResult from '../screens/powerball/PowerAllResult';


const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="SearchTime" component={SearchTime} />
          <Stack.Screen name="SearchDate" component={SearchDate} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen
            name="ProfileBackground"
            component={ProfileBackground}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="AllResult" component={AllResult} />
          <Stack.Screen name="ResultDetails" component={ResultDetails} />
          <Stack.Screen name="WalletBalance" component={WalletBalance} />
          <Stack.Screen name="HomeLoading" component={HomeLoading} />
          <Stack.Screen name="CreateLocation" component={CreateLocation} />
          <Stack.Screen name="CreateTime" component={CreateTime} />
          <Stack.Screen name="CreateDate" component={CreateDate} />
          <Stack.Screen name="CreateResult" component={CreateResult} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="AllUsers" component={AllUsers} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="EditUserWallet" component={EditUserWallet} />
          <Stack.Screen name="GameDescription" component={GameDescription} />
          <Stack.Screen
            name="GameDescritptionDetails"
            component={GameDescritptionDetails}
          />
          <Stack.Screen
            name="LocationDescription"
            component={LocationDescription}
          />
          <Stack.Screen name="Onboard" component={Onboard} />
          <Stack.Screen name="UpdateLocation" component={UpdateLocation} />
          <Stack.Screen name="UpdateTime" component={UpdateTime} />
          <Stack.Screen name="UpdateDate" component={UpdateDate} />
          <Stack.Screen name="UpdateResult" component={UpdateResult} />
          <Stack.Screen name="AllPromotion" component={AllPromotion} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="CreatePromotion" component={CreatePromotion} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="CreateAboutUs" component={CreateAboutUs} />
          <Stack.Screen
            name="UploadProfilePicture"
            component={UploadProfilePicture}
          />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="WalletModification"
            component={WalletModification}
          />
          <Stack.Screen name="AllWallet" component={AllWallet} />
          <Stack.Screen name="ChangeUserId" component={ChangeUserId} />
          <Stack.Screen name="NewUser" component={NewUser} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen
            name="GoogleAuthPassword"
            component={GoogleAuthPassword}
          />
          <Stack.Screen name="SendNotification" component={SendNotification} />
          <Stack.Screen
            name="CreateNotification"
            component={CreateNotification}
          />
          <Stack.Screen
            name="CreateNotificationForAllUsers"
            component={CreateNotificationForAllUsers}
          />
          <Stack.Screen name="LocationTimeZone" component={LocationTimeZone} />
          <Stack.Screen
            name="CreateResultFromTimeZone"
            component={CreateResultFromTimeZone}
          />
          <Stack.Screen name="UpdateAboutUs" component={UpdateAboutUs} />

          {/** PAYMENT */}
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen
            name="AllUpiDepositPayment"
            component={AllUpiDepositPayment}
          />
          <Stack.Screen name="UpiDeposit" component={UpiDeposit} />
          <Stack.Screen
            name="AllBankDepositPayment"
            component={AllBankDepositPayment}
          />
          <Stack.Screen name="BankDeposit" component={BankDeposit} />
          <Stack.Screen
            name="AllPaypalDepositPayment"
            component={AllPaypalDepositPayment}
          />
          <Stack.Screen
            name="AllCryptoDepositPayment"
            component={AllCryptoDepositPayment}
          />
          <Stack.Screen
            name="AllSkrillPaymentPayment"
            component={AllSkrillPaymentPayment}
          />
          <Stack.Screen name="PaypalDeposit" component={PaypalDeposit} />
          <Stack.Screen name="Skrill" component={Skrill} />
          <Stack.Screen name="CryptoDeposit" component={CryptoDeposit} />
          <Stack.Screen name="AllDeposit" component={AllDeposit} />
          <Stack.Screen name="ShowingReceipt" component={ShowingReceipt} />
          <Stack.Screen name="AllWithdraw" component={AllWithdraw} />
          <Stack.Screen name="AllCountry" component={AllCountry} />
          <Stack.Screen name="Createcountry" component={Createcountry} />
          <Stack.Screen name="UpdateCountry" component={UpdateCountry} />

          {/** FOR BETTING */}
          <Stack.Screen
            name="PlayArenaLocation"
            component={PlayArenaLocation}
          />
          <Stack.Screen name="PlayArena" component={PlayArena} />
          <Stack.Screen name="PlayArenaDate" component={PlayArenaDate} />
          <Stack.Screen name="PlayArenaAdmin" component={PlayArenaAdmin} />
          <Stack.Screen
            name="PlayArenaInsights"
            component={PlayArenaInsights}
          />
          <Stack.Screen name="BalanceSheet" component={BalanceSheet} />
          <Stack.Screen name="AllSubAdmin" component={AllSubAdmin} />
          <Stack.Screen name="SelectCountry" component={SelectCountry} />
          <Stack.Screen name="ModifySubadmin" component={ModifySubadmin} />
          <Stack.Screen name="PlayHistory" component={PlayHistory} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Applink" component={Applink} />
          <Stack.Screen name="UpdateApplink" component={UpdateApplink} />

          {/** PARTNER */}
          <Stack.Screen name="PartnerDashboard" component={PartnerDashboard} />
          <Stack.Screen name="AllPartner" component={AllPartner} />
          <Stack.Screen name="AllSubPartner" component={AllSubPartner} />
          <Stack.Screen name="AllRecharge" component={AllRecharge} />
          <Stack.Screen
            name="MinimumPercentage"
            component={MinimumPercentage}
          />
          <Stack.Screen
            name="PartnerPerformance"
            component={PartnerPerformance}
          />
          <Stack.Screen name="ProfitDeduction" component={ProfitDeduction} />
          <Stack.Screen
            name="PartnerSubPartner"
            component={PartnerSubPartner}
          />
          <Stack.Screen
            name="PartnerSubSubPartner"
            component={PartnerSubSubPartner}
          />
          <Stack.Screen name="AllUsersPartner" component={AllUsersPartner} />
          <Stack.Screen name="CreatePartner" component={CreatePartner} />
          <Stack.Screen name="PartnerDetails" component={PartnerDetails} />

          {/** PARTNER DETAILS */}
          <Stack.Screen name="UpdatePermission" component={UpdatePermission} />
          <Stack.Screen name="UpdatePercentage" component={UpdatePercentage} />
          <Stack.Screen name="RechargeHistory" component={RechargeHistory} />
          <Stack.Screen name="RechargePayment" component={RechargePayment} />

          {/* PARTNER PERFORMANCE  */}
          <Stack.Screen name="AllLocation" component={AllLocation} />
          <Stack.Screen name="AllDate" component={AllDate} />

          {/** POWERBALL */}
          <Stack.Screen
            name="PowerballDashboard"
            component={PowerballDashboard}
          />
          <Stack.Screen name="PowerAllTimes" component={PowerAllTimes} />
          <Stack.Screen
            name="PowerAllMultiplier"
            component={PowerAllMultiplier}
          />
          <Stack.Screen name="PowerGameRule" component={PowerGameRule} />
          <Stack.Screen name="PowerUpdateName" component={PowerUpdateName} />
          <Stack.Screen name="NumberRange" component={NumberRange} />
          <Stack.Screen name="CreateNewMultiplier" component={CreateNewMultiplier} />
          <Stack.Screen name="WinnerProfit" component={WinnerProfit} />
          <Stack.Screen name="PowerTime" component={PowerTime} />
          <Stack.Screen name="CreatePowerResult" component={CreatePowerResult} />
          <Stack.Screen name="PowerAllDate" component={PowerAllDate} />
          <Stack.Screen name="PowerAllResult" component={PowerAllResult} />
          <Stack.Screen name="PowerGameInsights" component={PowerGameInsights} />
          <Stack.Screen
            name="CreateTimePowerball"
            component={CreateTimePowerball}
          />
        </Stack.Group>
      </Stack.Navigator>

      <Toast
        position="top"
        autoHide={true}
        visibilityTime={2000}
        onPress={() => Toast.hide()}
      />
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
