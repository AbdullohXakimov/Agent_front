<template>
  <div class="w-64 bg-gray-800 text-white h-full">
    <div class="p-6">
      <h2 class="text-2xl font-bold">Admin Panel</h2>
    </div>
    <nav class="mt-10">
      <router-link to="/admin/dashboard" class="block py-2.5 px-4 rounded hover:bg-gray-700">
        Dashboard
      </router-link>
      <router-link to="/admin/products" class="block py-2.5 px-4 rounded hover:bg-gray-700">
        Products
      </router-link>
      <router-link to="/admin/clients" class="block py-2.5 px-4 rounded hover:bg-gray-700">
        Clients
      </router-link>
      <router-link to="/admin/orders" class="block py-2.5 px-4 rounded hover:bg-gray-700">
        Orders
      </router-link>
    </nav>
  </div>
</template>

<script setup>
// No additional script needed here
</script>

<style scoped>
/* Custom styles for the sidebar */
</style>
