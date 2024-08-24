<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">User Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input 
            v-model="email"
            type="email" 
            id="email" 
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input 
            v-model="password"
            type="password" 
            id="password" 
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          class="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 mb-4"
        >
          Login
        </button>
        <router-link 
          to="/admin_login"
          class="block text-center bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-400 transition-colors"
        >
          Go to Admin Login
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function handleLogin() {
  // Add logic to handle login
  console.log({ email: email.value, password: password.value });
}
</script>

<style scoped>
/* Custom styles for the user login page */
</style>
