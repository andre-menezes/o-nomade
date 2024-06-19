<template>
  <section class="absolute z-10 w-96 mt-5 px-2 py-2 rounded shadow-lg bg-white flex flex-col">
    <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
      @click="handleClick">
      <i :class="getIconClass('close')" class="w-4 h-4"></i>
    </div>
    <div class="flex items-center justify-center gap-4 mb-8">
      <h3 class="text-center text-lg font-semibold">
        <i :class="getIconClass('user')" class="mr-2"></i>
        Adultos
      </h3>
      <div>
        <button :disabled="adults <= 1" type="button" @click="decrement('adults')"
          class="h-8 w-8 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
          <i :class="getIconClass('minus')"></i>
        </button>
        <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ adults }}</span>
        <button type="button" @click="increment('adults')" class="h-8 w-8 rounded-full bg-primary text-white mx-2">
          <i :class="getIconClass('plus')"></i>
        </button>
      </div>
    </div>

    <hr>

    <div class="flex items-center justify-center gap-4 my-8">
      <h3 class="flex items-center text-center text-lg font-semibold">
        <i :class="getIconClass('children')" class="mr-2"></i>
        <span class="flex flex-col">
          Crianças
          <span class="text-xs text-gray-300">(até 14 anos)</span>
        </span>
      </h3>
      <div>
        <button :disabled="children <= 0" type="button" @click="decrement('children')"
          class="h-8 w-8 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
          <i :class="getIconClass('minus')"></i>
        </button>
        <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ children }}</span>
        <button type="button" @click="increment('children')" class="h-8 w-8 rounded-full bg-primary text-white mx-2">
          <i :class="getIconClass('plus')"></i>
        </button>
      </div>
    </div>

    <hr>

    <div class="flex items-center justify-center gap-4 my-8">
      <h3 class="flex items-center text-center text-lg font-semibold">
        <i :class="getIconClass('bed')" class="mr-2"></i>
        Quartos
      </h3>
      <div>
        <button :disabled="rooms <= 1 || rooms <= adults" type="button" @click="decrement('rooms')"
          class="h-8 w-8 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
          <i :class="getIconClass('minus')"></i>
        </button>
        <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ rooms }}</span>
        <button :disabled="rooms >= adults" type="button" @click="increment('rooms')"
          class="h-8 w-8 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
          <i :class="getIconClass('plus')"></i>
        </button>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';
import { getIconClass } from '@/utils';

const props = defineProps({
  data: {
    type: Object,
    default: { adults: 1, children: 0, rooms: 1 }
  }
})

const adults = ref(props.data.adults);
const children = ref(props.data.children);
const rooms = ref(props.data.rooms);

const emit = defineEmits(['close', 'data']);

function handleClick() {
  emit('close');
}

function increment(guest: string) {
  switch (guest) {
    case 'adults':
      adults.value++;
      break;
    case 'children':
      children.value++;
      break;
    case 'rooms':
      if (rooms.value < adults.value) {
        rooms.value++;
      }
      break;
    default:
      return;
  }
}

function decrement(guest: string) {
  switch (guest) {
    case 'adults':
      if (adults.value > 1) {
        adults.value--;
        if (rooms.value > adults.value) {
          rooms.value = adults.value;
        }
      }
      break;
    case 'children':
      if (children.value > 0) {
        children.value--;
      }
      break;
    case 'rooms':
      if (rooms.value > 1 && rooms.value > adults.value) {
        rooms.value--;
      }
      break;
    default:
      return;
  }
}

watch(adults, () => emit('data', { adults: adults.value, children: children.value, rooms: rooms.value }));
watch(children, () => emit('data', { adults: adults.value, children: children.value, rooms: rooms.value }));
watch(rooms, () => emit('data', { adults: adults.value, children: children.value, rooms: rooms.value }));
</script>
