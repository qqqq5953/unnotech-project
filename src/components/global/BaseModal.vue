<script setup>
import BaseContainer from "@/components/global/BaseContainer.vue";

const props = defineProps({
  modalTitle: String,
});
</script>

<template>
  <div class="fixed inset-0">
    <BaseContainer :headerTitle="modalTitle">
      <template #header-left-btn>
        <slot name="left"></slot>
      </template>
      <template #header-right-btn>
        <slot name="right"></slot>
      </template>
      <template #main>
        <slot name="body"></slot>
      </template>
    </BaseContainer>
  </div>
</template>