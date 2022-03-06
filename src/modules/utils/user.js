import axios from 'axios'
const urlUser = process.env.HOST + '/users'

export const userProfile = (token) => {
    const urlUserProfile = urlUser + '/profile'
    return axios.get(urlUserProfile, { headers: { 'x-access-token': token } })
}