import axios from '@/plugins/axios'

const state = {
    reviews: [],
    categories: [],
    tags: [],
    review: {},
    category: {},
    tag: {}
};

const getters = {
    allReviews: state => state.reviews,
    allReviewCategories: state => state.categories,
    allReviewTags: state => state.tags,
    oneReview: state => state.review,
    oneReviewCategory: state => state.category,
    oneReviewTag: state => state.tag
};

const actions = {
    fetchReviews({ commit }, reviews) {
        commit('setReviews', reviews);
    },
    fetchReviewCats({ commit }, categories) {
        commit('setReviewCats', categories);
    },
    fetchReviewTags({ commit }, tags) {
        commit('setReviewTags', tags);
    },
    getReview({ commit }, review) {
        commit('getReview', review);
    },
    getReviewCategory({ commit }, category) {
        commit('getReviewCategory', category);
    },
    getReviewTag({ commit }, tag) {
        commit('getReviewTag', tag);
    },
    addReview({ commit }, review) {
        commit('newReview', review);
    },
    addReviewCategory({ commit }, category) {
        commit('newReviewCategory', category);
    },
    addReviewTag({ commit }, tag) {
        commit('newReviewTag', tag);
    },
    async deleteReview({
        commit
    }, id) {
        await axios.delete(`review/reviews/${id}/`);
        commit('removeReview', id);
    },
    async deleteReviewCategory({
        commit
    }, id) {
        await axios.delete(`review/categories/${id}/`);
        commit('removeReviewCategory', id);
    },
    async deleteReviewTag({
        commit
    }, id) {
        await axios.delete(`review/tags/${id}/`);
        commit('removeReviewTag', id);
    },
    async filterReviews({
        commit
    }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        const response = await axios.get(`review/reviews?_limit=${limit}/`);

        commit('setReviews', response.data);
    },
    async updateReview({
        commit
    }, { id, param }) {
        const response = await axios.patch(`review/reviews/${id}/`, param, {
            onUploadProgress: uploadEvent => {
                console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        });

        commit('updateReview', response.data);
    }
};

const mutations = {
    setReviews: (state, reviews) => (state.reviews = reviews),
    setReviewCats: (state, categories) => (state.categories = categories),
    setReviewTags: (state, tags) => (state.tags = tags),
    getReview: (state, review) => (state.review = review),
    getReviewCategory: (state, category) => (state.category = category),
    getReviewTag: (state, tag) => (state.tag = tag),
    newReview: (state, review) => state.reviews.unshift(review),
    newReviewCategory: (state, category) => state.categories.unshift(category),
    newReviewTag: (state, tag) => state.tags.unshift(tag),
    removeReview: (state, id) => state.reviews = state.reviews.filter(review => review.id !== id),
    removeReviewCategory: (state, id) => state.categories = state.categories.filter(category => category.id !== id),
    removeReviewTag: (state, id) => state.tags = state.tags.filter(tag => tag.id !== id),
    updateReview: (state, updReview) => {
        const index = state.reviews.findIndex(review => review.id === updReview.id)
        if (index !== -1) {
            state.reviews.splice(index, 1, updReview);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}