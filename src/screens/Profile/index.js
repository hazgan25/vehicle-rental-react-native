import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from '../../commons/styles/profile'

import { logoutAction } from '../../redux/actions/auth'

const defaultProfile = require('../../assets/img/defaultProfile.png')

const Profile = ({ navigation }) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { token } = state.auth
    const { userData } = state.auth
    console.log(userData)

    const { name, email, phone, image } = userData

    const logoutHandler = () => {
        dispatch(logoutAction(token))
            .then(async (res) => {
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
                    <></>
                ) : (
                    <View>
                        <View style={styles.boxImg}>
                            <Image source={!image ? defaultProfile : { uri: image }} style={styles.profileImg} />
                        </View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.email}>{email}</Text>
                        <Text style={styles.phone}>{phone === null || phone === '' ? 'No Number Phone' : phone}</Text>
                    </View>
                )

                }

            </View>
            <TouchableOpacity onPress={logoutHandler}>
                <Text >Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                <Text>Login</Text>
            </TouchableOpacity>
            <Text>{!token ? (<>belum login</>) : (<>sudah Login</>)}</Text>
        </View>
    )
}

export default Profile