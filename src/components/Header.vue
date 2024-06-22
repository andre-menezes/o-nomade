<template>
  <section class="w-full rounded shadow bg-white flex items-center justify-between px-8 py-4 mb-8">
    <div class="flex font-poppins items-center uppercase font-bold text-xl">
      <img src="@/assets/img/o-nomade_logo.png" alt="O Nomade" class="w-14 mr-4">
      <span class='hidden md:block'>O Nômade</span>
    </div>
    <component :is="isMobile ? MenuMobile : Menu" />
    <Button v-if="!isAuthenticated" type="button" class="hidden md:block" text="Entrar" :icon="getIconClass('login')"
      @click="userLogin" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { MOBILE_BREAKPOINT, getIconClass, menuItems } from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import { MenuInterface } from '@/interfaces';
import { useAuthStore } from '@/stores/modules/auth';
import Button from './Button.vue';
import MenuMobile from './MenuMobile.vue';
import Menu from './Menu.vue';

const { isAuthenticated } = useAuthStore();

const menu = ref<MenuInterface[]>(menuItems);

const route = useRoute();

watch(route, (val) => {
  menu.value.forEach(item => item.active = val.name === item.name)
})

const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= MOBILE_BREAKPOINT);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};


onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const router = useRouter();

function userLogin() {
  router.push({ name: 'Login' });
}
</script>
