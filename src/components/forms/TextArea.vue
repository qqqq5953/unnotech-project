<script setup>
import ErrorDisplay from "@/components/forms/ErrorDisplay.vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  isDisabled: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array,
    default: [],
  },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative">
    <textarea
      class="px-4 py-2 bg-white border w-full"
      :class="
        errors.length
          ? ' border-red-500 focus:outline-none'
          : ' border-transparent focus:outline-blue-300'
      "
      cols="30"
      rows="10"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="isDisabled"
    ></textarea>
    <ErrorDisplay :errors="errors" />
  </div>
</template>