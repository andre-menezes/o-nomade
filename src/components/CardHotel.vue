<template>
  <article
    class="relative flex flex-col place-items-center w-full max-w-lg rounded bg-white shadow-lg shadow-black/30 overflow-hidden"
    :class="itemSelected ? 'outline outline-offset-2 outline-8 outline-orange-500' : ''">
    <div class="h-3/5 overflow-hidden">
      <img :src="hotel.image" alt="hotel" class="scale-150">
    </div>
    <div class="w-full flex flex-col grow gap-4 justify-between items-center px-4 py-4">
      <p class="text-xl lg:text-2xl text-center font-bold">
        <i :class="getIconClass('hotel')"></i>
        {{ hotel.name }}
      </p>
      <p>
        <i v-for="n in hotel.rating" :class="getIconClass('star')"
          class="w-4 text-yellow-300 drop-shadow drop-shadow-black"></i>
      </p>
      <p class="text-sm text-gray-400">
        <i :class="getIconClass('location')"></i>
        {{ `${hotel.location.city} - ${hotel.location.state}` }}
      </p>
      <div class="w-full px-4 grid grid-cols-2 gap-2 justify-items-stretch">
        <div v-for="amenity in hotel.amenities" class="text-xs font-semibold truncate">
          <i :class="getIconClass(amenity)" class="w-4 text-blue-700"></i>
          {{ amenity }}
        </div>
      </div>
      <p class="py-2 font-semibold flex items-center text-lg"><i :class="getIconClass('money')"
          class="w-6 h-6 text-green-500 mr-2"></i>{{
            `R$ ${hotel.pricePerNight}` }}
      </p>
      <Button small @click="moreDetails(hotel.id)" text="Mais detalhes" :icon="getIconClass('details')"
        class="mt-4 mb-2" />
    </div>
    <input v-if="compare" type="checkbox" v-model="itemSelected" class="absolute top-4 left-4 w-6 h-6 cursor-pointer" />
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getIconClass } from '@/utils';
import { HotelDataInterface } from '@/interfaces';
import Button from './Button.vue';

defineProps({
  hotel: {
    type: Object as () => HotelDataInterface,
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
  router.push({ name: 'Hotel', params: { id } });
}
</script>
