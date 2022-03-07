import React, { useEffect, useState } from 'react'
import {
    View, ImageBackground, Text,
    TextInput, KeyboardAvoidingView,
    TouchableOpacity, ScrollView
} from 'react-native'
import Modal from 'react-native-modal'

import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../../redux/actions/auth'
import { userAction } from '../../redux/actions/auth'

import styles from '../../commons/styles/auth'

const authBg = require('../../assets/img/authBg.png')

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { auth } = state
    const { token } = auth

    const loginHandler = () => {
        const body = {
            email: email,
            password: password
        }
        dispatch(loginAction(body))
    }

    useEffect(() => {
        if (auth.isFulfilled === true) {
            navigation.navigate('Main')
            dispatch(userAction(token))
        }
        if (auth.isReject === true) {
            console.log('err?');
        }
    }, [navigation, dispatch, auth])

    return (
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
                                {auth.isReject ? (
                                    <><Text style={styles.errText}>{`${auth.errData.err}`}</Text></>
                                ) : (<></>)}
                                <TouchableOpacity style={[styles.btn, styles.btnAuth]} onPress={loginHandler}>
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
        </View >
    )
}

export default Login