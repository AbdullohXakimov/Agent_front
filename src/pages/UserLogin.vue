<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <button 
          type="button"
          @click="navigateToRegister"
          class="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
        >
          Register
        </button>
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

async function handleLogin() {
  try {
    const result = await apiRequest({
      method: "POST",
      url: `${API_BASE_URL}/clients/login`,
      body: { email: email.value, password: password.value },
      tokenRequired: false,
    });

    localStorage.setItem("access_token", result.tokens.accessToken);
    localStorage.setItem("refresh_token", result.tokens.refreshToken);
    alert("Login successful!");
    if (result.admin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Incorrect email or password.");
  }
}

function navigateToRegister() {
  router.push("/register");
}
</script>

<style scoped>
/* Custom styles for the user login page */
</style>
