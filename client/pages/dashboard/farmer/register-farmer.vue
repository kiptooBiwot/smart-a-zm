<script setup>
definePageMeta({
  layout: 'dashboard',
})

const firstName = ref('')
const middleName = ref('')
const surname = ref('')
const idNumber = ref('')

// Farmer details
const maritalStatus = ref('')
const householdMembers = ref('')
const ageGroup = ref('')
const foodSecurity = ref('')
const averageIncome = ref('')
const marketingPlatform = ref('')
const farmingExperience = ref('')
const climateChange = ref('')
const languages = ref('')
const educationLevel = ref('')
const wasteManagement = ref('')
const usedDigitalEconomy = ref('')
const ownSmartPhone = ref('')
const phoneUse = ref([])

// Farm Details
const landAcrage = ref('')
const landOwnership = ref('')
const geocoordinates = ref({
  longitude: '',
  latitude: '',
})
const cropHistory = ref([
  {
    crop: '',
  },
])

// ...mapActions('farmer', ['saveFarmerDetails']),
const addNewCrop = () => {
  cropHistory.value.push({
    crop: '',
  })
}
const deleteCropInput = (index) => {
  cropHistory.value.splice(index)
}
const saveDetails = async () => {
  try {
    await this.saveFarmerDetails({
      // email: this.email,
      // password: this.password,
      // agreeTerms: this.agreeTerms,
      firstName: firstName.value,
      middleName: middleName.value,
      surname: surname.value,
      idNumber: idNumber.value,

      // Farmer Details
      maritalStatus: maritalStatus.value,
      householdMembers: householdMembers.value,
      ageGroup: ageGroup.value,
      foodSecurity: foodSecurity.value,
      averageIncome: averageIncome.value,
      marketingPlatform: marketingPlatform.value,
      farmingExperience: farmingExperience.value,
      climateChange: climateChange.value,
      languages: languages.value,
      educationLevel: educationLevel.value,
      wasteManagement: wasteManagement.value,
      usedDigitalEconomy: usedDigitalEconomy.value,
      ownSmartPhone: ownSmartPhone.value,
      phoneUse: phoneUse.value,

      // Farm Details
      landAcrage: landAcrage.value,
      landOwnership: landOwnership.value,
      geocoordinates: {
        longitude: geocoordinates.value.longitude,
        latitude: geocoordinates.value.latitude,
      },
      cropHistory: [
        {
          crop: crop.value,
        },
      ],
    })
    // this.$router.push('/basic-info')
  } catch (error) {
    return error.message
  }
}
</script>

