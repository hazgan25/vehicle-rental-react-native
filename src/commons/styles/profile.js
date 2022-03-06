import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1
    },
    box: {
        width: width,
        height: 220,
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 1.68,

        elevation: 15,
    },
    boxImg: {
        position: 'absolute',
        alignSelf: 'center',
        top: 26
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    name: {
        position: 'absolute',
        alignSelf: 'center',
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 30,
        top: 136
    },
    email: {
        position: 'absolute',
        alignSelf: 'center',
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 30,
        top: 160
    },
    phone: {
        position: 'absolute',
        alignSelf: 'center',
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 30,
        top: 180
    }
})

export default styles