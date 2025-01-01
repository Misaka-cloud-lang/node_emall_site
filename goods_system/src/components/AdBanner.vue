<template>
  <el-carousel trigger="click" :interval="0" :loop="false">
    <el-carousel-item>
      <img :src="currentAdUrl_1" alt="广告" style="width: 100%; height: 300px; object-fit: cover;" />
    </el-carousel-item>
    <el-carousel-item>
      <img :src="currentAdUrl_2" alt="广告" style="width: 100%; height: 300px; object-fit: cover;" />
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
    // const currentAdUrl = computed(() => {
    //   const url = store.state.currentAdUrl;
    //   return url ? url.replace(/{{|}}|'/g, '') : '/ads/default.jpg';
    // });
    const currentAdUrl_1 = computed(() => {
      const url = store.state.currentAdUrl_1;
      return url ? url.replace(/{{|}}|'/g, '') : '/ads/default.jpg';
    });
    const currentAdUrl_2 = computed(() => {
      const url = store.state.currentAdUrl_2;
      return url ? url.replace(/{{|}}|'/g, '') : '/ads/default.jpg';
    });
    // 默认广告
    if (!store.state.currentAdId) {
      store.commit('SET_CURRENT_AD_ID', 1); // 假设默认广告 ID 为 1
    }

    return {
      currentAdUrl_1,
      currentAdUrl_2
    };
  }
});
</script>

<style scoped>
.el-carousel {
  margin: 20px 0;
}
</style>


