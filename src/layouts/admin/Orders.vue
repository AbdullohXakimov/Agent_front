<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-6">Manage Orders</h2>

    <!-- Filter buttons -->
    <div class="flex mb-4 space-x-4">
      <button
        @click="setFilter('all')"
        :class="{
          'bg-blue-500 text-white': activeFilter === 'all',
          'bg-gray-200': activeFilter !== 'all'
        }"
        class="px-4 py-2 rounded"
      >
        All
      </button>
      <button
        @click="setFilter('finished')"
        :class="{
          'bg-blue-500 text-white': activeFilter === 'finished',
          'bg-gray-200': activeFilter !== 'finished'
        }"
        class="px-4 py-2 rounded"
      >
        Finished
      </button>
      <button
        @click="setFilter('unfinished')"
        :class="{
          'bg-blue-500 text-white': activeFilter === 'unfinished',
          'bg-gray-200': activeFilter !== 'unfinished'
        }"
        class="px-4 py-2 rounded"
      >
        Unfinished
      </button>
    </div>

    <!-- Date filter -->
    <div class="flex mb-4 space-x-4">
      <input
        type="date"
        v-model="filterDate"
        class="px-4 py-2 border rounded"
        placeholder="Filter by date"
      />
      <button
        @click="applyFilters"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>

    <!-- Orders grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="order in filteredOrders" :key="order.id" class="p-4 bg-gray-50 rounded-lg shadow flex flex-col justify-between">
        <!-- Client details -->
        <div>
          <h3 class="text-lg font-semibold mb-2">Client: {{ order.client.name }}</h3>
          <p class="text-gray-600 mb-2">Email: {{ order.client.email }}</p>
          <p class="text-gray-600 mb-2">Phone: {{ order.client.phone }}</p>
          <p class="text-gray-600 mb-4">Address: {{ order.client.address }}</p>
          
          <!-- Order Items -->
          <ul class="mb-4">
            <li v-for="item in order.orderItem" :key="item.id" class="text-gray-700">
              {{ item.product.name }} - {{ item.amount }} pcs - ${{ item.total }}
            </li>
          </ul>
        </div>

        <!-- Total price and finish button -->
        <div class="flex items-center justify-between mt-auto">
          <p class="text-gray-600">Total Price: ${{ order.totalPrice }}</p>
          <button
            v-if="!order.finished"
            @click="markAsFinished(order.id)"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Mark as Finished
          </button>
          <p
            v-else
            class="font-bold text-green-600"
          >
            Finished
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiRequest } from "@/utils/api.js";
import { API_BASE_URL } from "../../config";

const orders = ref([]);
const activeFilter = ref("all");
const filteredOrders = ref([]);
const filterDate = ref("");

const fetchOrders = async () => {
  try {
    const data = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/orders`,
      tokenRequired: true,
    });
    orders.value = data;
    applyFilters(); // Apply filters after fetching orders
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const setFilter = (filter) => {
  activeFilter.value = filter;
  applyFilters();
};

const applyFilters = () => {
  filteredOrders.value = orders.value;

  if (activeFilter.value !== 'all') {
    filteredOrders.value = filteredOrders.value.filter(order =>
      activeFilter.value === 'finished' ? order.finished : !order.finished
    );
  }

  if (filterDate.value) {
    filteredOrders.value = filteredOrders.value.filter(order =>
      new Date(order.createdAt).toDateString() === new Date(filterDate.value).toDateString()
    );
  }
};

const markAsFinished = async (orderId) => {
  try {
    await apiRequest({
      method: "PATCH",
      url: `${API_BASE_URL}/orders/${orderId}/finish`,
      body: { finished: true },
      tokenRequired: true,
    });
    fetchOrders(); // Refresh the order list after updating
  } catch (error) {
    console.error("Error finishing order:", error);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
/* Orders page-specific styles */
</style>
