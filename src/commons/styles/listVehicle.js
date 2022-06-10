import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1,
    },
    boxHeader: {
        height: 55,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 1.68,

        elevation: 8,
        justifyContent: 'center',
        padding: 12
    },
    filterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#616167',
        paddingLeft: 8
    },
    vehicleImg: {
        width: 101,
        height: 88,
        marginBottom: 26,
        borderRadius: 20,
    },
    vehicleImgDefault: {
        position: 'absolute',
        width: 101,
        height: 88,
        resizeMode: 'cover',
        marginBottom: 26,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    boxStar: {
        position: 'absolute',
        width: 50,
        height: 23,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFCD61',
        borderRadius: 40,
        right: -10,
        top: -10,
        zIndex: 2
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
    },
})

export default styles