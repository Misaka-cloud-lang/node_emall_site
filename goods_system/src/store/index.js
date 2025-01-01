import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        userId: '',
        currentAdId: null,
        currentAdUrl: null,
        currentAdUrl_1:null,
        currentAdUrl_2:null,
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
        SET_CURRENT_AD_URL_1(state, url) {
            state.currentAdUrl_1 = url; // 设置当前广告 URL
        },
        SET_CURRENT_AD_URL_2(state, url) {
            state.currentAdUrl_2 = url; // 设置当前广告 URL
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
        //发送数据,并更新广告
        async sendPost({ commit, state }, payload){
            try {
                const params_1 = new URLSearchParams({
                    userId: payload.userId,
                });
                const params_2 = new URLSearchParams({
                    userId: payload.userId,
                    tag: payload.category,
                    action: payload.behavior

                });

                //发送用户行为
                const response_2 = await axios.post(`http://112.124.63.147:8080/receive/emall?${params_2.toString()}`);
                console.log('Response 2:', response_2); // Log the response of the first request
                //获取广告
                const response_1 = await axios.post(`http://112.124.63.147:8080/api/advertisement/place/store?${params_1.toString()}`);
                console.log('Response 1:', response_1); // Log the response of the first request

                const adData = response_1.data;
                const firstAdData = adData[0];
                firstAdData.picture = `http://112.124.63.147:8080/${firstAdData.picture}`;
                commit('SET_CURRENT_AD_URL_1', firstAdData.picture);

                // 处理第二个元素的图片路径，添加前缀并提交到SET_CURRENT_AD_URL_2
                const secondAdData = adData[1];
                secondAdData.picture = `http://112.124.63.147:8080/${secondAdData.picture}`;


                commit('SET_CURRENT_AD_URL_2', secondAdData.picture);
                console.log('currentAdUrl_1:', state.currentAdUrl_1);
                console.log('currentAdUrl_2:', state.currentAdUrl_2);
                //commit('SET_CURRENT_AD_URL', adData.adUrl);
                //commit('SET_CURRENT_AD_ID', newAdId);
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
                commit('SET_CURRENT_AD_ID', adData.adId);
                commit('SET_CURRENT_AD_URL', adData.adUrl);

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
