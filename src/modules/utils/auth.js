import axios from 'axios'
const urlAuth = process.env.HOST + '/auth'

export const Login = (body) => {
    const urlLogin = urlAuth + '/login'
    return axios.post(urlLogin, body)
}

export const SignUp = (body) => {
    const urlRegister = urlAuth + '/register'
    return axios.post(urlRegister, body)
}

export const Logout = (token) => {
    const urlLogout = urlAuth + '/logout'
    return axios.delete(urlLogout, { headers: { 'x-access-token': token } })
}