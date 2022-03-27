import {
    View, Text, Image,
    TouchableOpacity, ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { listVechileAction } from '../../redux/actions/listVehicles'
import Loading from '../../commons/components/Loading'
import styles from '../../commons/styles/listVehicle'

const vehicleDefault = require('../../assets/img/vehicleDefault.png')
const filterIcon = require('../../assets/icons/filterIcon.png')
const starIcon = require('../../assets/icons/starIcon.png')

const VehicleList = ({ navigation, route }) => {
    const [search, setSearch] = useState('')
    const [dataVehicleArr, setDataVehicleArr] = useState([])
    const [meta, setMeta] = useState({})

    const [headerTypeText, setHeaderTypeText] = useState('')
    const [headerSearchText, setHeaderSearchText] = useState('')
    const [headerText, setHeaderText] = useState('')

    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { page, totalPage, prev, next } = meta

    const { listVehicle } = state
    const { isPending } = listVehicle

    const { params } = route

    const { by, order, location, type } = params
    console.log(params)

    useEffect(() => {
        if (type === 1) setHeaderTypeText('Car')
        if (type === 2) setHeaderTypeText('Motorbike')
        if (type === 3) setHeaderTypeText('Bike')

        if (search !== '') {
            setSearch(search)
            setHeaderSearchText(search)
        }

        // Header Text
        if (search === '' && type !== '') setHeaderText(`${headerTypeText}`)
        if (search !== '' && type === '') setHeaderText(`${headerSearchText}`)
        if (search !== '' && type !== '') setHeaderText(`${headerSearchText} - ${headerTypeText}`)

    }, [params, headerSearchText, headerTypeText, headerText, type, search])

    console.log('ini param list', params)
    useEffect(() => {
        const newParams = {
            ...params,
            limit: 5,
            page: 1
        }
        console.log('ini new Params', newParams)
        dispatch(listVechileAction(newParams))
            .then((res) => {
                setDataVehicleArr(res.value.data.result.data)
                setMeta(res.value.data.result.meta)
            })
            .catch(err => console.log(err))
    }, [dispatch, listVechileAction, params])

    const nextHandler = () => {
        const { page } = meta
        const params = {
            search: search,
            type: type,
            location, location,
            by: by,
            order: order,
            limit: 5,
            page: page + 1
        }
        dispatch(listVechileAction(params))
            .then((res) => {
                setDataVehicleArr(res.value.data.result.data)
                setMeta(res.value.data.result.meta)
            })
            .catch(err => console.log(err))
    }

    const prevHandler = () => {
        const { page } = meta
        const params = {
            search: search,
            type: type,
            location, location,
            by: by,
            order: order,
            limit: 5,
            page: page - 1
        }
        dispatch(listVechileAction(params))
            .then((res) => {
                setDataVehicleArr(res.value.data.result.data)
                setMeta(res.value.data.result.meta)
            })
            .catch(err => console.log({ ...err }))
    }

    return (
        <>

            <ScrollView style={styles.container}>
                <View style={styles.boxHeader} >
                    <Text style={{ fontSize: 16 }}>{`${headerText}`}</Text>
                </View>

                <View style={{ marginTop: 19, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', marginBottom: 16 }}>
                    <TouchableOpacity onPress={() => {
                        const newParams = {
                            ...route.params
                        }
                        navigation.navigate('FilterSearch', newParams)
                    }}>
                        <View style={{ flexDirection: 'row', marginLeft: 18 }} >
                            <Image source={filterIcon} style={{ height: 16, width: 16 }} />
                            <Text style={styles.filterText}>Filter search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30, marginLeft: 18 }}>

                    {dataVehicleArr.length !== 0 ?
                        (
                            <>
                                {
                                    Array.isArray(dataVehicleArr) && dataVehicleArr.length > 0 &&
                                    dataVehicleArr.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                                    <Image source={vehicleDefault} style={styles.vehicleImgDefault} />
                                                    <View style={styles.boxStar}>
                                                        <Text style={styles.ratingText}>{data.rating === null ? '0' : `${data.rating}`}</Text>
                                                        <Image source={starIcon} />
                                                    </View>
                                                    <Image source={data.image ? { uri: `${process.env.HOST}/${data.image}` } : vehicleDefault} style={styles.vehicleImg} />
                                                </TouchableOpacity>
                                                <View style={{ marginLeft: 24 }}>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#393939' }}>{`${data.vehicle}`}</Text>
                                                    <Text style={{ fontSize: 12, color: '#393939' }}>Max For {data.types === 'car' ? '4' : data.types === 'motorbike' ? '2' : '1'} person</Text>
                                                    <Text style={{ fontSize: 12, color: '#393939' }}>2.1 km from your location</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: data.stock === 0 ? 'red' : 'green' }}>{data.stock === 0 ? 'Not Available' : 'Available'}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#393939' }}>{`Rp. ${data.price}/day`}</Text>
                                                </View>
                                            </View>
                                        </React.Fragment>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                <View style={{ alignSelf: 'center', justifyContent: 'center', height: 450 }}>
                                    <Text>No Data Found</Text>
                                </View>
                            </>
                        )
                    }

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 21 }}>
                    <TouchableOpacity onPress={prevHandler} disabled={prev === null ? true : false}>
                        <View style={{
                            backgroundColor: prev === null ? '#D3D3D3' : '#FFCD61',
                            width: 60, height: 30,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>Prev</Text>
                        </View>
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
                        }}>{`${page}`}</Text>
                    </View>
                    <TouchableOpacity onPress={nextHandler} disabled={page === totalPage || next === null ? true : false}>
                        <View style={{
                            backgroundColor: page === totalPage || next === null ? '#D3D3D3' : '#FFCD61',
                            width: 60, height: 30,
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </>
    )
}

export default VehicleList