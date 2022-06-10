import React, { useState, useEffect } from 'react'
import {
    ScrollView, View, Text,
    TouchableOpacity, Image,
    Platform, Dimensions, TextInput
} from 'react-native'

import { useSelector } from 'react-redux'
import { getHistoryByIdOwner, postReturn, delHistoryOwner } from '../../modules/utils/history'

import { DataTable } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'

const backArrow = require('../../assets/icons/backArrow.png')
const searchIconHome = require('../../assets/icons/searchIconHome.png')

const height = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
const width = Dimensions.get('window').width

const HistoryOrderByOwner = ({ navigation }) => {
    const state = useSelector(state => state)
    const { token } = state.auth

    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [by, setBy] = useState('id')
    const [order, setOrder] = useState('')
    const [page, setPage] = useState(1)

    const [historyData, setHistoryData] = useState([])
    const [historyMeta, setHistoryMeta] = useState({})

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [idReturn, setIdReturn] = useState('')
    const [idDelete, setIdDelete] = useState('')

    const limit = 5

    useEffect(() => {
        const params = {
            search: search,
            filter: filter,
            by: by,
            order: order,
            limit: limit,
            page: page
        }
        getHistoryByIdOwner(params, token)
            .then((res) => {
                setHistoryData(res.data.result.data)
                setHistoryMeta(res.data.result.meta)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }, [token, search, filter, by, order, limit, page])

    const searchHandler = () => {
        const params = {
            search: search,
            filter: filter,
            by: by,
            order: order,
            limit: limit,
            page: page
        }
        getHistoryByIdOwner(params, token)
            .then((res) => {
                setHistoryData(res.data.result.data)
                setHistoryMeta(res.data.result.meta)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    const returnItemHandler = () => {
        postReturn(idReturn, token)
            .then((res) => {
                Toast.show({
                    type: 'success',
                    text1: `${res.data.result.msg}`
                })
                const params = {
                    search: search,
                    filter: filter,
                    by: by,
                    order: order,
                    limit: limit,
                    page: page
                }
                getHistoryByIdOwner(params, token)
                    .then((res) => {
                        setHistoryData(res.data.result.data)
                        setHistoryMeta(res.data.result.meta)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
                setIdDelete('')
                setIdReturn('')
                setIsModalVisible(!isModalVisible)
            })
            .catch(({ ...err }) => {
                Toast.show({
                    type: 'error',
                    text1: 'There an Error',
                    text2: `${err.response.data.err}`
                })
                setIdDelete('')
                setIdReturn('')
                setIsModalVisible(!isModalVisible)
            })
    }

    const deleteItemHandler = () => {
        delHistoryOwner([idDelete], token)
            .then((res) => {
                Toast.show({
                    type: 'success',
                    text1: `Successed`,
                    text2: `${res.data.result.msg}`
                })
                const params = {
                    search: search,
                    filter: filter,
                    by: by,
                    order: order,
                    limit: limit,
                    page: page
                }
                getHistoryByIdOwner(params, token)
                    .then((res) => {
                        setHistoryData(res.data.result.data)
                        setHistoryMeta(res.data.result.meta)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
                setIdDelete('')
                setIdReturn('')
                setIsModalVisible(!isModalVisible)
            })
            .catch(({ ...err }) => {
                Toast.show({
                    type: 'error',
                    text1: 'There an Error?',
                    text2: `${err.response.data.err}`
                })
                setIdDelete('')
                setIdReturn('')
                setIsModalVisible(!isModalVisible)
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
                }}>Data of Tenant</Text>
            </View>

            <View>
                <TextInput placeholder='Search History' style={{
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
                }} placeholderTextColor='#393939' value={search} onChangeText={text => setSearch(text)} />
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
                    label='Filter'
                    mode='dialog'
                    selectedValue={filter}
                    onValueChange={(value) => { setFilter(value) }}>
                    <Picker.Item label='Default Filter' value={''} />
                    <Picker.Item label='Returned' value={1} />
                    <Picker.Item label='Not Returned' value={2} />
                </Picker>
            </View>

            <View>
                <Picker
                    label='Order'
                    mode='dialog'
                    selectedValue={by}
                    onValueChange={(value) => { setBy(value) }}>
                    <Picker.Item label='Default Order' value={''} />
                    <Picker.Item label='Name' value={'vehicles'} />
                    <Picker.Item label='Types' value={'types'} />
                    <Picker.Item label='Date Added' value={'create_at'} />
                </Picker>
            </View>

            <View>
                <Picker
                    label='sort'
                    mode='dialog'
                    selectedValue={order}
                    onValueChange={(value) => { setOrder(value) }}>
                    <Picker.Item label='Default Sort' value={''} />
                    <Picker.Item label='Ascending' value={'asc'} />
                    <Picker.Item label='Descending' value={'desc'} />
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

            <View style={{ height: 320 }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ padding: 10 }}>ID</DataTable.Title>
                        <DataTable.Title style={{ padding: 10 }}>Vehicles</DataTable.Title>
                        <DataTable.Title style={{ padding: 10 }}>User</DataTable.Title>
                        <DataTable.Title style={{ padding: 10 }}>Status</DataTable.Title>
                        <DataTable.Title style={{ padding: 10 }}>Quantity</DataTable.Title>
                        <DataTable.Title style={{ padding: 10 }}>Setup</DataTable.Title>
                        <DataTable.Title style={{ padding: 10 }}>Select Delete</DataTable.Title>
                    </DataTable.Header>
                    {
                        Array.isArray(historyData) && historyData.length > 0 &&
                        historyData.map((data, idx) => (
                            <DataTable.Row key={idx}>
                                <DataTable.Cell>{data.id}</DataTable.Cell>
                                <DataTable.Cell>{data.name}</DataTable.Cell>
                                <DataTable.Cell>{data.user}</DataTable.Cell>
                                <DataTable.Cell>{data.status}</DataTable.Cell>
                                <DataTable.Cell>{data.quantity}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Text style={{
                                        color: data.status !== 'Not been returned' ? 'gray' : 'blue'
                                    }} onPress={() => {
                                        if (data.status !== 'Has been returned') {
                                            setIdReturn(data.id)
                                            setIdDelete('')
                                            setIsModalVisible(!isModalVisible)
                                        }
                                    }}>Return</Text>
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <Text style={{
                                        color: data.status === 'Not been returned' ? 'gray' : 'red'
                                    }} onPress={() => {
                                        setIdDelete(data.id)
                                        setIdReturn('')
                                        setIsModalVisible(!isModalVisible)
                                    }}>Delete</Text>
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
                            setPage(page - 1)
                        }}
                        style={{
                            backgroundColor: historyMeta.prev === null ? '#D3D3D3' : '#FFCD61',
                            width: 60,
                            height: 30,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        disabled={historyData.prev === null ? true : false}>
                        <Text
                            style={{
                                fontWeight: 'bold'
                            }}>Prev</Text>
                    </TouchableOpacity>
                    <View style={{
                        width: 30,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>{historyMeta.page}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: historyMeta.page === historyMeta.totalPage || historyMeta.naxt === null ? '#D3D3D3' : '#FFCD61',
                            width: 60, height: 30,
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        disabled={historyMeta.page === historyMeta.totalPage || historyMeta.next === null ? true : false}
                        onPress={() => {
                            setPage(page + 1)
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                isVisible={isModalVisible}
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
                                idReturn !== '' ? 'Are you sure to change the status of the vehicle being returned?' : 'Are you sure do you want to delete selected item?'
                            }
                        </Text>
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
                                setIdDelete('')
                                setIdReturn('')
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
                            }} onPress={
                                idReturn !== '' ? returnItemHandler : deleteItemHandler
                            }>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    top: 11
                                }}>
                                    {
                                        idReturn !== '' ? 'Save' : 'Delete'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>

            <Toast />
        </ScrollView>
    )
}

export default HistoryOrderByOwner