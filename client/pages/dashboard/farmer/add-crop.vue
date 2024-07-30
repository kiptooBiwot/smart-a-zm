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
    <h3 class="text-xl font-bold text-gray-500 mb-5">
      Crop Registration / Planting
    </h3>
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
              Date of Planting
              <input id="date" v-model="date" type="date" name="date" />
            </label>
          </div>
          <div>
            <label for="crop_option" class="mt-4 text-xs">
              Crop Option
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
              Crop Option 1
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <div>
            <label for="gender" class="mt-4 text-xs">
              Crop Option 2
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <div>
            <label for="gender" class="mt-4 text-xs">
              Crop Option 3
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <div>
            <label for="gender" class="mt-4 text-xs">
              Crop Option 4
              <input id="gender" type="text" name="gender" />
            </label>
          </div>
          <!-- <div>
            <label for="country" class="mt-4 text-xs">
              Country
              <select id="country" name="country">
                <option value="">Select your country</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Somalia">Somalia</option>
                <option value="Malawi">Malawi</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Botswana">Botswana</option>
                <option value="Zambia">Zambia</option>
              </select>
            </label>
          </div>
          <div>
            <label for="phone_no" class="mt-4 text-xs">
              Mobile Phone Number
              <input id="phone_no" type="text" name="phone_no" />
            </label>
          </div> -->
        </div>
      </div>
    </fieldset>
    <div class="flex justify-between mt-5">
      <div class="flex">
        <button class="btn-warning px-10">Clear</button>
        <button class="btn-outline px-10">Cancel</button>
      </div>
      <div>
        <button class="btn-primary px-10">Submit</button>
      </div>
    </div>
  </div>
</template>

<style></style>
