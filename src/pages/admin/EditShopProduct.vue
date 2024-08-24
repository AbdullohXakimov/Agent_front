<template>
  <div class="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6">Edit Shop Product</h2>

    <form @submit.prevent="updateAmount">
      <div class="mb-4">
        <label
          for="productName"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Product Name</label
        >
        <input
          v-model="product.name"
          id="productName"
          type="text"
          placeholder="Product Name"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
      </div>

      <div class="mb-4">
        <label
          for="productPrice"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Price</label
        >
        <input
          v-model.number="product.price"
          id="productPrice"
          type="number"
          step="0.01"
          placeholder="Price"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
      </div>

      <div class="mb-4">
        <label
          for="productAmount"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Amount in Shop</label
        >
        <input
          v-model.number="amount"
          id="productAmount"
          type="number"
          placeholder="Amount"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="flex justify-between">
        <button
          @click="cancelEdit"
          type="button"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Amount
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { API_BASE_URL } from "@/config";


const route = useRoute();
const router = useRouter();
const clientId = route.params.clientId;
const productId = route.params.productId;

const product = ref({
  name: "",
  price: 0,
});
const amount = ref(0);

async function fetchProduct() {
  try {
    const token = localStorage.getItem("access_token"); // Get the token from local storage

    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await response.json();
    product.value = data; // Assign the fetched product to the product ref

    // Fetch the current amount of the product in the client's shop
    const clientProductResponse = await fetch(
      `${API_BASE_URL}/client-products/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (clientProductResponse.ok) {
      const clientProductData = await clientProductResponse.json();
      amount.value = clientProductData.amount;
    } else {
      console.error("Failed to fetch client product details");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

async function updateAmount() {
  try {
    const token = localStorage.getItem("access_token"); // Get the token from local storage

    const response = await fetch(
      `${API_BASE_URL}/client-products/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product amount");
    }

    alert("Product amount updated successfully");
    router.push(`/admin/shop-products/${clientId}`);
  } catch (error) {
    console.error("Error updating product amount:", error);
  }
}

function cancelEdit() {
  router.push(`/admin/shop-products/${clientId}`);
}

// Fetch product details on component mount
onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
/* Custom styles for the Edit Shop Product page */
</style>
