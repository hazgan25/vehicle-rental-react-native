import {
    View, Text, Image,
    TouchableOpacity, ScrollView, StyleSheet
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getHistoryById } from '../../modules/utils/history'

import CheckBox from '@react-native-community/checkbox'

const vehicleImgDefault = require('../../assets/img/vehicleDefault.png')

const History = ({ navigation }) => {
    const state = useSelector(state => state)
    const { token } = state.auth

    const [historyData, setHistoryData] = useState([])
    const [meta, setMeta] = useState([])

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [selectData, setSelectData] = useState([])

    // console.log(meta)
    const { page, next, prev, totalPage } = meta

    useEffect(() => {
        const params = {
            page: 1
        }
        getHistoryById(params, token)
            .then((res) => {
                setHistoryData(res.data.result.data)
                setMeta(res.data.result.meta)
            })
            .catch(err => console.log(err))
    }, [token])

    const nextHandler = () => {
        const paramsNext = {
            page: page + 1
        }
        getHistoryById(paramsNext, token)
            .then((res) => {
                setHistoryData(res.data.result.data)
                setMeta(res.data.result.meta)
            })
            .catch(err => console.log(err))
    }

    const prevHandler = () => {
        const paramsNext = {
            page: page - 1
        }
        getHistoryById(paramsNext, token)
            .then((res) => {
                setHistoryData(res.data.result.data)
                setMeta(res.data.result.meta)
            })
            .catch(err => console.log(err))
    }

    return (
        <ScrollView>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.historyOrderText}>History Order</Text>

                <View style={{ marginTop: 41 }}>
                    {
                        Array.isArray(historyData) && historyData.length > 0 &&
                        historyData.map((data) => (
                            <React.Fragment key={data.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 19 }}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('VehicleDetail', data.id) }}>
                                        <Image source={vehicleImgDefault} style={styles.vehicleImgDefault} />
                                        <Image source={data.image ? { uri: `${process.env.HOST}/${data.image}` } : vehicleImgDefault} style={styles.vehicleImg} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#393939' }}>{data.name}</Text>
                                        <Text style={{ fontSize: 12, color: '#393939' }}>Jan 18 to 21</Text>
                                        <Text style={{ fontSize: 12, color: '#393939', fontWeight: 'bold' }}>Prepayment : Rp. {data.payment}</Text>
                                        <Text style={{ color: data.status === 'Not been returned' ? 'red' : 'green' }}>
                                            {data.status}
                                        </Text>
                                    </View>
                                    <View style={{
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <CheckBox
                                            disabled={false}
                                            boxType='circle'
                                            value={toggleCheckBox}
                                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                        />
                                    </View>
                                </View>
                            </React.Fragment>
                        ))
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

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    historyOrderText: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    vehicleImg: {
        width: 101,
        height: 88,
        // marginLeft: 30,
        // marginBottom: 26,
        borderRadius: 20,
    },
    vehicleImgDefault: {
        position: 'absolute',
        width: 101,
        height: 88,
        // marginLeft: 30,
        // marginBottom: 26,
        borderRadius: 20,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    }
})

export default History