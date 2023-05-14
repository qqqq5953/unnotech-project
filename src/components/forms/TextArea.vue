<script setup>
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
  <textarea
    class="px-4 py-2 bg-white"
    cols="30"
    rows="10"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :disabled="isDisabled"
  ></textarea>
</template>