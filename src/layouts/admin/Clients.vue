<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h2 class="text-3xl font-bold mb-8 text-center">Clients</h2>
    <div
      v-if="clients.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="client in clients"
        :key="client.id"
        class="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <h3 class="text-xl font-semibold text-gray-800">{{ client.name }}</h3>
        <p class="mt-2 text-gray-600">
          <strong>Email:</strong> {{ client.email }}
        </p>
        <p class="mt-1 text-gray-600">
          <strong>Phone:</strong> {{ client.phone }}
        </p>
        <p class="mt-1 text-gray-600">
          <strong>Address:</strong> {{ client.address }}
        </p>
        <router-link
          :to="`/admin/shop-products/${client.id}`"
          class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block hover:bg-blue-600"
        >
          View Products
        </router-link>
        <button
          @click="addShopProduct(client.id)"
          class="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block hover:bg-green-600"
        >
          Add Product
        </button>
        <button
          @click="deleteClient(client.id)"
          class="bg-red-500 text-white px-4 py-2 rounded mt-4 inline-block hover:bg-red-600"
        >
          Delete Client
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">No clients found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "@/utils/api";
import { API_BASE_URL } from "@/config";


const clients = ref([]);
const router = useRouter();

async function fetchClients() {
  try {
    const data = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/clients`,
    });
    clients.value = data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    alert("Failed to load clients.");
  }
}

async function deleteClient(clientId) {
  try {
    await apiRequest({
      method: "DELETE",
      url: `${API_BASE_URL}/clients/${clientId}`,
    });
    clients.value = clients.value.filter((client) => client.id !== clientId);
    alert("Client deleted successfully!");
  } catch (error) {
    console.error("Error deleting client:", error);
    alert("Failed to delete client.");
  }
}

function addShopProduct(clientId) {
  router.push(`/admin/shop-products/${clientId}/create`);
}

onMounted(fetchClients);
</script>

<style scoped>
/* Custom styles for the clients list */
.grid div:hover {
  transform: translateY(-4px);
  transition: all 0.2s ease-in-out;
}

.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
