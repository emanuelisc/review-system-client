import axios from '@/plugins/axios'

const state = {
    providers: [],
    categories: [],
    provider: {},
    category: {},
    services: [],
    service: {}
};

const getters = {
    allProviders: state => state.providers,
    allProviderCategories: state => state.categories,
    oneProvider: state => state.provider,
    oneProviderCategory: state => state.category,
    allServices: state => state.services,
    oneService: state => state.service,
};

const actions = {
    fetchProviders({ commit }, providers) {
        commit('setProviders', providers);
    },
    fetchProviderCats({ commit }, categories) {
        commit('setProviderCats', categories);
    },
    fetchServices({ commit }, services) {
        commit('setServices', services);
    },
    getProvider({ commit }, provider) {
        commit('getProvider', provider);
    },
    getServices({ commit }, service) {
        commit('getService', service);
    },
    getProviderCategory({ commit }, category) {
        commit('getProviderCategory', category);
    },
    addProvider({ commit }, provider) {
        commit('newProvider', provider);
    },
    addProviderCategory({ commit }, category) {
        commit('newProviderCategory', category);
    },
    addService({ commit }, service) {
        commit('newService', service);
    },
    async deleteProvider({
        commit
    }, id) {
        await axios.delete(`provider/providers/${id}/`);
        commit('removeProvider', id);
    },
    async deleteProviderCategory({
        commit
    }, id) {
        await axios.delete(`provider/categories/${id}/`);
        commit('removeCategory', id);
    },
    async deleteService({
        commit
    }, id) {
        await axios.delete(`provider/services/${id}/`);
        commit('removeService', id);
    },
    async filterProviders({
        commit
    }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        const response = await axios.get(`provider/providers?_limit=${limit}/`);

        commit('setProviders', response.data);
    },
    async updateProvider({
        commit
    }, { id, param }) {
        const response = await axios.patch(`provider/providers/${id}/`, param, {
            onUploadProgress: uploadEvent => {
                console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        });

        commit('updateProvider', response.data);
    }
};

const mutations = {
    setProviders: (state, providers) => (state.providers = providers),
    setProviderCats: (state, categories) => (state.categories = categories),
    setServices: (state, services) => (state.services = services),
    getProvider: (state, provider) => (state.provider = provider),
    getServices: (state, services) => (state.services = services),
    getProviderCategory: (state, category) => (state.category = category),
    newProvider: (state, provider) => state.providers.unshift(provider),
    newProviderCategory: (state, category) => state.categories.unshift(category),
    newService: (state, service) => state.services.unshift(service),
    removeProvider: (state, id) => state.providers = state.providers.filter(provider => provider.id !== id),
    removeProviderCategory: (state, id) => state.categories = state.categories.filter(category => category.id !== id),
    removeService: (state, id) => state.services = state.services.filter(service => service.id !== id),
    updateProvider: (state, updProvider) => {
        const index = state.providers.findIndex(provider => provider.id === updProvider.id)
        if (index !== -1) {
            state.providers.splice(index, 1, updProvider);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}