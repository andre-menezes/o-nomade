<template>
  <section class="w-full overflow-x-auto mb-8 px-8 py-8 bg-white rounded shadow flex flex-col">
    <h2 class="mb-8 text-2xl font-bold">
      <i :class="getIconClass('suitcase')" class="mr-2"></i>
      Minhas Reservas
    </h2>
    <table class="w-max min-w-full shadow rounded">
      <thead class="bg-slate-100">
        <tr class="rounded-t">
          <th v-for="item in headers" :key="item.value" class="py-2 text-center w-fit px-8">{{ item.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td v-for="item in headers" :key="item.value" class="py-1 text-center">
            <template v-if="item.value === 'totalPrice'">
              <span>{{ formatTotalPrice(booking.totalPrice) }}</span>
            </template>
            <template v-else>
              {{ booking[item.value as keyof BookingInterface] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { useMocksStore } from '@/stores/modules/mocks';
import { useAuthStore } from '@/stores/modules/auth';
import { onMounted, ref } from 'vue';
import { BookingInterface } from '@/interfaces';
import { getIconClass } from '@/utils';
import moment from 'moment';

const mockStore = useMocksStore();
const authStore = useAuthStore();

const bookings = ref<BookingInterface[]>([])

const headers = [
  { text: 'Reservado por', value: 'name' },
  { text: 'Hotel', value: 'idHotel' },
  { text: 'Data de checkin', value: 'checkin' },
  { text: 'Data de checkout', value: 'checkout' },
  { text: 'Diárias', value: 'rates' },
  { text: 'Valor total', value: 'totalPrice' }
]

onMounted(async () => {
  if (authStore.getUser && authStore.getUser.id) {
    const response = await mockStore.fetchBookingsByUser(authStore.getUser.id);
    if (response) {
      const resolvedBookings = await Promise.all(response.map(async (b: BookingInterface) => {
        if (b.idHotel) {
          const hotel = await mockStore.fetchHotelById(b.idHotel);
          b.idHotel = hotel.name;
        }
        return b;
      }));

      bookings.value = resolvedBookings.map((booking) => {
        return {
          ...booking,
          checkin: moment(booking.checkin).format('L'),
          checkout: moment(booking.checkout).format('L'),
        }
      });
    }
  }
});

function formatTotalPrice(totalPrice: number) {
  return `R$ ${totalPrice}`
}
</script>
