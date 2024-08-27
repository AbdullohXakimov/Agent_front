<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../../components/user/Header.vue";
import Footer from "../../components/user/Footer.vue";
</script>

<style scoped>
/* Layout-specific styles */
</style>
