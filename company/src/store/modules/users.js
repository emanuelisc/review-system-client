import axios from '@/plugins/axios'
import { router } from "@/main.js"

const state = {
    users: [],
    user: {}
};

const getters = {
    allUsers: state => state.users,
    oneUser: state => state.user
};

const actions = {
    async fetchUsers({
        commit
    }, users) {
        commit('setUsers', users);
    },
    async getUser({
        commit
    }, id) {
        const response = await axios.get(`user/admin/users/${id}/`);

        commit('getUser', response.data);
    },
    async getMe({
        commit
    }) {
        const response = await axios.get(`user/me/`);

        commit('getMe', response.data);
    },
    async addUser({
        commit
    }, param) {
        const response = await axios.post('user/admin/users/', param);

        commit('newUser', response.data);
    },
    async deleteUser({
        commit
    }, id) {
        await axios.delete(`user/admin/users/${id}/`);
        commit('removeUser', id);
    },
    async filterUsers({
        commit
    }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        const response = await axios.get(`user/admin/users?_limit=${limit}/`);

        commit('setUsers', response.data);
    },
    async updateUser({
        commit
    }, param) {
        const response = await axios.patch(`user/admin/users/${param.id}/`, param.updUser, {
            onUploadProgress: uploadEvent => {
                console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        });

        commit('updateUser', response.data);
    }
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    getUser: (state, user) => (state.user = user),
    getMe: (state, user) => (state.user = user),
    newUser: (state, user) => state.users.unshift(user),
    removeUser: (state, id) => state.users = state.users.filter(user => user.id !== id),
    updateUser: (state, updUser) => {
        const index = state.users.findIndex(user => user.id === updUser.id)
        if (index !== -1) {
            state.users.splice(index, 1, updUser);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}