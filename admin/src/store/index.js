import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import users from './modules/users';
import pages from './modules/pages';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        auth,
        users,
        pages
    }
})