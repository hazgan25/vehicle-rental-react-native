import React, { useState, useEffect } from 'react'
import {
    ScrollView, View, Text,
    TouchableOpacity, Image,
    Platform, Dimensions, TextInput
} from 'react-native'

import { useSelector } from 'react-redux'
import { getListVehicleByOwner } from '../../modules/utils/vehicles'
import { getLocationByRenterId } from '../../modules/utils/location'

import { DataTable } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

const backArrow = require('../../assets/icons/backArrow.png')
const searchIconHome = require('../../assets/icons/searchIconHome.png')

const height = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
const width = Dimensions.get('window').width

const ListVehicleByOwner = ({ navigation }) => {
    const state = useSelector(state => state)
    const { token } = state.auth

    const [inputSearch, setInputSearch] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleLocation, setVehicleLocation] = useState('')
    const [vehiclePage, setVehiclePage] = useState(1)

    const [locationArr, setLocationArr] = useState([])
    const [dataVehicle, setDataVehicle] = useState([])
    const [vehicleMeta, setVehicleMeta] = useState({})

    const vehicleBy = 'id'
    const vehicleOrder = 'desc'
    const vehicleLimit = 6

    useEffect(() => {
        const params = {
            search: inputSearch,
            type: vehicleType,
            location: vehicleLocation,
            by: vehicleBy,
            order: vehicleOrder,
            limit: vehicleLimit,
            page: vehiclePage
        }
        getListVehicleByOwner(params, token)
            .then((res) => {
                setDataVehicle(res.data.result.data)
                setVehicleMeta(res.data.result.meta)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })

        getLocationByRenterId(token)
            .then((res) => {
                setLocationArr(res.data.result)
            })
            .catch((err) => {
                console.log({ ...err })
            })
    }, [token, inputSearch, vehicleType, vehicleLocation, vehicleBy, vehicleOrder, vehicleLimit, vehiclePage])

    const headArrTablet = ['ID', 'Name', 'Type', 'Stock', 'Rating', 'Setup']

    const searchHandler = () => {
        setVehiclePage(1)
        const params = {
            search: inputSearch,
            type: vehicleType,
            location: vehicleLocation,
            by: vehicleBy,
            order: vehicleOrder,
            limit: vehicleLimit,
            page: vehiclePage
        }
        getListVehicleByOwner(params, token)
            .then((res) => {
                setDataVehicle(res.data.result.data)
                setVehicleMeta(res.data.result.meta)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    return (
        <ScrollView style={{
            backgroundColor: '#fff',
            height: height,
            width: width,
            flex: 1,
            alignSelf: 'center'
        }}>
            <View style={{
                flexDirection: 'row',
                width: 293,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 16,
                marginLeft: 17
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    width: 100,
                    justifyContent: 'space-between',
                    marginTop: 16,
                    marginLeft: 17
                }} onPress={() => { navigation.goBack() }} >
                    <Image source={backArrow} style={{
                        width: 14,
                        height: 22,
                    }} />
                </TouchableOpacity>
                <Text style={{
                    fontFamily: 'Nunito',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color: '#393939',
                    fontSize: 23,
                    left: -70,
                    marginTop: 8
                }}>Data of List Vehicle Product</Text>
            </View>

            <View>
                <TextInput placeholder='Search Vehicle' style={{
                    fontFamily: 'Nunito',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 14,
                    lineHeight: 19,
                    height: 51,
                    width: width - 30,
                    backgroundColor: 'rgba(57,57,57, 0.2)',
                    color: '#393939',
                    paddingLeft: 14,

                    borderRadius: 10,
                    marginTop: 39,
                    alignSelf: 'center'
                }} placeholderTextColor='#393939' value={inputSearch} onChangeText={text => setInputSearch(text)} />
                <TouchableOpacity style={{
                    position: 'absolute',
                    height: 20,
                    width: 20,
                    right: 26,
                    top: 53
                }} onPress={searchHandler}>
                    <Image source={searchIconHome} style={{ tintColor: '#393939' }} />
                </TouchableOpacity>
            </View>

            <View>
                <Picker
                    label='Select Filter'
                    mode='dialog'
                    selectedValue={vehicleType}
                    onValueChange={(value) => { setVehicleType(value) }}>
                    <Picker.Item label='Default Filter Type' value={''} />
                    <Picker.Item label='Filter Car' value={'1'} />
                    <Picker.Item label='Filter Motorbike' value={'2'} />
                    <Picker.Item label='Filter Bike' value={'3'} />
                </Picker>
            </View>

            <View>
                <Picker
                    label='Select Location'
                    mode='dialog'
                    selectedValue={vehicleLocation}
                    onValueChange={(value) => { setVehicleLocation(value) }}>
                    <Picker.Item label='Default Filter Location' value={''} />
                    {
                        Array.isArray(locationArr) && locationArr.length > 0 &&
                        locationArr.map((data, idx) => (
                            <Picker.Item label={data.name} value={data.id} key={idx} />
                        ))
                    }
                </Picker>
            </View>

            <TouchableOpacity style={{
                width: width - 10,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#FFCD61',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 13
            }} onPress={searchHandler}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 21
                }}>Search</Text>
            </TouchableOpacity>

            <View style={{ height: 360 }}>
                <DataTable>
                    <DataTable.Header>
                        {
                            headArrTablet.map((data, idx) => (
                                <DataTable.Title key={idx} style={{ padding: 10 }}>{data}</DataTable.Title>
                            ))
                        }
                    </DataTable.Header>
                    {
                        Array.isArray(dataVehicle) && dataVehicle.length > 0 &&
                        dataVehicle.map((data, idx) => (
                            <DataTable.Row key={idx}>
                                <DataTable.Cell>{data.id}</DataTable.Cell>
                                <DataTable.Cell>{data.vehicle}</DataTable.Cell>
                                <DataTable.Cell>{data.types}</DataTable.Cell>
                                <DataTable.Cell>{data.stock}</DataTable.Cell>
                                <DataTable.Cell>{data.rating === null ? 0 : data.rating}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>Setup</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))
                    }
                </DataTable>
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'relative' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setVehiclePage(vehiclePage - 1)
                        }}
                        style={{
                            backgroundColor: vehicleMeta.prev === null ? '#D3D3D3' : '#FFCD61',
                            width: 60,
                            height: 30,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        disabled={vehicleMeta.prev === null ? true : false}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>Prev</Text>
                    </TouchableOpacity>
                    <View style={{
                        width: 30,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>{`${vehicleMeta.page}`}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: vehicleMeta.page === vehicleMeta.totalPage || vehicleMeta.next === null ? '#D3D3D3' : '#FFCD61',
                            width: 60, height: 30,
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        disabled={vehicleMeta.page === vehicleMeta.totalPage || vehicleMeta.next === null ? true : false}
                        onPress={() => {
                            setVehiclePage(vehiclePage + 1)
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

export default ListVehicleByOwner