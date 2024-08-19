<script setup>
const props = defineProps({
  modelValue: {
    type: String || number,
    // default: '' || 0,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const inputValue = ref(props.modelValue)

const emit = defineEmits(['update:inputValue'])

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <UFormGroup :label="label" eager-validation>
    <UInput
      v-model="inputValue"
      :placeholder="placeholder"
      :type="type"
      size="sm"
      :class="[
        error ? 'border-rose-500' : '',
        disabled ? 'bg-gray-100 cursor-not-allowed' : '',
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-rose-500">{{ error }}</p>
  </UFormGroup>
</template>
