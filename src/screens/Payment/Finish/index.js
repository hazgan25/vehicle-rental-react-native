import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from '../../../commons/styles/payment'
import MainPayment from '../../../commons/components/MainPayment'

import { useSelector } from 'react-redux'
import { getHistoryById } from '../../../modules/utils/history'

const vehicleImgDefault = require('../../../assets/img/vehicleDefault.png')
const starIcon = require('../../../assets/icons/starIcon.png')

const Finish = ({ navigation, route }) => {
    const state = useSelector(state => state)
    const { token } = state.auth

    const [showImg, setShowImg] = useState(vehicleImgDefault)
    const { vehicle, firstName, lastName, emailAddress, mobilePhone, image, rating, quantity, paymentType, date, locationAddress, totalPrice } = route.params

    const randomId = (length) => {
        let result = '';
        let randomCode = `${vehicle}${location}${quantity}${paymentType}${date}`
        let randomCodeLength = randomCode.length
        for (let i = 0; i < length; i++) {
            result += (Math.floor(Math.random() *
                randomCodeLength))
        }
        return result
    }

    useEffect(() => {
        if (image !== null) {
            setShowImg({ uri: `${process.env.HOST}/${image}` })
        }
        const params = {
            page: 1
        }
        if (token) {
            getHistoryById(params, token)
                .then((res) => {
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }, [image, token])

    return (
        <MainPayment>
            <View style={{ alignItems: 'center' }}>

                <Text style={styles.paymentText}>Payment Success!</Text>
                <View style={{ marginTop: 36 }}>
                    <Image source={showImg} style={styles.vehicleImg}
                        onError={e => {
                            e.onError = null
                            setShowImg(vehicleImgDefault)
                        }}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.scoreBg}>
                            <Text style={styles.scoreText}>{rating === null ? '0' : `${rating}`}</Text>
                            <View style={styles.strIcon}>
                                <Image source={starIcon} />
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{ borderBottomWidth: 1, width: '100%', borderColor: '#DFDEDE', marginTop: 32, alignSelf: 'flex-start' }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#616167',
                        lineHeight: 50
                    }}>{`${quantity} ${vehicle}`}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#616167',

                    }}>{`${paymentType}`}</Text>
                    <Text style={{

                        fontSize: 16,
                        color: '#616167',
                        lineHeight: 50

                    }}>Jan 18 2021 to jan 22 2021</Text>
                </View>

                <View style={{ marginTop: 12, alignSelf: 'flex-start' }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#616167',
                        lineHeight: 50
                    }}>{`ID : ${randomId(6)}`}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#616167',
                    }}>{`${firstName} ${lastName} (${emailAddress})`}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#616167',
                        lineHeight: 50
                    }}>{`${mobilePhone} (`}
                        <Text style={{ color: '#087E0D' }}>{`Active`}</Text><Text>{`)`}</Text>
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#616167',
                    }}>
                        {`${locationAddress}`}
                    </Text>
                </View>

            </View>

            <View style={{ marginTop: 50 }}>
                <TouchableOpacity style={styles.boxYellow} onPress={() => {
                    const params = { reservation: true }
                    navigation.navigate('History', params)
                }}>
                    <Text style={styles.bigText} >{`Total : ${totalPrice}`}</Text>
                </TouchableOpacity>
            </View>
        </MainPayment>
    )
}

export default Finish