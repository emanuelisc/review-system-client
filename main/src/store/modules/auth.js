import axios from '@/plugins/axios'

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    me: {}
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    me: state => state.me,
};

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: 'user/token/', data: user, method: 'POST' })
                .then(resp => {
                    const token = "Token " + resp.data.token
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', resp.data)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: 'user/create/', data: user, method: 'POST' })
                .then(resp => {
                    const token = "Token " + resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, resp) {
        state.status = 'success'
        state.token = resp.token
        state.me = resp.me
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''
        state.token = ''
        state.me = {}
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}