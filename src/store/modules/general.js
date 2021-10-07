const state = {
    config: {},
};

const getters = {
    getConfig: (state) => state.config,
};

const actions = {
    UPDATE_CONFIG({ commit }, payload) {
        commit("update_config", payload);
    },
};
const mutations = {
    update_config(state, payload) {
        state.config = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
