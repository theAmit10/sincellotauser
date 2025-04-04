import {server} from '../redux/store';

const LOGIN_API = server + 'user/login';
const USER_PROFILE_API = server + 'user/profile';
const LOGOUT_API = server + 'user/logout';
const REGISTER_API = server + 'user/register';
const ALL_LOCATION_API = server + 'result/alllotlocation';
const ALL_TIME_API = server + 'result/alllottime';
const TIME_API = server + 'result/searchtime';
const ALL_DATE_API = server + 'result/alllotdate';
const DATE_API = server + 'result/searchdate';
const ALL_RESULT_API = server + 'result/allresult';
const RESULT_API = server + 'result/searchresult';
const USER_PROFILE_PIC_API = server + 'user/updateprofilepic';
const UPDATE_USER_PROFILE_API = server + 'user/updateprofile';
const CHANGE_PASSWORD_API = server + 'user/changepassword';

// All User modification api
const ALL_USERS_API = server + 'user/alluser';
const UPDATE_USER_ID_API = server + 'user/updateuserid';
const USER_WALLET_ONE_MODIFICATION_API = server + 'user/walletone';
const USER_WALLET_TWO_MODIFICATION_API = server + 'user/wallettwo';

// Creating through Admin FOR LOCATION
const CREATE_LOCATION_API = server + 'result/addlotlocation';
const UPDATE_LOCATION_API = server + 'result/updatelotlocation';
const DELETE_LOCATION_API = server + 'result/removelotlocation';

// Creating through Admin FOR TIME
const CREATE_TIME_API = server + 'result/addlottime';
const UPDATE_TIME_API = server + 'result/updatelottime';
const DELETE_TIME_API = server + 'result/removelottime';
const GET_ALL_TIME_ACCORDING_TO_LOCATION_API = server + 'result/searchtime';

// Creating through Admin FOR DATE
const CREATE_DATE_API = server + 'result/addlotdate';
const UPDATE_DATE_API = server + 'result/updatelotdate';
const DELETE_DATE_API = server + 'result/removelotdate';
const GET_ALL_DATE_ACCORDING_TO_LOCATION_AND_TIME_API =
  server + 'result/searchdate';

// Creating through Admin FOR RESULT
const CREATE_RESULT_API = server + 'result/createresult';
const GET_SINGLE_RESULT_API = server + 'result/searchresult';
const UPDATE_RESULT_API = server + 'result/single';
const DELETE_RESULT_API = server + 'result/removelotdate';
const GET_ALL_RESULT_ACCORDING_TO_LOCATION_TIME_DATE_API =
  server + 'result/allresultlocation';

// For All Promtion
const ALL_PROMOTIONS_API = server + 'user/getallpromotion';
const CREATE_PROMOTIONS_API = server + 'user/addpromotion';
const DELETE_PROMOTION_API = server + 'user/removepromotion';

// For All About US
const ALL_ABOUT_API = server + 'user/getallabout';
const UPDATE_ABOUT_API = server + 'user//updateabout';
const CREATE_ABOUT_API = server + 'user/createabout';
const DELETE_ABOUT_API = server + 'user/removeabout';

// For Wallet Modofication

const UPDATE_WALLET_ONE_NAME_API = server + 'user/updatewalletone';
const UPDATE_WALLET_TWO_NAME_API = server + 'user/updatewallettwo';

// Single user information
const SINGLE_USER_API = server + 'user/singleuser';
const ALL_ONE_DAY_USER_API = server + 'user/alluserlastday';
const SEND_NOTIFICATION_SINGLE_USER = server + 'user/sendnotificationsingle';
const SEND_NOTIFICATION_FOR_ALL_USER = server + 'user/sendnotification';

const DELETE_LOT_RESULT_API = server + 'result/removeresult';

// For Reset and Forgot password
const FORGOT_PASSWORD_API = server + 'user/forgetpassword';
const NOTIFICATION_API = server + 'user/allnotification';
const DELETE_NOTIFICATION_API = server + 'user/removenotification';

