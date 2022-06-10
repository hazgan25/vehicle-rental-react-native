import React, { useState, useEffect } from 'react'
import { ScrollView, View, TouchableOpacity, Image, Text, Dimensions, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { launchImageLibrary } from 'react-native-image-picker'

import { getVehicleDetail } from '../../modules/utils/vehicles'
import { getLocationByRenterId } from '../../modules/utils/location'
import { postLocationbyRenterId } from '../../modules/utils/location'
import { patchVehicleById } from '../../modules/utils/vehicles'
import { deleteVehicleById } from '../../modules/utils/vehicles'

import styles from '../../commons/styles/vehicleDetail'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import { Picker } from '@react-native-picker/picker'
import Loading from '../../commons/components/Loading'

const backArrow = require('../../assets/icons/backArrow.png')
const defaultVehicleImg = require('../../assets/img/vehicleDefault.png')
const trashIcon = require('../../assets/icons/trashIcon.png')
const starIcon = require('../../assets/icons/starIcon.png')
const pointerIcon = require('../../assets/icons/pointerIcon.png')
const walkManIcon = require('../../assets/icons/walkManIcon.png')
const favIcon = require('../../assets/icons/favIcon.png')
const chatIcon = require('../../assets/icons/chatIconDetail.png')

const height = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
const width = Dimensions.get('window').width

const VehicleDetail = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false)
    const state = useSelector(state => state)
    const [vehicleData, setVehicleData] = useState([])
    const [vehicleName, setVehicleName] = useState('')
    const [vehiclePrice, setVehiclePrice] = useState(price)
    const [vehicleStock, setVehicleStock] = useState(stock)
    const [paymentStock, setPaymentStock] = useState(1)
    const [vehicleLocation, setVehicleLocation] = useState('')
    const [locationArr, setLocationArr] = useState([])
    const [selectValueLocation, setSelectValueLocation] = useState(locations_id)
    const [addLocation, setAddLocation] = useState('')
    const [vehicleTypes, setVehicleTypes] = useState()
    const [vehicleImg, setVehicleImg] = useState('')
    const [showVehicleImg, setShowVehicleImg] = useState('')
    const [selectAvailability, setSelectAvailability] = useState()
    const [selectDate, setSelectDate] = useState(1)
    const [addLocMsg, setAddLocMsg] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isPending, setIspending] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    let num = 1234567
    const numToArr = Array.from(String(num), Number)

    const vehicleId = route.params

    const { userData, token } = state.auth
    const vehicleIsPending = state.listVehicle.isPending
    const { id } = userData
    const { vehicle, images, rating, owner_id, location, locations_id, price, types, types_id, stock } = vehicleData

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
                    // console.log(imgBrowse)
                    setVehicleImg(imgBrowse)
                    setShowVehicleImg({ uri: imgBrowse.uri })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const isEditHandler = () => {
        setIsEdit(true)
    }

    const updateItemHandler = () => {
        const bodyUpdate = new FormData()
        bodyUpdate.append('name', vehicleName)
        bodyUpdate.append('locations_id', selectValueLocation)
        bodyUpdate.append('types_id', types_id)
        bodyUpdate.append('price', vehiclePrice)
        bodyUpdate.append('stock', vehicleStock)
        if (vehicleImg !== '') {
            bodyUpdate.append('images', { name: vehicleImg.fileName, type: vehicleImg.type, uri: vehicleImg.uri })
        }
        patchVehicleById(vehicleId, bodyUpdate, token)
            .then((res) => {
                if (res.result.err) {
                    Toast.show({
                        type: 'error',
                        text1: 'There is an error?',
                        text2: `${res.result.err}`
                    })
                }
                if (res.result.msg) {
                    Toast.show({
                        type: 'success',
                        text1: `${res.result.msg}`
                    })
                    setIsEdit(false)
                }

            })
            .catch((err) => {
                console.log(err)
            })
        console.log(bodyUpdate)
    }

    const isDeleteHandler = () => {
        setIsDelete(true)
        setModalVisible(true)
    }

    const deleteVehicleHandler = () => {
        deleteVehicleById(vehicleId, token)
            .then((res) => {
                setModalVisible(false)
                // trigger biar riset XD
                const params = { delete: true }
                navigation.navigate('Home', params)
            })
            .catch(err => console.log(err))
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
        setAddLocMsg('')
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

    const reservationHandler = () => {
        const params = {
            vehicles_id: vehicleId,
            date: selectDate,
            quantity: paymentStock,
            price: vehiclePrice,
            image: images[0].images,
            rating: rating === null ? 0 : rating,
            vehicle: vehicleName,
            location: vehicleLocation
        }
        if (!token) {
            Toast.show({
                type: 'error',
                text1: 'You Need Login'
            })
        }
        if (stock === 0) {
            Toast.show({
                type: 'error',
                text1: 'out of stock'
            })
        }
        if (paymentStock >= vehicleStock) {
            Toast.show({
                type: 'error',
                text1: 'out of stock'
            })
        }
        if (token && stock !== 0 && paymentStock <= vehicleStock) {
            navigation.navigate('StepOne', params)
        }
    }

    const btnMin = () => {
        if (owner_id === id && vehicleStock > 1) {
            setVehicleStock(vehicleStock - 1)
        }
        if (owner_id !== id && paymentStock > 1) {
            setPaymentStock(paymentStock - 1)
        }
    }

    const btnPlus = () => {
        if (owner_id === id && vehicleStock) {
            setVehicleStock(vehicleStock + 1)
        }
        if (owner_id !== id && paymentStock) {
            setPaymentStock(paymentStock + 1)

        }
    }

    useEffect(() => {
        getVehicleDetail(vehicleId)
            .then((res) => {
                setVehicleData(res.data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (token && owner_id === id) {
            getLocationByRenterId(token)
                .then((res) => {
                    setLocationArr(res.data.result)
                })
                .catch((err) => {
                    console.log({ ...err })
                })
        }
    }, [token, owner_id, id])

    useEffect(() => {
        setVehicleName(vehicle)
        setVehicleLocation(location)
        setSelectValueLocation(locations_id)
        setVehiclePrice(price)
        setVehicleTypes(types)
        setVehicleStock(stock)
        // setNumArr(numToArr)
    }, [id, vehicle, owner_id, location, locations_id, price, types, stock])

    useEffect(() => {
        if (vehicleName === undefined || vehicleLocation === undefined || vehiclePrice === undefined || vehicleTypes === undefined || vehicleStock === undefined) {
            setIspending(true)
        } else {
            setIspending(false)
        }
    }, [vehicleName, vehicleLocation, vehiclePrice, vehicleTypes, vehicleStock])

    return (
        <>
            {!isPending && !vehicleIsPending ? (
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={{ height: owner_id !== id ? 950 : isEdit === true ? 990 : 870, width: width, flex: 1 }}>
                        <View style={styles.wrapperBack}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Image source={backArrow} style={styles.backArrowIcon} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                {owner_id === id ? (
                                    <View style={styles.scoreBg}>
                                        <Text style={styles.scoreText}>{rating === null ? '0' : `${rating}`}</Text>
                                        <View style={styles.strIcon}>
                                            <Image source={starIcon} />
                                        </View>
                                    </View>
                                ) : (
                                    <>
                                        <View style={styles.scoreBg}>
                                            <Text style={styles.scoreText}>{rating === null ? '0' : `${rating}`}</Text>
                                            <View style={styles.strIcon}>
                                                <Image source={starIcon} />
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ marginLeft: 11 }}>
                                            <Image source={favIcon} />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={200}
                            pagingEnabled
                            decelerationRate="fast"
                            style={styles.imgScroll}
                        >
                            {Array.isArray(images) && images.length > 0 &&
                                images.map((data, idx) => (
                                    <React.Fragment key={idx}>
                                        <TouchableOpacity disabled={owner_id !== id ? true : !isEdit ? true : false} onPress={browserGalery}>
                                            <Image source={defaultVehicleImg} style={styles.vehicleImgDefault} />
                                            <Image source={data.images ? { uri: `${process.env.HOST}/${data.images}` } : defaultVehicleImg} style={styles.vehicleImg} />
                                        </TouchableOpacity>
                                    </React.Fragment>
                                ))
                            }
                        </ScrollView>

                        <Toast topOffset={230} />

                        <View style={{ top: 413, width: width - 20, alignSelf: 'center' }}>
                            {showVehicleImg !== '' ? (<Text style={{ alignSelf: 'center' }}>1 image change</Text>) : (<></>)}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {owner_id === id ? (
                                    <>
                                        <TextInput
                                            editable={owner_id !== id ? false : !isEdit ? false : true}
                                            value={vehicleName}
                                            style={styles.vehicleText}
                                            onChangeText={text => setVehicleName(text)} />
                                        <TouchableOpacity style={styles.trashBg} onPress={isDeleteHandler}>
                                            <Image source={trashIcon} />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TextInput
                                            editable={owner_id !== id ? false : !isEdit ? false : true}
                                            value={vehicleName}
                                            style={styles.vehicleText}
                                            onChangeText={text => setVehicleName(text)} />
                                        <TouchableOpacity>
                                            <Image source={chatIcon} />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>

                            {owner_id !== id ? (
                                <Text style={styles.vehiclePrice}>{`Rp.${vehiclePrice}`}</Text>

                            ) : !isEdit ? (
                                <Text style={styles.vehiclePrice}>{`Rp.${vehiclePrice}`}</Text>
                            ) : (
                                <TextInput
                                    value={`${vehiclePrice}`}
                                    style={styles.vehiclePrice}
                                    onChangeText={text => setVehiclePrice(text)} />
                            )}

                            <Text style={styles.personText}>Max For {vehicleTypes === 'car' ? '4' : vehicleTypes === 'motorbike' ? '2' : vehicleTypes === 'bike' ? '1' : ''} Person</Text>
                            <Text style={styles.personText}>No Prepayment</Text>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: stock !== 0 ? '#00D100' : '#E50000'
                                }}
                            >{stock !== 0 ? 'available' : 'Not available'}</Text>

                            <View style={{ marginTop: 13, flexDirection: 'row' }}>
                                <View style={styles.iconBg}>
                                    <Image source={pointerIcon} style={{ width: 15, height: 21 }} />
                                </View>
                                {!isEdit ? (
                                    <>
                                        <Text style={styles.infoText}>{`${vehicleLocation}`}</Text>
                                    </>
                                ) : (
                                    <>
                                        <View style={{
                                            borderWidth: 1,
                                            borderColor: '#C4C4C4',
                                            width: 266
                                        }}>
                                            <Picker
                                                label='Select Location'
                                                mode='dialog'
                                                selectedValue={selectValueLocation}
                                                onValueChange={value => setSelectValueLocation(value)}
                                            >
                                                {Array.isArray(locationArr) && locationArr.length > 0 &&
                                                    locationArr.map((data) => (
                                                        <Picker.Item label={data.name} value={data.id} key={data.id} />
                                                    ))
                                                }
                                                <Picker label='+ Add New Location' value={toggleModal} />
                                            </Picker>
                                        </View>
                                    </>
                                )}
                            </View>

                            <View style={{ marginTop: 13, flexDirection: 'row' }}>
                                <View style={styles.iconBg}>
                                    <Image source={walkManIcon} style={{ width: 15, height: 21 }} />
                                </View>
                                <Text style={styles.infoText}>? miles from your location</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                                alignItems: 'center',
                                marginTop: 32
                            }}>

                                {owner_id === id ? (
                                    <>
                                        <Text style={styles.stockText}>{!isEdit ? 'Stock' : 'Update Stock'}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: 80,
                                            justifyContent: 'space-between'
                                        }}>
                                            <TouchableOpacity style={styles.box} disabled={!isEdit ? true : false} onPress={btnMin}>
                                                <Text style={styles.boxIn}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontWeight: 'bold' }}>{vehicleStock}</Text>
                                            <TouchableOpacity style={styles.box} disabled={!isEdit ? true : false} onPress={btnPlus}>
                                                <Text style={styles.boxIn}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.stockText}>{`Select ${vehicleTypes}`}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: 80,
                                            justifyContent: 'space-between'
                                        }}>
                                            <TouchableOpacity style={styles.box} onPress={btnMin}>
                                                <Text style={styles.boxIn}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontWeight: 'bold' }}>{paymentStock}</Text>
                                            <TouchableOpacity style={styles.box} onPress={btnPlus}>
                                                <Text style={styles.boxIn}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>

                            {isEdit && owner_id === id ? (
                                <View style={styles.selectInput}>
                                    <Picker
                                        mode='dialog'
                                        selectedValue={selectAvailability}
                                        onValueChange={(value) => {
                                            if (value !== '') {
                                                setSelectAvailability(value)
                                            }
                                        }}
                                    >
                                        <Picker.Item
                                            label='Update Stock Status'
                                            value=''
                                            enabled={selectAvailability === undefined ? true : false}
                                            style={selectAvailability === undefined ? { color: '#9F9F9F' } : ''}
                                        />
                                        <Picker.Item label='available' value='available' />
                                        <Picker.Item label='Full Booked' value='Full Booked' />
                                    </Picker>
                                </View>) : owner_id !== id ? (
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 28 }}>
                                            <View style={styles.selectDateBox}>
                                                <Text style={styles.selectDateText}>Select Date</Text>
                                            </View>
                                            <View style={styles.selectDate}>
                                                <Picker mode='dialog'
                                                    selectedValue={selectDate}
                                                    onValueChange={value => setSelectDate(value)}>
                                                    {Array.isArray(numToArr) && numToArr.length > 0 &&
                                                        numToArr.map((data) => (
                                                            <Picker.Item label={`${data} Day`} value={data} key={data} style={styles.pickerDate} />
                                                        ))
                                                    }
                                                </Picker>
                                            </View>
                                        </View>
                                    </>
                                ) : (<></>)}


                            <TouchableOpacity style={styles.btnYellow} onPress={owner_id === id && isEdit === false ? isEditHandler : owner_id === id && isEdit !== false ? updateItemHandler : reservationHandler}>
                                <Text style={styles.btnText}>{
                                    owner_id === id && isEdit === false ?
                                        'Edit Item' :
                                        owner_id === id && isEdit !== false ? 'Update Item'
                                            : 'Resevation'
                                }</Text>
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
                                    width: width - 70,
                                    height: height - 500,
                                    borderRadius: 50
                                }}>
                                    <Text style={{
                                        fontFamily: 'Nunito',
                                        fontStyle: 'normal',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                    }}>{addLocMsg !== '' ? 'Success Add New Location' : isDelete === true ? 'Are You sure delete this vehicle?' : 'Add New Location'}</Text>
                                    {addLocMsg !== '' || isDelete === true ? (<></>) : (
                                        <TextInput placeholder='Input New Location' style={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: 230,
                                            top: 15,
                                            paddingLeft: 30
                                        }} onChangeText={text => setAddLocation(text)} />)}
                                    <View style={{ flexDirection: 'row', justifyContent: addLocMsg !== '' ? 'center' : 'space-between', width: width - 170, top: 33 }} >
                                        {addLocMsg !== '' ? (<></>) : (
                                            <TouchableOpacity style={{
                                                backgroundColor: isDelete === true ? 'red' : 'grey',
                                                borderRadius: 10, width: 80, height: 50
                                            }} onPress={isDelete === true ? deleteVehicleHandler : toggleModal}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    top: 11
                                                }}>{isDelete === true ? 'Delete' : 'Cancel'}</Text>
                                            </TouchableOpacity>)}
                                        <TouchableOpacity style={{
                                            backgroundColor: isDelete === true ? 'grey' : '#6495ED',
                                            borderRadius: 10, width: 80, height: 50
                                        }} onPress={addLocMsg !== '' || isDelete == true ? toggleModal : addLocationHandler}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textAlign: 'center',
                                                top: 11
                                            }}>{addLocMsg !== '' ? 'Close' : isDelete === true ? 'cancel' : 'Add'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Modal>

                    </View>
                </ScrollView>
            ) : (<Loading />)}
        </>

    )
}

export default VehicleDetail