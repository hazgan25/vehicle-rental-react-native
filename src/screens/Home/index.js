import {
    View, Text, Image, TextInput,
    TouchableOpacity, ScrollView, ImageBackground
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { listVehicleCarAction, listVehicleMotorbikeAction, listVehicleBikeAction } from '../../redux/actions/listVehicles'
import { vehicleTypeLimit } from '../../modules/utils/vehicles'

import styles from '../../commons/styles/home'
import Loading from '../../commons/components/Loading'

const homeBg = require('../../assets/img/home.png')
const vehicleDefault = require('../../assets/img/vehicleDefault.png')
const searchIconHome = require('../../assets/icons/searchIconHome.png')

const Home = ({ navigation, route }) => {
    const [listCar, setListCar] = useState([])
    const [listMotorBike, setListMotorBike] = useState([])
    const [listBike, setListBike] = useState([])
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { userData, isPending } = state.auth
    const vehicleIsPending = state.listVehicle.isPending

    useEffect(() => {
        const paramCar = { search: '', type: 1, location: '', by: 'id', order: 'desc', limit: 5, page: 1 }
        const paramMotorBike = { search: '', type: 2, location: '', by: 'id', order: 'desc', limit: 5, page: 1 }
        const paramBike = { search: '', type: 3, location: '', by: 'id', order: 'desc', limit: 5, page: 1 }
        // listCar
        dispatch(listVehicleCarAction(paramCar))
            .then((res) => {
                setListCar(res.value.data.result.data)
            })
            .catch((err) => {
                if (err) {
                    navigation.replace('ErrorServer')
                }
            })

        // listMotorBike
        dispatch(listVehicleMotorbikeAction(paramMotorBike))
            .then((res) => {
                setListMotorBike(res.value.data.result.data)
            })
            .catch(err => console.log(err))

        // listBike
        dispatch(listVehicleBikeAction(paramBike))
            .then((res) => {
                setListBike(res.value.data.result.data)
            })
            .catch(err => console.log(err))

        if (route.params !== undefined) {
            // listCar
            dispatch(listVehicleCarAction(paramCar))
                .then((res) => {
                    setListCar(res.value.data.result.data)
                })
                .catch(err => console.log(err))

            // listMotorBike
            dispatch(listVehicleMotorbikeAction(paramMotorBike))
                .then((res) => {
                    setListMotorBike(res.value.data.result.data)
                })
                .catch(err => console.log(err))

            // listBike
            dispatch(listVehicleBikeAction(paramBike))
                .then((res) => {
                    setListBike(res.value.data.result.data)
                })
                .catch(err => console.log(err))
        }
    }, [vehicleTypeLimit, dispatch, route])

    return (
        <>
            {!isPending && !vehicleIsPending ? (
                <ScrollView style={styles.container}>
                    <ImageBackground source={homeBg} style={styles.imgHeader} />
                    <TextInput placeholder='Search Vehicles' style={styles.search} placeholderTextColor='#fff' onChangeText={e => setSearch(e)} />
                    <TouchableOpacity style={styles.searchIcon} onPress={
                        () => {
                            const params = {
                                search: search,
                                type: '',
                                location: '',
                                by: '',
                                order: '',
                            }
                            navigation.navigate('VehicleList', params)
                        }
                    }>
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
                        <TouchableOpacity onPress={
                            () => {
                                const params = {
                                    search: '',
                                    type: 1,
                                    location: '',
                                    by: '',
                                    order: '',
                                }
                                navigation.navigate('VehicleList', params)
                            }
                        }>
                            <Text style={styles.viewMoreText}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    {listCar.length !== 0 ? (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {Array.isArray(listCar) && listCar.length > 0 &&
                                listCar.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                            <Image source={vehicleDefault} style={styles.vehiclesImgListDefault} />
                                            <Image source={data.image ? { uri: `${process.env.HOST}/${data.image}` } : vehicleDefault} style={styles.vehiclesImgList} />
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
                        <TouchableOpacity onPress={
                            () => {
                                const params = {
                                    search: '',
                                    type: 2,
                                    location: '',
                                    by: '',
                                    order: '',
                                }
                                navigation.navigate('VehicleList', params)
                            }
                        }>
                            <Text style={styles.viewMoreText}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    {listMotorBike.length !== 0 ? (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {Array.isArray(listMotorBike) && Array.length > 0 &&
                                listMotorBike.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                            <Image source={vehicleDefault} style={styles.vehiclesImgListDefault} />
                                            <Image source={data.image ? { uri: `${process.env.HOST}/${data.image}` } : vehicleDefault} style={styles.vehiclesImgList} />
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
                        <TouchableOpacity
                            onPress={
                                () => {
                                    const params = {
                                        search: '',
                                        type: 3,
                                        location: '',
                                        by: '',
                                        order: '',
                                    }
                                    navigation.navigate('VehicleList', params)
                                }
                            }
                        >
                            <Text style={styles.viewMoreText}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    {listBike.length !== 0 ? (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
                            {Array.isArray(listBike) && Array.length > 0 &&
                                listBike.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                            <Image source={vehicleDefault} style={styles.vehiclesImgListDefault} />
                                            <Image source={data.image ? { uri: `${process.env.HOST}/${data.image}` } : vehicleDefault} style={styles.vehiclesImgList} />
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