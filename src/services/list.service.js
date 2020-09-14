
export const listService = {
    addId,
    getById
}

function getById(board, listId) {
   const list =  board.lists.find(list => list._id === listId)
   return Promise.resolve(list)

}
function addId(list) {
    const savedList = (list._id) ? list : _addId(list)
    return Promise.resolve(savedList)
}


function _addId(list) {
    list._id = _makeId();
    return list

}

function _makeId(length = 5) {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}