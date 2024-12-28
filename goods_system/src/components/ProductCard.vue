<template>
  <el-card class="product-card">
    <el-image :src="product.image" alt="Product" height="200px"></el-image>
    <div class="product-info">
      <p>{{ product.name }}</p>
      <p>{{ product.price }}</p>
      <el-button @click="addToCart">加购</el-button>
      <el-button @click="buyNow">购买</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product)
    },
    buyNow() {
      this.$emit('buy-now', this.product)
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 180px;
  margin: 10px;
}
.product-info {
  padding: 10px;
  text-align: center;
}
.el-button {
  margin-top: 5px;
}
</style>
