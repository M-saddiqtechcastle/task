import axios from 'axios'
const state = () => {
    return {
        access_token: localStorage.getItem('user_token'),
        loggedIn: '',
        item_list: []
    }
}

const actions = {

    async logout() {
        await axios.post('http://3.232.244.22/api/logout', {
            token: localStorage.getItem('user_token')
        })
            .then(response => {
                if (response.status == 200) {
                    localStorage.removeItem('user_token')
                }
            })
    }
}


const mutations = {
    set_Basic_info(state, payload) {
        state.item_list = payload;
    },
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}