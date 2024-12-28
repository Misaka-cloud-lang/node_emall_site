
<template>
  <div class="common-layout">
    <el-container >
      <el-aside width="200px">
        <el-image :src="logoSrc" alt="Logo" width="100"></el-image>
      </el-aside>
      <el-main>
        <el-menu :default-active="activeMenu" mode="horizontal" background-color="#ffffff">
          <el-menu-item>电子产品</el-menu-item>
          <el-menu-item>家居用品</el-menu-item>
          <el-menu-item>服装</el-menu-item>
          <el-menu-item>食品</el-menu-item>
          <el-menu-item>图书</el-menu-item>
          <el-menu-item>美妆</el-menu-item>
          <el-menu-item>运动</el-menu-item>
          <el-menu-item>汽车</el-menu-item>
          <el-menu-item>旅行</el-menu-item>
        </el-menu>
      </el-main>
      <el-aside width="200px">
        <el-button>购物车</el-button>
        <el-button>我的订单</el-button>
      </el-aside>
    </el-container>
  </div>

</template>

<script>

import logoSrc from '@/assets/images/logo.jpg'

export default {
  data() {
    return {
      activeMenu: '1',
      logoSrc
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #00fd68;
  padding: 10px;
}
.common-layout{
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
}
</style>
