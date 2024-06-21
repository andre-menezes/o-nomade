<template>
  <section class="w-full rounded shadow bg-white flex items-center justify-between px-8 py-4 mb-8">
    <div class="flex font-poppins items-center uppercase font-bold text-xl">
      <img src="@/assets/img/o-nomade_logo.png" alt="O Nomade" class="w-14 mr-4">
      <span class='hidden md:block'>O Nômade</span>
    </div>
    <Menu />
    <Button type="button" class="hidden md:block" text="Entrar" :icon="getIconClass('user')" />
    <MenuMobile :menu="menu" />
  </section>
</template>


<script setup lang="ts">
import { watch, ref } from 'vue';
import { getIconClass } from '@/utils';
import { useRoute } from 'vue-router';
import Button from './Button.vue';
import MenuMobile from './MenuMobile.vue';
import Menu from './Menu.vue';

const menu = ref([
  {
    name: 'Home',
    icon: 'home',
    path: '/',
    active: false
  },
  {
    name: 'Hoteis',
    icon: 'hotel',
    path: '/hoteis',
    active: false
  }
])

const route = useRoute();

watch(route, (val) => {
  menu.value.forEach(item => {
    console.log('val', val);
    console.log('item', item);
    if (val.name === item.name) {
      item.active = true;
    }
  })
})
</script>
