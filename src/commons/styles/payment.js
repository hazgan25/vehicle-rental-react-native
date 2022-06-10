import { Dimensions, StyleSheet, Platform } from 'react-native'

const height = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    inputBox: {
        height: 50,
        backgroundColor: '#DFDEDE',
        borderRadius: 10,
        paddingLeft: 14
    },
    boxYellow: {
        height: 70,
        backgroundColor: '#FFCD61',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigText: {
        fontFamily: 'Nunito',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#393939'
    },
    vehicleImg: {
        width: 338,
        height: 201,
        alignSelf: 'center',
        borderRadius: 10
    },
    scoreBg: {
        position: 'absolute',
        width: 60,
        height: 23,
        flexDirection: 'row',
        backgroundColor: '#FFCD61',
        borderRadius: 40,
        justifyContent: 'space-evenly',
        right: 28,
        top: -40
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    strIcon: {
        width: 14,
        height: 12,
        color: 'black',
        alignSelf: 'center'
    },
    detailText: {
        fontSize: 16,
        color: '#616167',
        marginBottom: 10
    },
    totalPrice: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#393939'
    },
    paymentCodeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#393939',
        textAlign: 'center'
    },
    randomCodeText: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
    },
    insertText: {
        fontSize: 13,
        color: '#616167',
        textAlign: 'center'
    },
    bankText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#616167',
        top: 18
    },
    rekBank: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#616167'
    },
    bookingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#616167'
    },
    bookingCode: {
        color: 'green'
    },
    boxPayment: {
        width: 210,
        height: 42,
        backgroundColor: '#FFCD61',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    paymentText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#087E0D'
    }
})

export default styles