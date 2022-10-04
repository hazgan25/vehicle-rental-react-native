import React from 'react'
import { View, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from './screens/Login'
import Register from './screens/Register'
import ForgotPassword from './screens/ForgotPassword'
import Home from './screens/Home'
import VehicleList from './screens/Home/VehicleList'
import FilterSearch from './screens/Home/FilterSearch'
import History from './screens/History'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import ListVehicleByOwner from './screens/ListVehicleByOwner'
import HistoryOrderByOwner from './screens/HistoryOrderByOwner'
import EditProfile from './screens/Profile/editProfile'
import EditPassword from './screens/EditPassword'
import AddVehicle from './screens/AddVehicle'
import VehicleDetail from './screens/VehicleDetail'
import StepOne from './screens/Payment/StepOne'
import StepTwo from './screens/Payment/StepTwo'
import StepThree from './screens/Payment/StepThree'
import Finish from './screens/Payment/Finish'
import ErrorServer from './screens/ErrorServer'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const homeIcon = require('./assets/icons/homeIcon.png')
const historyIcon = require('./assets/icons/historyIcon.png')
const chatIcon = require('./assets/icons/chatIcon.png')
const profileIcon = require('./assets/icons/profileIcon.png')

const MainHome = () => (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='VehicleList' component={VehicleList} />
        <Stack.Screen name='FilterSearch' component={FilterSearch} />
    </Stack.Navigator>
)

const MainTab = () => (
    <Tab.Navigator initialRouteName='Home' sceneContainerStyle={{ backgroundColor: '#fff' }} screenOptions={{ headerShown: false, tabBarStyle: { height: 78, borderTopRightRadius: 10, borderTopLeftRadius: 10 } }} >
        <Tab.Screen name='MainHome'
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        backgroundColor: focused ? 'rgba(255 ,213 ,121, 0.2)' : '',
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Image source={homeIcon} resizeMode='contain'
                            style={{ tintColor: focused ? '#FFCD61' : '#DFDEDE', flex: 1 }} />
                    </View>
                )
            }} component={MainHome} />
        <Tab.Screen name='History'
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        backgroundColor: focused ? 'rgba(255 ,213 ,121, 0.2)' : '',
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Image source={historyIcon} resizeMode='contain'
                            style={{ tintColor: focused ? '#FFCD61' : '#DFDEDE', flex: 1 }} />
                    </View>
                )
            }} component={History} />
        <Tab.Screen name='Chat'
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        backgroundColor: focused ? 'rgba(255 ,213 ,121, 0.2)' : '',
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Image source={chatIcon} resizeMode='contain'
                            style={{ tintColor: focused ? '#FFCD61' : '#DFDEDE', flex: 1, }} />
                    </View>
                )
            }} component={Chat} />
        <Tab.Screen name='Profile'
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        backgroundColor: focused ? 'rgba(255 ,213 ,121, 0.2)' : '',
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Image source={profileIcon} resizeMode='contain'
                            style={{ tintColor: focused ? '#FFCD61' : '#DFDEDE', flex: 1 }} />
                    </View>
                )
            }} component={Profile} />
    </Tab.Navigator >
)

const Router = () => {
    return (
        <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Main' component={MainTab} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ErrorServer' component={ErrorServer} />
            <Stack.Screen name='VehicleDetail' component={VehicleDetail} />
            <Stack.Screen name='VehicleProductByOwner' component={ListVehicleByOwner} />
            <Stack.Screen name='HistoryOwnerByOwner' component={HistoryOrderByOwner} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='EditPass' component={EditPassword} />
            <Stack.Screen name='ForgotPass' component={ForgotPassword} />
            <Stack.Screen name='AddVehicle' component={AddVehicle} />
            <Stack.Screen name='FilterSearch' component={FilterSearch} />
            <Stack.Screen name='StepOne' component={StepOne} />
            <Stack.Screen name='StepTwo' component={StepTwo} />
            <Stack.Screen name='StepThree' component={StepThree} />
            <Stack.Screen name='Finish' component={Finish} />
        </Stack.Navigator>
    )
}

export default Router