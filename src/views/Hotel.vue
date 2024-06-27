<template>
  <HotelDetails />
  <BestRating />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BestRating from '@/components/BestRating.vue';
import HotelDetails from '@/components/HotelDetails.vue';

const route = useRoute();
const router = useRouter();

watch(route, (to) => {
  router.push({ name: 'Hotel', params: { id: to.params.id } })
})
</script>