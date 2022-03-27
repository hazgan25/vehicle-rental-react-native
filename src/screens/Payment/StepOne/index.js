import React, { useState, useEffect } from 'react'
import { View, ScrollView, Dimensions, Platform, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import { Picker } from '@react-native-picker/picker'


import MainPayment from '../../../commons/components/MainPayment'
import styles from '../../../commons/styles/payment'
import Toast from 'react-native-toast-message'

const StepOne = ({ navigation, route }) => {
    const [idCard, setIdCard] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [locationAddress, setLocationAddress] = useState('')
    const [selectPaymentType, setSelectPaymentType] = useState('')
    const [paymentType, setPaymentType] = useState('')

    useEffect(() => {
        if (selectPaymentType === 1) {
            setPaymentType('Prepayment (no tax)')
        }
        if (selectPaymentType === 2) {
            setPaymentType('Pay at the end (include tax)')
        }
        if (selectPaymentType === 3) {
            setPaymentType('Partial Payment (include tax)')
        }
    }, [selectPaymentType])
    const seeOrderDetailHandler = () => {
        if (idCard === '' || firstName === '' || lastName === '' || mobilePhone === '' || emailAddress === '' || locationAddress === '' || paymentType === '') {
            Toast.show({
                type: 'error',
                text1: 'All must be filled'
            })
        } else {
            const params = {
                idCard: idCard,
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                mobilePhone: mobilePhone,
                locationAddress: locationAddress,
                paymentType: paymentType,
                ...route.params
            }
            navigation.navigate('StepTwo', params)
        }
    }
    return (
        <MainPayment>
            <View style={{ zIndex: 1 }}>
                <Toast />
            </View>
            <TextInput style={styles.inputBox} keyboardType='number-pad' placeholder='ID Card Number' onChangeText={text => setIdCard(text)} />
            <View style={{ marginTop: 18 }}>
                <TextInput style={styles.inputBox} placeholder='First Name' onChangeText={text => setFirstName(text)} />
            </View>
            <View style={{ marginTop: 18 }}>
                <TextInput style={styles.inputBox} placeholder='Last Name' onChangeText={text => setLastName(text)} />
            </View>
            <View style={{ marginTop: 18 }}>
                <TextInput style={styles.inputBox} keyboardType='number-pad' placeholder='Mobile Phone (must be active)' onChangeText={text => setMobilePhone(text)} />
            </View>
            <View style={{ marginTop: 18 }}>
                <TextInput style={styles.inputBox} keyboardType='email-address' placeholder='Email Address' onChangeText={text => setEmailAddress(text)} />
            </View>
            <View style={{ marginTop: 18 }}>
                <TextInput style={styles.inputBox} placeholder='Location (home, office, etc)' onChangeText={text => setLocationAddress(text)} />
            </View>
            <View style={{ marginTop: 18 }}>
                <View style={styles.inputBox}>
                    <Picker
                        mode='dialog'
                        selectedValue={selectPaymentType}
                        onValueChange={(value) => {
                            if (value !== '') {
                                setSelectPaymentType(value)
                            }
                        }}
                    >
                        <Picker.Item label='Payment Type'
                            value={''}
                            enabled={selectPaymentType === '' ? true : false}
                            style={selectPaymentType === '' ? { color: '#9F9F9F' } : ''}
                        />
                        <Picker.Item label='Prepayment (no tax)' value={1} />
                        <Picker.Item label='Pay at the end (include tax)' value={2} />
                        <Picker.Item label='Partial Payment (include tax)' value={3} />
                    </Picker>
                </View>
                <View style={{ marginTop: 34 }}>
                    <TouchableOpacity style={styles.boxYellow} onPress={seeOrderDetailHandler}>
                        <Text style={styles.bigText}>See Order Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainPayment>
    )
}

export default StepOne