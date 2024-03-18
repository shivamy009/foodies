import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
 


// import userSlice from './slice/authSlice'
// import authSlice from "./slice/authSlice";
const rootReducers = combineReducers({
  user:userSlice,
  
})

const persistConfig ={
  key:'root',
  storage,
  version:1,
}

const persistReducers= persistReducer(persistConfig,rootReducers)
 
export const store = configureStore({
  reducer: persistReducers,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware(
      {serializableCheck:false}
  )
})

export const persistor = persistStore(store)


 
//  export const  store = configureStore({
//   reducer:{
//     user:userSlice
//   }
//  })

 