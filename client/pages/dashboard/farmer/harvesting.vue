<script setup>
definePageMeta({
  layout: 'dashboard',
})

const cropType = ref('')
const cropVariety = ref('')
const date = ref('')
const cropOption = ref('')
</script>

<template>
  <div class="m-4 rounded-md p-10 bg-white shadow-md min-h-auto">
    <h3 class="text-xl font-bold text-gray-500 mb-5">Harvest a Crop</h3>
    <fieldset class="w-full border rounded-md p-5">
      <legend class="text-xs mx-4">Crop Details</legend>
      <div class="md:flex gap-5">
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="crop_type" class="mt-4 text-xs">
              Crop Type
              <input
                id="crop_type"
                v-model="cropType"
                type="text"
                name="crop_type"
              />
            </label>
          </div>
          <div>
            <label for="crop_variety" class="mt-4 text-xs">
              Crop Variety
              <input
                id="crop_variety"
                v-model="cropVariety"
                type="text"
                name=""
              />
            </label>
          </div>
          <div>
            <label for="date" class="mt-4 text-xs">
              Date of Harvesting
              <input id="date" v-model="date" type="date" name="date" />
            </label>
          </div>
          <div>
            <label for="crop_option" class="mt-4 text-xs">
              Quantity at harvest
              <input
                id="crop_option"
                v-model="cropOption"
                type="text"
                name=""
              />
            </label>
          </div>
        </div>
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="gender" class="mt-4 text-xs">
              Quality(Grade)
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <div>
            <label for="gender" class="mt-4 text-xs">
              Harvest Option 2
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <div>
            <label for="gender" class="mt-4 text-xs">
              Harvest Option 3
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <div>
            <label for="gender" class="mt-4 text-xs">
              Harvest Option 4
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
        </div>
      </div>
    </fieldset>
    <div class="flex justify-between mt-5">
      <div class="flex">
        <button class="btn-warning px-10">Clear</button>
        <button class="btn-outline px-10">Cancel</button>
      </div>
      <div>
        <button class="btn-primary px-10">Save</button>
      </div>
    </div>
  </div>
</template>

<style></style>
