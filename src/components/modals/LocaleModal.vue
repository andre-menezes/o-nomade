<template>
  <section class="absolute z-10 w-80 md:w-96 h-48 mt-5 px-2 py-2 rounded shadow-lg bg-white flex flex-col">
    <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
      @click="handleClick">
      <i class="w-4 h-4 fa fa-close"></i>
    </div>
    <h3 class="text-center text-lg font-semibold">
      <i class="fa-solid fa-location mr-2"></i>
      Encontre o seu destino
    </h3>
    <div class="grow px-4 flex items-center justify-center">
      <input id="locale" v-model="localeInput"
        class="w-full py-2 px-4 shadow rounded outline-none border-2 border-gray-100" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';

const localeInput = ref(null);

const emit = defineEmits(['close', 'data']);

function handleClick() {
  emit('close');
}

watch(localeInput, (val) => {
  emit('data', val);
});
</script>
