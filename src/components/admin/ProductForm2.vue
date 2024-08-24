<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6">Edit Product</h2>
    <form @submit.prevent="submitEdit">
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
        Edit Product
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { apiRequest } from "@/utils/api"; // Assuming the api.js file is in src/utils
import { API_BASE_URL } from "@/config";


const newProduct = ref({
  name: "",
  price: 0,
  amount: 0,
});

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

onMounted(async () => {
  try {
    const product = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/products/${productId}`,
    });
    newProduct.value = product; // Populate the form with the existing product details
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
});

async function submitEdit() {
  const updatedProduct = {
    name: newProduct.value.name,
    price: parseFloat(newProduct.value.price), // Ensure it's a number
    amount: parseFloat(newProduct.value.amount), // Ensure it's a number
  };

  try {
    await apiRequest({
      method: "PATCH",
      url: `${API_BASE_URL}/products/${productId}`,
      body: updatedProduct,
    });

    alert("Product updated successfully!");
    router.push("/admin/products"); // Redirect back to the products page after successful edit
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product.");
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
