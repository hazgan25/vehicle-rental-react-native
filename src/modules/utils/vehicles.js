import axios from 'axios'

const urlVehicles = process.env.HOST + '/vehicles'

export const postVehicle = (body, token) => {
    return fetch(urlVehicles, {
        method: 'POST',
        headers: {
            'x-access-token': token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: body,
    })
        .then(res => {
            return res.json()
        })
        .catch((err) => {
            console.log('ini err', err)
        })
}

export const getVehicleDetail = (id) => {
    const urlVehiclesDetail = urlVehicles + `/${id}`
    return axios.get(urlVehiclesDetail)
}

export const putVehicleById = (body, token) => {
    return fetch(urlVehicles, {
        method: 'PUT',
        headers: {
            'x-access-token': token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: body,
    })
        .then(res => {
            return res.json()
        })
        .catch((err) => {
            console.log('ini err', err)
        })
}

export const vehicleTypeLimit = (param) => {
    const urlGetVehicles = urlVehicles + `?type=${param.type}&limit=${param.limit}by=rating&order=desc`
    return axios.get(urlGetVehicles)
}