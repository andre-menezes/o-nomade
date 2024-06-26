<template>
  <article class="absolute top-0 left-0 w-full h-screen flex justify-center items-start pt-28 md:pt-40">
    <div class="relative px-8 py-2 min-w-80 w-2/3 bg-white rounded shadow">
      <div class="absolute right-2">
        <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
          @click="handleClick">
          <i :class="getIconClass('close')" class="w-4 h-4"></i>
        </div>
      </div>

      <h2 class="text-2xl text-center font-bold my-4">Reserva</h2>

      <form class="">
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start text-center">
          <div class="flex flex-col">
            <article class="relative mb-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
              <i :class="getIconClass('user')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="userData.name" required placeholder="Nome Completo" type="text"
                class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <article class="relative mb-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
              <i :class="getIconClass('mail')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="userData.email" required placeholder="E-mail" type="email"
                class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <article class="relative mb-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
      disabled:cursor-default">
              <i :class="getIconClass('document')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="userData.cpf" required v-maska="'###.###.###-##'" placeholder="CPF (apenas números)"
                type="text" class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <article class="relative mb-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
      disabled:cursor-default">
              <i :class="getIconClass('phone')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="userData.phone" required v-maska="['(##) ####-####', '(##) #####-####']"
                placeholder="Telefone (apenas números)" type="tel"
                class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <article class="relative mb-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
      disabled:cursor-default">
              <i :class="getIconClass('calendar')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="userData.birthDate" required v-maska="'##/##/####'" placeholder="Data de nascimento"
                type="text" class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <article class="font-medium mb-4 flex items-center">
              <i :class="getIconClass('card')" class="text-gray-200"></i>
              <select id="order-by" v-model="paymentMethod"
                class="w-full ml-2 px-2 py-2 bg-slate-50 rounded shadow outline-none">
                <option v-for="(label, key) in paymentOptions" :key="key" :value="key"
                  class="px-4 py-2 bg-white hover:bg-gray-300">
                  {{ label }}
                </option>
              </select>

            </article>

            <div v-if="paymentMethod !== 'pix'" class="mb-4">
              <article class="relative flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
            disabled:cursor-default">
                <i :class="getIconClass('visa')" class="absolute left-0 px-2 text-gray-200"></i>
                <input v-model="userData.paymentMethod.cardNumber" required v-maska="'#### #### #### ####'"
                  placeholder="Número do cartão" type="text"
                  class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
              </article>
              <article class="flex gap-4 mt-4">
                <article class="relative flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
            disabled:cursor-default">
                  <i :class="getIconClass('calendar')" class="absolute left-0 px-2 text-gray-200"></i>
                  <input v-model="userData.paymentMethod.expiryDate" required v-maska="'##/##'"
                    placeholder="Data expiração" type="text"
                    class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
                </article>
                <article class="relative flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
              disabled:cursor-default">
                  <i :class="getIconClass('card')" class="absolute left-0 px-2 text-gray-200"></i>
                  <input v-model="userData.paymentMethod.cvv" required v-maska="'###'" placeholder="CVV" type="text"
                    class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
                </article>
              </article>
            </div>
          </div>

          <section>
            <article class="relative my-4 mb-8 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
              <label class="absolute -top-5 text-md font-semibold">Checkin</label>
              <i :class="getIconClass('checkin')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="selectedCheckin" placeholder="Checkin" type="date"
                class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <article class="relative my-4 flex items-center shadow rounded text-sm disabled:bg-gray-100 disabled:text-gray-300 
        disabled:cursor-default">
              <label class="absolute -top-5 text-md font-semibold">Checkout</label>
              <i :class="getIconClass('checkout')" class="absolute left-0 px-2 text-gray-200"></i>
              <input v-model="selectedCheckout" placeholder="Checkout" type="date"
                class="w-full px-2 py-2 pl-8 focus:outline-2 focus:outline-blue-500" />
            </article>
            <GuestOptions />
          </section>
        </section>

        <section class="flex justify-center gap-10 py-8">
          <p class="text-lg font-bold">Diárias: <span class="py-2 px-4 rounded bg-blue-200/40">{{
            getDays(selectedCheckin, selectedCheckout) }}</span>
          </p>
          <p class="text-lg font-bold">Valor total: <span class="py-2 px-4 rounded bg-green-200/40">{{ totalPrice
              }}</span></p>
        </section>

        <Button class="w-full" text="Reservar" :icon="getIconClass('checkin')" @click="bookingHotel()" />
      </form>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref, watch } from 'vue';
