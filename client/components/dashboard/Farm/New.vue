<script setup>
const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update: modelValue'])

// Internal state that mirrors the prop
const internalValue = ref(props.modelValue)

// Watch for changes in internalValue and emit the update event
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Watch for changes in the prop and update internalValue
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

// Method to update value, accessible by the parent
const updateValue = (newValue) => {
  internalValue.value = newValue
}
</script>

<template>
  <div>
    <USlideover v-model="modelValue" prevent-close>
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Slideover
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <Placeholder class="h-full" />
      </UCard>
    </USlideover>
  </div>
</template>

<style lang="scss" scoped></style>
