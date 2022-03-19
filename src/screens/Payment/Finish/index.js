import React from 'react'
import { View, ScrollView, Dimensions, Platform, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import MainPayment from '../../../commons/components/MainPayment'

const Finish = ({ navigation, route }) => {
    return (
        <MainPayment>
            <Text>ini StepThree</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('StepTwo') }} style={{ backgroundColor: 'blue' }}>
                <Text>Menuju Step StepTwo</Text>
            </TouchableOpacity>
        </MainPayment>
    )
}

export default Finish