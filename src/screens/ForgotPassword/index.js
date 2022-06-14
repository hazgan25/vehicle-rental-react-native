import {
    View, Text, Dimensions, StyleSheet, ImageBackground,
    Image, TouchableOpacity, TextInput
} from 'react-native'

import React, { useState } from 'react'

import { ForgotPass, resetPass } from '../../modules/utils/auth'

const resetPasswordBg = require('../../assets/img/resetPasswordBg.png')
const backArrow = require('../../assets/icons/backArrow.png')

import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'

const ForgotPassword = ({ navigation }) => {
    const { goBack } = navigation

    const [isModal, setIsmodal] = useState(false)
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [password, setPassword] = useState('')

    const [msgSuccessSendPin, setMsgSuccesSendPin] = useState('')

    const cancelHandler = () => {
        setIsmodal(!isModal)
        setPassword('')
        setPin('')
    }

    const sendCodeHandler = () => {
        console.log(email)
        if (email === '') {
            Toast.show({
                type: 'error',
                text1: 'There an Error',
                text2: 'email cannot be empty'
            })
        } else {
            const body = {
                email: email
            }
            ForgotPass(body)
                .then((res) => {
                    console.log(res)
                    setMsgSuccesSendPin(res.data.result.msg)
                    setIsmodal(!isModal)
                    setIsforgot(!isForgot)
                })
                .catch(({ ...err }) => {
                    console.log(err)
                    Toast.show({
                        type: 'error',
                        text1: 'There an Error',
                        text2: `${err.response.data.err}`
                    })
                })
        }
    }

    const resetPasswordHandler = () => {
        if (pin === '' || password === '') {
            Toast.show({
                type: 'error',
                text1: 'All must be filled'
            })
        } else {
            const body = {
                pin: pin,
                password: password
            }
            resetPass(body)
                .then((res) => {
                    setMsgSuccesSendPin('')
                    setIsmodal(!isModal)
                    setPin('')
                    setPassword('')
                    setTimeout(() => {
                        Toast.show({
                            type: 'success',
                            text1: 'Successed',
                            text2: `${res.data.result.msg}`
                        })
                    }, 950)
                })
                .catch(({ ...err }) => {
                    Toast.show({
                        type: 'error',
                        text1: 'There an Error',
                        text2: `${err.response.data.err}`
                    })
                })
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={resetPasswordBg} style={styles.background}>

                <Toast />

                <View style={styles.flexArrow}>
                    <TouchableOpacity onPress={() => { goBack() }}>
                        <Image source={backArrow} style={{ tintColor: '#fff' }} />
                    </TouchableOpacity>
                    <Text style={styles.backText}>Back</Text>
                </View>

                <View style={styles.boxText}>
                    <Text style={styles.gotBackText}>THAT'S OKAY, WE GOT YOUR BACK</Text>
                    <Text style={styles.enterEmailText}>
                        Enter your email to get reset password code
                    </Text>
                    <TextInput placeholder='Type your Email Address' placeholderTextColor={'#fff'} style={styles.inputEmail} onChangeText={text => setEmail(text)} />
                    <TouchableOpacity style={styles.sendCodeBtn} onPress={sendCodeHandler}>
                        <Text style={styles.senCodeText}>Send Code</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <Modal isVisible={isModal}
                animationIn='zoomIn'
                animationInTiming={800}
                animationOut='zoomOut'
                animationOutTiming={800} >

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
                        <Text
                            style={{
                                fontFamily: 'Nunito',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#393939',
                                alignSelf: 'center',
                                padding: 10
                            }}
                        >{`${msgSuccessSendPin}`}</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#393939',
                                fontWeight: 'bold',
                                marginRight: 10
                            }}>Pin              :</Text>
                            <TextInput style={{
                                padding: 10,
                                width: '55%',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: 10
                            }} placeholder='Type your pin' keyboardType='number-pad' onChangeText={text => setPin(text)} />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#393939',
                                fontWeight: 'bold',
                                marginRight: 10
                            }}>Password  :</Text>
                            <TextInput style={{
                                padding: 10,
                                width: '55%',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: 10
                            }} placeholder='Type Your Password' secureTextEntry={true} onChangeText={text => setPassword(text)} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 170, top: 33 }} >
                            <TouchableOpacity style={{
                                backgroundColor: 'grey', borderRadius: 10, width: 80, height: 50
                            }} onPress={cancelHandler}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    top: 11
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#6495ED',
                                borderRadius: 10, width: 80,
                                height: 50
                            }} onPress={resetPasswordHandler}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textAlign: 'center',
                                    top: 11
                                }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flex: 1,
    },
    background: {
        height: height,
        width: 'auto',
        padding: 20
    },
    flexArrow: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',

        alignItems: 'center'
    },
    boxText: {
        alignItems: 'center',
        marginTop: 61
    },
    gotBackText: {
        color: '#fff',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 36
    },
    enterEmailText: {
        fontFamily: 'Nunito',
        fontSize: 14,
        color: '#fff',

        marginTop: 182
    },
    inputEmail: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16,
        padding: 20,
        width: 317,
        backgroundColor: 'rgba(253, 222, 222, 0.7)',
        color: '#fff',
        borderRadius: 10,

        marginTop: 21
    },
    sendCodeBtn: {
        width: 317,
        height: 51,
        borderRadius: 10,
        backgroundColor: '#FFCD61',
        marginTop: 21,
        alignItems: 'center',
        justifyContent: 'center'
    },
    senCodeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#393939'
    }
})

export default ForgotPassword