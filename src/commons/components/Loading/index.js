import React from 'react'
import { View, Text, Platform, Dimensions, TouchableOpacity, Linking } from 'react-native'


import FastImage from 'react-native-fast-image'

const vehicleRentalLoading = require('../../../assets/gif/vehicleRentalLoading.gif')

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const Loading = () => {
    return (
        <View style={{
            height: deviceHeight,
            width: deviceWidth,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>
            <FastImage source={vehicleRentalLoading} style={{
                width: 300,
                height: 300,
            }}
            />
            <Text>Loading</Text>
            <Text style={{ textAlign: 'center', marginTop: 10 }}>if loading doesn't finish, check the vehicle rental website.
                maybe there is a server error or maintenance</Text>
            <TouchableOpacity>
                <Text style={{ color: 'blue' }}
                    onPress={() => {
                        Linking.openURL('https://vehicle-rental-react.vercel.app/')
                    }}
                >Vehicle Rental Website</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Loading