<template>
  <MainLayout>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6">Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="product in products" :key="product.id" class="p-4 border rounded relative">
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="text-lg font-semibold">{{ product.name }}</p>
              <p class="text-gray-600">${{ product.price }}</p>
            </div>
            <div class="mt-4">
              <template v-if="isProductOrdered(product)">
                <button @click="deleteOrder(product)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full">
                  Delete Order
                </button>
              </template>
              <template v-else>
                <button @click="selectProduct(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                  Order
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Form Modal -->
      <div v-if="selectedProduct" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
          <h3 class="text-lg font-bold mb-4">Order {{ selectedProduct.name }}</h3>
          <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Enter Amount</label>
          <input
            type="number"
            v-model.number="amount"
            @input="calculateTotal"
            id="amount"
            class="border rounded px-3 py-2 w-full"
            placeholder="Enter amount"
          />
          <p class="mt-2 text-gray-800">Total: ${{ totalAmount }}</p>
          <div class="flex justify-between mt-4">
            <button @click="orderProduct" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Confirm Order
            </button>
            <button @click="cancelOrder" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Finish Order Button -->
      <div class="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg z-50">
        <button @click="finishOrder" class="text-lg font-bold">Finish Order</button>
      </div>

      <!-- Total Order Summary -->
      <div class="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
        <ul>
          <li v-for="order in orders" :key="order.product.id" class="flex justify-between">
            <span>{{ order.product.name }} x {{ order.amount }}</span>
            <span>${{ order.total }}</span>
          </li>
        </ul>
        <div class="mt-4 text-right">
          <p class="text-lg font-bold">Total: ${{ totalOrderAmount }}</p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MainLayout from "../../layouts/user/MainLayout.vue";
import { apiRequest } from "@/utils/api"; // Assume you have an apiRequest utility function
import { API_BASE_URL } from "@/config";
import { apiRequest2 } from "../../utils/api";

const products = ref([]);
const selectedProduct = ref(null);
const amount = ref(1);
const totalAmount = ref(0);
const orders = ref([]);

// Select product to order
const selectProduct = (product) => {
  selectedProduct.value = product;
  amount.value = 1;
  calculateTotal();
};

// Calculate total price for the selected product
const calculateTotal = () => {
  totalAmount.value = selectedProduct.value ? selectedProduct.value.price * amount.value : 0;
};

// Add the order to the orders array
const orderProduct = () => {
  orders.value.push({
    product: selectedProduct.value,
    amount: amount.value,
    total: totalAmount.value,
  });
  selectedProduct.value = null; // Close the order form
};

// Cancel the order process
const cancelOrder = () => {
  selectedProduct.value = null;
};

// Check if a product is already ordered
const isProductOrdered = (product) => {
  return orders.value.some(order => order.product.id === product.id);
};

// Delete an order from the orders array
const deleteOrder = (product) => {
  orders.value = orders.value.filter(order => order.product.id !== product.id);
};

// Calculate the total amount for all orders
const totalOrderAmount = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.total, 0);
});

// Handle finishing the order
const finishOrder = async () => {
  try {
    // Convert reactive orders to plain objects
    const plainOrders = orders.value.map(order => ({
      productId: order.product.id,
      amount: order.amount,
      total: order.total,
    }));

    const totalPrice = totalOrderAmount.value; // Extract plain value from computed property

    const payload = {
      orders: plainOrders,
      totalPrice, // Pass the total price as a plain number
      finished: false
    };
    console.log("Payload:", JSON.stringify(payload));

    const response = await apiRequest2({
      method: "POST",
      url: `${API_BASE_URL}/orders`,
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response);

    // Clear orders after finishing
    orders.value = [];
    alert("Order completed successfully!");
  } catch (error) {
    console.error("Error finishing order:", error.message || error);
  }
};


onMounted(async () => {
  try {
    const data = await apiRequest2({
      method: "GET",
      url: `${API_BASE_URL}/products`,
    });
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<style lang="scss" scoped>
/* Add responsiveness and styling */
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

.fixed.bottom-4.right-4 {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
