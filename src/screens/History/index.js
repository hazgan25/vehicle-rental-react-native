import {
    View, Text, Image, TextInput,
    TouchableOpacity, StyleSheet, Dimensions, ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getHistoryById, postAddOrEditHRating, delHistoryUser } from '../../modules/utils/history'

import { Picker } from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'

const vehicleImgDefault = require('../../assets/img/vehicleDefault.png')
const vehiclenotfound = require('../../assets/img/vehiclenotfound.png')

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const History = () => {
    const state = useSelector(state => state)
    const { token } = state.auth

    const [historyData, setHistoryData] = useState([])
    const [meta, setMeta] = useState([])

    const [checked, setChecked] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [checkDel, setCheckDel] = useState([])

    const [idAddorEditRating, setIdAddOrEditRating] = useState('')
    const [selectRating, setSelectRating] = useState()
    const [inputTesti, setInputTesti] = useState('')

    const { page, next, prev, totalPage } = meta

    useEffect(() => {
        const params = {
            page: 1
        }
        if (token) {
            getHistoryById(params, token)
                .then((res) => {
                    setHistoryData(res.data.result.data)
                    setMeta(res.data.result.meta)
                })
                .catch(err => console.log(err))
        }
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

    console.log(historyData)

    const addEditRatingHandler = () => {
        const body = {
            'rating': selectRating,
            'testimony': inputTesti
        }
        postAddOrEditHRating(idAddorEditRating, body, token)
            .then((res) => {
                Toast.show({
                    type: 'success',
                    text1: 'Successed',
                    text2: `${res.data.result.msg}`
                })
                setCheckDel([])
                setInputTesti('')
                setSelectRating('')
                setChecked({})
                setIdAddOrEditRating('')
                setIsModalVisible(!isModalVisible)

                const params = { page: 1 }
                getHistoryById(params, token)
                    .then((res) => {
                        setHistoryData(res.data.result.data)
                        setMeta(res.data.result.meta)
                    })
                    .catch(err => console.log(err))
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    const deleteItemHandler = () => {
        delHistoryUser(checkDel, token)
            .then((res) => {
                Toast.show({
                    type: 'success',
                    text1: `${res.data.result.msg}`
                })
                setCheckDel([])
                setInputTesti('')
                setSelectRating('')
                setChecked({})
                setIdAddOrEditRating('')
                setIsModalVisible(!isModalVisible)

                const params = { page: 1 }
                getHistoryById(params, token)
                    .then((res) => {
                        setHistoryData(res.data.result.data)
                        setMeta(res.data.result.meta)
                    })
                    .catch(err => console.log(err))
            })
            .catch(({ ...err }) => {
                Toast.show({
                    type: 'error',
                    text1: 'There is an error?',
                    text2: `${err.response.data.err}`
                })
                setCheckDel([])
                setChecked({})
                setIsModalVisible(!isModalVisible)
            })
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.historyOrderText}>History Order</Text>

            {!token ? (
                <React.Fragment>
                    <View style={{ marginTop: 41 }}>
                        <Image source={vehiclenotfound} style={{ width: 390, height: 200, marginTop: 53 }} />
                        <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', marginTop: 20 }}>Data history not found! please login first</Text>
                    </View>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <View style={{ marginTop: 41, height: 540 }}>
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

                                        <TouchableOpacity
                                            disabled={data.status === 'Has been returned' ? false : true}
                                            style={{ backgroundColor: data.rating !== null ? '#FFCD61' : 'rgba(0, 0, 0, 0.1)', height: 40, width: 80, borderRadius: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                                            onPress={() => {
                                                setIsModalVisible(!isModalVisible)
                                                setIdAddOrEditRating(data.id)
                                            }}>
                                            <Text style={{ fontWeight: 'bold' }}>{data.rating !== null ? 'Edit Rating' : 'Add Rating'}</Text>
                                        </TouchableOpacity>

                                        <View style={{
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <CheckBox
                                                disabled={false}
                                                boxType='circle'
                                                value={checked[data.id]}
                                                onValueChange={(e) => {
                                                    setChecked({ ...checked, [data.id]: e })
                                                    setIsModalVisible(true)
                                                    setCheckDel([...checkDel, data.id])
                                                    setIdAddOrEditRating('')
                                                }}
                                            />
                                        </View>
                                    </View>
                                </React.Fragment>
                            ))
                        }
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, width: width }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'relative' }}>
                            <TouchableOpacity onPress={prevHandler} disabled={prev === null ? true : false}>
                                <View style={{
                                    backgroundColor: prev === null ? '#D3D3D3' : '#FFCD61',
                                    width: 60,
                                    height: 30,
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
                </React.Fragment>
            )}

            <Modal isVisible={isModalVisible}
                animationIn='zoomIn'
                animationInTiming={800}
                animationOut='zoomOut'
                animationOutTiming={800}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        width: width - 70,
                        height: height - 480,
                        borderRadius: 50
                    }}>
                        <Text style={{
                            fontFamily: 'Nunito',
                            fontStyle: 'normal',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>
                            {
                                checkDel.length === 0 ? 'Add Or Edit Rating' : 'Are you sure to delete the selected history?'
                            }
                        </Text>
                        {
                            checkDel.length === 0 && (
                                <View>
                                    <Picker
                                        label='Select Rating'
                                        mode='dialog'
                                        style={{ width: 300 }}
                                        selectedValue={selectRating}
                                        onValueChange={(value) => { setSelectRating(value) }}
                                    >
                                        <Picker.Item label='Select Rating' value={''} />
                                        <Picker.Item label='1' value={1} />
                                        <Picker.Item label='2' value={2} />
                                        <Picker.Item label='3' value={3} />
                                        <Picker.Item label='4' value={4} />
                                        <Picker.Item label='5' value={5} />
                                    </Picker>
                                    <TextInput
                                        placeholder='Input Testimony...'
                                        value={inputTesti}
                                        style={{
                                            height: 73,
                                            borderWidth: 1,
                                            borderRadius: 10
                                        }}
                                        onChangeText={(text) => { setInputTesti(text) }} />
                                </View>
                            )
                        }
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width - 170,
                            top: 33
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: 'grey',
                                borderRadius: 10,
                                width: 80,
                                height: 50
                            }} onPress={() => {
                                setIsModalVisible(!isModalVisible)
                                setSelectRating('')
                                setInputTesti('')
                                setChecked({})
                                setCheckDel([])
                                setIdAddOrEditRating('')
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    top: 11
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#FFCD61',
                                borderRadius: 10,
                                width: 80,
                                height: 50,
                            }} onPress={checkDel.length === 0 ? addEditRatingHandler : deleteItemHandler}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    top: 11
                                }}>{
                                        checkDel.length === 0 ? 'Save' : 'Delete'
                                    }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Toast />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
    },
    historyOrderText: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20
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