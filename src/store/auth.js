import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {},
        token: '',
        isLoggedIn: false
    },

    mutations: {
        storeCredential(state, data) {
            state.user = data.user
            state.token = data.token
            state.isLoggedIn = true
        },
        
        removeCredential(state) {
            state.user = {}
            state.token = ''
            state.isLoggedIn = false
        }
    }
})