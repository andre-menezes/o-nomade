<template>
  <nav class="w-full rounded shadow bg-white flex items-center justify-between px-8 py-4 mb-8">
    <div class="flex font-poppins items-center uppercase font-bold text-xl">
      <img src="@/assets/img/o-nomade_logo.png" alt="O Nomade" class="w-14 mr-4">
      O Nômade
    </div>
    <ul class="shrink flex justify-center">
      <li v-for="item in menu" :key="item.path" class="uppercase hover:bg-slate-50 py-2 px-4 rounded font-semibold">
        <a :href="item.path" :class="{ 'text-red-400': item.active, 'text-gray-700': !item.active }">
          <i :class="getIconClass(item.icon)" class="mr-2"></i>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>


<script setup lang="ts">
import { watch, ref } from 'vue';
import { getIconClass } from '@/utils';
import { useRoute } from 'vue-router';

const menu = ref([
  {
    name: 'Home',
    icon: 'home',
    path: '/',
    active: false
  },
  {
    name: 'Hotéis',
    icon: 'search',
    path: '/pesquisa',
    active: false
  }
])

const route = useRoute();

watch(route, () => {
  menu.value.forEach(item => {
    console.log(item.path.substring(2))
    item.active = route.fullPath.includes(item.path.substring(2));
  })
})
</script>
