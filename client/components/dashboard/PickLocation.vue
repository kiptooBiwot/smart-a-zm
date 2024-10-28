<template>
  <div>
    <!-- <UButton @click="openModal">Select Location</UButton> -->

    <!-- <UModal v-model:show="isModalOpen" size="lg" title="Select Your Location"> -->
    <div class="h-96">
      <!-- :accessToken="$config.public.mapbox.accessToken" -->
      <!-- :accessToken="$config.public.mapbox.accessToken" -->
      <MapboxMap
        :mapOptions="mapOptions"
        @click="setLocation"
        class="h-full w-full"
        ref="mapRef"
      >
        <MapboxDefaultMarker
          v-if="location.longitude && location.latitude"
          marker-id="location-marker"
          options="{}"
          :lngLat="[location.longitude, location.latitude]"
        />
      </MapboxMap>
    </div>
    <div class="py-10 bg-white">
      LONGITUDE:{{ location.longitude }} LATITUDE: {{ location.latitude }}
    </div>
    <!-- </UModal> -->
  </div>
</template>

<script setup>
// const isModalOpen = ref(false)
const mapOptions = ref({
  // style: 'mapbox://styles/mapbox/light-v11', // style URL
  center: [36.0, 0.3], // starting position
  zoom: 18, // starting zoom
})

const location = ref({
  longitude: null,
  latitude: null,
})

// const openModal = () => {
//   isModalOpen.value = true
// }

const setLocation = (event) => {
  const { lng, lat } = event.lngLat
  location.value.longitude = lng
  location.value.latitude = lat
  console.log('Selected location:', location.value)
  console.log('LONGITUDE:', location.value.longitude)
  console.log('LATITUDE:', location.value.latitude)
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
