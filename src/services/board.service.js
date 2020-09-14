// const axios = require('axios');
import axios from 'axios'
axios.defaults.withCredentials = true

export const boardService = {
    query,
    getById,
    remove,
    save,
    makeId
}

function query() {
    return axios.get('//localhost:3000/api/board')
        .then(res => res.data)
}

function getById(boardId) {
    return axios.get(`//localhost:3000/api/board/${boardId}`)
        .then(res => res.data)
}

function remove(boardId) {
    return axios.delete(`//localhost:3000/api/board/${boardId}`)
}

function save(board) {
    if (board._id) {
        return axios.put(`//localhost:3000/api/board/${board._id}`, board)
            .then(res => res.data)
    } else {
        return axios.post(`//localhost:3000/api/board`, board)
            .then(res => res.data)
    }

}

function makeId(length = 5) {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}