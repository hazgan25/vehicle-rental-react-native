import axios from 'axios'

const url = process.env.HOST + '/vehicles'

export const vehicleTypeLimit = (param) => {
    const urlGetVehicles = url + `?type=${param.type}&limit=${param.limit}`
    return axios.get(urlGetVehicles)
}