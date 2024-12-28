<template>
  <el-row gutter="20" class="product-list">
    <el-col :span="5" v-for="(product, index) in products" :key="index">
      <product-card :product="product" @add-to-cart="handleAddToCart" @buy-now="handleBuyNow" />
    </el-col>
  </el-row>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        { name: '手机', price: '￥1999', image: 'product1.jpg' },
        { name: '耳机', price: '￥399', image: 'product2.jpg' },
        { name: '电视', price: '￥4999', image: 'product3.jpg' },
        { name: '洗衣机', price: '￥2000', image: 'product4.jpg' },
        { name: '冰箱', price: '￥2500', image: 'product5.jpg' },
        { name: '沙发', price: '￥1500', image: 'product6.jpg' },
        { name: '衣柜', price: '￥1000', image: 'product7.jpg' },
        { name: '床', price: '￥1200', image: 'product8.jpg' },
        { name: '书桌', price: '￥800', image: 'product9.jpg' },
        { name: '椅子', price: '￥500', image: 'product10.jpg' },
        { name: 'T恤', price: '￥99', image: 'product11.jpg' },
        { name: '牛仔裤', price: '￥199', image: 'product12.jpg' },
        { name: '运动鞋', price: '￥499', image: 'product13.jpg' },
        { name: '香水', price: '￥299', image: 'product14.jpg' },
        { name: '口红', price: '￥199', image: 'product15.jpg' }
      ]
    }
  },
  methods: {
    handleAddToCart(product) {
      console.log('Added to cart:', product)
    },
    handleBuyNow(product) {
      console.log('Buying now:', product)
    }
  }
}
</script>

<style scoped>
.product-list {
  margin-top: 20px;
}
</style>
