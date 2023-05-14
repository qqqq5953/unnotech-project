<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <header class="relative bg-white p-3 text-xl">
    <slot name="left"></slot>
    <h2 class="text-center">{{ title }}</h2>
    <slot name="right"></slot>
  </header>
</template>