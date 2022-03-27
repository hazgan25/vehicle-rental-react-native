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