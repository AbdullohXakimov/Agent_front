<template>
  <div class="bg-white p-4 rounded-lg shadow-lg">
    <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
    <p class="text-gray-700 mb-2">${{ product.price.toFixed(2) }}</p>
    <router-link :to="`/products/${product.id}`" class="text-blue-500 hover:underline">View Details</router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* ProductCard specific styles */
</style>
