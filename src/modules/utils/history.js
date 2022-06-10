import axios from 'axios'
const urlHistory = process.env.HOST + '/history'

export const postNewHistory = (id, body, token) => {
    const urlPostHistory = urlHistory + `/${id}`
    return axios.post(urlPostHistory, body, { headers: { 'x-access-token': token } })
}

export const getHistoryById = (params, token) => {
    const urlgetHistoryById = urlHistory + `?by=create_at&order=desc&limit=4&page=${params.page}`
    return axios.get(urlgetHistoryById, { headers: { 'x-access-token': token } })
}

export const getHistoryByIdOwner = (params, token) => {
    const urlgetHistoryByIdOwner = urlHistory + `/renter?search=${params.search}&filter=${params.filter}&by=${params.by}&order=${params.order}&limit=${params.limit}&page=${params.page}`
    return axios.get(urlgetHistoryByIdOwner, { headers: { 'x-access-token': token } })
}

export const postAddOrEditHRating = (id, body, token) => {
    const urlPostAddOrEditRating = urlHistory + `/${id}`
    return axios.patch(urlPostAddOrEditRating, body, { headers: { 'x-access-token': token } })
}

export const postReturn = (id, token) => {
    const urlReturn = urlHistory + `/${id}`
    return axios.put(urlReturn, '', { headers: { 'x-access-token': token } })
}

export const delHistoryUser = (body, token) => {
    return axios.delete(urlHistory, { headers: { 'x-access-token': token }, data: { 'id': body } })
}

export const delHistoryOwner = (body, token) => {
    const urlDelHistoryOwner = urlHistory + '/renter'
    return axios.delete(urlDelHistoryOwner, { headers: { 'x-access-token': token }, data: { 'id': body } })
}