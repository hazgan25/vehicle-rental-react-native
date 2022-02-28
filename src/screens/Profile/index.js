import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import styles from '../../commons/styles/profile'

const Profile = () => {
    const state = useSelector(state => state)
    // console.log(state)
    const { userData } = state.auth
    // console.log(userData)
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text >Logiut</Text>
            </View>
        </View>
    )
}

export default Profile