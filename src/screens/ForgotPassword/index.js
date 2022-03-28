import {
    View, Text, Dimensions, StyleSheet, ImageBackground,
    Image, TouchableOpacity
} from 'react-native'

import React, { useState } from 'react'

import { ForgotPass, resetPass } from '../../modules/utils/auth'

const resetPasswordBg = require('../../assets/img/resetPasswordBg.png')
const backArrow = require('../../assets/icons/backArrow.png')

import Modal from 'react-native-modal'
import { TextInput } from 'react-native-gesture-handler'

const ForgotPassword = () => {
    const [isModal, setIsmodal] = useState(false)
    const [isForgot, setIsforgot] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pin, setPin] = useState('')

    const closeModal = () => {
        setIsmodal(false)
    }

    const sendCodeHandle = () => {
        const sendCode = {
            email: email
        }
        ForgotPass(sendCode)
            .then((res) => {
                console.log(res)
                setIsmodal(true)
                setIsforgot(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={resetPasswordBg} style={styles.background}>
                <View>
                    <TouchableOpacity>
                        <Image source={backArrow} />
                    </TouchableOpacity>
                    <Text>Back</Text>
                </View>
                <View>
                    <Text>THAT'S OKAY, WE GOT YOUR BACK</Text>
                    <Text>
                        Enter your email to get reset password code,
                        If you don't receive any code Resend Code
                    </Text>
                    <TextInput placeholder='Enter your Email Address' />
                    <TouchableOpacity>
                        <Text>Send Code</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1
    },
    background: {
        height: 'auto',
        width: 'auto'
    },
})

export default ForgotPassword