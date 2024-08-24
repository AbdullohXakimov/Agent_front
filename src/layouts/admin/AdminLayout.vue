<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header />

      <!-- Main Content -->
      <main class="flex-1 p-6 bg-white overflow-y-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
// Import Sidebar and Header components
import Sidebar from '@/components/admin/Sidebar.vue'
import Header from '@/components/admin/Header.vue'
</script>

<style scoped>
/* Custom styles for the admin layout */
</style>
