<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input v-model="password" type="password" id="password" class="w-full p-2 border rounded" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
    </form>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';


const email = ref('');
const password = ref('');

function login() {
  // Login logic here
}
</script>

<style scoped>
/* Login page-specific styles */
</style>
