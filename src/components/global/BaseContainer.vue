<script setup>
import BaseHeader from "@/components/global/BaseHeader.vue";

const props = defineProps({
  headerTitle: String,
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <BaseHeader :title="headerTitle">
      <template #left>
        <slot name="header-left-btn"></slot>
      </template>
      <template #right>
        <slot name="header-right-btn"></slot>
      </template>
    </BaseHeader>
    <main class="flex flex-col grow bg-slate-200">
      <slot name="main"></slot>
    </main>
  </div>
</template>