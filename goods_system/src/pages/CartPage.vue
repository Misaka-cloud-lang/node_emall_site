<template>
  <div>
    <Header />
    <CartList />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import CartList from '../components/CartList.vue';

export default defineComponent({
  name: 'CartPage',
  components: {
    Header,
    CartList
  }
});
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
