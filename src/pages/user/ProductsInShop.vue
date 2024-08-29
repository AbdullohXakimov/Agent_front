<template>
  <MainLayout>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6">Products in Shop</h2>
      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="product in shopProducts" :key="product.id" class="p-4 border rounded">
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="text-lg font-semibold">{{ product.product.name }}</p>
              <p class="text-gray-600">Amount: {{ product.amount }}</p>
            </div>
            <div class="mt-4">
              <button
                @click="selectProduct(product)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Update Amount
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Update Amount Modal -->
      <div v-if="selectedProduct" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
          <h3 class="text-lg font-bold mb-4">Update {{ selectedProduct.name }}</h3>
          <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Enter New Amount</label>
          <input
            type="number"
            v-model.number="newAmount"
            id="amount"
            class="border rounded px-3 py-2 w-full"
            placeholder="Enter new amount"
          />
          <div class="flex justify-between mt-4">
            <button
              @click="updateAmount"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Update
            </button>
            <button
              @click="cancelUpdate"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MainLayout from "../../layouts/user/MainLayout.vue";
import { apiRequest2 } from "@/utils/api"; // Assume you have an apiRequest utility function
import { API_BASE_URL } from "@/config";

const shopProducts = ref([]);
const selectedProduct = ref(null);
const newAmount = ref(0);

// Fetch products in the shop
onMounted(async () => {
  try {
    const data = await apiRequest2({
      method: "GET",
      url: `${API_BASE_URL}/client-products/shopProducts`,
    });
    shopProducts.value = data;
    console.log(shopProducts.value[0]);
  } catch (error) {
    console.error("Error fetching shop products:", error);
  }
});

// Select product to update
const selectProduct = (product) => {
  selectedProduct.value = product;
  newAmount.value = product.amount;
};

// Update the product amount
const updateAmount = async () => {
  try {
    console.log("ok");
    
    console.log(selectedProduct.value.id);
    console.log(selectedProduct.value.productId);
    console.log(newAmount.value);
    

    
    const data = await apiRequest2({
      method: "PATCH",
      url: `${API_BASE_URL}/client-products/${selectedProduct.value.id}`,
      body: {
        clientId: selectedProduct.value.clientId,
        amount: newAmount.value,
        productId: selectedProduct.value.productId
      },
    });
    console.log(data);
    
    selectedProduct.value.amount = data.amount; // Update the local state
    selectedProduct.value = null; // Close the modal
    alert("Amount updated successfully!");
  } catch (error) {
    console.error("Error updating product amount:", error);
  }
};

// Cancel the update process
const cancelUpdate = () => {
  selectedProduct.value = null;
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
