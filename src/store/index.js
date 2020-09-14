import Vue from 'vue'
import Vuex from 'vuex'
import { boardService } from '../services/board.service'
import { userService } from '../services/user.service'
import { listService } from '../services/list.service'
import { cardService } from '../services/list.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    boards: [],
    board: null,
    list: null,
    card: null,
    loggedinUser: null,
  },
  getters: {
    boards(state) {
      return state.boards
    },
    board(state) {
      return state.board
    },
    list(state) {
      return state.list
    },
    recentlyViewedBoards(state) {
      return state.boards.filter(board => {
        return board.recentlyViewed + 60 * 1000 * 60 > Date.now()
      })
    },
    loggedinUser(state) {
      return state.loggedinUser
    },
  },
  mutations: {
    updateCard(state, { card, listId }) {
      const list = state.board.lists.find(currList => currList._id === listId);
      const cardIdx = list.cards.findIndex(currCard => currCard._id === card._id)
      list.cards.splice(cardIdx, 1, card);

    },
    addCard(state, { card, listId }) {
      const list = state.board.lists.find(currList => currList._id === listId);
      list.cards.push(card)
    },
    updateList(state, { list }) {
      const listIdx = state.board.lists.findIndex(currList => currList._id === list._id);
      state.board.lists.splice(listIdx, 1, list);

    },
    addList(state, { list }) {
      state.board.lists.push(list)
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setBoard(state, { board }) {
      state.board = board
    },
    setList(state, { list }) {
      state.list = list
    },
    setLoggedinUser(state, { loggedinUser }) {
      state.loggedinUser = loggedinUser
    },
    addBoard(state, board) {
      state.boards.unshift(board)
    },
    updateBoard(state, board) {
      const boardIdx = state.boards.findIndex(currBoard => currBoard._id === board._id)
      state.boards.splice(boardIdx, 1, board)
    }
  },
  actions: {
    loadBoards({ commit }) {
      return boardService.query()
        .then(boards => {
          commit({ type: 'setBoards', boards })
          return boards
        })

    },
    loadBoard({ commit }, { boardId }) {
      return boardService.getById(boardId)
        .then(board => {
          commit({ type: 'setBoard', board })
          return board
        })
    },
    loadList({ commit, state }, { listId }) {
      return listService.getById(state.board, listId)
        .then(list => {
          commit({ type: 'setList', list })
          return list
        })
    },
    // loadCard({ commit, state }, { cardId }) {
    //   return cardService.getById(cardId, state.board)
    // .then(board => {
    //   commit({ type: 'setBoard', board })
    //   return board
    // })

    // },
    loadLoggedinUser({ commit }) {
      return userService.getLoggedinUser()
        .then(loggedinUser => {
          commit({ type: 'setLoggedinUser', loggedinUser })
          return loggedinUser
        })

    },
    saveBoard({ commit }, { board }) {
      const type = (board._id) ? 'updateBoard' : 'addBoard'
      return boardService.save(board)
        .then(savedBoard => {
          commit({ type: type, board: savedBoard })
          return savedBoard
        })

    },
    // add and edit list
    saveList({ commit, dispatch, state }, { list }) {
      const type = (list._id) ? 'updateList' : 'addList'
      return listService.addId(list)
        .then(savedList => {
          commit({ type: type, list: savedList })
          return dispatch({ type: 'saveBoard', board: state.board })
        })
    },
    // add card
    saveCard({ commit, dispatch, state }, { card, listId }) {
      const type = (card._id) ? 'updateCard' : 'addCard'
      return listService.addId(card)
        .then(savedCard => {
          commit({ type: type, card: savedCard, listId })
          return dispatch({ type: 'saveBoard', board: state.board })
        })
    }
  },
  modules: {
  }
})
