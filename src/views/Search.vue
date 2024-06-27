<template>
  <HotelSearch :params="searchParams" />
  <BestRating v-if="!searchParams.locale" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import BestRating from '@/components/BestRating.vue';
import HotelSearch from '@/components/HotelSearch.vue';
import { useRoute } from 'vue-router';
import { SearchParamsInterface } from '@/interfaces';

const route = useRoute();
let searchParams = ref<SearchParamsInterface>({
  locale: '',
  checkin: '',
  checkout: '',
  guests: {
    adults: 0,
    children: 0,
    rooms: 0,
  },
});

onBeforeMount(async () => {
  const query = route.query as any;
  if (query) {
    searchParams.value = {
      locale: query.locale || '',
      checkin: query.checkin || '',
      checkout: query.checkout || '',
      guests: {
        adults: query.adults ? parseInt(query.adults) : 0,
        children: query.children ? parseInt(query.children) : 0,
        rooms: query.rooms ? parseInt(query.rooms) : 0,
      }
    };
  }
});
</script>
