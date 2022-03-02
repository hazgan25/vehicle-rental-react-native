import axios from 'axios'

const url = process.env.HOST + '/vehicles'
// const url = "https://vehicle-rental4.herokuapp.com"

// export const vehiclesCarAll = () => {
//     const urlVehicleCar = url + '?type=1'
//     return axios.get(urlVehicleCar)
// }

// export const vehicleMotorbikeAll = () => {
//     const urlVehicleMotorbike = url + '?type=2'
//     return axios.get(urlVehicleMotorbike)
// }

// export const vehicleBikeAll = () => {
//     const urlVehicleBike = url + '?type=3'
//     return axios.get(urlVehicleBike)
// }

export const vehicleTypeLimit = (param) => {
    const urlGetVehicles = url + `?type=${param.type}&limit=${param.limit}`
    return axios.get(urlGetVehicles)
}