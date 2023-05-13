<script setup>
import { computed } from "vue";

const props = defineProps({
  errors: Array,
});

const errorDisplay = computed(() => {
  return props.errors.filter((error) => error);
});
</script>

<template>
  <div class="absolute flex space-x-2">
    <small
      class="text-red-500"
      v-for="(error, index) in errorDisplay"
      :key="index"
      >{{ error }}</small
    >
  </div>
</template>