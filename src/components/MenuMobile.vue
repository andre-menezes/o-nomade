<template>
  <nav @click="toggleMenu" class="relative md:hidden">
    <i :class="getIconClass('menu')" class="w-8 h-8"></i>
    <section v-if="dialogMenu" class="w-60 absolute top-16 right-0 z-10 bg-white rounded shadow px-4 py-4">
      <Menu />
      <hr>
      <article v-if="!isAuthenticated" class="my-4 flex justify-center">
        <Button type="button" text="Entrar" :icon="getIconClass('login')" class="mt-2" @click="userLogin" />
      </article>
      <article v-else v-if="isMobile" class="relative mt-6 flex flex-col gap-2 items-center">
        <div class="flex justify-center items-center h-14 w-14 text-white rounded-full bg-primary cursor-pointer">
          <i :class="getIconClass('user')"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-center font-semibold">{{ user?.name }}</span>
          <span class="text-center text-sm text-gray-500">{{ user?.email }}</span>
        </div>
        <Button text="Sair" small :icon="getIconClass('logout')" @click="logoutUser" />
      </article>
    </section>

  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { MOBILE_BREAKPOINT, getIconClass } from '@/utils';
import Menu from './Menu.vue';
import Button from './Button.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { UserDTO } from '@/interfaces';

const dialogMenu = ref(false);
const isAuthenticated = ref(false);
const user = ref<UserDTO | null>({
  name: '',
  email: '',
  password: '',
  token: ''
});

const openModal = ref(false);

function openUserModal() {
  openModal.value = !openModal.value
}

const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= MOBILE_BREAKPOINT);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onBeforeMount(() => {
  isAuthenticated.value = authStore.isAuthenticated;
  user.value = authStore.getUser || null;
});

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

function toggleMenu() {
  dialogMenu.value = !dialogMenu.value;
}

const router = useRouter();

function userLogin() {
  router.push({ name: 'Login' });
}

const authStore = useAuthStore();

function logoutUser() {
  authStore.logout();
  openUserModal();
  router.go(0);
}
</script>
