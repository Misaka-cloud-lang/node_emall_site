<template>
  <el-carousel trigger="click" :interval="0" :loop="false">
    <el-carousel-item>
      <img :src="currentAdImage" alt="广告" style="width: 100%; height: 300px; object-fit: cover;" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
  name: 'AdBanner',
  setup() {
    const store = useStore();
    const currentAdImage = computed(() => {
      // 假设广告数据存储在 public/ads.json
      // 并且通过广告 ID 获取对应广告图片
      // 实际项目中可能需要从后端获取广告数据
      // 这里简单示例
      //return `/ads/${store.state.currentAdId}.jpg` || '/ads/default.jpg';
      return '/ads/default.jpg';
    });

    // 默认广告
    if (!store.state.currentAdId) {
      store.commit('SET_CURRENT_AD_ID', 1); // 假设默认广告 ID 为 1
    }

    return {
      currentAdImage
    };
  }
});
</script>

<style scoped>
.el-carousel {
  margin: 20px 0;
}
</style>
