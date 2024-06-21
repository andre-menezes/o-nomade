<template>
  <section class="grid gap-8 2xl:grid-cols-2 w-full md:py-8 md:px-8 bg-white rounded shadow">
    <div class="w-full h-full flex overflow-hidden rounded-t md:rounded">
      <img :src="hotel?.image" alt="hotel" class="aspect-auto hover:scale-150 transition-transform duration-500" />
    </div>
    <div class="w-full md:w-7/8 mt-4 px-8 py-8">
      <h1 class="flex flex-col text-2xl font-bold mb-4 text-center">
        {{ hotel?.name }}
        <div>
          <i v-for="n in hotel?.rating" :class="getIconClass('star')" class="w-8 my-2 text-yellow-300 drop-shadow"></i>
        </div>
      </h1>
      <div class="md:grid md:grid-cols-2">
        <article class="text-md">
          <p class="w-max font-bold text-sm mb-2 px-2 py-2 bg-blue-100 rounded text-blue-500">
            <i :class="getIconClass('note')" class="mr-2"></i>
            Descrição
          </p>
          <p class="rounded mb-4 ml-6 text-black">
            {{ hotel?.description }}
          </p>
        </article>

        <article class="text-md text-gray-500">
          <p class="w-max font-bold text-sm mb-2 px-2 py-2 bg-blue-100 rounded text-blue-500">
            <i :class="getIconClass('location')" class="mr-2"></i>
            Localização
          </p>
          <p class="rounded mb-4 ml-6 text-black">
            {{ locale }}
          </p>
        </article>

        <article class="text-md text-gray-500">
          <p class="w-max font-bold text-sm mb-2 px-2 py-2 bg-blue-100 rounded text-blue-500">
            <i :class="getIconClass('bed')" class="mr-2"></i>
            Número de quartos
          </p>
          <p class="rounded mb-4 ml-6 text-black">
            {{ hotel?.numberOfRooms }}
          </p>
        </article>

        <article class="text-md text-gray-500">
          <p class="w-max font-bold text-sm mb-2 px-2 py-2 bg-blue-100 rounded text-blue-500">
            <i :class="getIconClass('money')" class="mr-2"></i>
            Diária
          </p>
          <p class="rounded mb-4 ml-6 text-black">
            {{ price }}
          </p>
        </article>

        <article class="text-md text-gray-500">
          <p class="w-max font-bold text-sm mb-2 px-2 py-2 bg-blue-100 rounded text-blue-500">
            <i :class="getIconClass('suitcase')" class="mr-2"></i>
            Comodidades
          </p>
          <div class="md:w-3/4 grid grid-cols-2 mb-4 ml-6 gap-2">
            <div v-for="amenity in hotel?.amenities" class="text-xs font-semibold flex-wrap">
              <i :class="getIconClass(amenity)" class="w-4 text-blue-700 mr-2"></i>
              {{ amenity }}
            </div>
          </div>
        </article>

        <article class="text-md text-gray-500">
          <p class="w-max font-bold text-sm mb-2 px-2 py-2 bg-blue-100 rounded text-blue-500">
            <i :class="getIconClass('policy')" class="mr-2"></i>
            Política de cancelamento
          </p>
          <p class="rounded mb-4 ml-6 text-black">
            {{ hotel?.cancellationPolicy }}
          </p>
        </article>

      </div>
      <div class="w-full flex justify-center my-8">
        <button type="button" @click="bookHotel"
          class="py-2 px-4 bg-primary hover:bg-primary-hover text-white font-semibold uppercase rounded">
          <i :class="getIconClass('calendarCheck')" class="mr-2"></i>
          Fazer reserva
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMocksStore } from '@/stores/modules/mocks';
import { getIconClass } from '@/utils';
import { HotelDataInterface } from '@/interfaces';

const mockStore = useMocksStore();

const route = useRoute();
const router = useRouter();

const hotel = ref<HotelDataInterface | undefined>(undefined)

watch(route, () => {
  hotel.value = mockStore.getHotelById(+route.params.id);
})

onBeforeMount(() => {
  if (route.params) {
    hotel.value = mockStore.getHotelById(+route.params.id);
  }

  if (!hotel.value) {
    router.push({ name: 'Page Not Found' })
  }
})

const locale = computed(() => {
  const hotelLocale = hotel && `${hotel.value?.location.city} - ${hotel.value?.location.state}`
  return hotelLocale;
})

const price = computed(() => {
  const hotelPrice = hotel && `R$ ${hotel.value?.pricePerNight}`
  return hotelPrice;
})

function bookHotel() {
  console.log('Reservar')
}
</script>