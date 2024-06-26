<template>
  <section class="w-full max-w-2xl h-max px-8 py-8 bg-white rounded shadow">
    <h1 class="text-3xl text-center font-bold font-poppins uppercase">Login</h1>
    <form class="flex flex-col items-center pb-8">
      <div class="mb-8 w-full text-center">
        <div class="relative my-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
          <i :class="getIconClass('mail')" class="absolute left-0 px-2 text-gray-200"></i>
          <input v-model="formLogin.email" placeholder="E-mail" type="email"
            class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
        </div>
        <div class="relative my-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
      disabled:cursor-default">
          <i :class="getIconClass('password')" class="absolute left-0 px-2 text-gray-200"></i>
          <input v-model="formLogin.password" placeholder="Senha" type="password"
            class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
        </div>
      </div>
      <Button text="Entrar" :icon="getIconClass('login')" class="mb-4" @click="submitUser('login')" />
      <p class="text-sm">Não tem uma conta? <span @click="openRegister = true"
          class="font-semibold text-blue-400 cursor-pointer hover:text-blue-300 ">Cadastre-se</span></p>
    </form>

    <hr v-if="openRegister">

    <form v-if="openRegister" class="mt-4 flex flex-col items-center">
      <h1 class="pt-4 text-3xl text-center font-bold font-poppins uppercase">Cadastro</h1>
      <div class="mb-8 w-full text-center">
        <div class="relative my-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
          <i :class="getIconClass('user')" class="absolute left-0 px-2 text-gray-200"></i>
          <input v-model="formRegister.name" placeholder="Nome" type="text"
            class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
        </div>
        <div class="relative my-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
          <i :class="getIconClass('mail')" class="absolute left-0 px-2 text-gray-200"></i>
          <input v-model="formRegister.email" placeholder="E-mail" type="email"
            class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
        </div>
        <div class="relative my-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
      disabled:cursor-default">
          <i :class="getIconClass('password')" class="absolute left-0 px-2 text-gray-200"></i>
          <input v-model="formRegister.password" placeholder="Senha" type="password"
            class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
        </div>
        <Button text="Cadastrar" :icon="getIconClass('user')" @click="submitUser('register')" class="mb-4" />
      </div>
    </form>
  </section>
  <SnackBar v-if="snackbar.isOpened" :status="snackbar.status" :msg="snackbar.msg" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { SNACKBAR_TIME, getIconClass } from '@/utils';
import { SnackBarInterface, UserLogin, UserRegister } from '@/interfaces';
import { useAuthStore } from '@/stores/modules/auth';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import SnackBar from '@/components/SnackBar.vue';

const formLogin = reactive<UserLogin>({
  email: '',
  password: '',
});
const formRegister = reactive<UserRegister>({
  name: '',
  email: '',
  password: '',
});


const openRegister = ref(false);

const authStore = useAuthStore();


const snackbar = ref<SnackBarInterface>({
  status: 0,
  msg: '',
  isOpened: false
})

const router = useRouter();

async function submitUser(type: string) {
  const response = type === 'register' ? await authStore.fetchUserRegister(formRegister) : await authStore.fetchUserLogin(formLogin);
  if (!response) {
    snackbar.value.status = 400
    snackbar.value.msg = 'Erro';
  } else {
    snackbar.value.status = response.status;
    snackbar.value.msg = response.msg;
    snackbar.value.isOpened = true;

    setTimeout(() => {
      snackbar.value.isOpened = false;
      if (snackbar.value.status === 200) {
        router.back();
      }
    }, SNACKBAR_TIME);
  }
}
</script>
