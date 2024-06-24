import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";

//서로 다른 리듀싱 함수들을 값으로 가지는 객체를 받아 createStore에 넘길 수 있는 하나의 리듀싱 함수로 변환
export const rootReducer = combineReducers({
    user: userReducer
});

//reduxStore의 데이터를 어디에 저장할 것인지 결정함
const persistConfig = {
    key: "root", //key 이름
    storage, //localStorage에 저장함
    //whiteList: [], // 여러 reducer 중 해당 reducer만 localStorage에 저장함
    //blackList: [], // 해당 reducer만 제외함
}

// 어디에 저장할건지, base 리듀서를 저장하는 리듀서
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    //getDefaultMiddleware: 리덕스 툴킷에서 가지고 있는 기본 미들웨어
    //serializable: 직렬화 = object를 string으로 변환
    //reducer에 전달하는 action type이 함수이기 때문에 직렬화 불가능 => 따로 예외 처리를 해도 됨
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
    
})

export const persistor = persistStore(store)