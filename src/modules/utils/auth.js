import axios from 'axios'

const url = process.env.HOST + '/auth'
// const url = "https://vehicle-rental4.herokuapp.com"

export const Login = (body) => {
    const urlLogin = url + '/login'
    return axios.post(urlLogin, body)
}

export const SignUp = (body) => {
    const urlRegister = url + '/register'
    return axios.post(urlRegister, body)
}

export const Logout = (token) => {
    const urlLogout = url + '/logout'
    return axios.delete(urlLogout, { headers: { 'x-access-token': token } })
}