import { getIconClass } from '@/utils';
import { BookingInterface, HotelDataInterface } from '@/interfaces';
import { useAppStore } from '@/stores/modules/app';
import { useAuthStore } from '@/stores/modules/auth';
import { useMocksStore } from '@/stores/modules/mocks';
import { useRouter } from 'vue-router';
import Button from '../Button.vue';
import GuestOptions from '../GuestOptions.vue';
import moment from 'moment';

const appStore = useAppStore();

const paymentMethod = ref('pix');

const userData = ref<BookingInterface>({
  idUser: 0,
  idHotel: 0,
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  cpf: '',
  paymentMethod: {
    pix: (paymentMethod.value === 'pix'),
    cardNumber: undefined,
    expiryDate: undefined,
    cvv: undefined,
  },
  rates: 0,
  totalPrice: 0
});

watch(paymentMethod, (val) => {
  userData.value.paymentMethod.pix = val === 'pix';
})

const authStore = useAuthStore();
const mockStore = useMocksStore();
const router = useRouter();

async function bookingHotel() {
  if (!authStore.getUser?.id) {
    router.push({ name: 'Login' })
  }
  const bookingData = userData.value;
  if (userData.value.paymentMethod.pix) {
    delete bookingData.paymentMethod.cardType;
    delete bookingData.paymentMethod.cardNumber;
    delete bookingData.paymentMethod.cvv;
    delete bookingData.paymentMethod.expiryDate;
  } else {
    delete bookingData.paymentMethod.pix;
  }
  bookingData.idUser = authStore.getUser?.id
  bookingData.idHotel = props.hotel.id
  bookingData.rates = getDays(appStore.getCheckin, appStore.getCheckout);
  bookingData.totalPrice = getDays(appStore.getCheckin, appStore.getCheckout) * props.hotel.pricePerNight;
  await mockStore.fetchBooking(bookingData);
  router.push({ name: 'Home' });
}

const paymentOptions = {
  pix: 'PIX',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito'
}

const emit = defineEmits(['close']);

function handleClick() {
  emit('close')
}

const selectedCheckin = ref(appStore.getCheckin)
const selectedCheckout = ref(appStore.getCheckout)

watch(selectedCheckin, (val) => {
  appStore.setCheckin(val);
  getDays(val, selectedCheckout.value);
})
watch(selectedCheckout, (val) => {
  appStore.setCheckout(val);
  getDays(selectedCheckin.value, val);
})

function getDays(start: string, end: string) {
  let checkin = moment(appStore.getCheckin);
  let checkout = moment(appStore.getCheckout);
  if (start && end) {
    checkin = moment(start);
    checkout = moment(end);
  }
  return checkout.diff(checkin, 'days');
}

const props = defineProps({
  hotel: {
    type: Object as () => HotelDataInterface,
    required: true
  },
})

const totalPrice = computed(() => getDays(selectedCheckin.value, selectedCheckout.value) * props.hotel.pricePerNight)
</script>{
idUser: undefined,
idHotel: undefined,
name: '',
email: '',
phone: '',
birthDate: '',
cpf: '',
paymentMethod: {
pix: (paymentMethod.value === 'pix'),
cardNumber: undefined,
expiryDate: undefined,
cvv: undefined,
},
rates: 0,
totalPrice: 0
}