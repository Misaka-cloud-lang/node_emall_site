<template>
  <el-card :body-style="{ padding: '10px' }">
    <img :src="product.image" class="product-image" @click="handleImageClick" />
    <div class="product-info">
      <span class="price">¥{{ product.price }}</span>
      <div class="buttons">
        <el-button type="primary" size="small" @click="addToCart">加购</el-button>
        <el-button type="success" size="small" @click="buyNow">购买</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: Object
  },
  setup(props) {
    const store = useStore();

    const handleImageClick = () => {
      const payload = {
        userId: store.state.userId,
        category: props.product.category,
        behavior: 1
      };
      store.dispatch('sendPostRequest', payload);
    };

    const addToCart = () => {
      store.commit('ADD_TO_CART', props.product);
      const payload = {
        userId: store.state.userId,
        category: props.product.category,
        behavior: 2
      };
      store.dispatch('sendPostRequest', payload);
    };

    const buyNow = () => {
      const payload = {
        userId: store.state.userId,
        category: props.product.category,
        behavior: 3
      };
      store.dispatch('sendPostRequest', payload);
      // 这里可以添加购买逻辑，例如跳转到支付页面或弹出支付窗口
      this.$message.success('购买成功！');
    };

    return {
      handleImageClick,
      addToCart,
      buyNow
    };
  }
});
</script>

<style scoped>
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}
.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.price {
  font-size: 18px;
  color: #f56c6c;
}
.buttons > .el-button {
  margin-left: 5px;
}
</style>
