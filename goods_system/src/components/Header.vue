<template>
  <el-header>
    <div class="logo">
      <img src="@/assets/logo.jpg" alt="Logo" />
    </div>
    <el-menu mode="horizontal" @select="handleSelect" :default-active="activeCategory">
      <el-menu-item index="all">全部</el-menu-item>
      <el-menu-item v-for="category in categories" :key="category" :index="category">{{ category }}</el-menu-item>
    </el-menu>
    <div class="cart-button">
      <el-button type="primary" @click="goToCart">
        <el-icon><ShoppingCart /></el-icon>
        购物车
      </el-button>
    </div>
  </el-header>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCart } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Header',
  components: {
    ShoppingCart
  },
  data() {
    return {
      categories: ["电子产品", "家居用品", "服装", "食品", "图书", "美妆", "运动", "汽车","旅行"],
      activeCategory: 'all'
    };
  },
  methods: {
    handleSelect(key) {
      this.$emit('category-selected', key);
      this.activeCategory = key;
    },
    goToCart() {
      this.$router.push('/cart');
    }
  }
});
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo img {
  height: 50px;
}
.cart-button {
  margin-left: auto;
}
</style>
