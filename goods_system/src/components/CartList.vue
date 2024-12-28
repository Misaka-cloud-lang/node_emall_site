<template>
  <div class="cart-container">
    <el-table :data="cart" style="width: 100%">
      <el-table-column prop="name" label="商品名" width="180" />
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="quantity" label="数量" width="100" />
      <el-table-column label="小计" width="120">
        <template #default="scope">
          ¥{{ scope.row.price * scope.row.quantity }}
        </template>
      </el-table-column>
    </el-table>
    <div class="total">
      总计：¥{{ total }}
    </div>
    <el-button type="primary" @click="handlePay" class="pay-button">支付</el-button>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CartList',
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const total = computed(() => store.getters.cartTotal);

    const handlePay = () => {
      if (cart.value.length === 0) {
        this.$message.warning('购物车为空！');
        return;
      }
      store.dispatch('pay');
      this.$message.success('支付成功！');
    };

    return {
      cart,
      total,
      handlePay
    };
  }
});
</script>

<style scoped>
.cart-container {
  padding: 20px;
}
.total {
  text-align: right;
  margin: 20px 0;
  font-size: 18px;
  font-weight: bold;
}
.pay-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
