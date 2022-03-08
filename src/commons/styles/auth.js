import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1
    },
    background: {
        height: '100%',
        width: 'auto'
    },
    exploreText: {
        fontFamily: 'Roboto',
        width: 284,
        fontWeight: '900',
        fontSize: 36,
        lineHeight: 42,
        color: '#fff',
        paddingTop: 99,
        paddingLeft: 21
    },
    emailInput: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16,
        height: 51,
        width: 317,
        backgroundColor: 'rgba(253, 222, 222, 0.7)',
        color: '#fff',
        paddingLeft: 14,
    },
    emailInputTopLogin: {
        marginTop: '55%'
    },
    emailInputTopRegister: {
        // marginBottom: '25%'
    },
    passwordInput: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16,
        height: 51,
        width: 317,
        backgroundColor: 'rgba(253, 222, 222, 0.7)',
        color: '#fff',
        paddingLeft: 14,
        marginTop: 18
    },
    phoneInput: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16,
        height: 51,
        width: 317,
        backgroundColor: 'rgba(253, 222, 222, 0.5)',
        color: '#fff',
        paddingLeft: 14,
        // marginTop: 18
    },
    forgotText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        marginTop: 10,
        color: '#fff'
    },
    btn: {
        width: 317,
        height: 51,
        borderRadius: 10,
    },
    btnAuth: {
        backgroundColor: '#FFCD61',
        marginTop: 24
    },
    textAuth: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 18,
        textAlign: 'center',
        color: '#393939',
        paddingTop: 13
    },
    signupText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        color: '#fff',
        marginTop: 33
    },
    alreadyText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        color: '#fff',
        marginTop: 33
    },
    signClick: {
        fontWeight: 'bold',
    },
    // errText: {
    //     fontFamily: 'Nunito',
    //     fontStyle: 'normal',
    //     fontWeight: 'bold',
    //     width: 317,
    //     fontSize: 18,
    //     lineHeight: 19,
    //     marginTop: 10,
    //     color: '#df4759',
    //     textAlign: 'center'
    // }
})

export default styles