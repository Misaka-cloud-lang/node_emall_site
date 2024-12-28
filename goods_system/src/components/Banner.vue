<template>
  <el-carousel autoplay>
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <el-image :src="item.src" alt="Banner" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        { src: 'banner1.jpg' },
        { src: 'banner2.jpg' },
        { src: 'banner3.jpg' }
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel {
  margin-top: 20px;
}
</style>
