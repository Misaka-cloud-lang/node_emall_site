import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        userId: '',
        currentAdId: null,
        cart: []
    },
    mutations: {
        SET_USER_ID(state, id) {
            state.userId = id;
        },
        SET_CURRENT_AD_ID(state, id) {
            state.currentAdId = id;
        },
        ADD_TO_CART(state, product) {
            const existing = state.cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        CLEAR_CART(state) {
            state.cart = [];
        }
    },
    actions: {
        async sendPostRequest({ commit, state }, payload) {
            try {
                const response = await axios.post('/api/behavior', payload);
                const newAdId = response.data.adId;
                commit('SET_CURRENT_AD_ID', newAdId);
            } catch (error) {
                console.error('POST 请求失败:', error);
            }
        },
        async pay({ commit, state }) {
            const promises = state.cart.map(item => {
                const payload = {
                    userId: state.userId,
                    category: item.category,
                    behavior: 3
                };
                return axios.post('/api/behavior', payload);
            });

            try {
                const responses = await Promise.all(promises);
                // 假设每个响应返回的广告 ID 都不同，可以选择最后一个广告 ID
                const lastAdId = responses[responses.length - 1].data.adId;
                commit('SET_CURRENT_AD_ID', lastAdId);
                commit('CLEAR_CART');
            } catch (error) {
                console.error('支付请求失败:', error);
            }
        }
    },
    getters: {
        cartTotal: state => {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    }
});
