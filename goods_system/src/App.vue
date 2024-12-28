<template>
  <div>
    <Navbar />
    <Banner />
    <ProductList />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Banner from './components/Banner.vue'
import ProductList from './components/ProductList.vue'

export default {
  components: {
    Navbar,
    Banner,
    ProductList
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
