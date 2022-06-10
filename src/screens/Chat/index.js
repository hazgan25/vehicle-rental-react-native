import React from 'react'
import {
    View, Text, TextInput, TouchableOpacity,
    Image, StyleSheet, Dimensions, Platform
} from 'react-native'

import { useSelector } from 'react-redux'

const vehiclenotfound = require('../../assets/img/vehiclenotfound.png')
const backArrow = require('../../assets/icons/backArrow.png')
const searchIconHome = require('../../assets/icons/searchIconHome.png')

const Chat = ({ navigation }) => {
    const state = useSelector(state => state)
    const { token } = state.auth
    return (
        <View style={styles.container}>
            <View style={styles.wrapperBack}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={backArrow} style={styles.backArrowIcon} />
                </TouchableOpacity>
                <Text style={styles.chatText}>Chat</Text>
            </View>
            {
                !token ? (
                    <React.Fragment>
                        <View style={{ marginTop: 41 }}>
                            <Image source={vehiclenotfound} style={{ width: 390, height: 200, marginTop: 53 }} />
                            <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', marginTop: 20 }}>You are not logged in</Text>
                        </View>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <TextInput placeholder='Search Chat' style={styles.search} placeholderTextColor='#393939' />
                        <TouchableOpacity style={styles.searchIcon}>
                            <Image source={searchIconHome} style={{ tintColor: '#393939' }} />
                        </TouchableOpacity>

                        <View style={{ width: width - 30, alignSelf: 'center' }}>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 43,
                                justifyContent: 'space-between',
                                height: 62,
                                borderBottomWidth: 1,
                                borderBottomColor: '#DADADA'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dummy Rental Jogja</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Hey, THere are 3 Vespa left</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Just now</Text>
                                    <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: '#FFDC61', alignSelf: 'center' }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>1</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 43,
                                justifyContent: 'space-between',
                                height: 62,
                                borderBottomWidth: 1,
                                borderBottomColor: '#DADADA'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dummy Car Rental</Text>
                                    <Text>Okay, thank you for the good service</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16 }}>Yesterday</Text>
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                )
            }
        </View>
    )
}
const height = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flex: 1,
        alignSelf: 'center',
    },
    wrapperBack: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginLeft: 17
    },
    backArrowIcon: {
        width: 14,
        height: 22,
    },
    chatText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#393939',
        fontSize: 28,
    },
    search: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 19,
        height: 51,
        width: width - 30,
        backgroundColor: 'rgba(57,57,57, 0.2)',
        color: '#fff',
        paddingLeft: 14,

        borderRadius: 10,
        marginTop: 39,
        alignSelf: 'center'
    },
    searchIcon: {
        position: 'absolute',
        height: 20,
        width: 20,
        right: 20,
        top: 108
    }
})

export default Chat