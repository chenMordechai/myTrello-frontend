
export const cardService = {
    getById
}


function getById(cardId, board) {
    return axios.get(`//localhost:3000/api/board/${boardId}`)
        .then(res => res.data)
}