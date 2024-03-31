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

// All User modification api
const ALL_USERS_API = server + 'user/alluser';

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
const GET_ALL_DATE_ACCORDING_TO_LOCATION_AND_TIME_API = server + 'result/searchdate';


// Creating through Admin FOR RESULT
const CREATE_RESULT_API = server + 'result/createresult';
const GET_SINGLE_RESULT_API = server + 'result/searchresult';
const UPDATE_RESULT_API = server + 'result/single';
const DELETE_RESULT_API = server + 'result/removelotdate';
const GET_ALL_RESULT_ACCORDING_TO_LOCATION_TIME_DATE_API = server + 'result/allresultlocation';




export default {
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
};
