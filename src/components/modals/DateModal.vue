<template>
  <section class="absolute z-10 w-96 mt-5 px-2 py-2 rounded shadow-lg bg-white flex flex-col">
    <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
      @click="closeModal">
      <i class="w-4 h-4 fa fa-close"></i>
    </div>
    <h3 class="text-center text-lg font-semibold">
      <i class="fa-regular fa-calendar mr-2"></i>
      Selecione a data do {{ props.role }}
    </h3>
    <div class="grow px-4 py-4 flex items-center justify-center">
      <VDatePicker borderless v-model="date" color="gray" :min-date="props.min" @click="handleClick" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const props = defineProps({
  role: {
    type: String,
    require: true,
    default: 'check-in'
  },
  data: {
    type: Date,
    default: new Date()
  },
  min: {
    type: Date,
    default: new Date()
  }
})

const date = ref(props.data);

const emit = defineEmits(['close', 'data'])

function handleClick() {
  emit('data', { role: props.role, value: date.value })
}

function closeModal() {
  emit('close');
}
</script>