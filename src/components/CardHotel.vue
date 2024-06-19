<template>
  <article
    class="relative flex flex-col place-items-center w-full max-w-80 rounded bg-white shadow-lg shadow-black/30 overflow-hidden"
    :class="itemSelected ? 'outline outline-offset-2 outline-8 outline-orange-500' : ''">
    <div class="w-full h-48 overflow-hidden">
      <img :src="hotel.image" alt="hotel" class="scale-150">
    </div>
    <div class="flex flex-col shrink justify-between px-4 py-4">
      <div class="flex flex-col items-center">
        <p class="pb-2 text-lg text-center font-bold"><i class="fa-solid fa-hotel mr-2"></i>{{ hotel.name }}</p>
        <p class="py-2">
          <i v-for="n in hotel.rating" class="fa-solid fa-star w-4 text-yellow-300 drop-shadow"></i>
        </p>
        <p class="py-6 pt-2 text-sm text-gray-400">
          <i class="fa-solid fa-location-dot"></i>
          {{ `${hotel.location.city} - ${hotel.location.state}` }}
        </p>
        <div class="grid grid-cols-2 gap-2 grow">
          <div v-for="amenity in hotel.amenities" class="text-xs font-semibold flex-wrap">
            <i :class="icons[amenity]" class="w-4 text-blue-700 mr-2"></i>
            {{ amenity }}
          </div>
        </div>
        <p class="py-2 pt-4 font-semibold flex items-center text-lg"><i
            class="w-6 h-6 fa-solid fa-money-bill text-green-500 mr-2"></i>{{
              `R$ ${hotel.pricePerNight}` }}
        </p>
        <button type="button" @click="moreDetails(hotel.id)"
          class="mx-auto mt-4 py-2 px-4 bg-primary hover:bg-primary-hover text-white font-semibold uppercase rounded">
          <i class="fa-solid fa-circle-chevron-right mr-2"></i>
          Mais detalhes
        </button>
      </div>
    </div>
    <input v-if="compare" type="checkbox" v-model="itemSelected" class="absolute top-4 left-4 w-6 h-6 cursor-pointer" />
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
  },
  compare: {
    type: Boolean,
    default: false
  }
})

const itemSelected = ref(false);

const router = useRouter();

function moreDetails(id: number) {
  router.push(`/hotel/${id}`);
}
</script>
