<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Shop Product for {{ clientName }}
      </h2>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Product</label>
        <select
          v-model="selectedProductId"
          @change="handleProductSelect"
          class="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option disabled value="">Select a product</option>
          <option
            v-for="product in products"
            :key="product.id"
            :value="product.id"
          >
            {{ product.name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Product Name</label>
        <input
          v-model="productName"
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg"
          readonly
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Amount</label>
        <input
          v-model="amount"
          type="number"
          min="0"
          step="1"
          class="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        @click="createShopProduct"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Create Shop Product
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { API_BASE_URL } from "@/config";


const router = useRouter();
const route = useRoute();

const clientName = ref("");
const products = ref([]);
const selectedProductId = ref("");
const productName = ref("");
const amount = ref("");

const fetchClientAndProducts = async () => {
  const clientId = route.params.clientId;
  const token = localStorage.getItem("access_token");

  try {
    const [clientResponse, productsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/clients/admin/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${API_BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (!clientResponse.ok || !productsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const clientData = await clientResponse.json();
    const productsData = await productsResponse.json();

    clientName.value = clientData.name;
    products.value = productsData;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to load data.");
  }
};

const handleProductSelect = () => {
  const selectedProduct = products.value.find(
    (product) => product.id === selectedProductId.value
  );
  if (selectedProduct) {
    productName.value = selectedProduct.name;
  }
};

const createShopProduct = async () => {
  const clientId = route.params.clientId;
  const token = localStorage.getItem("access_token");

  const shopProductData = {
    clientId: +clientId,
    productId: +selectedProductId.value,
    amount: parseInt(amount.value, 10),
  };

  try {
    console.log(shopProductData);

    const response = await fetch(`${API_BASE_URL}/client-products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopProductData),
    });

    if (!response.ok) {
      throw new Error("Failed to create shop product");
    }

    alert("Shop product created successfully!");
    router.push(`/admin/shop-products/${clientId}`);
  } catch (error) {
    console.error("Error creating shop product:", error);
    alert("Failed to create shop product.");
  }
};

onMounted(fetchClientAndProducts);
</script>

<style scoped>
/* Custom styles for the form */
.bg-gray-100 {
  background-color: #f7fafc;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:bg-blue-700:hover {
  background-color: #1e40af;
}
</style>
