<template>
  <section class="bg-gray-50 shadow px-4 py-4 w-full rounded">
    <form class="grid items-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4" @submit.prevent="searchHotels">
      <article class="relative">
        <div @click.stop="openModal('locale')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i :class="getIconClass('location')"></i>
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
            <i :class="getIconClass('checkin')"></i>
            Check-in
          </div>
          <span class="text-md text-gray-400">{{ localeDateCheckin }}</span>
        </div>
        <DateModal v-if="isHovered['checkin']" role="checkin" @close="closeModal('checkin')">
        </DateModal>
      </article>

      <article class="relative">
        <div @click.stop="openModal('checkout')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i :class="getIconClass('checkout')"></i>
            Check-out
          </div>
          <span class="text-md text-gray-400">{{ localeDateCheckout }}</span>
        </div>
        <DateModal v-if="isHovered['checkout']" role="checkout" @close="closeModal('checkout')">
        </DateModal>
      </article>

      <article class="relative min-w-max">
        <div @click.stop="openModal('guests')"
          class="px-6 py-3 shadow rounded text-center cursor-pointer hover:bg-slate-100 active:bg-gray-300 transition-colors">
          <div class="font-bold">
            <i :class="getIconClass('users')"></i>
            Hóspedes
          </div>
          <span class="text-md text-gray-400">{{ hotelGuests }}</span>
        </div>
        <GuestModal v-if="isHovered['guests']" @close="closeModal('guests')">
        </GuestModal>
      </article>

      <Button class="mx-auto" text="Buscar" icon="fa fa-search" @click="searchHotels"></Button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getIconClass } from '@/utils';
import { DatePickerInterface, GuestsInterface, HoverKeys } from '@/interfaces';
import { useAppStore } from '@/stores/modules/app';
import moment from "moment";
import Button from './Button.vue';
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

const appStore = useAppStore();

const hotelGuests = computed(() => {
  return `Adultos: ${appStore.getAdults} | Crianças: ${appStore.getChildren} | Quartos: ${appStore.getRooms}`;
});

function searchHotels() {
  router.push({
    name: 'Hotéis',
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

function updateGuests({ adults, children, rooms }: GuestsInterface) {
  guests.value.adults = adults;
  guests.value.children = children;
  guests.value.rooms = rooms;
}

const localeDateCheckin = computed(() => moment(appStore.getCheckin).format('DD/MM/YYYY'))
const localeDateCheckout = computed(() => moment(appStore.getCheckout).format('DD/MM/YYYY'))
</script>
