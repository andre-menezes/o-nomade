<template>
  <button :type="props.type" :disabled="props.disabled" class="
      px-4
      py-2
      shadow
      rounded
      cursor-pointer
      text-sm
      text-center
      text-white
      uppercase
      bg-primary
      hover:bg-primary-hover
      disabled:bg-gray-100
      disabled:text-gray-300
      disabled:cursor-default
      transition-colors" @click="handleClick
        " :class="props.small ? 'text-xs' : ''">
    <i v-if="props.icon" :class="props.icon" class="mr-2"></i>
    <span class="font-semibold">{{ props.text }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'ação'
  },
  icon: String,
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  emit('click')
}
</script>
