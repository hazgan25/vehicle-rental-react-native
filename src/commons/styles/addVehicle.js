import { Dimensions, StyleSheet, Platform } from 'react-native'

const height = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: height + 140,
        width: width - 30,
        flex: 1,
        alignSelf: 'center',
    },
    wrapperBack: {
        flexDirection: 'row',
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 16
    },
    backArrowIcon: {
        width: 14,
        height: 22,
    },
    addNewText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#393939',
        fontSize: 18,
        lineHeight: 25
    },
    cancelText: {
        flex: 1,
        position: 'absolute',
        right: 0,
        top: 17
    },
    boxImg: {
        position: 'absolute',
        alignSelf: 'center',
        top: 61
    },
    circleWrapper: {
        height: 150,
        width: 150,
        backgroundColor: 'rgba(186, 186, 186, 0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    imgPhoto: {
        height: 53,
        width: 53,
    },
    btnAddPic: {
        width: 150,
        height: 37,
        backgroundColor: '#393939',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: 23
    },
    addPicText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 10,
        lineHeight: 14,
        color: '#FFCD61'
    },
    inputProductName: {
        borderBottomWidth: 1,
        width: 241,
        height: 40,
        fontSize: 10,
        textAlign: 'center',
        borderBottomColor: '#000',
    },
    inputPrice: {
        borderBottomWidth: 1,
        width: 241,
        height: 40,
        fontSize: 10,
        textAlign: 'center',
        borderBottomColor: '#000',
        top: 21
    },
    label: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 23
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        borderBottomColor: '#000'
    },
    selectInput: {
        // width: 314
        borderWidth: 1,
        borderColor: '#C4C4C4',
        top: 13
    },
    stockText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 23
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
    btnSave: {
        width: 314,
        height: 63,
        backgroundColor: '#FFCD61',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    saveText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 23,
    }
})

export default styles