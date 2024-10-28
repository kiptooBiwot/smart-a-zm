<script setup>
import { useGeneralStore } from '@/stores/general.js'
import { useFarmStore } from '@/stores/farm.js'
import { onMounted } from 'vue'

const generalStore = useGeneralStore()
const farmStore = useFarmStore()
const toast = useToast()

definePageMeta({
  layout: 'dashboard',
})

const items = [
  {
    key: 'farms',
    label: 'Manage your farms',
    description:
      "Make changes to your account here. Click save when you're done.",
  },
  {
    key: 'password',
    label: 'Farm Maps',
    description:
      "Change your password here. After saving, you'll be logged out.",
  },
]

const openSlideover = ref(false)

const registerFarm = () => {
  openSlideover.value = true
}

const formData = ref({
  farmName: '',
  farmLogo: '',
  farmLogoUrl: '',
  farmDescription: '',
  farmOwnership: 'self-owned',
  farmAcreage: 0,
  farmWaterSource: '',
  isFarmIrrigated: false,
  handleFarmWasteMgt: false,
  wasteManagementDescription: '',
  farmFertilizer: 'organic',
  isFarmStructures: false,
  farmStructures: [],
  farmStructuresInput: '',
  farmEmployees: 0,
})
const showLocationModal = ref(false)
const file = ref(null)

const browse = () => {
  file.value.click()
}

const remove = () => {
  formData.value.farmLogo = undefined
  formData.value.farmLogoUrl = undefined
}
const uploadFile = (event) => {
  const files = event.target.files

  // let filename = files[0].name
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    formData.value.farmLogoUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  formData.value.farmLogo = files[0]
}

const handleFarmRegistration = async () => {
  try {
    generalStore.isLoading = true
    const data = new FormData()

    data.append('farmName', formData.value.farmName)
    data.append('image', formData.value.farmLogo)
    data.append('farmDescription', formData.value.farmDescription)
    data.append('farmOwnership', formData.value.farmOwnership)
    data.append('farmAcreage', formData.value.farmAcreage)
    data.append('farmWaterSource', formData.value.farmWaterSource)
    data.append('isFarmIrrigated', formData.value.isFarmIrrigated)
    data.append('handleFarmWasteMgt', formData.value.handleFarmWasteMgt)
    data.append(
      'wasteManagementDescription',
      formData.value.wasteManagementDescription
    )
    data.append('farmFertilizer', formData.value.farmFertilizer)
    data.append('isFarmStructures', formData.value.isFarmStructures)
    data.append('farmStructures', formData.value.farmStructures)
    data.append('farmStructuresInput', formData.value.farmStructuresInput)
    data.append('farmEmployees', formData.value.farmEmployees)

    const res = await farmStore.addNewFarm(data)

    console.log('RES SFC: ', res)

    if (res.status === 201) {
      toast.add({
        id: Math.random().toString().substring(2, 10),
        title: 'Success',
        description: res.message,
        icon: 'i-mdi-check-circle-outline',
        color: 'primary',
        timeout: 4000,
      })

      openSlideover.value = false
      generalStore.isLoading = false
    }
  } catch (error) {
    console.log(error)
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'ERROR',
      description: error.message,
      icon: 'i-mdi-alert-circle-outline',
      color: 'rose',
      timeout: 4000,
      // ui: "{ default: { color: 'bg-rose-100 text-rose-600' } }"
    })
    generalStore.isLoading = false
  }
}

function addStructure() {
  if (formData.value.farmStructuresInput.trim()) {
    // Update the array and reset the input field
    formData.value.farmStructures.push(
      formData.value.farmStructuresInput.trim()
    )
    formData.value.farmStructuresInput = ''
  }
}

function updateFarmStructures() {
  // Split the input into an array of structures and update the reactive array
  formData.value.farmStructures = formData.value.farmStructuresInput
    .split(',')
    .map((structure) => structure.trim())
    .filter((structure) => structure) // Remove any empty items
}

function removeStructure(index) {
  formData.value.farmStructures.splice(index, 1) // Remove the selected structure
  formData.value.farmStructuresInput = formData.value.farmStructures.join(', ')
}

const { farms } = storeToRefs(farmStore)
onMounted(() => {
  farmStore.getAllFarms()
})

const farmOwnershipOptions = [
  {
    value: 'self-owned',
    label: 'Self Owned',
  },
  {
    value: 'rented',
    label: 'Rental/Leased',
  },
]

const waterSource = [
  'River',
  'Borehole',
  'Stream',
  'Piped water',
  'Rain water',
  'Harvested Rain Water',
]

const irrigationStatus = [
  {
    value: 'true',
    label: 'Yes',
  },
  {
    value: 'false',
    label: 'No',
  },
]

const wasteManagement = [
  {
    value: 'true',
    label: 'Yes',
  },
  {
    value: 'false',
    label: 'No',
  },
]

