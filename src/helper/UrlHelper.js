import { server } from "../redux/store";

const LOGIN_API = server + "user/login"
const USER_PROFILE_API = server + "user/profile"
const LOGOUT_API = server + "user/logout"
const REGISTER_API = server + "user/register"
const ALL_LOCATION_API = server + "result/alllotlocation"

export default {LOGIN_API,USER_PROFILE_API,LOGOUT_API,REGISTER_API,ALL_LOCATION_API}