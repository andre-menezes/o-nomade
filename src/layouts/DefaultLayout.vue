<template>
  <main class="relative font-body min-h-svh bg-slate-100 px-4 py-4 md:px-10 md:py-6">
    <Header></Header>
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>