<template>
  <div>
    <Header @category-selected="handleCategorySelected" />
    <AdBanner />
    <ProductList :selectedCategory="currentCategory" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Header from '../components/Header.vue';
import AdBanner from '../components/AdBanner.vue';
import ProductList from '../components/ProductList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Header,
    AdBanner,
    ProductList
  },
  setup() {
    const currentCategory = ref('all');

    const handleCategorySelected = (category) => {
      currentCategory.value = category;
    };

    return {
      currentCategory,
      handleCategorySelected
    };
  }
});
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
