import axios from '@/plugins/axios'

const state = {
    tickets: [],
    ticket: {}
};

const getters = {
    allTickets: state => state.tickets,
    oneTicket: state => state.ticket
};

const actions = {
    fetchTickets({ commit }, tickets) {
        commit('setTickets', tickets);
    },
    getTicket({ commit }, ticket) {
        commit('getTicket', ticket);
    },
    async deleteTicket({
        commit
    }, id) {
        await axios.delete(`ticket/admin/${id}/`);
        commit('removeTicket', id);
    },
    async filterTickets({
        commit
    }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        const response = await axios.get(`ticket/admin?_limit=${limit}/`);

        commit('setTickets', response.data);
    },
    async updateTicket({
        commit
    }, updTicket) {

        commit('updateTicket', updTicket);
    }
};

const mutations = {
    setTickets: (state, tickets) => (state.tickets = tickets),
    getTicket: (state, ticket) => (state.ticket = ticket),
    removeTicket: (state, id) => state.tickets = state.tickets.filter(ticket => ticket.id !== id),
    updateTicket: (state, updTicket) => {
        const index = state.tickets.findIndex(ticket => ticket.id === updTicket.id)
        if (index !== -1) {
            state.tickets.splice(index, 1, updTicket);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}