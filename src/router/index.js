import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Board from '../views/Board.vue'
import BoardDeatels from '../views/BoardDeatels.vue'
import Boards from '../views/Boards.vue'
import BoardsList from '../components/BoardsList.vue'
import BoardTemplate from '../components/BoardTemplate.vue'
import BoardHome from '../components/BoardHome.vue'
// import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
    children: [
      {
        path: '',
        component: Boards,
        children:[
          {
            path: '',
            component: BoardsList,
          },
          {
            path: 'template',
            component: BoardTemplate,
          },
          {
            path: 'home',
            component: BoardHome,
          }
        ]
      },
      {
        path: ':boardId',
        component: BoardDeatels
      }
    ]
  },
  // {
  //   path: '/boards',
  //   name: 'Boards',
  //   component: Boards
  // },
  // {
  //   path: '/board/:boardId',
  //   name: 'Board',
  //   component: Board
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
