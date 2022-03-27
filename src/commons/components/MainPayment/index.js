import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'

import { View, ScrollView, Dimensions, Text, TouchableOpacity, Image } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const backArrow = require('../../../assets/icons/backArrow.png')

const MainPayment = ({ children }) => {
    const route = useRoute()
    const navigation = useNavigation()

    const back = () => {
        if (route.name === 'Finish') {
            const params = { reservation: true }
            navigation.navigate('History', params)
        }
        if (route.name === 'StepOne') {
            // navigation.navigate('VehicleDetail')
            navigation.goBack()
        }
        if (route.name === 'StepTwo') {
            navigation.navigate('StepOne', route.params)
        }
        if (route.name === 'StepThree') {
            navigation.navigate('StepTwo', route.params)

        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{
                height: route.name === 'StepThree' ? height + 100 : height,
                width: width - 30,
                flex: 1,
                alignSelf: 'center',
            }}>

                <View style={{
                    flexDirection: 'row',
                    width: route.name !== 'Finish' ? 150 : 180,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    top: 16
                }}>
                    <TouchableOpacity onPress={back}>
                        <Image source={backArrow} />
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: 'Nunito',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        color: '#393939',
                        fontSize: 28,
                        lineHeight: 38
                    }}>{route.name !== 'Finish' ? 'Payment' : 'See history'}</Text>
                </View>

                {route.name !== 'Finish' ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 49 }}>
                        <View style={{
                            width: 36,
                            height: 36,
                            backgroundColor: '#FFCD61',
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>1</Text>
                        </View>

                        <View style={{
                            width: 24,
                            height: 3,
                            alignSelf: 'center',
                            backgroundColor: route.name !== 'StepOne' ? '#FFCD61' : '#DFDEDE'
                        }}></View>

                        <View style={{
                            width: 36,
                            height: 36,
                            backgroundColor: route.name !== 'StepOne' ? '#FFCD61' : '#DFDEDE',
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>2</Text>
                        </View>

                        <View style={{
                            width: 24,
                            height: 3,
                            alignSelf: 'center',
                            backgroundColor: route.name !== 'StepTwo' && route.name !== 'StepOne' ? '#FFCD61' : '#DFDEDE'
                        }}></View>

                        <View style={{
                            width: 36,
                            height: 36,
                            backgroundColor: route.name !== 'StepTwo' && route.name !== 'StepOne' ? '#FFCD61' : '#DFDEDE',
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>3</Text>
                        </View>

                    </View>
                ) : (
                    <>
                    </>
                )}

                <View style={{ marginTop: 50 }}>
                    {children}
                </View>
            </View >
        </ScrollView >
    )
}

export default MainPayment