import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, Dimensions, TextInput, Platform } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage'

import stylesEditProfile from '../../commons/styles/editProfile'
import stylesProfile from '../../commons/styles/profile'


import { logoutAction } from '../../redux/actions/auth'
import { editPasswordUser } from '../../modules/utils/user'

import Loading from '../../commons/components/Loading'

const width = Dimensions.get('window').width

const defaultProfile = require('../../assets/img/defaultProfile.png')
const backArrow = require('../../assets/icons/backArrow.png')

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const EditPassword = ({ navigation }) => {
    const [showImg, setShowImg] = useState(defaultProfile)
    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [rePass, setRepass] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isModalVisible, setModalVisible] = useState(false)
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { token, userData, isPending } = state.auth
    const { name, email, phone, image } = userData

    const back = () => {
        navigation.navigate('Profile')
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    useEffect(() => {
        if (image !== null) {
            setShowImg({ uri: image })
        }
    }, [image])

    const body = {
        currentPass: currentPass,
        newPass: newPass
    }

    const saveHandler = () => {
        if (newPass !== rePass) {
            setErrMsg('Re-type Password is Wrong!')
            console.log(errMsg)
        }
        if (newPass === rePass) {
            editPasswordUser(body, token)
                .then((res) => {
                    setSuccessMsg(res.data.result.msg)
                })
                .catch(({ ...err }) => {
                    setErrMsg(err.response.data.result)
                })
        }
    }

    const login = () => {
        dispatch(logoutAction(token))
            .then(async () => {
                try {
                    await AsyncStorage.removeItem('persist:root')
                    setModalVisible(false)
                    navigation.navigate('Login')
                }
                catch (err) {
                    console.log(err)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            {!isPending ? (
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={stylesProfile.container}>
                        <View style={{
                            width: width,
                            height: 280,
                            backgroundColor: '#FFF',
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.50,
                            shadowRadius: 1.68,

                            elevation: 8,
                        }}>

                            <View style={stylesEditProfile.container}>
                                <View style={{
                                    flexDirection: 'row',
                                    width: 130,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    top: 16
                                }}>
                                    <TouchableOpacity onPress={back}>
                                        <Image source={backArrow} style={stylesEditProfile.backArrowIcon} />
                                    </TouchableOpacity>
                                    <Text style={stylesEditProfile.updateProfileText}>Profile</Text>
                                </View>

                                <View>
                                    <View style={stylesProfile.boxImg}>
                                        <Image source={showImg}
                                            style={stylesProfile.profileImg}
                                            onError={e => {
                                                e.onError = null
                                                setShowImg(defaultProfile)
                                            }}
                                        />
                                    </View>
                                    <Text style={stylesProfile.name}>{name === null ? 'No Name' : name}</Text>
                                    <Text style={stylesProfile.email}>{email}</Text>
                                    <Text style={stylesProfile.phone}>{phone === null || phone === '' ? 'No Number Phone' : phone}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={stylesEditProfile.container}>
                            <View style={{ top: 26 }}>
                                <View style={{ marginBottom: 21 }}>
                                    <Text style={stylesProfile.listText}>Current Password :</Text>
                                    <TextInput style={stylesEditProfile.input} secureTextEntry={true} onChangeText={text => setCurrentPass(text)} />
                                </View>
                                <View style={{ marginBottom: 21 }}>
                                    <Text style={stylesProfile.listText}>New Password :</Text>
                                    <TextInput style={stylesEditProfile.input} secureTextEntry={true} onChangeText={text => setNewPass(text)} />
                                </View>
                                <View style={{ marginBottom: 21 }}>
                                    <Text style={stylesProfile.listText}>Re-type Password :</Text>
                                    <TextInput style={stylesEditProfile.input} secureTextEntry={true} onChangeText={text => setRepass(text)} />
                                </View>
                            </View>
                            <TouchableOpacity style={stylesEditProfile.btnSave} onPress={toggleModal}>
                                <Text style={stylesEditProfile.saveText}>Save Change</Text>
                            </TouchableOpacity>
                        </View>

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
                                        {successMsg !== '' ? successMsg :
                                            errMsg !== '' ? 'There is an error?' :
                                                'Are You Sure Save Change?'}
                                    </Text>

                                    <Text style={{
                                        fontFamily: 'Nunito',
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        fontSize: 18,
                                        color: successMsg !== '' ? '#696969' : '#Df4759',
                                        textAlign: 'center',
                                        top: 10
                                    }}>
                                        {successMsg !== '' ? 'Plase Login Again' :
                                            errMsg !== '' ? errMsg :
                                                ''}
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: successMsg !== '' ? 'center' : 'space-between',
                                        width: deviceWidth - 170,
                                        top: 33
                                    }}>
                                        {successMsg === '' &&
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
                                            backgroundColor: successMsg !== '' ? '#6495ED' : '#00b300',
                                            borderRadius: 10,
                                            width: 80,
                                            height: 50,
                                        }} onPress={successMsg !== '' ? login : saveHandler}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textAlign: 'center',
                                                top: 11
                                            }}>{successMsg !== '' ? 'Login' : 'Save'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Modal>

                    </View>
                </ScrollView>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default EditPassword