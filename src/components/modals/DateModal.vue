<template>
  <section class="absolute z-10 w-96 mt-5 px-2 py-2 rounded shadow-lg bg-white flex flex-col">
    <div class="flex justify-center items-center px-1 py-1 self-end rounded-full cursor-pointer hover:bg-gray-50"
      @click="closeModal">
      <i :class="getIconClass('close')" class="mr-2"></i>
    </div>
    <h3 class="text-center text-lg font-semibold">
      <i :class="getIconClass('calendar')" class="mr-2"></i>
      Selecione a data do {{ props.role }}
    </h3>
    <div class="grow px-4 py-4 flex items-center justify-center">
      <input type="date" v-model="selectedDate" :min="minDate" class="border rounded p-2">
    </div>
  </section>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, defineEmits, onBeforeMount, ref, watch } from 'vue';
import { getIconClass } from '@/utils';
import { useAppStore } from '@/stores/modules/app';

const appStore = useAppStore();

const props = defineProps({
  role: {
    type: String,
    required: true,
    default: 'checkin'
  }
});

const emit = defineEmits(['close']);

const minDate = ref(appStore.getCheckin)

function closeModal() {
  emit('close');
}

const selectedDate = ref(moment().format('YYYY-MM-DD'));

watch(selectedDate, (val) => {
  if (props.role === 'checkin') {
    appStore.setCheckin(val)
    appStore.setCheckout(moment(val).add(1, 'd').format('YYYY-MM-DD'))
  } else {
    appStore.setCheckout(val)
  }
})

onBeforeMount(() => {
  if (props.role === 'checkin') {
    selectedDate.value = appStore.getCheckin
    minDate.value = appStore.getCheckin
  } else {
    selectedDate.value = appStore.getCheckout
    minDate.value = appStore.getCheckout
  }
})
</script>
