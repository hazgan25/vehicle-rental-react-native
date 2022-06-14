import React, { useState, useEffect } from 'react'
import { View, ScrollView, Dimensions, Platform, Text, TextInput, TouchableOpacity, Image, } from 'react-native'
import { useSelector } from 'react-redux'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import { postVehicle } from '../../modules/utils/vehicles'

import Modal from 'react-native-modal'
import styles from '../../commons/styles/addVehicle'
import Toast from 'react-native-toast-message'
import { Picker } from '@react-native-picker/picker'

import { getLocationByRenterId, postLocationbyRenterId } from '../../modules/utils/location'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const backArrow = require('../../assets/icons/backArrow.png')
const cameraIcon = require('../../assets/icons/cameraIcon.png')

const AddVehicle = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const [vehicleImg, setVehicleImg] = useState('')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [selectLocation, setSelectLocation] = useState()
    const [selectType, setSelectType] = useState()
    const [locationArr, setLocationArr] = useState([])
    const [productStock, setProductStock] = useState(1)
    const [addLocation, setAddLocation] = useState('')

    const [addLocMsg, setAddLocMsg] = useState('')

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
        setAddLocMsg('')
    }

    const state = useSelector(state => state)
    const { token } = state.auth

    const takePicture = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        }
        launchCamera(options)
            .then((res) => {
                if (res.didCancel) {
                    console.log(res.errorMessage)
                }
                if (res.errorCode) {
                    console.log(res.errorMessage)
                } else {
                    console.log(res.assets)
                    const imgTake = res.assets[0]
                    // setUserImg('')
                    setVehicleImg(imgTake)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const browserGalery = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        }
        launchImageLibrary(options)
            .then((res) => {
                if (res.didCancel) {
                    console.log(res.errorMessage)
                }
                if (res.errorCode) {
                    console.log(res.errorMessage)
                } else {
                    const imgBrowse = res.assets[0]
                    // setVehicleImg('')
                    setVehicleImg(imgBrowse)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const btnMin = () => {
        if (productStock > 1) {
            setProductStock(productStock - 1)
        }
    }
    const btnPlus = () => {
        setProductStock(productStock + 1)
    }

    const body = new FormData()
    body.append('name', productName)
    body.append('price', productPrice)
    body.append('description', productDesc)
    body.append('locations_id', selectLocation)
    body.append('types_id', selectType)
    body.append('stock', productStock)

    const saveAddHandler = () => {
        if (vehicleImg !== '') {
            body.append('images', { name: vehicleImg.fileName, type: vehicleImg.type, uri: vehicleImg.uri })
        }
        postVehicle(body, token)
            .then((res) => {
                if (res.result.err !== '') {
                    Toast.show({
                        type: 'error',
                        text1: 'There is an error?',
                        text2: `${res.result.err}`
                    })
                }
                console.log(res)
                if (res.result.insertId !== '') {
                    Toast.show({
                        type: 'success',
                        text1: 'Success Add Vehicle'
                    })
                    btnCancel()
                    const params = { add: true }
                    navigation.navigate('Home', params)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLocationByRenterId(token)
            .then((res) => {
                setLocationArr(res.data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (vehicleImg !== '' || productName !== '' || productPrice !== '' || productDesc !== '' || selectLocation !== undefined || selectType !== undefined) {
            setIsCancel(true)
        }
        else {
            setIsCancel(false)
        }
    }, [vehicleImg, productName, productPrice, productDesc, selectLocation, selectType, isCancel])

    const btnCancel = () => {
        setVehicleImg('')
        setProductName('')
        setProductPrice('')
        setProductDesc('')
        setSelectLocation()
        setSelectType()
        setProductStock(1)
    }

    const addLocationHandler = () => {
        const bodyAddLocation = {
            name: addLocation
        }
        postLocationbyRenterId(bodyAddLocation, token)
            .then((res) => {
                if (res.data.result.insertId) {
                    setAddLocMsg(res.data.result.insertId)
                    getLocationByRenterId(token)
                        .then((res) => {
                            setLocationArr(res.data.result)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch(({ ...err }) => {
                if (err.response.data.result) {
                    Toast.show({
                        type: 'error',
                        text1: 'There is an error?',
                        text2: `${err.response.data.result}`
                    })
                }
            })
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.wrapperBack}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                        <Image source={backArrow} style={styles.backArrowIcon} />
                    </TouchableOpacity>
                    <Text style={styles.addNewText}>Add New Item</Text>
                </View>
                <TouchableOpacity style={styles.cancelText} onPress={btnCancel} disabled={isCancel === true ? false : true}>
                    <Text style={
                        isCancel === false ?
                            {
                                fontSize: 18,
                                lineHeight: 25,
                                color: '#A9A9A9'
                            } :
                            {
                                fontSize: 18,
                                lineHeight: 25,
                                color: '#000'
                            }
                    }>Cancel</Text>
                </TouchableOpacity>

                <View>

                    <View style={styles.boxImg}>
                        <TouchableOpacity style={styles.circleWrapper} onPress={takePicture}>
                            <Image source={vehicleImg !== '' ? { uri: vehicleImg.uri } : cameraIcon} style={vehicleImg !== '' ? {
                                height: 150,
                                width: 150,
                                borderRadius: 100
                            } : styles.imgPhoto} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAddPic} onPress={browserGalery}>
                            <Text style={styles.addPicText}>Add Pictures</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Toast topOffset={230} />

                <View style={{ top: 306, alignSelf: 'center' }}>
                    <TextInput style={styles.inputProductName} placeholder='Type Product Name Min. 30 Characters' value={productName} onChangeText={text => setProductName(text)} />
                    <TextInput style={styles.inputPrice} placeholder='Type Product Price' keyboardType='number-pad' value={productPrice} onChangeText={text => setProductPrice(text)} />
                </View>

                <View style={{ top: 363 }}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} placeholder='Describe your product min.159 characters' value={productDesc} onChangeText={text => setProductDesc(text)} />

                    <View style={{ top: 14 }}>
                        <Text style={styles.label}>Location</Text>

                        <View style={styles.selectInput}>
                            <Picker
                                mode='dialog'
                                selectedValue={selectLocation}
                                onValueChange={(value) => {
                                    if (value !== 0) {
                                        setSelectLocation(value)
                                    }
                                }}
                            >
                                <Picker.Item label='Select Location'
                                    value={0}
                                    enabled={selectLocation === undefined ? true : false}
                                    style={selectLocation === undefined ? { color: '#9F9F9F' } : ''}
                                />
                                {
                                    Array.isArray(locationArr) && locationArr.length > 0 &&
                                    locationArr.map((data) => (
                                        <Picker.Item label={data.name} value={data.id} key={data.id} />
                                    ))
                                }
                                <Picker label='+ Add New Location' value={toggleModal} />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ top: 44 }}>
                        <Text style={styles.label}>Add to</Text>

                        <View style={styles.selectInput}>
                            <Picker
                                mode='dialog'
                                selectedValue={selectType}
                                onValueChange={(value) => {
                                    if (value !== 0) {
                                        setSelectType(value)
                                    }
                                }}
                            >
                                <Picker.Item label='Select Category'
                                    value={0}
                                    enabled={selectType === undefined ? true : false}
                                    style={selectType === undefined ? { color: '#9F9F9F' } : ''}
                                />
                                <Picker.Item label='Car' value={1} />
                                <Picker.Item label='Motorbike' value={2} />
                                <Picker.Item label='Bike' value={3} />
                            </Picker>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                        top: 85
                    }}>
                        <Text style={styles.stockText}>Stock :</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: 80,
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity style={styles.box} onPress={btnMin}>
                                <Text style={styles.boxIn}>-</Text>
                            </TouchableOpacity>
                            <Text>{productStock}</Text>
                            <TouchableOpacity style={styles.box} onPress={btnPlus}>
                                <Text style={styles.boxIn}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ top: 102 }} >
                        <TouchableOpacity style={styles.btnSave} onPress={saveAddHandler}>
                            <Text style={styles.saveText}>Save Product</Text>
                        </TouchableOpacity>
                    </View>


                    <Modal isVisible={isModalVisible}
                        animationIn='zoomIn'
                        animationInTiming={800}
                        animationOut='zoomOut'
                        animationOutTiming={800}
                    >
                        <Toast />

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                width: deviceWidth - 70,
                                height: deviceHeight - 500,
                                borderRadius: 50
                            }}>
                                <Text style={{
                                    fontFamily: 'Nunito',
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                }}>{addLocMsg !== '' ? 'Success Add New Location' : 'Add New Location'}</Text>
                                {addLocMsg !== '' ? (<></>) : (
                                    <TextInput placeholder='Input New Location' style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: 230,
                                        top: 15,
                                        paddingLeft: 30
                                    }} onChangeText={text => setAddLocation(text)} />)}
                                <View style={{ flexDirection: 'row', justifyContent: addLocMsg !== '' ? 'center' : 'space-between', width: deviceWidth - 170, top: 33 }} >
                                    {addLocMsg !== '' ? (<></>) : (
                                        <TouchableOpacity style={{
                                            backgroundColor: 'grey', borderRadius: 10, width: 80, height: 50
                                        }} onPress={toggleModal}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textAlign: 'center',
                                                top: 11
                                            }}>Cancel</Text>
                                        </TouchableOpacity>)}
                                    <TouchableOpacity style={{ backgroundColor: '#6495ED', borderRadius: 10, width: 80, height: 50 }} onPress={addLocMsg !== '' ? toggleModal : addLocationHandler}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            textAlign: 'center',
                                            top: 11
                                        }}>{addLocMsg !== '' ? 'Close' : 'Add'}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>


                </View>
            </View>
        </ScrollView >
    )
}

export default AddVehicle