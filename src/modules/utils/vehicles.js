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

export const patchVehicleById = (id, body, token) => {
    const urlPatchVehicleById = urlVehicles + `/${id}`
    return fetch(urlPatchVehicleById, {
        method: 'PATCH',
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

export const vehicleTypeLimit = (params) => {
    const urlGetVehicles = urlVehicles + `?search=${params.search}&type=${params.type}&location=${params.location}&by=${params.by}&order=${params.order}&limit=${params.limit}&page=${params.page}`
    return axios.get(urlGetVehicles)
}

export const getListVehicleByOwner = (params, token) => {
    const urlListVehicleByOwner = urlVehicles + `/renter?search=${params.search}&type=${params.type}&location=${params.location}&by=${params.by}&order=${params.order}&limit=${params.limit}&page=${params.page}`
    return axios.get(urlListVehicleByOwner, { headers: { 'x-access-token': token } })
}

export const deleteVehicleById = (id, token) => {
    const urlDeteleVehicle = urlVehicles + `?id=${id}`
    return axios.delete(urlDeteleVehicle, { headers: { 'x-access-token': token } })
}