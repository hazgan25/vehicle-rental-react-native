import React from 'react'
import { View, Text, ImageBackground, Linking } from 'react-native'
import styles from '../../commons/styles/auth'

const ErrorServer = () => {
    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/img/authBg.png')} style={styles.background}>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%' }}>
                        <Text style={{
                            textAlign: 'center',
                            paddingTop: 33,
                            padding: 5,
                            fontWeight: 'bold',
                            fontSize: 32,
                            color: '#fff'
                        }}>looks like the server has an error/Maintenance or your is offline</Text>
                        <View style={{
                            padding: 5,
                            paddingTop: 23
                        }}>
                            <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}>About Error :</Text>
                            <View style={{ paddingTop: 13 }}>
                                <Text style={{ color: '#fff', fontSize: 23 }}>- Your is Offline</Text>
                                <Text style={{ color: '#fff', fontSize: 23 }}>- Server/Backend Error/Maintenance</Text>
                                <Text style={{ color: '#fff', fontSize: 23 }}>-   My Free Host Heroku is Sleep/Dyno Free Sleeping
                                    <Text style={{ color: 'blue', fontWeight: 'bold' }} onPress={() => Linking.openURL('https://devcenter.heroku.com/articles/free-dyno-hours')}> Offical Dyno Hour Heroku </Text>
                                    but it can be reactivated automatically during a 2 month sleep period
                                </Text>
                            </View>
                        </View>
                    </View>


                </ImageBackground>
            </View>
        </>
    )
}

export default ErrorServer