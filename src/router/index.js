import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Regiseter.vue'
import ToDoList from '../components/ToDoList.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: login
  },
  
  {
    path: '/ToDoList',
    name: 'todolist',
    component: ToDoList
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
