<template>
  <section class="bg-gray-50 shadow px-4 py-4 w-full rounded">
    <form class="grid items-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4" @submit.prevent="searchHotels">
      <article class="relative">
        <div @click.stop="openModal('locale')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i class="fa-solid fa-location-dot"></i>
            Onde?
          </div>
          <span class="text-md text-gray-400">{{ selectedLocale }}</span>
        </div>
        <LocaleModal v-show="isHovered['locale']" :data="locale" @close="closeModal('locale')" @data="updateLocale">
        </LocaleModal>
      </article>

      <article class="relative">
        <div @click.stop="openModal('checkin')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i class="fa-regular fa-calendar-check"></i>
            Check-in
          </div>
          <span class="text-md text-gray-400">{{ showDate(checkin) }}</span>
        </div>
        <DateModal v-if="isHovered['checkin']" role="check-in" :data="checkin" @close="closeModal('checkin')"
          @data="updateDate">
        </DateModal>
      </article>

      <article class="relative">
        <div @click.stop="openModal('checkout')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i class="fa-regular fa-calendar-xmark"></i>
            Check-out
          </div>
          <span class="text-md text-gray-400">{{ showDate(checkout) }}</span>
        </div>
        <DateModal v-if="isHovered['checkout']" role="check-out" :min="checkin" :data="checkout"
          @close="closeModal('checkout')" @data="updateDate">
        </DateModal>
      </article>

      <article class="relative">
        <div @click.stop="openModal('guests')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i class="fa-solid fa-users"></i>
            Hóspedes
          </div>
          <span class="text-md text-gray-400">{{ hotelGuests }}</span>
        </div>
        <GuestModal v-if="isHovered['guests']" @close="closeModal('guests')" :data="guests" @data="updateGuests">
        </GuestModal>
      </article>

      <Button class="mx-auto" text="Buscar" icon="fa fa-search" @click="searchHotels"></Button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from './utils/Button.vue';
import LocaleModal from './modals/LocaleModal.vue';
import DateModal from './modals/DateModal.vue';
import GuestModal from './modals/GuestModal.vue';

const router = useRouter();

const locale = ref('');
const checkin = ref(new Date());
const checkout = ref(new Date());
const guests = ref({ adults: 1, children: 0, rooms: 1 });

const selectedLocale = computed(() => {
  return locale.value ? locale.value : 'Busque um destino'
});

const hotelGuests = computed(() => {
  return `Adultos: ${guests.value.adults} | Crianças: ${guests.value.children} | Quartos: ${guests.value.rooms}`;
});

function searchHotels() {
  router.push({
    path: '/pesquisa',
    query: {
      locale: locale.value,
      checkin: checkin.value.toLocaleDateString() || '',
      checkout: checkout.value.toLocaleDateString() || '',
      adults: guests.value.adults.toString(),
      children: guests.value.children.toString(),
      rooms: guests.value.rooms.toString()
    }
  });
}

type HoverKeys = 'locale' | 'checkin' | 'checkout' | 'guests';

const isHovered = reactive({
  locale: false,
  checkin: false,
  checkout: false,
  guests: false,
});

function openModal(el: HoverKeys) {
  for (const key in isHovered) {
    isHovered[key as HoverKeys] = key === el;
  }
}

function closeModal(el: HoverKeys) {
  isHovered[el] = false;
}

function updateLocale(newLocale: string) {
  locale.value = newLocale;
}

interface DatePicker {
  role: string,
  value: string,
}

function updateDate({ role, value }: DatePicker) {
  if (role === 'check-in') {
    checkin.value = new Date(value);
    if (checkout.value < checkin.value) {
      checkout.value = checkin.value
    }
  } else {
    checkout.value = new Date(value);
  }
}

function showDate(date: Date) {
  return date.toLocaleDateString();
}

interface Guests {
  adults: number,
  children: number,
  rooms: number,
}

function updateGuests({ adults, children, rooms }: Guests) {
  guests.value.adults = adults;
  guests.value.children = children;
  guests.value.rooms = rooms;
}
</script>