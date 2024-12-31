<template>
  <el-carousel trigger="click" :interval="0" :loop="false">
    <el-carousel-item>
      <img :src="currentAdUrl" alt="广告" style="width: 100%; height: 300px; object-fit: cover;" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
  name: 'AdBanner',
  setup() {
    const store = useStore();
    const currentAdUrl = computed(() => {
      const url = store.state.currentAdUrl;
      return url ? url.replace(/{{|}}|'/g, '') : '/ads/default.jpg';
    });

    // 默认广告
    if (!store.state.currentAdId) {
      store.commit('SET_CURRENT_AD_ID', 1); // 假设默认广告 ID 为 1
    }

    return {
      currentAdUrl
    };
  }
});
</script>

<style scoped>
.el-carousel {
  margin: 20px 0;
}
</style>


