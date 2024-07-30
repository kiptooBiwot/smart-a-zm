<script setup>
definePageMeta({
  layout: 'dashboard',
})

const crops = ref([
  {
    cropType: 'Coffee',
    cropVariety: 'Arabica',
    quantity: '5',
    pricePerKilo: '50',
    cropImage:
      'https://images.pexels.com/photos/773958/pexels-photo-773958.jpeg',
  },
  {
    cropType: 'Coffee',
    cropVariety: 'Robusta',
    quantity: '700',
    pricePerKilo: '70',
    cropImage:
      'https://images.pexels.com/photos/7125712/pexels-photo-7125712.jpeg',
  },
  {
    cropType: 'Maize',
    cropVariety: 'Hybrid 6-14',
    quantity: '100',
    pricePerKilo: '2',
    cropImage:
      'https://images.pexels.com/photos/10111854/pexels-photo-10111854.jpeg',
  },
])
</script>

<template>
  <div class="m-4 rounded-md p-10 bg-white shadow-md min-h-auto">
    <h3 class="text-xl font-bold text-gray-500 mb-5">Market / Sell a Crop</h3>
    <div
      v-for="(crop, index) in crops"
      :key="index"
      class="bg-white w-128 h-60 rounded-md mb-10 shadow-xl flex card border"
    >
      <img
        class="w-1/2 h-full rounded-l-md overflow-hidden"
        :src="crop.cropImage"
        :alt="crop.cropType"
      />
      <div class="w-full flex flex-col">
        <div class="p-4 pb-0 flex-1">
          <h3 class="font-bold text-2xl mb-1 text-primary">
            {{ crop.cropType }}
          </h3>
          <div class="text-lg font-semibold mb-2">
            {{ crop.cropVariety }}
          </div>
          <hr class="text-gray-100 mb-2" />
          <div class="block">
            <div class="text-lg mb-2 text-secondary">
              <span class="text-sm text-gray-600 font-medium"
                >Price: &nbsp; $</span
              >
              {{ crop.pricePerKilo }}.00<span
                class="text-lg text-gray-600 font-semibold"
                >&nbsp; /kilo</span
              >
            </div>
            <div class="text-lg text-secondary">
              <span class="text-sm text-gray-600 font-medium">Quantity:</span>
              {{ crop.quantity
              }}<span class="text-lg text-gray-600 font-semibold"
                >&nbsp; tonnes</span
              >
            </div>
          </div>
        </div>
        <button class="btn-primary py-3 rounded-none">Publish for Sale</button>
      </div>
    </div>
  </div>
</template>

<style></style>
