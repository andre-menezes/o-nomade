<template>
  <main class="h-screen px-8 bg-slate-50 flex flex-col items-center justify-center">
    <slot></slot>
    <button
      class="flex items-center py-2 px-4 bg-primary hover:bg-primary-hover hover:shadow-xl text-white rounded uppercase font-medium w-"
      type="button" @click="previousRoute">
      <i class="fa-solid fa-angle-left mr-2"></i>
      voltar
    </button>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function previousRoute() {
  router.back();
}
</script>
