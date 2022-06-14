import React, { useEffect, useState } from 'react'
import {
    View, ImageBackground, Text,
    TextInput, KeyboardAvoidingView,
    TouchableOpacity, ScrollView,
    Dimensions, Platform
} from 'react-native'
import Modal from 'react-native-modal'
import styles from '../../commons/styles/auth'

import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../../redux/actions/auth'
import { userAction } from '../../redux/actions/auth'

import Loading from '../../commons/components/Loading'

const authBg = require('../../assets/img/authBg.png')

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isModal, setIsmodal] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { auth } = state
    const { token, isPending, isFulfilled, isReject, errData } = auth

    const loginHandler = () => {
        const body = {
            email: email,
            password: password
        }
        dispatch(loginAction(body))
    }

    useEffect(() => {
        if (isFulfilled === true) {
            navigation.navigate('Home')
            dispatch(userAction(token))
            setIsmodal(false)
        }
        if (email !== '' && password !== '' && isReject === true) {
            setIsmodal(!isModal)
            setEmail('')
            setPassword('')
        }
    }, [navigation, dispatch, auth])

    return (
        <>
            {!isPending ? (
                <View style={styles.container}>
                    <ImageBackground source={authBg} style={styles.background}>
                        <Text style={styles.exploreText}>LET'S EXPLORE THE WORLD</Text>
                        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <View>
                                <KeyboardAvoidingView enabled>
                                    <View style={{ alignItems: 'center' }}>
                                        <TextInput style={[styles.emailInput, styles.emailInputTopLogin]} placeholder='Email' placeholderTextColor='#fff' onChangeText={text => setEmail(text)} />
                                        <TextInput style={styles.passwordInput} placeholder='Password' placeholderTextColor='#fff' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                                        <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPass')}>Forgot Password ?</Text>
                                        <TouchableOpacity style={[styles.btn, styles.btnAuth]} onPress={loginHandler} disabled={!email || !password ? true : false}>
                                            <Text style={styles.textAuth}>Login</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.signupText}>{`Dont have an accoutn? `}
                                            <Text style={styles.signClick} onPress={() => { navigation.navigate('Register') }}>Sign up now</Text>
                                        </Text>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        </ScrollView >
                    </ImageBackground >


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
                                }}>There is an error?</Text>

                                <View style={{ width: deviceWidth - 170, top: 23 }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Nunito',
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: '#df4759',
                                            alignSelf: 'center'
                                        }}
                                    >{`${errData.err}`}</Text>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#6495ED',
                                        borderRadius: 10,
                                        width: 100,
                                        height: 50,
                                        alignSelf: 'center',
                                        top: 23
                                    }} onPress={() => { setIsmodal(false) }}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textAlign: 'center',
                                                fontSize: 16,
                                                top: 11
                                            }}
                                        >Close</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>

                </View >
            ) :
                (
                    <Loading />
                )
            }
        </>
    )
}

export default Login