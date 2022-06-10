import {
    View, ImageBackground, Text,
    TextInput, KeyboardAvoidingView,
    TouchableOpacity, ScrollView, Dimensions, Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'

import Modal from 'react-native-modal'

import styles from '../../commons/styles/auth'

import { SignUp } from '../../modules/utils/auth'

const registerBg = require('../../assets/img/registerBg.png')

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isModal, setIsmodal] = useState(false)

    const registerHandler = () => {
        const body = {
            name: '',
            email: email,
            password: password,
            phone: phone
        }
        SignUp(body)
            .then((res) => {
                setMsgSuccess(res.data.result.msg)
                setIsmodal(!isModal)
            })
            .catch(({ ...err }) => {
                setErrMsg(err.response.data.err)
                setIsmodal(!isModal)
            })
    }
    const loginClick = () => {
        setIsmodal(false)
        setMsgSuccess('')
        setErrMsg('')
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={registerBg} style={styles.background}>
                <Text style={styles.exploreText}>LET'S HAVE SOME RIDE</Text>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <View>
                        <KeyboardAvoidingView enabled>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput style={styles.emailInput} placeholder='Email' placeholderTextColor='#fff' onChangeText={text => setEmail(text)} />
                                <TextInput style={styles.passwordInput} keyboardType='phone-pad' dataDetectorTypes='phoneNumber' placeholder='Mobile Phone' placeholderTextColor='#fff' onChangeText={text => setPhone(text)} />
                                <TextInput style={styles.passwordInput} placeholder='Password' placeholderTextColor='#fff' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                                <TouchableOpacity style={[styles.btn, styles.btnAuth]} onPress={registerHandler}>
                                    <Text style={styles.textAuth}>Sign Up</Text>
                                </TouchableOpacity>
                                <Text style={styles.alreadyText}>{`Already have an account ? `}
                                    <Text style={styles.signClick} onPress={() => { navigation.navigate('Login') }}>Login Now</Text>
                                </Text>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </ImageBackground>

            <Modal isVisible={isModal}
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
                        }}>{errMsg && !msgSuccess ? 'There is an error?' : msgSuccess}</Text>

                        <View style={{ width: deviceWidth - 170, top: 23 }}>
                            <Text
                                style={{
                                    fontFamily: 'Nunito',
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    color: errMsg && !msgSuccess ? '#df4759' : '#696969',
                                    alignSelf: 'center'
                                }}
                            >{errMsg && !msgSuccess ? errMsg : 'Please Login again'}</Text>
                            <TouchableOpacity style={{
                                backgroundColor: '#6495ED',
                                borderRadius: 10,
                                width: 100,
                                height: 50,
                                alignSelf: 'center',
                                top: 23
                            }}
                                onPress={errMsg && !msgSuccess ? () => { setIsmodal(false) } : loginClick}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        top: 11
                                    }}
                                >{errMsg && !msgSuccess ? 'Close' : 'Login'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default Register