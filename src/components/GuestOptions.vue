<template>
  <div class="flex items-center justify-center gap-4 mb-8">
    <h3 class="text-center text-lg font-semibold">
      <i :class="getIconClass('user')" class="mr-2"></i>
      Adultos
    </h3>
    <div>
      <button :disabled="appStore.getAdults <= 1" type="button" @click="decrement('adults')"
        class="h-6 w-6 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
        <i :class="getIconClass('minus')"></i>
      </button>
      <span class="text-xl text-center inline-block h-6 w-6 font-bold">{{ appStore.getAdults }}</span>
      <button type="button" @click="increment('adults')" class="h-6 w-6 rounded-full bg-primary text-white mx-2">
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
      <button :disabled="appStore.getChildren <= 0" type="button" @click="decrement('children')"
        class="h-6 w-6 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
        <i :class="getIconClass('minus')"></i>
      </button>
      <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ appStore.getChildren }}</span>
      <button type="button" @click="increment('children')" class="h-6 w-6 rounded-full bg-primary text-white mx-2">
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
      <button :disabled="appStore.getRooms <= 1" type="button" @click="decrement('rooms')"
        class="h-6 w-6 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
        <i :class="getIconClass('minus')"></i>
      </button>
      <span class="text-xl text-center inline-block w-8 h-8 font-bold">{{ appStore.getRooms }}</span>
      <button :disabled="appStore.getRooms === appStore.getAdults" type="button" @click="increment('rooms')"
        class="h-6 w-6 rounded-full bg-primary disabled:bg-gray-100 disabled:text-gray-300 text-white mx-2">
        <i :class="getIconClass('plus')"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAppStore } from '@/stores/modules/app';
import { getIconClass } from '@/utils';

const appStore = useAppStore();

function increment(guest: string) {
  switch (guest) {
    case 'adults':
      appStore.increaseAdults()
      break;
    case 'children':
      appStore.increaseChildren()
      break;
    case 'rooms':
      if (appStore.getRooms < appStore.getAdults) {
        appStore.increaseRooms()
      }
      break;
    default:
      return;
  }
}

function decrement(guest: string) {
  switch (guest) {
    case 'adults':
      if (appStore.getAdults > 1) {
        if (appStore.getAdults <= appStore.getRooms) {
          appStore.decreaseRooms()
        }
        appStore.decreaseAdults();
      }
      break;
    case 'children':
      if (appStore.getChildren > 0) {
        appStore.decreaseChildren();;
      }
      break;
    case 'rooms':
      if (appStore.getRooms > 1) {
        appStore.decreaseRooms();
      }
      break;
    default:
      return;
  }
}
</script>