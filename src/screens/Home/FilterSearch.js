import React, { useState, useEffect } from 'react'
import { ScrollView, View, TouchableOpacity, Image, Text, Dimensions, TextInput, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import { getAllLocation } from '../../modules/utils/location'

import { Picker } from '@react-native-picker/picker'

const backArrow = require('../../assets/icons/backArrow.png')

const FilterSearch = ({ navigation, route }) => {
    const [locationArr, setLocationArr] = useState([])
    const [selectLocations, setSelectLocation] = useState(location)
    const [selectRating, setSelectRating] = useState('')
    const [selectType, setSelectType] = useState(type)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const { params } = route
    let { type, location, by, order } = params

    useEffect(() => {
        getAllLocation()
            .then((res) => {
                setLocationArr(res.data.result)
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        setSelectLocation(location)
        setSelectType(type)
        setSelectRating(order)
    }, [type, location, order])

    const resetHandler = () => {
        setSelectLocation('')
        setSelectType('')
        setSelectRating('')
    }

    const applyHandler = () => {
        if (selectRating !== '') by = 'rating'
        const newParams = {
            ...params,
            type: selectType,
            location: selectLocations,
            by: by,
            order: selectRating
        }
        navigation.navigate('VehicleList', newParams)
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 19,
                height: 61,
                borderBottomWidth: 1,
                borderColor: '#F5F5F5'
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={backArrow} />
                    <Text style={{ fontSize: 24, height: 28, bottom: 7, paddingLeft: 24 }}>Filter</Text>
                </View>
                <TouchableOpacity style={{
                    width: 84,
                    height: 28,
                    backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }} onPress={resetHandler}>
                    <Text style={{ fontSize: 14, color: '#616167' }}>Reset</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.selectFlex}>
                <Text style={styles.listText}>Your location</Text>
                <View style={styles.selectInput}>
                    <Picker
                        mode='dialog'
                        selectedValue={selectLocations}
                        style={{ color: '#9F9F9F', fontSize: 18 }}
                        onValueChange={(value) => {
                            if (value !== 0) {
                                setSelectLocation(value)
                            }
                        }}
                    >
                        <Picker.Item label='Select Location'
                            value={0}
                            enabled={selectLocations === '' ? true : false}
                            style={selectLocations === '' ? { color: '#9F9F9F' } : ''}
                        />
                        {
                            Array.isArray(locationArr) && locationArr.length > 0 &&
                            locationArr.map((data) => (
                                <Picker.Item label={data.name} value={data.id} key={data.id} />
                            ))
                        }
                    </Picker>
                </View>
                <View>
                </View>
            </View>

            <View style={styles.selectFlex}>
                <Text style={styles.listText}>Star rating</Text>
                <View style={styles.selectInput}>
                    <Picker
                        mode='dialog'
                        selectedValue={selectRating}
                        style={{ color: '#9F9F9F', fontSize: 18 }}
                        onValueChange={(value) => {
                            if (value !== 0) {
                                setSelectRating(value)
                            }
                        }}
                    >
                        <Picker.Item label='Select Rating'
                            value={0}
                            enabled={selectRating === '' ? true : false}
                            style={selectRating === '' ? { color: '#9F9F9F' } : ''}
                        />
                        <Picker.Item label='Top' value={'desc'} />
                        <Picker.Item label='Low' value={'asc'} />
                    </Picker>
                </View>
            </View>

            <View style={styles.selectFlex}>
                <Text style={styles.listText}>Date</Text>
                <View style={styles.selectInput}>
                    <Picker mode='dialog' style={{ color: '#9F9F9F', fontSize: 18 }}>
                        <Picker.Item label='Select Date' value={0} style={{ color: '#9F9F9F' }} />
                    </Picker>
                </View>
            </View>

            <View style={styles.selectFlex}>
                <Text style={styles.listText}>Type</Text>
                <View style={styles.selectInput}>
                    <Picker
                        mode='dialog'
                        selectedValue={selectType}
                        style={{ color: '#9F9F9F', fontSize: 18 }}
                        onValueChange={(value) => {
                            if (value !== 0) {
                                setSelectType(value)
                            }
                        }}
                    >
                        <Picker.Item label='Select Type'
                            value={0}
                            enabled={selectType === '' ? true : false}
                            style={selectType === '' ? { color: '#9F9F9F' } : ''}
                        />
                        <Picker.Item label='Car' value={1} />
                        <Picker.Item label='Motorbike' value={2} />
                        <Picker.Item label='bike' value={3} />
                    </Picker>
                </View>
            </View>

            <View style={styles.selectFlex}>
                <Text style={styles.listText}>No Prepayment</Text>
                <CheckBox
                    disabled={false}
                    boxType='circle'
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
            </View>
            <View style={styles.selectFlex}>
                <Text style={styles.listText}>Deals</Text>
                <CheckBox
                    disabled={false}
                    boxType='circle'
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
            </View>
            <View style={styles.selectFlex}>
                <Text style={styles.listText}>Only show available</Text>
                <CheckBox
                    disabled={false}
                    boxType='circle'
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
            </View>

            <TouchableOpacity style={styles.btnApply} onPress={applyHandler}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#393939'
                }}>Apply</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    listText: {
        fontSize: 18,
        color: '#393939'
    },
    selectFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 19
    },
    selectInput: {
        position: 'absolute',
        width: '60%',
        right: 0,
        paddingLeft: 23,
    },
    btnApply: {
        width: 338,
        height: 70,
        backgroundColor: '#FFCD61',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 34
    }
})

export default FilterSearch