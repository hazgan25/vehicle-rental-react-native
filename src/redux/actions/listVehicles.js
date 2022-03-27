import { ACTION_STRING } from './actionString'
import { vehicleTypeLimit } from '../../modules/utils/vehicles'

const { listVehicle, listCar, listMotorbike, listBike } = ACTION_STRING

export const listVechileAction = (params) => {
    return {
        type: listVehicle,
        payload: vehicleTypeLimit(params)
    }
}

export const listVehicleCarAction = (params) => {
    return {
        type: listCar,
        payload: vehicleTypeLimit(params)
    }
}
export const listVehicleMotorbikeAction = (params) => {
    return {
        type: listMotorbike,
        payload: vehicleTypeLimit(params)
    }
}

export const listVehicleBikeAction = (params) => {
    return {
        type: listBike,
        payload: vehicleTypeLimit(params)
    }
}
