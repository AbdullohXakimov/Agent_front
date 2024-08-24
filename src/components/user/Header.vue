<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold">Shop</router-link>
      <nav>
        <router-link to="/" class="mr-4">Home</router-link>
        <router-link to="/cart" class="mr-4">Cart</router-link>
        <router-link to="/profile">Profile</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
/* Header-specific styles */
</style>
