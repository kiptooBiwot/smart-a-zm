<template>
  <div>
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div
        class="flex items-center justify-center md:px-10 md:py-4 sm:p-4 md:w-full"
      >
        <div class="w-full">
          <h1 class="text-xl font-semibold">Business Information</h1>
          <p class="text-sm text-gray-500">
            AVN needs to know if you are signing up as an Individual,
            Business/Company, or as a Non-profit Organization. Fill the form
            below.
          </p>
          <hr class="my-4 text-gray-100" />
          <div class="w-full space-y-4">
            <label for="" class="text-xs">Business Type</label>
            <div class="flex gap-10">
              <div>
                <label for="individual" class="mt-4 text-xs">
                  <input
                    v-model="businessType"
                    type="radio"
                    name="individual"
                    value="Individual"
                  />
                  Individual
                </label>
              </div>
              <div>
                <label for="company" class="mt-4 text-xs">
                  <input
                    v-model="businessType"
                    type="radio"
                    name="company"
                    value="Company"
                  />
                  Company
                </label>
              </div>
              <div>
                <label for="non_profit" class="mt-4 text-xs">
                  <input
                    v-model="businessType"
                    type="radio"
                    name="non_profit"
                    value="Non-profit"
                  />
                  Non-profit
                </label>
              </div>
            </div>
            <div>
              <label for="" class="text-xs">
                Account Type
                <select id="role" v-model="role" name="role">
                  <option value="">Select your designation</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Inspector">Inspector</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Consumer">Consumer</option>
                </select>
              </label>
            </div>
            <div>
              <label for="business_name" class="mt-4 text-xs">
                Business Name
                <input
                  id="business_name"
                  v-model="businessName"
                  type="text"
                  name=""
                  placeholder="Smart Farms / Private farm"
                />
              </label>
            </div>
            <div>
              <label for="address" class="mt-4 text-xs">
                Address
                <input
                  id="address"
                  v-model="address"
                  type="text"
                  placeholder="Address"
                  name=""
                />
              </label>
            </div>
            <div>
              <label for="address_one" class="mt-4 text-xs">
                Address 1 (Optional)
                <input
                  id="address_one"
                  v-model="addressOne"
                  type="text"
                  name=""
                  placeholder="Address 1 (Optional)"
                />
              </label>
            </div>
            <div class="flex gap-4">
              <div>
                <label for="zip_code" class="mt-4 text-xs">
                  Zip or Postal Code
                  <input
                    v-model="zipCode"
                    type="text"
                    name="zip_code"
                    placeholder="Zip or Postal Code"
                  />
                </label>
              </div>
              <div>
                <label for="city" class="mt-4 text-xs">
                  City / Town
                  <input
                    v-model="city"
                    type="text"
                    name="city"
                    placeholder="City / Town"
                  />
                </label>
              </div>
              <div>
                <label for="province" class="mt-4 text-xs">
                  Province / County
                  <input
                    v-model="provinceCounty"
                    type="text"
                    name="province"
                    placeholder="Province or County"
                  />
                </label>
              </div>
            </div>
            <div>
              <label for="country" class="mt-4 text-xs">
                Country
                <select id="country" v-model="country" name="country">
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
          </div>
          <hr class="my-8" />
          <button type="submit" class="btn-primary">
            <NuxtLink to="/dashboard"> Save Business Information </NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    businessType: '',
    businessName: '',
    address: '',
    addressOne: '',
    zipCode: '',
    city: '',
    provinceCounty: '',
    country: '',
    role: '',
  }),
}
</script>

<style></style>
