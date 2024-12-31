import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        userId: '',
        currentAdId: null,
        currentAdUrl: null,
        cart: []
    },
    mutations: {
        SET_USER_ID(state, id) {
            state.userId = id;
        },
        SET_CURRENT_AD_ID(state, id) {
            state.currentAdId = id;
        },
        SET_CURRENT_AD_URL(state, url) {
            state.currentAdUrl = url; // 设置当前广告 URL
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
        async sendGetRequest({ commit, state }, payload){
            try {
                const params = new URLSearchParams({
                    userId: payload.userId,
                    tag: payload.category,
                    action: payload.behavior
                });

                // 使用 GET 请求获取广告数据
                const response = await axios.get(`http://127.0.0.1:4523/m1/5702531-5383660-default/ad/shop?${params.toString()}`);

                // 假设返回的 JSON 格式为：
                // {
                //   "adId": "1",
                //   "adUrl": "https://ooo.0x0.ooo/2024/12/31/OEJ29a.jpg"
                // }
                const adData = response.data;
                console.log('GET 请求成功，响应数据:', response.data);
                commit('SET_CURRENT_AD_ID', adData.adId);
                console.log('当前 state 中的 currentAdId:', state.currentAdId);
                commit('SET_CURRENT_AD_URL', adData.adUrl);
                console.log('当前 state 中的 currentAdUrl:', state.currentAdUrl); // 设置广告 URL

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
