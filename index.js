import 'react-native-gesture-handler'
import React from 'react'
import Router from './src/Router'
import { AppRegistry, View, Text, Platform, Dimensions } from 'react-native'
import { name } from './app.json'
import { NavigationContainer } from '@react-navigation/native'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, pStore } from './src/redux/store'

import FastImage from 'react-native-fast-image'

import Loading from './src/commons/components/Loading'

const vehicleRentalLoading = require('./src/assets/gif/vehicleRentalLoading.gif')

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const { registerComponent } = AppRegistry

const vehicleRentalApp = () => (
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={pStore} >
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </PersistGate>
    </Provider>
)

registerComponent(name, () => vehicleRentalApp)
