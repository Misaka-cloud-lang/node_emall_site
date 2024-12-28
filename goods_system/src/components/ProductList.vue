<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="product in filteredProducts" :key="product.id">
      <ProductItem :product="product" />
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, onMounted, ref} from 'vue';
import { computed } from "vue";
import axios from 'axios';
import ProductItem from './ProductItem.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductItem
  },
  props: {
    selectedCategory: String
  },
  setup(props) {
    const products = ref([]);
    const store = useStore();

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products.json');
        products.value = response.data.products;
      } catch (error) {
        console.error('获取商品数据失败:', error);
      }
    };

    onMounted(() => {
      fetchProducts();
    });

    const filteredProducts = computed(() => {
      if (props.selectedCategory === 'all' || !props.selectedCategory) {
        return products.value;
      }
      return products.value.filter(product => product.category === props.selectedCategory);
    });

    return {
      filteredProducts
    };
  }
});
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
</style>
