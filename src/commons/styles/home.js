import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1,
    },
    imgHeader: {
        height: 280,
        width: 'auto'
    },
    search: {
        position: 'absolute',
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 19,
        height: 51,
        width: 317,
        backgroundColor: 'rgba(57,57,57, 0.51)',
        color: '#fff',
        paddingLeft: 14,

        borderRadius: 10,
        top: 61,
        alignSelf: 'center'
    },
    searchIcon: {
        position: 'absolute',
        height: 20,
        width: 20,
        right: 60,
        top: 73
    },
    btnAdd: {
        position: 'absolute',
        backgroundColor: '#FFDC61',
        height: 51,
        width: 317,
        borderRadius: 10,
        top: 132,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    addNewText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    listText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 30,
        color: '#393939'
    },
    viewMoreText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16,
        color: '#393939',
        alignSelf: 'center'
    },
    vehiclesImgList: {
        height: 168,
        width: 265,
        borderRadius: 15,
        marginLeft: 12.5,
        marginRight: 12.5,
        marginTop: 18,
    },
    vehiclesImgListDefault: {
        position: 'absolute',
        height: 168,
        width: 265,
        resizeMode: 'cover',
        marginLeft: 12.5,
        marginRight: 12.5,
        marginTop: 18,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    }
})

export default styles