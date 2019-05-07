import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import users from './modules/users';
import pages from './modules/pages';
import reviews from './modules/reviews';
import providers from './modules/providers';
import tickets from './modules/tickets';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        auth,
        users,
        pages,
        tickets,
        providers,
        reviews
    }
})