<template>
  <div class="m-4 rounded-md p-10 bg-white shadow-md min-h-auto space-y-10">
    <h3 class="text-xl font-bold text-gray-500 mb-5">
      Farmer and Farm Details
    </h3>
    <fieldset class="w-full border rounded-md p-5">
      <legend class="text-xs mx-4">Farmer Details</legend>
      <div class="md:flex gap-5">
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="marital_status" class="mt-4 text-xs">
              Marital Status
              <input
                id="marital_status"
                v-model="maritalStatus"
                type="text"
                name="marital_status"
              />
            </label>
          </div>
          <div>
            <label for="householdMembers" class="mt-4 text-xs">
              Number of Household Members
              <input
                id="householdMembers"
                v-model.number="householdMembers"
                type="number"
                name=""
              />
            </label>
          </div>
          <div>
            <label for="age_group" class="mt-4 text-xs">
              Age Group
              <select
                id="age_group"
                v-model.number="ageGroup"
                type="text"
                name="age_group"
              >
                <option value="25">18 - 25</option>
                <option value="30">25 - 30</option>
                <option value="35">30 - 35</option>
                <option value="40">35 - 40</option>
                <option value="50">40 - 50</option>
                <option value="60">50 - 60</option>
                <option value="Above 60">60 and above</option>
              </select>
            </label>
          </div>
          <div>
            <label for="food_security" class="mt-4 text-xs">
              Is your household food secure?
              <input id="yes" type="radio" name="foodSecurity" value="Yes" />
              <label for="yes">Yes</label>
              <input id="no" type="radio" name="foodSecurity" value="No" />
              <label for="no">No</label>
            </label>
          </div>
          <div>
            <label for="avgIncome" class="mt-4 text-xs">
              Average Household Income per Annum / Harvest Season (KSH.)
              <select
                id="avgIncome"
                v-model.number="averageIncome"
                type="text"
                name="avgIncome"
              >
                <option value="100000">0 - 100,000</option>
                <option value="500000">100,000 - 500,000</option>
                <option value="1000000">500,000 - 1,000,000</option>
                <option value="3000000">1,000,000 - 3,000,000</option>
                <option value="5000000">3,000,000 - 5,000,000</option>
                <option value="Over 5000000">Over 5,000,000</option>
              </select>
            </label>
          </div>
          <div>
            <label for="marketing_platforms" class="mt-4 text-xs">
              What marketing platforms do you use?
              <input
                id="marketing_platforms"
                v-model="marketingPlatform"
                type="text"
                name="marketing_platforms"
              />
            </label>
          </div>
          <div>
            <label for="farming_experience" class="mt-4 text-xs">
              Farming Experience (How many years?)
              <input
                id="farming_experience"
                v-model.number="farmingExperience"
                type="text"
                name="farming_experience"
              />
            </label>
          </div>
          <div>
            <label for="climate_change" class="mt-4 text-xs">
              Do you have any knowledge on climate change?
              <input
                id="climate_change"
                v-model="climateChange"
                type="text"
                name="climate_change"
              />
            </label>
          </div>
        </div>
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="lang" class="mt-4 text-xs">
              Languages Spoken / Preffered Language
              <input id="lang" v-model="languages" type="text" />
            </label>
          </div>
          <div>
            <label for="educationLevel" class="mt-4 text-xs">
              Highest Education Attained
              <select id="educationLevel" v-model="educationLevel" type="text">
                <option value="No Formal Education">No Formal Education</option>
                <option value="Primary School Dropout">
                  Primary School Dropout
                </option>
                <option value="Primary Certificate">Primary Certificate</option>
                <option value="No Formal Education">High School Dropout</option>
                <option value="No Formal Education">High School Dropout</option>
                <option value="High School Certificate">
                  High School Certificate
                </option>
                <option value="Bachelors Degree">Bachelors Degree</option>
                <option value="Masters Degree">Masters Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </label>
          </div>
          <div>
            <label for="waste_management" class="mt-4 text-xs">
              Waste Mgt. (How do you dispose of your organic and inorganic farm
              waste?)
              <input
                id="waste_management"
                v-model="wasteManagement"
                type="text"
              />
            </label>
          </div>
          <div>
            <label for="digital_economy" class="mt-4 text-xs">
              do you use or have you used the digital economy, e.g. mPesa,
              bought goods online?
              <select
                id="digital_economy"
                v-model="usedDigitalEconomy"
                type="text"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>
          <div>
            <label for="phone_ownership" class="mt-4 text-xs">
              Do you own a smartphone?
              <select id="phone_ownership" v-model="ownSmartPhone" type="text">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>
          <div class="">
            <label for="phone_usage" class="mt-4 text-xs">
              If (yes) above, what do you use the smartphone for?
            </label>
            <div class="space-y-2 ml-8">
              <div class="">
                <input
                  v-model="phoneUse"
                  class="mr-2"
                  type="checkbox"
                  value="Communication"
                />Communication
              </div>
              <div>
                <input
                  v-model="phoneUse"
                  class="mr-2"
                  type="checkbox"
                  value="Work"
                />Work
              </div>
              <div>
                <input
                  v-model="phoneUse"
                  class="mr-2"
                  type="checkbox"
                  value="Internet Research"
                />Internet Research
              </div>
              <div>
                <input
                  v-model="phoneUse"
                  class="mr-2"
                  type="checkbox"
                  value="Entertainment"
                />Entertainment
              </div>
              <div>
                <input
                  v-model="phoneUse"
                  class="mr-2"
                  type="checkbox"
                  value="Social Media"
                />Social Media
              </div>
              <div>
                <input
                  v-model="phoneUse"
                  class="mr-2"
                  type="checkbox"
                  value="Email"
                />Email
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset class="w-full border rounded-md p-5">
      <legend class="text-xs mx-4">Farm Details</legend>
      <div class="md:flex gap-5">
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="land_acrage" class="mt-4 text-xs">
              Land Acrage
              <input
                id="land_acrage"
                v-model.number="landAcrage"
                type="number"
                name="land_acrage"
              />
            </label>
          </div>
          <!-- <div>
            <label for="land_acrage" class="mt-4 text-xs">
              Land Acrage
              <input
                id="land_acrage"
                v-model="landAcrage"
                type="text"
                name="land_acrage"
              />
            </label>
          </div> -->
          <div>
            <label for="land_ownership" class="mt-4 text-xs">
              Land Ownership
              <select
                id="land_ownership"
                v-model="landOwnership"
                type="text"
                name=""
              >
                <option value="Lease">Lease</option>
                <option value="Freehold">Freehold</option>
                <option value="Community">Community</option>
              </select>
            </label>
          </div>
          <div>
            <label for="surname" class="mt-4 text-xs">
              Land Geocoordinates
              <div class="flex gap-2">
                <input
                  id="longitude"
                  v-model.number="geocoordinates.longitude"
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                />
                <input
                  id="latitude"
                  v-model.number="geocoordinates.latitude"
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                />
              </div>
            </label>
          </div>
          <!-- <div>
            <label for="id_number" class="mt-4 text-xs">
              ID/Passport Number
              <input id="id_number" v-model="idNumber" type="text" name="" />
            </label>
          </div> -->
        </div>
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="crop_history" class="mt-4 text-xs">
              Crops Previously Grown
              <div class="gap-4">
                <div
                  v-for="(cropHist, index) in cropHistory"
                  :key="index"
                  class="flex gap-2 items-center"
                >
                  <input
                    id="crop_history"
                    v-model="cropHist.crop"
                    type="text"
                    placeholder="Crop previously grown on the farm"
                  />
                  <svg
                    class="w-8 h-8 text-red-500 hover:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    @click.prevent="deleteCropInput(index)"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <svg
                    class="w-8 h-8 text-accent hover:text-accent-one"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    @click.prevent="addNewCrop"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div class="h-full text-accent hover:text-accent-one">
                  <!-- <div class="">Add Crop</div> -->
                  <!-- <svg
                    class="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    @click.prevent="addNewCrop"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg> -->
                </div>
              </div>
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

    <!-- <fieldset class="w-full border rounded-md p-5">
      <legend class="text-xs mx-4">Farmer Details</legend>
      <div class="md:flex gap-5">
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="first_name" class="mt-4 text-xs">
              First Name
              <input
                id="first_name"
                v-model="firstName"
                type="text"
                name="first_name"
              />
            </label>
          </div>
          <div>
            <label for="middle_name" class="mt-4 text-xs">
              Middle Name
              <input
                id="middle_name"
                v-model="middleName"
                type="text"
                name=""
              />
            </label>
          </div>
          <div>
            <label for="surname" class="mt-4 text-xs">
              Surname
              <input
                id="surname"
                v-model="surname"
                type="text"
                name="surname"
              />
            </label>
          </div>
          <div>
            <label for="id_number" class="mt-4 text-xs">
              ID/Passport Number
              <input id="id_number" v-model="idNumber" type="text" name="" />
            </label>
          </div>
        </div>
        <div class="w-full md:w-1/2 space-y-2">
          <div>
            <label for="gender" class="mt-4 text-xs">
              Gender
              <select id="gender" name="gender">
                <option value="">Choose one</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Male">Other</option>
              </select>
            </label>
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </fieldset> -->
    <div class="flex justify-between mt-5">
      <div class="flex">
        <!-- <button class="btn-warning px-10">Clear</button> -->
        <button class="btn-outline px-10">Cancel</button>
      </div>
      <div>
        <button class="btn-primary px-10" @click.prevent="saveDetails">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
