// const axios = require('axios');
import axios from 'axios'
axios.defaults.withCredentials = true

export const userService = {
    query,
    getById,
    remove,
    save,
    login,
    logout,
    getLoggedinUser,
    signup
}




function login(credentials) {
    return axios.post('//localhost:3000/api/login', credentials)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedinUser', JSON.stringify(user))
            return user
        })
}
function logout() {
    return axios.post('//localhost:3000/api/logout')
        .then(res => res.data)
        .then(() => {
            sessionStorage.clear()
        })
}

function getLoggedinUser() {
    return axios.get('//localhost:3000/api/loggedinUser')
        .then(res => res.data)
    // const loggedinUser = sessionStorage.getItem('loggedinUser')
    // return Promise.resolve(loggedinUser)
}

function signup(newUser) {
    return _add(newUser)
        .then(newUser => {
           return login(newUser)
        })
}

function query() {
    return axios.get('//localhost:3000/api/user')
        .then(res => res.data)
}

function getById(userId) {
    return axios.get(`//localhost:3000/api/user/${userId}`)
        .then(res => res.data)
}

function remove(userId) {
    return axios.delete(`//localhost:3000/api/user/${userId}`)
}

function save(user) {
    return (user._id) ? _update(user) : _add(user);


}

function _add(user) {
    return axios.post(`//localhost:3000/api/user`, user)
        .then(res => res.data)

}

function _update(user) {
    return axios.put(`//localhost:3000/api/user/${user._id}`, user)
        .then(res => res.data)
}
