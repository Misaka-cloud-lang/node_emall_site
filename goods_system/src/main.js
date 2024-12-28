import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 初始化UUID
import { getOrCreateUUID } from './utils/uuid.js';
const uuid = getOrCreateUUID();
store.commit('SET_USER_ID', uuid);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app');

