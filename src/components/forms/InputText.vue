<script setup>
import { ref } from "vue";
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

const inputTextRef = ref(null);
defineExpose({ inputTextRef });
</script>

<template>
  <div class="relative">
    <input
      class="w-full px-4 py-2 border bg-white"
      :class="
        errors.length
          ? ' border-red-500 focus:outline-none'
          : ' border-transparent focus:outline-blue-300'
      "
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="isDisabled"
      ref="inputTextRef"
    />
    <ErrorDisplay :errors="errors" />
  </div>
</template>