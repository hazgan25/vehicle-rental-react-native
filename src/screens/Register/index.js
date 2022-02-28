import {
    View, ImageBackground, Text,
    TextInput, KeyboardAvoidingView,
    TouchableOpacity, ScrollView
} from 'react-native'

import React, { useState } from 'react'

import styles from '../../commons/styles/auth'

import { SignUp } from '../../modules/utils/auth'

const registerBg = require('../../assets/img/registerBg.png')

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('')

    const registerHandler = () => {
        const body = {
            email: email,
            password: password,
            phone: phone
        }
        SignUp(body)
            .then((res) => {
                setMsgSuccess(res.data.result.msg)
                if (msgSuccess) {
                    navigation.navigate('Login')
                }
            })
            .catch((err) => console.log(err))
    }
    // console.log(!msgSuccess)
    return (
        <View style={styles.container}>
            <ImageBackground source={registerBg} style={styles.background}>
                <Text style={styles.exploreText}>LET'S HAVE SOME RIDE</Text>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <View>
                        <KeyboardAvoidingView enabled>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput style={styles.emailInput} placeholder='Email' placeholderTextColor='#fff' onChangeText={text => setEmail(text)} />
                                <TextInput style={styles.passwordInput} placeholder='Mobile Phone' placeholderTextColor='#fff' onChangeText={text => setPhone(text)} />
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
        </View>
    )
}

export default Register