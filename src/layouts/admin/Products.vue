<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Products</h2>
    <router-link
      to="/admin/products/create"
      class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-8 inline-block"
    >
      Create Product
    </router-link>
    <!-- List of products -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Product card -->
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-6 rounded-lg shadow-lg"
      >
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{ product.name }}
        </h3>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>
        <div class="text-gray-600">
          <p class="font-semibold">
            Price: <span class="text-gray-900">${{ product.price }}</span>
          </p>
          <p class="font-semibold">
            Amount: <span class="text-gray-900">{{ product.amount }}</span>
          </p>
        </div>
        <div class="mt-6 flex justify-between">
          <router-link
            :to="`/admin/products/${product.id}/edit`"
            class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </router-link>
          <button
            @click="deleteProduct(product.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiRequest } from "@/utils/api"; // Assuming the api.js file is in src/utils
import { API_BASE_URL } from "@/config";


const products = ref([]);

onMounted(async () => {
  try {
    const data = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/products`,
    });
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

async function deleteProduct(id) {
  try {
    await apiRequest({
      method: "DELETE",
      url: `${API_BASE_URL}/products/${id}`,
    });

    products.value = products.value.filter((product) => product.id !== id);
    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product.");
  }
}
</script>

<style scoped>
/* Custom styles for the products list */
</style>
