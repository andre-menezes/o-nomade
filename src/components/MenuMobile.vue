<template>
  <nav @click="toggleMenu" class="relative md:hidden">
    <i :class="getIconClass('menu')" class="w-8 h-8"></i>
    <section v-if="dialogMenu" class="w-60 absolute top-16 right-0 z-10 bg-white rounded shadow px-4 py-4">
      <Menu />
      <hr>
      <article class="my-4 flex justify-center">
        <Button type="button" text="Entrar" :icon="getIconClass('user')" class="mt-2" />
      </article>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getIconClass } from '@/utils';
import Menu from './Menu.vue';
import Button from './Button.vue';

const dialogMenu = ref(false);

function toggleMenu() {
  dialogMenu.value = !dialogMenu.value;
}
</script>