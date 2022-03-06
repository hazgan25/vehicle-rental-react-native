import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from './screens/Login'
import Register from './screens/Register'
import ForgotPassword from './screens/ForgotPassword'
import Home from './screens/Home'
import History from './screens/History'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const homeIcon = require('./assets/icons/homeIcon.png')
const historyIcon = require('./assets/icons/historyIcon.png')
const chatIcon = require('./assets/icons/chatIcon.png')
const profileIcon = require('./assets/icons/profileIcon.png')

const MainTab = () => (
    <Tab.Navigator initialRouteName='Home' sceneContainerStyle={{ backgroundColor: '#fff' }} screenOptions={{ headerShown: false, tabBarStyle: { height: 78, borderRadius: 10 } }} >
        <Tab.Screen name='Home'
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
            }} component={Home} />
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

const Router = () => (
    <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='ForgotPass' component={ForgotPassword} />
        <Stack.Screen name='Main' component={MainTab} />
    </Stack.Navigator>
)



export default Router