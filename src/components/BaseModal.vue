<script setup>
</script>

<template>
  <div class="fixed inset-0 bg-slate-200 z-50">
    <div class="flex flex-col h-full">
      <slot name="header"></slot>
      <slot name="body"></slot>
    </div>
  </div>
</template>