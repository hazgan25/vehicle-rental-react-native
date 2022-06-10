import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, Platform, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from '../../commons/styles/profile'

import { logoutAction } from '../../redux/actions/auth'

const defaultProfile = require('../../assets/img/defaultProfile.png')
const vehicleRentalIcon = require('../../assets/icons/vehicleRentalIcon.png')
const nextArrow = require('../../assets/icons/nextArrow.png')
const pencilIcon = require('../../assets/icons/pencilIcon.png')

import Loading from '../../commons/components/Loading'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'android' ? Dimensions.get('window').height :
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

const Profile = ({ navigation }) => {
    const [showImg, setShowImg] = useState(defaultProfile)
    const [isModalVisible, setModalVisible] = useState(false)
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { token, userData, isPending } = state.auth
    const { name, email, phone, image, role } = userData

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const logoutHandler = () => {
        dispatch(logoutAction(token))
            .then(async () => {
                try {
                    await AsyncStorage.removeItem('persist:root')
                    setModalVisible(false)
                    navigation.navigate('Home')
                }
                catch (err) {
                    console.log(err)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const toEditProfile = () => {
        navigation.navigate('EditProfile')
    }

    const editPassword = () => {
        navigation.navigate('EditPass')
    }

    useEffect(() => {
        if (image !== null) {
            setShowImg({ uri: `${process.env.HOST}/${image}` })
        }
    }, [image])

    return (
        <>
            {!isPending ? (
                <View style={styles.container}>
                    <View style={styles.box}>
                        {!token ? (
                            <View>
                                <View style={styles.boxImg}>
                                    <Image source={vehicleRentalIcon} style={styles.profileImg} />
                                </View>
                                <Text style={styles.name}>Vehicle Rental</Text>
                            </View>
                        ) : (
                            <View>
                                <View style={styles.boxImg}>
                                    <Image source={showImg}
                                        style={styles.profileImg}
                                        onError={(e) => {
                                            e.onError = null
                                            setShowImg(defaultProfile)
                                        }}
                                    />
                                    <TouchableOpacity onPress={toEditProfile}>
                                        <View style={styles.boxPencil}>
                                            <Image source={pencilIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.name}>{name === null || name === '' ? 'No Name' : name}</Text>
                                <Text style={styles.email}>{email}</Text>
                                <Text style={styles.phone}>{phone === null || phone === '' ? 'No Number Phone' : phone}</Text>
                            </View>
                        )}
                    </View>

                    <View style={{ top: 26 }}>
                        {!token ? (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText}>FAQ</Text>
                                    <Image source={nextArrow} style={styles.nextArrow} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText}>Help</Text>
                                    <Image source={nextArrow} style={styles.nextArrow} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText} onPress={() => { navigation.navigate('Register') }}>Register</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText} onPress={() => { navigation.navigate('Login') }}>Login</Text>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText}>Your favourites</Text>
                                    <Image source={nextArrow} style={styles.nextArrow} />
                                </View>
                                {role === 'owner' && (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                            <Text style={styles.listText} onPress={() => { navigation.navigate('VehicleProductByOwner') }}>Vehicle Product</Text>
                                            <Image source={nextArrow} style={styles.nextArrow} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                            <Text style={styles.listText} onPress={() => { navigation.navigate('HistoryOwnerByOwner') }}>History Order</Text>
                                            <Image source={nextArrow} style={styles.nextArrow} />
                                        </View>
                                    </View>
                                )}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText}>FAQ</Text>
                                    <Image source={nextArrow} style={styles.nextArrow} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText}>Help</Text>
                                    <Image source={nextArrow} style={styles.nextArrow} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText} onPress={editPassword} >Update password</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: 360, marginBottom: 34 }}>
                                    <Text style={styles.listText} onPress={toggleModal}>Log out</Text>
                                </View>

                                <Modal isVisible={isModalVisible}
                                    animationIn='zoomIn'
                                    animationInTiming={800}
                                    animationOut='zoomOut'
                                    animationOutTiming={800}
                                >
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff',
                                            width: deviceWidth - 70,
                                            height: deviceHeight - 500,
                                            borderRadius: 50
                                        }}>
                                            <Text style={{
                                                fontFamily: 'Nunito',
                                                fontStyle: 'normal',
                                                fontWeight: 'bold',
                                                fontSize: 18,
                                            }}>Are You Sure?!</Text>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth - 170, top: 33 }}>
                                                <TouchableOpacity style={{ backgroundColor: '#7f0000', borderRadius: 10, width: 80, height: 50 }} onPress={logoutHandler}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: '#fff',
                                                        textAlign: 'center',
                                                        top: 11
                                                    }}>Log out</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 10, width: 80, height: 50 }} onPress={toggleModal}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: '#fff',
                                                        textAlign: 'center',
                                                        top: 11
                                                    }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>

                            </View>
                        )
                        }
                    </View >
                </View >
            ) :
                (
                    <Loading />
                )
            }
        </>
    )
}

export default Profile