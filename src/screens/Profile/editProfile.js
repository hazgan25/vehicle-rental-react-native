import React, { useState, useEffect } from 'react'
import { View, ScrollView, Dimensions, Platform, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useSelector, useDispatch } from 'react-redux'

import DatePicker from 'react-native-date-picker'
import moment from 'moment'

import Modal from 'react-native-modal'
import styles from '../../commons/styles/editProfile'
import { editUserProfile } from '../../modules/utils/user'
import { userAction } from '../../redux/actions/auth'

import Loading from '../../commons/components/Loading'

const defaultProfile = require('../../assets/img/defaultProfile.png')
const backArrow = require('../../assets/icons/backArrow.png')

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const calanderIcon = require('../../assets/icons/calendarIcon.png')

const host = process.env.HOST

const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { token, userData, isPending } = state.auth
    const { name, email, phone, image, dob, address, gender } = userData

    const [userImg, setUserImg] = useState('')
    const [showImg, setShowImg] = useState(image !== null ? { uri: `${host}/${image}` } : defaultProfile)
    const [userName, setUserName] = useState(name)
    const [radioValue, setRadioValue] = useState('')
    const [userEmail, setUserEmail] = useState(email)
    const [userNumber, setUserNumber] = useState(phone !== null || phone !== '' ? phone : '')
    const [userDob, setUserDob] = useState(dob !== null ? dob : '')
    const [userAddress, setUserAddress] = useState(address !== null ? address : '')

    const [openDate, setOpenDate] = useState(false)
    const [sendDate, setSendDate] = useState('')
    const [showDob, setShowDob] = useState('')
    const [selectDate, setSelectDate] = useState(new Date())
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [msgSuccess, setMsgSuccess] = useState('')
    const [msgErr, setMsgErr] = useState('')

    useEffect(() => {
        if (userDob !== '' && sendDate === '') {
            setShowDob(moment(userDob).format('MMMM Do YYYY'))
        } else if (sendDate !== '') {
            setShowDob(moment(sendDate).format('MMMM Do YYYY'))
        }
    }, [userDob, sendDate])

    const radioList = [
        { label: 'Female', value: 2 },
        { label: 'Male', value: 1 }
    ]

    const back = () => {
        setUserImg('')
        navigation.navigate('Profile')
    }

    useEffect(() => {
        if (gender === 'male') {
            setRadioValue(1)
        }
        if (gender === 'female') {
            setRadioValue(2)
        }
        if (gender === 'confidential') {
            setRadioValue(3)
        }
    }, [gender])

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
                    const imgTake = res.assets[0]
                    setUserImg('')
                    setUserImg(imgTake)
                    setShowImg({ uri: imgTake.uri })
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
                    setUserImg('')
                    setUserImg(imgBrowse)
                    setShowImg({ uri: imgBrowse.uri })
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    const close = () => {
        dispatch(userAction(token))
        setIsModalVisible(!isModalVisible)
        setMsgErr('')
        setMsgSuccess('')
    }

    const saveHandler = () => {
        const body = new FormData()
        body.append('name', userName)
        body.append('email', userEmail)
        body.append('gender_id', radioValue)
        body.append('phone', userNumber)
        body.append('address', userAddress)
        if (userImg !== '') {
            body.append('image', { name: userImg.fileName, type: userImg.type, uri: userImg.uri })
        }
        if (sendDate !== '') {
            body.append('dob', sendDate)
        }
        editUserProfile(body, token)
            .then((res) => {
                if (res.result) {
                    setMsgErr(res.result)
                }
                if (res.result.msg) {
                    setMsgErr('')
                    setMsgSuccess(res.result.msg)
                }
            })
            .catch((err) => {
                console.log({ ...err })
            })
    }

    return (
        <React.Fragment>
            {!isPending ? (
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={styles.container}>
                        <View style={styles.wrapperBack}>
                            <TouchableOpacity onPress={back}>
                                <Image source={backArrow} style={styles.backArrowIcon} />
                            </TouchableOpacity>
                            <Text style={styles.updateProfileText}>Update Profile</Text>
                        </View>

                        <View style={styles.boxPicture}>
                            <Image source={showImg}
                                onError={(e) => {
                                    e.onError = null
                                    setShowImg(defaultProfile)
                                }}
                                style={styles.image} />
                            <View>
                                <TouchableOpacity style={styles.btnTakePicture} onPress={takePicture}>
                                    <Text style={styles.takePictureText}>Take Picture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnBrowse} onPress={browserGalery}>
                                    <Text style={styles.browseText}>Browse From Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.formUser}>
                            <Text style={styles.labelText}>Name :</Text>
                            <TextInput style={styles.input} defaultValue={name} placeholder='Input Your Name' onChangeText={(text) => setUserName(text)} />

                            <View style={{ top: 32 }}>
                                <RadioForm formHorizontal={true} animation={true}>
                                    {
                                        radioList.map((data) => (
                                            <RadioButton labelHorizontal={true} key={data.value}>
                                                <RadioButtonInput
                                                    obj={data}
                                                    index={data.value}
                                                    onPress={() => { setRadioValue(data.value) }}
                                                    buttonOuterColor={radioValue === data.value ? '#6A4029' : 'rgba(106,64,41,0.3)'}
                                                    buttonInnerColor={'#6A4029'}
                                                    buttonSize={40}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{ marginRight: 27 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={data}
                                                    index={data.value}
                                                    labelHorizontal={true}
                                                    onPress={() => { setRadioValue(data.value) }}
                                                    labelStyle={{ fontSize: 20, color: radioValue === data.value ? '#6A4029' : 'rgba(106,64,41,0.3)' }}
                                                    labelWrapStyle={{ right: 27 }}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                </RadioForm>

                                <View style={{ top: 27 }}>
                                    <View style={{ marginBottom: 21 }}>
                                        <Text style={styles.labelText}>Email :</Text>
                                        <TextInput style={styles.input} defaultValue={email} placeholder='Input Your Email' onChangeText={(text) => setUserEmail(text)} />
                                    </View>
                                    <View style={{ marginBottom: 21 }}>
                                        <Text style={styles.labelText}>Phone Number :</Text>
                                        <TextInput style={styles.input} defaultValue={phone} textContentType='telephoneNumber' keyboardType='number-pad' placeholder='Input Your Phone Number' onChangeText={(text) => setUserNumber(text)} />
                                    </View>
                                    <View style={{ marginBottom: 21 }}>
                                        <Text style={styles.labelText}>Date of Birth :</Text>
                                        <TouchableOpacity style={styles.input} onPress={() => setOpenDate(true)}>
                                            <Text style={{ top: 8 }}>{showDob}</Text>
                                            <Image source={calanderIcon} style={{ position: 'absolute', right: 0, top: 8 }} />
                                            <DatePicker
                                                modal
                                                open={openDate}
                                                date={selectDate}
                                                mode='date'
                                                onConfirm={(date) => {
                                                    setOpenDate(false)
                                                    setSelectDate(date)
                                                    setSendDate(date.toISOString().slice(0, 10).replace('T', ' '))
                                                }}
                                                onCancel={() => {
                                                    setOpenDate(false)
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginBottom: 21 }}>
                                        <Text style={styles.labelText}>Delivery Address :</Text>
                                        <TextInput style={styles.input} defaultValue={userAddress} placeholder='Input Your Address' onChangeText={(text) => setUserAddress(text)} />
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.btnSave} onPress={toggleModal}>
                                        <Text style={styles.saveText}>Save Change</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Loading />
            )}
            <Modal isVisible={isModalVisible}
                animationIn='zoomIn'
                animationInTiming={800}
                animationOut='zoomOut'
                animationOutTiming={800}
            >
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
                        }}>
                            {msgSuccess !== '' ? msgSuccess :
                                msgErr !== '' ? 'There is an error?' :
                                    'Are You Sure Save Change?'}
                        </Text>

                        <Text style={{
                            fontFamily: 'Nunito',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: 18,
                            color: msgSuccess !== '' ? '#696969' : '#Df4759',
                            top: 10
                        }}>
                            {msgSuccess !== '' ? msgErr :
                                ''}
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: msgSuccess !== '' ? 'center' : 'space-between',
                            width: deviceWidth - 170,
                            top: 33
                        }}>
                            {msgSuccess === '' &&
                                (
                                    <TouchableOpacity style={{
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: 80,
                                        height: 50
                                    }} onPress={toggleModal}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            textAlign: 'center',
                                            top: 11
                                        }}>Cancel</Text>
                                    </TouchableOpacity>
                                )
                            }

                            <TouchableOpacity style={{
                                backgroundColor: msgSuccess !== '' ? '#6495ED' : '#00b300',
                                borderRadius: 10,
                                width: 80,
                                height: 50,
                            }} onPress={msgSuccess !== '' ? close : saveHandler}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    top: 11
                                }}>{msgSuccess !== '' ? 'Close' : 'Save'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </React.Fragment>
    )
}

export default EditProfile