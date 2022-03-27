import { Dimensions, StyleSheet, Platform } from 'react-native'

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    wrapperBack: {
        flexDirection: 'row',
        width: width - 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 16,
        alignSelf: 'center',
        zIndex: 2
    },
    backArrowIcon: {
        width: 14,
        height: 22,
    },
    scoreBg: {
        width: 60,
        height: 23,
        flexDirection: 'row',
        backgroundColor: '#FFCD61',
        borderRadius: 40,
        justifyContent: 'space-evenly'
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
    imgScroll: {
        position: 'absolute',
        width: width,
    },
    vehicleImg: {
        height: 426,
        width: width,
    },
    vehicleImgDefault: {
        position: 'absolute',
        height: 426,
        width: width,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    vehicleText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#393939',
    },
    trashBg: {
        height: 35,
        width: 35,
        backgroundColor: '#FFCD61',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    vehiclePrice: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#393939',
        bottom: 12
    },
    personText: {
        fontSize: 16,
        lineHeight: 22
    },
    iconBg: {
        height: 38,
        width: 38,
        backgroundColor: 'rgba(255, 199, 167, 0.2)',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    infoText: {
        fontSize: 16,
        top: 6,
        left: 13
    },
    stockText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#393939'
    },
    selectInput: {
        width: 338,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        alignSelf: 'center',
        marginTop: 29
    },
    box: {
        height: 21,
        width: 21,
        backgroundColor: 'rgba(255, 205, 97, 0.54)',
        borderRadius: 50,
        alignItems: 'center',
    },
    boxIn: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    selectDateBox: {
        width: 220,
        height: 50,
        backgroundColor: 'rgba(57,57,57,0.1)',
        borderRadius: 10,
        justifyContent: 'center'
    },
    selectDateText: {
        fontSize: 12,
        color: 'rgba(57,57,57,0.8)',
        paddingLeft: 14
    },
    selectDate: {
        width: 120,
        height: 50,
        backgroundColor: 'rgba(57,57,57,0.1)',
        borderRadius: 10
    },
    pickerDate: {
        fontSize: 12,
        color: 'rgba(57,57,57,0.8)'
    },

    btnYellow: {
        width: 338,
        height: 66,
        backgroundColor: '#FFCD61',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 26
    },
    btnText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#393939',

    }
})

export default styles