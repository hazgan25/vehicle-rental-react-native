import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: height + 50,
        width: width - 30,
        flex: 1,
        alignSelf: 'center',
    },
    wrapperBack: {
        flexDirection: 'row',
        width: 230,
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 16
    },
    backArrowIcon: {
        width: 14,
        height: 22,
    },
    updateProfileText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#393939',
        fontSize: 28,
        lineHeight: 38
    },
    boxPicture: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 47
    },
    btnTakePicture: {
        width: 155,
        height: 38,
        backgroundColor: '#393939',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    takePictureText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 18,
        color: '#FFCD61',
    },
    btnBrowse: {
        width: 155,
        height: 38,
        backgroundColor: '#FFCD61',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        top: 15
    },
    browseText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 18,
        color: '#000',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    formUser: {
        width: 330,
        height: height,
        alignSelf: 'center',
        top: 104,
    },
    labelText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 18,
        color: '#D2D2D2',
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        borderBottomColor: '#000'
    },
    btnSave: {
        width: 338,
        height: 57,
        backgroundColor: '#FFCD61',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: 48
    },
    saveText: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 33,
        color: '#393939'
    }
})

export default styles