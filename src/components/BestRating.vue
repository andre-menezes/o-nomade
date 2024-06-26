<template>
  <section class="w-full lg:w-9/12 lg:mx-auto bg-white px-8 py-6 pb-8 my-10 rounded shadow">
    <h2 class="text-xl font-semibold mb-8">
      <i :class="getIconClass('star')"></i>
      Confira os hotéis mais bem avaliados
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-6">
      <CardHotel v-for="hotel in bestRatingHotel" :key="hotel.id" :hotel="hotel"></CardHotel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMocksStore } from '@/stores/modules/mocks';
import { getIconClass } from '@/utils';
import { HotelDataInterface } from '@/interfaces';
import CardHotel from './CardHotel.vue';

const bestRatingHotel = ref<HotelDataInterface[] | null>(null);
const mockStore = useMocksStore();

onMounted(async () => {
  bestRatingHotel.value = await mockStore.fetchBestRatingHotel();
})
</script>