const fertilizerUsed = [
  {
    value: 'organic',
    label: 'Organic / Manure',
  },
  {
    value: 'inorganic',
    label: 'Manufactured',
  },
]

const farmStructuresPresent = [
  {
    value: 'true',
    label: 'Yes',
  },
  {
    value: 'false',
    label: 'No',
  },
]
</script>

<template>
  <div class="w-full h-full py-10 px-5 bg-white rounded-xl mt-5">
    <div>
      <UTabs :items="items" class="w-full">
        <template #item="{ item }">
          <UCard>
            <template #footer>
              <div class="flex items-end justify-end">
                <UButton
                  @click="registerFarm"
                  icon="i-heroicons:plus-circle"
                  size="md"
                  color="yellow"
                  variant="solid"
                  label="Register a new farm"
                  :trailing="false"
                />
              </div>
            </template>

            <div v-if="item.key === 'farms'" class="space-y-3">
              <!-- Shows if there are no registered farms -->

              <div v-if="farms.length === 0" class="space-y-5">
                <h2 class="font-medium text-base">
                  You seem to have no registered farms. Do you want to register
                  a new farm?
                </h2>
                <UButton
                  @click="registerFarm"
                  size="sm"
                  variant="outline"
                  class="uppercase text-xs"
                  >Register A Farm</UButton
                >
              </div>

              <!-- Registered farms -->
              <div v-else class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <!-- Add farm cards here -->

                <!-- {{ farms[0].data }} -->
                <div v-for="(farm, index) in farms" :key="index">
                  <UCard class="">
                    <div class="flex gap-5">
                      <div>
                        <img
                          v-if="farm.farmLogo !== null"
                          :src="farm.farmLogo"
                          alt=""
                          class="w-[70px] h-[70px] object-contain"
                        />
                        <UIcon
                          v-else
                          name="i-heroicons:map"
                          class="w-[70px] h-[70px] text-apple-500"
                        />
                      </div>
                      <div class="flex-col space-y-3">
                        <div>
                          <h1 class="font-semibold text-lg font-heading">
                            {{ farm.farmName }}
                          </h1>
                          <p class="text-sm">
                            {{ farm.farmDescription }}
                          </p>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex gap-2 items-center text-sm">
                            <UIcon
                              name="i-heroicons-square-3-stack-3d"
                              class="w-5 h-5"
                            />
                            <span class="text-sm font-medium">Size </span>
                            <span class="text-apple-500 font-bold text-sm">
                              {{ farm.farmAcreage }} (Acres)
                            </span>
                          </div>
                          <div class="">
                            <div class="flex gap-2 items-center text-sm">
                              <UIcon name="i-heroicons-users" class="w-5 h-5" />
                              <span class="text-sm font-semibold"
                                >Employees</span
                              >
                              <span class="text-apple-500 font-bold text-sm">
                                {{ farm.farmEmployees }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template #footer>
                      <div class="flex gap-5">
                        <UButton
                          size="sm"
                          variant="outline"
                          class="uppercase text-xs"
                        >
                          Edit Farm
                        </UButton>
                        <UButton
                          size="sm"
                          variant="outline"
                          class="uppercase text-xs"
                        >
                          Delete Farm
                        </UButton>
                        <UButton
                          size="sm"
                          variant="outline"
                          class="uppercase text-xs"
                        >
                          Add Plant
                        </UButton>
                      </div>
                    </template>
                  </UCard>
                </div>
              </div>
            </div>
            <div v-else-if="item.key === 'password'" class="space-y-3">
              <div>
                <h4 class="font-heading text-xl text-gray-500">
                  Individual farm maps will be shown here
                </h4>
              </div>
            </div>

            <!-- <template #footer>
              <UButton type="submit" color="black">
                Save {{ item.key === 'account' ? 'account' : 'password' }}
              </UButton>
            </template> -->
          </UCard>
        </template>
      </UTabs>
    </div>

    <div>
      <USlideover
        v-model="openSlideover"
        prevent-close
        class="overflow-y-scroll"
      >
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
                class="text-xl font-bold leading-6 font-heading text-apple-500 dark:text-white"
              >
                Register a new farm
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="openSlideover = false"
              />
            </div>
          </template>
          <UCard>
            <UForm class="space-y-4">
              <BaseInput
                v-model="formData.farmName"
                label="Farm Name"
                placeholder="Enter then name of the farm"
                type="text"
              />
              <!-- <BaseInput
                v-model="formData.farmLogo"
                label="Farm Logo"
                placeholder="Upload a farm logo, if any..."
                type="file"
              /> -->
              <div class="block">
                <div class="mb-3">
                  <label for="profileImage" class="mt-4 text-sm">
                    Upload Farm Logo (Optional)
                  </label>
                </div>
                <div>
                  <input
                    ref="file"
                    type="file"
                    accept="images/*"
                    class="hidden w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs text-gray-500"
                    @change="uploadFile"
                  />
                  <div class="relative inline-block">
                    <img
                      :src="formData.farmLogoUrl"
                      class="rounded-lg w-36 h-24 object-contain border-0"
                      alt=""
                    />
                    <!-- :class="
                              $v.basicInfo.profilePic.$error
                                ? 'ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500'
                                : null
                            " -->
                    <div
                      class="absolute rounded-lg top-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center"
                    >
                      <button
                        class="text-white hover:bg-white rounded-full hover:bg-opacity-25 p-3 focus:outline-none transition duration-300 text-xs"
                        @click="browse"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                      <button
                        v-if="formData.farmLogo"
                        class="text-white hover:bg-white rounded-full hover:bg-opacity-25 p-3 focus:outline-none transition duration-300 text-xs"
                        @click="remove"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <UFormGroup label="Farm Description">
                <UTextarea
                  v-model="formData.farmDescription"
                  label="Farm Description"
                  placeholder="Enter your farm's description"
                />
              </UFormGroup>
              <URadioGroup
                v-model="formData.farmOwnership"
                legend="Farm Ownership Status"
                :options="farmOwnershipOptions"
              />
              <BaseInput
                v-model="formData.farmAcreage"
                label="Farm Size in acres"
                type="number"
                min="0"
              />
              <UFormGroup label="What is your farm's primary water source?">
                <USelect
                  v-model="formData.farmWaterSource"
                  :options="waterSource"
                />
              </UFormGroup>
              <URadioGroup
                v-model="formData.isFarmIrrigated"
                legend="Is your farm irrigated? (You have irrigation
              infrastructure setup)"
                :options="irrigationStatus"
              />
              <URadioGroup
                v-model="formData.handleFarmWasteMgt"
                legend="Do you have a farm waste management protocol?"
                :options="wasteManagement"
              />
              <div v-if="formData.handleFarmWasteMgt">
                <UFormGroup
                  label="How do you handle your organic and inorganic waste?"
                >
                  <UTextarea
                    v-model="formData.wasteManagementDescription"
                    label="Farm waste Management"
                    placeholder="Explain how you handle your farm waste, organic and inorganic"
                  />
                </UFormGroup>
              </div>
              <URadioGroup
                v-model="formData.farmFertilizer"
                legend="What is the primary type of fertilizer used in your farm?"
                :options="fertilizerUsed"
              />
              <!-- Farm Structures -->
              <URadioGroup
                v-model="formData.isFarmStructures"
                legend="Are there any farm structures in your farm?"
                :options="farmStructuresPresent"
              />
              <div class="space-y-2">
                <div class="mt-4">
                  <h3 class="text-sm">Current Farm Structures:</h3>
                  <ul class="flex flex-wrap gap-3">
                    <li
                      v-for="(structure, index) in formData.farmStructures"
                      :key="index"
                      class=""
                    >
                      <div class="flex items-center">
                        <UBadge variant="soft">{{ structure }}</UBadge>
                        <UIcon
                          @click="removeStructure(index)"
                          name="i-heroicons-x-mark-20-solid"
                          class="w-4 h-4 text-rose-500"
                        ></UIcon>
                      </div>
                      <!-- {{ structure }}
                      <UButton
                        type="button"
                        @click="removeStructure(index)"
                        color="error"
                        class="ml-2"
                        >Remove</UButton
                      > -->
                    </li>
                  </ul>
                </div>
                <UInput
                  v-model="formData.farmStructuresInput"
                  placeholder="Enter farm structures, separated by commas"
                  @blur="updateFarmStructures"
                ></UInput>
                <UButton @click="addStructure">Add Structure</UButton>
              </div>
              <BaseInput
                v-model="formData.farmEmployees"
                label="How many farmhand(s) has your farm employed?"
                type="number"
              />
              <!-- TODO: Add a farm location (longitude, latitude) picker -->
              <div class="space-y-3">
                <UButton
                  @click="showLocationModal = !showLocationModal"
                  variant="outline"
                  color="yellow"
                  >Set Farm Location</UButton
                >
                <UModal v-model="showLocationModal">
                  <dashboardPickLocation />
                </UModal>
              </div>
            </UForm>

            <template #footer>
              <div class="flex justify-between">
                <UButton
                  @click="openSlideover = false"
                  color="orange"
                  variant="ghost"
                  >Cancel</UButton
                >
                <!-- icon="i-heroicons-x-mark-20-solid" -->
                <UButton @click="handleFarmRegistration" color="yellow">
                  Register New Farm
                </UButton>
              </div>
            </template>
          </UCard>
          <!-- :error="" -->
        </UCard>
      </USlideover>
    </div>
  </div>
</template>
