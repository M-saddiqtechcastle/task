import axios from "axios"

const state = () => {
    return {
        list: ''
    }
}

const actions = {
    getTodoList({ state }, payload) {
        return new Promise((resolve) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("user_token");
            axios.post('http://3.232.244.22/api/item', payload)
                .then(response => {
                    state.list = response.data
                    resolve(response.data)
                })
        })
    },

    showTodoList({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("user_token");
            axios.get('http://3.232.244.22/api/items', payload)
                .then(response => {
                    state.list = response.data.items.data
                    resolve(response)
                })
            error => {
                reject(error)
            }
        })
    },

    dltTodoList({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("user_token");
            axios.delete('http://3.232.244.22/api/item/' + payload)
                .then(response => {
                    state.list = response.data
                    resolve(response)
                })
            error => {
                reject(error)
            }
        })
    },
}


export default {
    namespaced: true,
    state,
    actions
}