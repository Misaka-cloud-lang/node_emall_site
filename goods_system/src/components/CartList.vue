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
    <div class="payment-status" v-if="paymentStatus" :class="paymentStatusClass">
      {{ paymentStatusMessage }}
    </div>
    <el-button type="primary" @click="handlePay" class="pay-button">支付</el-button>
  </div>
</template>

<script>
import { defineComponent, computed,ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CartList',
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const total = computed(() => store.getters.cartTotal);

    // 创建响应式变量用于支付状态
    const paymentStatus = ref(null); // 支付状态
    const paymentStatusMessage = ref(''); // 提示信息
    const paymentStatusClass = ref(''); // 状态框的样式

    const handlePay = () => {
      if (cart.value.length === 0) {
        paymentStatus.value = true;
        paymentStatusMessage.value = '购物车为空！';
        return;
      }
      const requests = [];

      // 遍历购物车，针对每个商品根据数量发起请求
      cart.value.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          // 每个商品请求的负载
          const payload = {
            userId: store.state.userId,
            tag: item.category,
            action:3
          };
          store.dispatch('sendPost_cart', payload)
              .then(() => {
            store.commit('CLEAR_CART');
            paymentStatus.value = true;
            paymentStatusMessage.value = '支付成功！';
            paymentStatusClass.value = 'success';
          })
              .catch(() => {
                paymentStatus.value = true;
                paymentStatusMessage.value = '支付失败，请稍后重试！';
                paymentStatusClass.value = 'error';
              });
          store.commit('CLEAR_CART');
        }
      });
    };
    return {
      cart,
      total,
      handlePay,
      paymentStatus,
      paymentStatusMessage,
      paymentStatusClass
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
.payment-status {
  display: inline-block;
  padding: 10px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.payment-status.warning {
  background-color: #f5a623;
  color: white;
}
.payment-status.success {
  background-color: #4caf50;
  color: white;
}
.payment-status.error {
  background-color: #f44336;
  color: white;
}
</style>
