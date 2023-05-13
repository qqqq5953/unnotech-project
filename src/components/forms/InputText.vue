<script setup>
import ErrorDisplay from "@/components/forms/ErrorDisplay.vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  errors: {
    type: Array,
    default: [],
  },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative">
    <input
      class="w-full px-4 py-2 border"
      :class="
        errors.length
          ? ' border-red-500 focus:outline-none'
          : ' border-transparent'
      "
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
    <ErrorDisplay :errors="errors" />
  </div>
</template>