import 'react-native-gesture-handler'
import React from 'react'
import Router from './src/Router'
import { AppRegistry } from 'react-native'
import { name } from './app.json'
import { NavigationContainer } from '@react-navigation/native'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, pStore } from './src/redux/store'

import Loading from './src/commons/components/Loading'

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
