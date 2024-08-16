<script setup>
const options = ref([
  { id: 1, name: 'Kiptoo Biwot', img: '', phone: '+254723114297' },
  { id: 2, name: 'Kigen Kipchumba', img: '', phone: '+254723114297' },
  { id: 3, name: 'Chep Jep', img: '', phone: '+254723114297' },
  { id: 4, name: 'Alet Onder', img: '', phone: '+254723114297' },
  { id: 5, name: 'Boadf asdf', img: '', phone: '+254723114297' },
])

const selectedOptions = ref([])
const search = ref('')
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const phoneNumbers = ref([])

const toggleSelection = (option) => {
  if (isSelected(option)) {
    selectedOptions.value = selectedOptions.value.filter(
      (o) => o.id !== option.id
    )
    phoneNumbers.value = selectedOptions.value.filter(
      (item) => item.id !== option.id
    )
  } else {
    phoneNumbers.value.push(option.phone)
    selectedOptions.value.push(option)
  }
}

const isSelected = (option) => {
  return selectedOptions.value.some((o) => o.id === option.id)
}

const selectAll = () => {
  if (
    selectedOptions.value.length === options.value.length ||
    phoneNumbers.value.length === options.value.length
  ) {
    selectedOptions.value = []
    phoneNumbers.value = []
  } else {
    selectedOptions.value = [...options.value]
    phoneNumbers.value = [...options.value]
  }
}

const filteredOptions = computed(() => {
  return options.value.filter((option) =>
    option.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const selectedText = computed(() => {
  return selectedOptions.value.map((o) => o.name).join(', ')
})

// const phoneNumbers = ref([])

// const selectedNumber = computed(() => {
//   return selectedOptions.value.map((item) => {
//     phoneNumbers.value.push(item.phone)
//   })
// })
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <label for="" class="text-sm mb-1"
      >Select the users to send an SMS to</label
    >
    <div class="relative">
      <button
        @click="toggleDropdown"
        type="button"
        class="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <span class="block truncate">{{
          selectedOptions.length > 0 ? selectedText : 'Select options'
        }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <!-- <ChevronDownIcon class="w-5 h-5 text-gray-400" /> -->
          <UIcon
            name="i-heroicons:chevron-down-20-solid"
            class="w-5 h-5 text-gray-400"
          />
        </span>
      </button>

      <div
        v-if="isOpen"
        class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        <div class="px-2 pt-2">
          <input
            v-model="search"
            type="text"
            placeholder="Search..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apple-500 focus:border-apple-500 sm:text-sm"
          />
        </div>
        <div
          class="cursor-pointer select-none relative py-2 pl-10 pr-4 text-indigo-600 font-semibold"
          @click="selectAll"
        >
          <span class="block truncate">Select All</span>
        </div>
        <div
          v-for="option in filteredOptions"
          :key="option.id"
          class="cursor-pointer select-none relative py-2 pl-10 pr-4"
          @click="toggleSelection(option)"
        >
          <span
            :class="{
              'font-semibold': isSelected(option),
              'font-normal': !isSelected(option),
            }"
            class="block truncate"
          >
            <!-- {{ option.name }} -->

            <div class="flex gap-2">
              <div>
                <img :src="option.image" alt="" class="w-8 h-8 rounded-full" />
              </div>
              <div class="flex flex-col">
                <h4 class="text-sm">{{ option.name }}</h4>
                <p class="text-xs">{{ option.phone }}</p>
              </div>
            </div>
            <UDivider />
          </span>

          <span
            v-if="isSelected(option)"
            class="absolute inset-y-0 left-0 flex items-center pl-3 text-apple-500"
          >
            <!-- <CheckIcon class="w-5 h-5" /> -->
            <UIcon name="i-heroicons:check-20-solid" class="w-5 h-5" />
          </span>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <UTextarea />
    </div>
    <UButton label="Send SMS" />
  </div>
</template>

<style>
/* Additional styling for icons or other elements can be added here */
</style>
