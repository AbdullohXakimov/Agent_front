<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6">Create New Product</h2>
    <form @submit.prevent="handleCreateProduct">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Product Name</label>
        <input
          v-model="newProduct.name"
          type="text"
          id="name"
          class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-700">Price</label>
        <input
          v-model="newProduct.price"
          type="number"
          id="price"
          step="0.01"
          class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-gray-700">Amount</label>
        <input
          v-model="newProduct.amount"
          type="number"
          id="amount"
          class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
      >
        Create Product
      </button>
    </form>
    <router-link
      to="/admin/products"
      class="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-400 transition-colors mt-6 inline-block"
    >
      Back to Products
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { apiRequest } from "@/utils/api"; // Assuming you have the api.js file in src/utils
import { API_BASE_URL } from "@/config";


const newProduct = ref({
  name: "",
  price: null,
  amount: null,
});

async function handleCreateProduct() {
  try {
    const productData = {
      ...newProduct.value,
      price: parseFloat(newProduct.value.price),
      amount: parseInt(newProduct.value.amount, 10),
    };

    // Use the reusable apiRequest function
    await apiRequest({
      method: "POST",
      url: `${API_BASE_URL}/products`,
      body: productData,
    });

    alert("Product created successfully!");
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Failed to create product.");
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
