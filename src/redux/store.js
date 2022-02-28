import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rpm from 'redux-promise-middleware'
import logger from 'redux-logger'

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
}

const pReducers = persistReducer(persistConfig, rootReducer)
const enchancers = applyMiddleware(rpm, logger)
export const store = createStore(pReducers, enchancers)
export const pStore = persistStore(store)