<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Client's Shop Products</h2>
    <!-- List of client's shop products -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in shopProducts"
        :key="product.id"
        class="bg-white p-6 rounded-lg shadow"
      >
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="mt-2 text-gray-600">
          <strong>Price:</strong> ${{ product.price }}
        </p>
        <p class="mt-1 text-gray-600">
          <strong>Amount in Shop:</strong> {{ product.amountInShop }}
        </p>
        <div class="mt-4 flex justify-between">
          <button
            @click="editProduct(product.id)"
            class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            @click="deleteProduct(product.id)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
import { useRoute, useRouter } from "vue-router";
import { apiRequest } from "@/utils/api"; // Assuming the api.js file is in src/utils
import { API_BASE_URL } from "@/config";


const shopProducts = ref([]);
const route = useRoute();
const router = useRouter();
const clientId = route.params.clientId; // Access the clientId from the route params

async function fetchClientProducts(clientId) {
  try {
    const data = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/client-products/admins/${clientId}`,
    });

    // Fetch product details by ID
    for (const product of data) {
      const productData = await apiRequest({
        method: "GET",
        url: `${API_BASE_URL}/products/${product.productId}`,
      });

      product.name = productData.name;
      product.price = productData.price;
      product.amountInShop = product.amount; // Display the amount of this product in the shop
    }

    shopProducts.value = data; // Assign the fetched products to shopProducts
  } catch (error) {
    console.error("Error fetching client products:", error);
  }
}

async function deleteProduct(productId) {
  try {
    await apiRequest({
      method: "DELETE",
      url: `${API_BASE_URL}/client-products/${productId}`,
    });

    // Remove the deleted product from the shopProducts array
    shopProducts.value = shopProducts.value.filter(
      (product) => product.id !== productId
    );
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

function editProduct(productId) {
  router.push(`/admin/shop-products/${clientId}/edit/${productId}`);
}

// Fetch client products on component mount
onMounted(() => {
  fetchClientProducts(clientId);
});
</script>

<style scoped>
/* Custom styles for the shop products list */
</style>
