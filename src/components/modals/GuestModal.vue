<template>
  <section class="absolute z-10 w-96 mt-5 px-2 py-2 rounded shadow-lg bg-white flex flex-col">
    <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
      @click="handleClick">
      <i class="w-4 h-4 fa fa-close"></i>
    </div>
    <div class="flex items-center justify-center gap-4 mb-8">
      <h3 class="text-center text-lg font-semibold">
        <i class="fa-solid fa-user mr-2"></i>
        Adultos
      </h3>
      <div>
        <button :disabled="adults < 2" type="button" @click="decrement('adults')"
          class="h-8 w-8 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
          <i class="fa fa-minus"></i>
        </button>
        <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ adults }}</span>
        <button type="button" @click="increment('adults')" class="h-8 w-8 rounded-full bg-primary text-white mx-2">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>

    <hr>

    <div class="flex items-center justify-center gap-4 my-8">
      <h3 class="flex items-center text-center text-lg font-semibold">
        <i class="fa-solid fa-children mr-2"></i>
        <span class="flex flex-col">
          Crianças
          <span class="text-xs text-gray-300">(até 14 anos)</span>
        </span>
      </h3>
      <div>
        <button :disabled="children < 1" type="button" @click="decrement('children')"
          class="h-8 w-8 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
          <i class="fa fa-minus"></i>
        </button>
        <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ children }}</span>
        <button type="button" @click="increment('children')" class="h-8 w-8 rounded-full bg-primary text-white mx-2">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: { adults: 1, children: 0 }
  }
})

const adults = ref(props.data.adults);
const children = ref(props.data.children);

const emit = defineEmits(['close', 'data']);

function handleClick() {
  emit('close');
}

function increment(guest: string) {
  return guest === 'adults' ? adults.value++ : children.value++
}

function decrement(guest: string) {
  return guest === 'adults' ? adults.value-- : children.value--
}

watch(adults, () => emit('data', { adults: adults.value, children: children.value }));
watch(children, () => emit('data', { adults: adults.value, children: children.value }));
</script>
