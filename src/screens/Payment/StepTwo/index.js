import React, { useState, useEffect } from 'react'
import { View, ScrollView, Dimensions, Platform, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import MainPayment from '../../../commons/components/MainPayment'
import styles from '../../../commons/styles/payment'

import FormatRupiah from '../../../commons/components/FormatRupiah'

const vehicleImgDefault = require('../../../assets/img/vehicleDefault.png')
const starIcon = require('../../../assets/icons/starIcon.png')
const iIcon = require('../../../assets/icons/iIcon.png')

const StepTwo = ({ navigation, route }) => {
    const [showImg, setShowImg] = useState(vehicleImgDefault)
    const { vehicle, image, rating, quantity, paymentType, date, price } = route.params
    const totalPrice = price * date * quantity

    const getPaymentCodeHandler = () => {
        const params = {
            ...route.params
        }
        navigation.navigate('StepThree', params)
    }

    useEffect(() => {
        if (image !== null) {
            setShowImg({ uri: `${process.env.HOST}/${image}` })
        }
    }, [image])

    return (
        <MainPayment>
            <View>
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
                <View style={{ marginTop: 40 }}>
                    <Text style={styles.detailText}>{`${quantity} ${vehicle}`}</Text>
                    <Text style={styles.detailText}>{paymentType}</Text>
                    <Text style={styles.detailText}>{`${date} days`}</Text>
                    <Text style={styles.detailText}>Jan 18 To Jan 22 2022</Text>
                </View>
                <View style={{ borderTopWidth: 1, top: 21, borderColor: '#DFDEDE' }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                    <Text style={styles.totalPrice}>{`RP. ${totalPrice}`}</Text>
                    <Image source={iIcon} style={{ alignSelf: 'center' }} />
                </View>
                <View style={{ marginTop: 31 }}>
                    <TouchableOpacity style={styles.boxYellow} onPress={getPaymentCodeHandler}>
                        <Text style={styles.bigText}>Get Payment Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainPayment>
    )
}

export default StepTwo