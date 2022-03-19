import React from 'react'
import { View, Text, Platform, Dimensions } from 'react-native'


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
        </View>
    )
}

export default Loading