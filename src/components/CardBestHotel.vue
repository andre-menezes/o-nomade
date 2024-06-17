<template>
  <article class="flex flex-col place-items-center w-full rounded bg-white shadow-lg shadow-black/30 overflow-hidden">
    <div class="w-full h-48 bg-secondary overflow-hidden">
      <img :src="hotel.image" alt="hotel" class="scale-150">
    </div>
    <div class="flex flex-col shrink justify-between px-4 py-4">
      <div class="flex flex-col items-center">
        <p class="pb-2 text-lg text-center font-bold"><i class="fa-solid fa-hotel mr-2"></i>{{ hotel.name }}</p>
        <p class="py-2">
          <i v-for="n in hotel.rating" class="fa-solid fa-star w-4 text-yellow-300 drop-shadow"></i>
        </p>
        <p class="py-6 pt-2 text-sm text-gray-400/70">
          <i class="fa-solid fa-location-dot"></i>
          {{ `${hotel.location.city} - ${hotel.location.state}` }}
        </p>
        <div class="grid grid-cols-2 gap-2 grow">
          <div v-for="amenity in hotel.amenities" class="text-xs font-semibold flex-wrap">
            <i :class="icons[amenity]" class="w-4"></i>
            {{ amenity }}
          </div>
        </div>
        <button class="mx-auto mt-4 py-2 px-4 bg-primary hover:bg-primary-hover text-white rounded">Mais
          detalhes</button>
      </div>


    </div>
  </article>
</template>

<script setup lang="ts">
import { HotelData } from '@/stores/modules/mocks/mocksStore';

const icons: { [key: string]: string } = {
  'Café da manhã incluso': 'fa-solid fa-mug-hot',
  'Estacionamento': 'fa-solid fa-car-side',
  'Piscina': 'fa-solid fa-person-swimming',
  'Recepção 24 horas': 'fa-solid fa-bell-concierge',
  'Restaurante': 'fa-solid fa-utensils',
  'Spa': 'fa-solid fa-spa',
  'Wi-Fi grátis': 'fa-solid fa-wifi',
}

defineProps({
  hotel: {
    type: Object as () => HotelData,
    required: true
  }
})
</script>
