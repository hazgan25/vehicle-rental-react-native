import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from '../../commons/styles/profile'

import { logoutAction } from '../../redux/actions/auth'

const defaultProfile = require('../../assets/img/defaultProfile.png')
const vehicleRentalIcon = require('../../assets/icons/vehicleRentalIcon.png')
const nextArrow = require('../../assets/icons/nextArrow.png')

const Profile = ({ navigation }) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { token } = state.auth
    const { userData } = state.auth

    const { name, email, phone, image } = userData

    const logoutHandler = () => {
        dispatch(logoutAction(token))
            .then(async () => {
                try {
                    await AsyncStorage.removeItem('persist:root')
                    navigation.navigate('Home')
                }
                catch (err) {
                    console.log(err)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                {!token ? (
                    <View>
                        <View style={styles.boxImg}>
                            <Image source={vehicleRentalIcon} style={styles.profileImg} />
                        </View>
                        <Text style={styles.name}>Vehicle Rental</Text>
                    </View>
                ) : (
                    <View>
                        <View style={styles.boxImg}>
                            <Image source={!image ? defaultProfile : { uri: image }} style={styles.profileImg} />
                        </View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.email}>{email}</Text>
                        <Text style={styles.phone}>{phone === null || phone === '' ? 'No Number Phone' : phone}</Text>
                    </View>
                )}
            </View>

            <View style={{ top: 26 }}>
                {!token ? (
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText}>FAQ</Text>
                            <Image source={nextArrow} style={styles.nextArrow} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText}>Help</Text>
                            <Image source={nextArrow} style={styles.nextArrow} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText} onPress={() => { navigation.navigate('Register') }}>Register</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText} onPress={() => { navigation.navigate('Login') }}>Login</Text>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText}>Your favourites</Text>
                            <Image source={nextArrow} style={styles.nextArrow} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText}>FAQ</Text>
                            <Image source={nextArrow} style={styles.nextArrow} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText}>Help</Text>
                            <Image source={nextArrow} style={styles.nextArrow} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText}>Update password</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                            <Text style={styles.listText} onPress={logoutHandler}>Log out</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

export default Profile