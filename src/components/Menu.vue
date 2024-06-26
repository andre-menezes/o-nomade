<template>
  <nav>
    <ul class="flex flex-col md:flex-row gap-4 md:gap-10 grow justify-center mb-4 md:mb-0">
      <li v-for="item in menu" :key="item.path">
        <a :href="item.path" :class="{ 'text-blue-500 bg-blue-100': item.active, 'text-gray-700': !item.active }"
          class="uppercase py-2 px-4 rounded hover:bg-slate-50 font-semibold text-center">
          <i :class="getIconClass(item.icon)" class="mr-2"></i>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MenuInterface } from '@/interfaces';
import { getIconClass, menuItems } from '@/utils';

const menu = ref<MenuInterface[]>(menuItems);
</script>