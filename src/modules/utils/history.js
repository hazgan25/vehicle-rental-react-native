import axios from 'axios'
const urlHistory = process.env.HOST + '/history'

export const postNewHistory = (body, token) => {
    return axios.post(urlHistory, body, { headers: { 'x-access-token': token } })
}