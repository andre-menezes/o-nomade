<template>
  <section class="absolute z-10 w-96 mt-5 px-2 py-2 rounded shadow-lg bg-white flex flex-col">
    <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
      @click="handleClick">
      <i :class="getIconClass('close')" class="w-4 h-4"></i>
    </div>

    <GuestOptions />
  </section>
</template>


<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';
import { getIconClass } from '@/utils';
import GuestOptions from '@/components/GuestOptions.vue';

const emit = defineEmits('close');

function handleClick() {
  emit('close');
}
</script>
