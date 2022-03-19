import axios from 'axios'
import {
    View, Text, Image, TextInput,
    TouchableOpacity, ScrollView, ImageBackground
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { vehicleTypeLimit } from '../../modules/utils/vehicles'

import styles from '../../commons/styles/home'
import Loading from '../../commons/components/Loading'

const homeBg = require('../../assets/img/home.png')
const vehicleDefault = require('../../assets/img/vehicleDefault.png')
const searchIconHome = require('../../assets/icons/searchIconHome.png')

const Home = ({ navigation }) => {
    const [listCar, setLisCar] = useState([])
    const [listMotorBike, setListMotorBike] = useState([])
    const [listBike, setListBike] = useState([])

    const state = useSelector(state => state)
    const { userData, isPending } = state.auth

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
            })
            .catch((err) => {
                console.log(err)
            })
    }, [axios, vehicleTypeLimit])

    return (
        <>
            {!isPending ? (
                <ScrollView style={styles.container}>
                    <ImageBackground source={homeBg} style={styles.imgHeader} />
                    <TextInput placeholder='Search Vehicles' style={styles.search} placeholderTextColor='#fff' />

                    <TouchableOpacity style={styles.searchIcon}>
                        <Image source={searchIconHome} />
                    </TouchableOpacity>
                    {userData && userData.role === 'owner' ? (
                        <TouchableOpacity style={styles.btnAdd} onPress={() => { navigation.navigate('AddVehicle') }}>
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
                            {Array.isArray(listCar) && listCar.length > 0 &&
                                listCar.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                            <Image source={
                                                !`${process.env.HOST}/${data.image}` ? vehicleDefault :
                                                    !{ uri: `${process.env.HOST}/${data.image}` } ? vehicleDefault :
                                                        { uri: `${process.env.HOST}/${data.image}` }
                                            } style={styles.vehiclesImgList}
                                                placeholder='blur'
                                                blurDataURL={vehicleDefault}
                                                onError={(e) => {
                                                    e.onError = null
                                                    vehicleDefault
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </React.Fragment>
                                ))
                            }
                        </ScrollView>
                    ) : (
                        <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Coming Soon</Text>
                        </View>
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 320, alignSelf: 'center', marginTop: 22 }}>
                        <Text style={styles.listText}>Motorbike</Text>
                        <Text style={styles.viewMoreText}>View More</Text>
                    </View>
                    {listMotorBike.length !== 0 ? (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {Array.isArray(listMotorBike) && Array.length > 0 &&
                                listMotorBike.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                            <Image source={
                                                !`${process.env.HOST}/${data.image}` ? vehicleDefault :
                                                    !{ uri: `${process.env.HOST}/${data.image}` } ? vehicleDefault :
                                                        { uri: `${process.env.HOST}/${data.image}` }
                                            } style={styles.vehiclesImgList}
                                                placeholder='blur'
                                                blurDataURL={vehicleDefault}
                                                onError={(e) => {
                                                    e.onError = null
                                                    vehicleDefault
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </React.Fragment>
                                ))
                            }
                        </ScrollView>
                    ) : (
                        <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Coming Soon</Text>
                        </View>
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 320, alignSelf: 'center', marginTop: 22 }}>
                        <Text style={styles.listText}>Bike</Text>
                        <Text style={styles.viewMoreText}>View More</Text>
                    </View>
                    {listBike.length !== 0 ? (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
                            {Array.isArray(listBike) && Array.length > 0 &&
                                listBike.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                            <Image source={
                                                !`${process.env.HOST}/${data.image}` ? vehicleDefault :
                                                    !{ uri: `${process.env.HOST}/${data.image}` } ? vehicleDefault :
                                                        { uri: `${process.env.HOST}/${data.image}` }
                                            } style={styles.vehiclesImgList}
                                                placeholder='blur'
                                                blurDataURL={vehicleDefault}
                                                onError={(e) => {
                                                    e.onError = null
                                                    vehicleDefault
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </React.Fragment>
                                ))
                            }
                        </ScrollView>
                    ) : (
                        <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Coming Soon</Text>
                        </View>
                    )}
                </ScrollView>
            ) :
                (
                    <Loading />
                )}
        </>
    )
}

export default Home