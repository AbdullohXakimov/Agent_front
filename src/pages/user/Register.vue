<template>
  <AuthLayout>
    <div class="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input 
            v-model="name" 
            type="text" 
            id="name" 
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700">Phone</label>
          <input 
            v-model="phone" 
            type="tel" 
            id="phone" 
            placeholder="+1 (234) 567-8900"
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="^\+\d{1} \(\d{3}\) \d{3}-\d{4}$"
            title="Phone number must be in the format: +1 (234) 567-8900"
            required 
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-gray-700">Address (Optional)</label>
          <input 
            v-model="address" 
            type="text" 
            id="address" 
            class="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <button 
          type="submit" 
          class="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <div class="mt-4 text-center">
        <p class="text-gray-700">
          Already have an account? 
          <router-link to="/login" class="text-blue-500 hover:underline">
            Log in
          </router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import AuthLayout from "../../layouts/user/AuthLayout.vue";
import { apiRequest } from "@/utils/api";
import { useRouter } from 'vue-router';
import { API_BASE_URL } from "@/config";

const name = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');
const address = ref('');
const router = useRouter();

async function register() {
  try {
    const response = await apiRequest({
      method: "POST",
      url: `${API_BASE_URL}/clients/signup`,
      body: { name: name.value, email: email.value, password: password.value, phone: phone.value, address: address.value },
      tokenRequired: false,
    });

    alert("Registration successful!");
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Failed to register. Please try again.");
  }
}
</script>

<style scoped>
/* Custom styles for the register page */
</style>
