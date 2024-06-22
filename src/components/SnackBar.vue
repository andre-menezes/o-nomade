<template>
  <div class="absolute bottom-6 rounded shadow mx-auto py-4 px-8 text-lg text-center text-semibold text-white"
    :class="backgroundClass">
    {{ props.msg }}
  </div>
</template>

<script setup lang="ts">
import { SnackBarStatus } from '@/interfaces';

const props = defineProps<{
  status: SnackBarStatus;
  msg: string;
}>();

const snackBackground = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
} as const;

const backgroundClass = snackBackground[props.status as keyof typeof snackBackground];
</script>
