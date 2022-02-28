import axios from 'axios'
const url = process.env.HOST + '/users'
// const url = process.env.HOST + '/auth'
// const url = "https://vehicle-rental4.herokuapp.com"


export const userProfile = (token) => {
    const urlUserProfile = url + '/profile'
    // return axios.get('https://vehicle-rental4.herokuapp.com/users/profile', { headers: { 'x-access-token': token } })
    return axios.get(urlUserProfile, { headers: { 'x-access-token': token } })
}