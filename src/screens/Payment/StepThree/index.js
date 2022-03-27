import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CountDown from 'react-native-countdown-component'

import { useSelector } from 'react-redux'
import { postNewHistory } from '../../../modules/utils/history'

import MainPayment from '../../../commons/components/MainPayment'
import styles from '../../../commons/styles/payment'

const StepThree = ({ navigation, route }) => {
    const state = useSelector(state => state)
    const { token } = state.auth
    const { price, location, vehicle, vehicles_id, quantity, paymentType, date } = route.params
    const totalPrice = price * date * quantity

    console.log(route.params)

    const randomCode = (length) => {
        let result = '';
        let randomCode = `${vehicle}${location}${quantity}${paymentType}${date}`
        let randomCodeLength = randomCode.length
        for (let i = 0; i < length; i++) {
            result += (Math.floor(Math.random() *
                randomCodeLength))
        }
        return result
    }

    const bookingCode = (length) => {
        let result = '';
        let randomCode = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`
        let randomCodeLength = randomCode.length
        for (let i = 0; i < length; i++) {
            result += randomCode.charAt(Math.floor(Math.random() *
                randomCodeLength))
        }
        return result
    }

    const timesUp = () => {
        alert("time's up")
        navigation.navigate('Home')
    }

    const finishPaymentHandler = () => {
        const body = {
            date: date,
            quantity: quantity
        }
        postNewHistory(vehicles_id, body, token)
            .then((res) => {
                console.log(res)
                const params = {
                    totalPrice: totalPrice,
                    ...route.params
                }
                navigation.navigate('Finish', params)
            })
            .catch((err) => {
                console.log({ ...err })
            })
        console.log(body)

    }

    return (
        <MainPayment>
            <View style={{ borderBottomWidth: 1, borderColor: '#DFDEDE' }}>
                <Text style={styles.paymentCodeText}>Payment Code :</Text>
                <Text style={styles.randomCodeText}>{randomCode(4)}</Text>
                <Text style={styles.insertText}>Insert yourt payment Code while you transfer booking order Pay before :</Text>
                <View style={{ top: 19 }}>
                    <CountDown
                        size={24}
                        until={864 * 100}
                        onFinish={timesUp}
                        digitStyle={{ backgroundColor: '#FFCD61' }}
                        digitTxtStyle={{ color: 'red' }}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{ m: null, s: null }}
                    />
                </View>
                <Text style={styles.bankText}>Bank account information :</Text>
                <View style={{ top: 16 }}>
                    <Text style={styles.rekBank}>0290-90203-345-2</Text>
                </View>
                <View style={{ top: 16, marginBottom: 19 }}>
                    <Text style={styles.infoText}>{`${vehicle} Rental ${location}`}</Text>
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: '#DFDEDE' }}>
                <View style={{ alignSelf: 'center' }}>
                    <View style={{ marginTop: 17 }}>
                        <Text style={styles.bookingText}>Booking Code : <Text style={styles.bookingCode}>{bookingCode(8)}</Text></Text>
                    </View>
                    <View style={{ marginTop: 17 }}>
                        <Text style={{
                            fontSize: 13,
                            color: '#616167'
                        }}>{`Use Booking Code to Pick your ${vehicle}`}</Text>
                    </View>
                    <View style={{ marginTop: 17 }}>
                        <TouchableOpacity style={styles.boxPayment}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: '#393939'
                            }}>{'Copy Payment & Booking Code'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ top: 16 }}>
                    <Text style={{
                        // top: 21,
                        fontSize: 16,
                        color: '#616167'
                    }}>Order Details :</Text>
                    <Text style={{
                        top: 8,
                        fontSize: 16,
                        color: '#616167'
                    }}>{`${quantity} ${vehicle}`}</Text>
                    <Text style={{
                        top: 8,
                        fontSize: 16,
                        color: '#616167'
                    }}>{paymentType}</Text>
                    <Text style={{
                        top: 8,
                        fontSize: 16,
                        color: '#616167'
                    }}>{`${date} days`}</Text>
                    <Text style={{
                        top: 8,
                        fontSize: 16,
                        color: '#616167',
                        marginBottom: 36
                    }}>Jan 18 2021 to jan 22 2021</Text>
                </View>
            </View>
            <Text style={{
                top: 21,
                fontSize: 36,
                fontWeight: 'bold',
                color: '#393939'
            }}>{`Rp. ${totalPrice}`}</Text>
            <View style={{ top: 31 }}>
                <TouchableOpacity style={styles.boxYellow} onPress={finishPaymentHandler}>
                    <Text style={styles.bigText}>Finish Payment</Text>
                </TouchableOpacity>
            </View>
        </MainPayment>
    )
}

export default StepThree