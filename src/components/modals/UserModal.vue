<template>
  <section v-if="!isMobile" class="relative flex gap-2 items-center">
    <div class="flex flex-col mr-2">
      <span class="text-right font-semibold">{{ user?.name }}</span>
      <span class="text-right text-sm text-gray-500">{{ user?.email }}</span>
    </div>
    <div @click="openUserModal"
      class="flex justify-center items-center h-14 w-14 text-white rounded-full bg-primary cursor-pointer">
      <i :class="getIconClass('user')"></i>
    </div>
    <div v-if="openModal" class="absolute top-14 right-0 px-4 py-4 rounded shadow bg-white">
      <Button text="Sair" small :icon="getIconClass('logout')" @click="logoutUser" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { MOBILE_BREAKPOINT, getIconClass } from '@/utils';
import { useAuthStore } from '@/stores/modules/auth';
import { UserDTO } from '@/interfaces';
import Button from '../Button.vue';
import { useRouter } from 'vue-router';

const openModal = ref(false);

function openUserModal() {
  openModal.value = !openModal.value
}

const authStore = useAuthStore();

const user = ref<UserDTO | null>({
  name: '',
  email: '',
  password: '',
  token: ''
});

const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= MOBILE_BREAKPOINT);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onBeforeMount(() => {
  user.value = authStore.getUser || null;
})

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const router = useRouter();

function logoutUser() {
  authStore.logout();
  openUserModal();
  router.go(0);
}
</script>