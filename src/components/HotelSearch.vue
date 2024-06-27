<template>
  <section v-if="hotelsToCompare.length"
    class="w-full overflow-x-auto mb-8 px-8 py-8 bg-white rounded shadow flex flex-col">
    <table class="w-max">
      <thead>
        <tr>
          <th v-for="item in headers" :key="item.value" class="text-center w-fit px-8">{{ item.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hotel in hotelsToCompare" :key="hotel.id">
          <td v-for="item in headers" :key="item.value" class="text-center">
            <template v-if="item.value === 'rating'">
              <i v-for="_n in hotel.rating" :class="getIconClass('star')"
                class="w-4 text-yellow-300 drop-shadow drop-shadow-black"></i>
            </template>
            <template v-else-if="item.value === 'action'">
              <Button small @click="moreDetails(hotel.id)" text="Mais detalhes" :icon="getIconClass('details')"
                class="my-2" />
            </template>
            <template v-else>
              {{ hotel[item.value as keyof HotelCompareInterface] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="w-full px-8 py-8 bg-white rounded shadow flex flex-col">
    <h2 class="text-2xl mb-14 font-semibold">
      <i :class="getIconClass('search')"></i>
      Veja o que nós encontramos
    </h2>

    <label class="font-medium mb-8">
      <i :class="getIconClass('sort')" class="mr-2 rotate-90"></i>
      Ordenar por:
      <select id="order-by" v-model="orderBy" class=" ml-2 mb-8 px-4 py-2 bg-slate-50 rounded outline-none">
        <option v-for="(label, key) in orderOptions" :key="key" :value="key" class="px-4 py-2 hover:bg-gray-300">
          {{ label }}
        </option>
      </select>
    </label>

    <article v-if="!hotels.length">
      <div class="text-center text-2xl py-8">
        <div class="mb-8">
          <i :class="getIconClass('sad')" class="mr-2"></i>
          Que pena! Não encontramos nenhum hotel nessa localidade.
        </div>
        <Button class="mx-auto" text="Voltar" icon="fa fa-angle-left" @click="previousRoute"></Button>
      </div>
    </article>

    <article v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center"
      :class="hotels.length < 4 ? `lg:grid-cols-${hotels.length} xl:grid-cols-${hotels.length}` : 'lg:grid-cols-3 xl:grid-cols-4'">
      <CardHotel v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" compare @selected="addToCompare" />
    </article>

    <Button v-if="!params?.locale && page < mockStore.maxPagination" class="w-max self-center mt-8" text="Carregar mais"
      @click="loadMore" :icon="getIconClass('load')" />
  </section>

  <BestRating v-if="!hotels.length" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useMocksStore } from '@/stores/modules/mocks';
import { useRouter } from 'vue-router';
import { getIconClass } from '@/utils';
import CardHotel from '@/components/CardHotel.vue';
import Button from './Button.vue';
import BestRating from './BestRating.vue';
import { HotelCompareInterface, HotelDataInterface, OrderBy, SearchParamsInterface } from '@/interfaces';
import { useAuthStore } from '@/stores/modules/auth';

const props = defineProps({
  params: { type: Object as () => SearchParamsInterface }
});

const hotels = ref<HotelDataInterface[]>([]);
const authStore = useAuthStore();
const mockStore = useMocksStore();

const loading = ref(false);

onBeforeMount(async () => {
  loading.value = true;
  try {
    if (props.params) {
      authStore.setGuestInfo(props.params)
    }
    hotels.value = props.params?.locale ? await mockStore.fetchHotelByLocale(props.params.locale) : await mockStore.fetchHotelData(page.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
})

const orderOptions: Record<OrderBy, string> = {
  none: '',
  rating: "Avaliação",
  pricePerNight: "Diária",
  locale: "Localização",
  name: "Nome"
};

const orderBy = ref<OrderBy>("none");

watch(orderBy, (val: OrderBy) => {
  switch (val) {
    case 'name':
      hotels.value = hotels.value.sort((a, b) => a.name.localeCompare(b.name))
      break;
    case 'locale':
      hotels.value = hotels.value.sort((a, b) => a.location.city.localeCompare(b.location.city))
      break;
    case 'rating':
      hotels.value = hotels.value.sort((a, b) => b.rating - a.rating)
      break;
    case 'pricePerNight':
      hotels.value = hotels.value.sort((a, b) => a.pricePerNight as number - b.pricePerNight as number)
      break;
    default:
      hotels.value = hotels.value.sort();
      break;
  }
});

const router = useRouter();

function previousRoute() {
  router.back();
}

const page = ref(1);

async function loadMore() {
  page.value++;
  await mockStore.fetchHotelData(page.value);
}

const hotelsToCompare = ref<HotelCompareInterface[]>([]);

function addToCompare(hotel: HotelDataInterface) {
  if (!hotelsToCompare.value.find((h) => h.id === hotel.id)) {
    const newHotel = {
      id: hotel.id,
      name: hotel.name,
      rating: hotel.rating,
      amenities: hotel.amenities.join(', '),
      description: hotel.description,
      pricePerNight: `R$${hotel.pricePerNight}`,
    }
    hotelsToCompare.value.push(newHotel);
  } else {
    hotelsToCompare.value = hotelsToCompare.value.filter((h) => h.id !== hotel.id)
  }
}

const headers = [
  { text: 'Nome do Hotel', value: 'name' },
  { text: 'Avaliação', value: 'rating' },
  { text: 'Comodidades', value: 'amenities' },
  { text: 'Diária', value: 'pricePerNight' },
  { text: '', value: 'action' },
]

function moreDetails(id: number) {
  router.push({ name: 'Hotel', params: { id } });
}
</script>
