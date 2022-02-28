import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1
    },
    box: {

    }
})

export default styles