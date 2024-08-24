<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form @submit.prevent="loginUser">
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
        <button
          type="submit"
          class="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 mb-4"
        >
          Login
        </button>
        <router-link
          to="/user_login"
          class="block text-center bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-400 transition-colors"
        >
          Go to User Login
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "@/utils/api";
import { API_BASE_URL } from "@/config";


const email = ref("");
const password = ref("");
const router = useRouter();

async function loginUser() {
  try {
    const result = await apiRequest({
      method: "POST",
      url: `${API_BASE_URL}/admins/login`,
      body: { email: email.value, password: password.value },
      tokenRequired: false,
    });

    localStorage.setItem("access_token", result.tokens.accessToken);
    localStorage.setItem("refresh_token", result.tokens.refreshToken);
    alert("Login successful!");
    router.push("/admin/dashboard");
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Failed to login.");
  }
}
</script>

<style scoped>
/* Custom styles for the admin login page */
</style>
