<template>
  <nav>
    <ul class="flex gap-10 grow justify-center">
      <li v-for="item in props.menu" :key="item.path"
        :class="{ 'text-blue-500 bg-blue-100': item.active, 'text-gray-700 hidden md:block': !item.active }"
        class="uppercase py-2 px-4 rounded hover:bg-slate-50 font-semibold">
        <a :href="item.path">
          <i :class="getIconClass(item.icon)" class="mr-2"></i>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Menu } from '@/interfaces';
import { getIconClass } from '@/utils';

const props = defineProps({
  menu: {
    type: Array as () => Menu[],
    required: true,
  }
})
</script>