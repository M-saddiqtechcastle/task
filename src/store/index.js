import { createStore } from 'vuex'
import todolist from '../module/todolist'
import adminAuth from '@/module/adminAuth/adminAuth.js';
const store =  createStore({
  modules:{
    todolist,
    adminAuth
  }
})

export default store;