<template>
  <MainLayout>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6">My Orders</h2>
      <div v-if="orders.length" class="grid gap-6">
        <div v-for="order in orders" :key="order.id" class="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</span>
            <span :class="order.finished ? 'text-green-500' : 'text-red-500'">
              {{ order.finished ? 'Finished' : 'Not Finished' }}
            </span>
          </div>
          <div class="grid gap-4">
            <div v-for="item in order.orderItem" :key="item.id" class="flex justify-between">
              <span class="font-medium">{{ item.product.name }}</span>
              <span>{{ item.amount }} x {{ formatCurrency(item.product.price) }}</span>
              <span class="font-semibold">{{ formatCurrency(item.total) }}</span>
            </div>
          </div>
          <div class="mt-4 text-right font-bold text-lg">
            Total: {{ formatCurrency(order.totalPrice) }}
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        No orders found.
      </div>
    </div>
  </MainLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../../layouts/user/MainLayout.vue';
import { apiRequest2 } from '../../utils/api';
import {API_BASE_URL} from "../../config"


const orders = ref([]);

onMounted(async () => {
  try {
    const data = await apiRequest2({
      method: 'GET',
      url: `${API_BASE_URL}/orders/client/my-orders`,
    });
    orders.value = data;

    console.log(orders.value[0].orderItem);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};
</script>