// FOR PAYMENT METHOD
const ALL_UPI_API = server + 'result/allupipaymets';
const ALL_BANK_API = server + 'result/allbankpaymets';
const ALL_SKRILL_API = server + 'result/allskrillpaymets';
const ALL_PAYPAL_API = server + 'result/allpaypalpaymets';
const ALL_CRYPTO_API = server + 'result/allcryptopaymets';
const PARTNER_PAYPAL_API = server + 'result/getpartnerpaypallist';
const PARTNER_SKRILL_API = server + 'result/getpartnerskrilllist';
const PARTNER_CRYPTO_API = server + 'result/getpartnercryptolist';
const PARTNER_UPI_API = server + 'result/getpartnerupilist';
const PARTNER_BANK_API = server + 'result/getpartnerbanklist';

const CREATE_UPI_API = server + 'result/addupipayment';
const CREATE_BANK_API = server + 'result/addbankpayment';
const CREATE_PAYPAL_API = server + 'result/addpaypalpayment';
const CREATE_SKRILL_API = server + 'result/addskrillpayment';
const CREATE_CRYPTO_API = server + 'result/addcryptopayment';
const UPDATE_SUBADMIN_ROLE_API = server + 'user/updaterole';
const PARTNER_PROFILE_API = server + 'user/getpartnerbyuserid';

const PARTNER_USER_OTHER_API = server + 'result/getuserotherpaymets';
const PARTNER_OTHERPAYMENT_API = server + 'result/getpartnerotherlist';
const ALL_OTHERPAYMENT_API = server + 'result/allotherpaymets';

export default {
  PARTNER_USER_OTHER_API,
  ALL_OTHERPAYMENT_API,
  PARTNER_OTHERPAYMENT_API,
  PARTNER_BANK_API,
  PARTNER_CRYPTO_API,
  PARTNER_PAYPAL_API,
  PARTNER_SKRILL_API,
  PARTNER_UPI_API,
  PARTNER_PROFILE_API,
  LOGIN_API,
  USER_PROFILE_API,
  LOGOUT_API,
  REGISTER_API,
  ALL_LOCATION_API,
  ALL_TIME_API,
  ALL_DATE_API,
  ALL_RESULT_API,
  TIME_API,
  DATE_API,
  RESULT_API,
  CREATE_DATE_API,
  UPDATE_LOCATION_API,
  DELETE_LOCATION_API,
  CREATE_TIME_API,
  DELETE_TIME_API,
  CREATE_DATE_API,
  UPDATE_DATE_API,
  DELETE_DATE_API,
  GET_ALL_DATE_ACCORDING_TO_LOCATION_AND_TIME_API,
  GET_ALL_TIME_ACCORDING_TO_LOCATION_API,
  CREATE_LOCATION_API,
  UPDATE_TIME_API,
  CREATE_RESULT_API,
  GET_SINGLE_RESULT_API,
  UPDATE_RESULT_API,
  DELETE_RESULT_API,
  GET_ALL_RESULT_ACCORDING_TO_LOCATION_TIME_DATE_API,
  ALL_USERS_API,
  ALL_PROMOTIONS_API,
  ALL_ABOUT_API,
  UPDATE_ABOUT_API,
  DELETE_ABOUT_API,
  CREATE_ABOUT_API,
  CREATE_PROMOTIONS_API,
  USER_PROFILE_PIC_API,
  UPDATE_USER_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROMOTION_API,
  UPDATE_WALLET_ONE_NAME_API,
  UPDATE_WALLET_TWO_NAME_API,
  USER_WALLET_ONE_MODIFICATION_API,
  USER_WALLET_TWO_MODIFICATION_API,
  UPDATE_USER_ID_API,
  SINGLE_USER_API,
  ALL_ONE_DAY_USER_API,
  DELETE_LOT_RESULT_API,
  FORGOT_PASSWORD_API,
  SEND_NOTIFICATION_FOR_ALL_USER,
  SEND_NOTIFICATION_SINGLE_USER,
  NOTIFICATION_API,
  DELETE_NOTIFICATION_API,
  ALL_UPI_API,
  ALL_BANK_API,
  ALL_PAYPAL_API,
  ALL_SKRILL_API,
  ALL_CRYPTO_API,
  CREATE_UPI_API,
  CREATE_BANK_API,
  CREATE_PAYPAL_API,
  CREATE_SKRILL_API,
  CREATE_CRYPTO_API,
  UPDATE_SUBADMIN_ROLE_API,
};
