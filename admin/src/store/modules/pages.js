import axios from '@/plugins/axios'

const state = {
    pages: [],
    categories: [],
    page: {},
    category: {}
};

const getters = {
    allPages: state => state.pages,
    allCategories: state => state.categories,
    onePage: state => state.page
};

const actions = {
    fetchPages({ commit }, pages) {
        commit('setPages', pages);
    },
    fetchCats({ commit }, categories) {
        commit('setCats', categories);
    },
    getPage({ commit }, page) {
        commit('getPage', page);
    },
    addPage({ commit }, page) {
        commit('newPage', page);
    },
    async deletePage({
        commit
    }, id) {
        await axios.delete(`page/pages/${id}/`);
        commit('removePage', id);
    },
    async filterPages({
        commit
    }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        const response = await axios.get(`page/pages?_limit=${limit}/`);

        commit('setPages', response.data);
    },
    async updatePage({
        commit
    }, { id, param }) {
        const response = await axios.patch(`page/pages/${id}/`, param, {
            onUploadProgress: uploadEvent => {
                console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        });

        commit('updatePage', response.data);
    }
};

const mutations = {
    setPages: (state, pages) => (state.pages = pages),
    setCats: (state, categories) => (state.categories = categories),
    getPage: (state, page) => (state.page = page),
    newPage: (state, page) => state.pages.unshift(page),
    removePage: (state, id) => state.pages = state.pages.filter(page => page.id !== id),
    updatePage: (state, updPage) => {
        const index = state.pages.findIndex(page => page.id === updPage.id)
        if (index !== -1) {
            state.pages.splice(index, 1, updPage);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}