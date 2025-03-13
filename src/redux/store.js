import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer';
import userAccessTokenSlice from './userAccessTokenSlice';
import {locationReducer} from './reducers/locationReducer';
import {timeReducer} from './reducers/timeReducer';
import {dateReducer} from './reducers/dateReducer';
import {resultReducer} from './reducers/resultReducer';
import {setupListeners} from '@reduxjs/toolkit/query';
import {sincelotAdminApi} from '../helper/Networkcall';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userAccessToken: userAccessTokenSlice,
    location: locationReducer,
    time: timeReducer,
    date: dateReducer,
    result: resultReducer,
    [sincelotAdminApi.reducerPath]: sincelotAdminApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sincelotAdminApi.middleware),
});

setupListeners(store.dispatch);

// export const server = "https://sinceapp.thelionworld.com/api/v1/"
// export const serverName = "https://sinceapp.thelionworld.com/"

// export const server = "https://jenny.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru/api/v1/"
// export const serverName = "https://jenny.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru"

// export const server = 'https://adminbackend-apsw.onrender.com/api/v1/';
// export const serverName = 'https://adminbackend-apsw.onrender.com';

export const server =
  'https://dev.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru/api/v1/';
export const serverName =
  'https://dev.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru';
