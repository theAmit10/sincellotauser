import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer"
import userAccessTokenSlice from "./userAccessTokenSlice"
import { locationReducer } from "./reducers/locationReducer"
import { timeReducer } from "./reducers/timeReducer"
import { dateReducer } from "./reducers/dateReducer"
import { resultReducer } from "./reducers/resultReducer"
import { setupListeners } from "@reduxjs/toolkit/query"
import { sincelotAdminApi } from "../helper/Networkcall"

export const store = configureStore({
    reducer:{
        user: userReducer,
        userAccessToken: userAccessTokenSlice,
        location: locationReducer,
        time: timeReducer,
        date: dateReducer,
        result: resultReducer,
        [sincelotAdminApi.reducerPath]: sincelotAdminApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sincelotAdminApi.middleware),
})

setupListeners(store.dispatch)

// export const server = "https://sinceapp.thelionworld.com/api/v1/"
// export const serverName = "https://sinceapp.thelionworld.com/"

export const server = "https://adminbackend-lyyx.onrender.com/api/v1/"
export const serverName = "https://adminbackend-lyyx.onrender.com"