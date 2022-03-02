import axios from 'axios'
import {
    View, Text, Image, TextInput,
    KeyboardAvoidingView, TouchableOpacity,
    ScrollView, ImageBackground
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { vehicleTypeLimit } from '../../modules/utils/vehicles'

import styles from '../../commons/styles/home'

const homeBg = require('../../assets/img/home.png')

const Home = () => {
    const state = useSelector(state => state)
    const [listCar, setLisCar] = useState([])
    const [listMotorBike, setListMotorBike] = useState([])
    const [listBike, setListBike] = useState([])

    const { role } = state.auth.userData
    useEffect(() => {
        const paramCar = { type: 1, limit: 5 }
        const paramMotorBike = { type: 2, limit: 5 }
        const paramBike = { type: 3, limit: 5 }
        const urlCar = vehicleTypeLimit(paramCar)
        const urlMotorBike = vehicleTypeLimit(paramMotorBike)
        const urlBike = vehicleTypeLimit(paramBike)
        axios.all([urlCar, urlMotorBike, urlBike])
            .then((res) => {
                setLisCar(res[0].data.result.data)
                setListMotorBike(res[1].data.result.data)
                setListBike(res[2].data.result.data)
                console.log('ini res', res)
            })
            .catch(() => {
                console.log(err)
            })

    }, [])
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={homeBg} style={styles.imgHeader} />
            <TextInput placeholder='Search Vehicles' style={styles.search} placeholderTextColor='#fff' />
            {role === 'owner' ? (
                <TouchableOpacity style={styles.btnAdd}>
                    <Text style={styles.addNewText}>Add New Item</Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 320, alignSelf: 'center', marginTop: 22 }}>
                <Text style={styles.listText}>Cars</Text>
                <Text style={styles.viewMoreText}>View More</Text>
            </View>

            {listCar.length !== 0 ? (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {Array.isArray(listCar) && Array.length > 0 &&
                        listCar.map((data, idx) => (
                            <>
                                <TouchableOpacity key={idx}>
                                    <Image source={{ uri: data.images[0] }} />
                                </TouchableOpacity>
                                {/* <Image source={{uri}} /> */}
                                {console.log(data.images[0])}
                            </>
                        ))
                    }
                </ScrollView>
            ) : (
                <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Coming Soon</Text>
                </View>
            )}
        </ScrollView>
    )
}

export default Home