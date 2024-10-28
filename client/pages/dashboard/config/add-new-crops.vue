<script setup>
import { useCropsStore } from '@/stores/crops'
import { useGeneralStore } from '@/stores/general'
import { useDeleteModalStore } from '@/stores/deleteModal'
import { storeToRefs } from 'pinia'
const baseUrl = `${import.meta.env.VITE_BASE_URL}`
const imageBaseUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}`

definePageMeta({
  layout: 'dashboard',
})

const cropsStore = useCropsStore()
const generalStore = useGeneralStore()
const toast = useToast()
const { crops } = storeToRefs(cropsStore)
const deleteModalStore = useDeleteModalStore()

onMounted(async () => {
  await cropsStore.getAllCrops()
  // crops.value = cropsStore.crops
})

const columns = ref([
  { key: 'cropImage', label: 'Image' },
  { key: 'name', label: 'Name' },
  { key: 'varieties', label: 'Varieties' },
  // { key: 'cost', label: 'Cost Over Time' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'actions', label: 'Actions' },
])

const isModalOpen = ref(false)
const addNewCrop = () => {
  isModalOpen.value = true
}

const name = ref('')
const varieties = ref([])
const cropImage = ref('')
let cropImageUrl = ref('')

const newVariety = ref('')

const isEditMode = ref(false)

const closeModal = () => {
  if (isEditMode) {
    isEditMode.value = false
    varieties.value = []
    name.value = ''
    cropImage.value = ''
    cropImageUrl.value = ''
  }

  isModalOpen.value = false
}

const addNewVariety = () => {
  if (newVariety.value.trim() !== '') {
    varieties.value.push(newVariety.value.trim())
    newVariety.value = ''
  }
}

const removeVariety = (index) => {
  varieties.value.splice(index, 1)
}

const editCrop = async (crop) => {
  // Implement your edit logic here
  isEditMode.value = true

  await cropsStore.getSingleCrop({ _id: crop._id })
  // console.log('SINGLE CROP:', cropsStore?.crop)

  if (cropsStore.crop) {
    name.value = cropsStore.crop.name
    varieties.value = cropsStore.crop.varieties
    cropImageUrl.value = cropsStore.crop.cropImage

    isModalOpen.value = true
  }

  // if (isEditMode) {
  //   cropImage.value !== ''
  //     ? (cropImageUrl.value = '')
  //     : (cropImage.value = cropsStore.crop.cropImageUrl)
  // }
}

// watch(
//   () => cropImage.value,
//   (newFile) => {
//     if (newFile) {
//       cropImageUrl = URL.createObjectURL(newFile) // Show the preview of the new file
//     }
//   }
// )

const deleteConfirm = ref(false)
const proceedToDelete = ref(false)

const handleDelete = async (item) => {
  try {
    if (deleteModalStore.itemToDelete) {
      // Make an API call
      const response = await cropsStore.deleteCrop(
        deleteModalStore.itemToDelete._id
      )

      // console.log('DELETE RESPONSE: ' + response)

      if (response.status === 200) {
        deleteModalStore.closeModal()
        toast.add({
          id: Math.random().toString().substring(2, 10),
          title: 'Success',
          description: response.data.message,
          icon: 'i-mdi-check-circle-outline',
          color: 'primary',
          timeout: 4000,
        })
      }
    } else {
      deleteModalStore.closeModal()
      return toast.add({
        id: Math.random().toString().substring(2, 10),
        title: 'Item to Delete Missing',
        description: 'The to be deleted is not available',
        icon: 'i-mdi-check-circle-outline',
        color: 'rose',
        timeout: 4000,
      })
    }
  } catch (error) {
    deleteModalStore.closeModal()
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'ERROR',
      description: error.message,
      icon: 'i-mdi-alert-circle-outline',
      color: 'rose',
      timeout: 4000,
      // ui: "{ default: { color: 'bg-rose-100 text-rose-600' } }"
    })
  }
}

const viewCrop = (crop) => {
  console.log('View', crop)
  // Implement your view logic here
  cropsStore.getSingleCrop({ _id: crop._id })
  cropsStore.showSingleCropModal = true
}

// Handle Image upload
const file = ref(null)

const browse = () => {
  file.value.click()
}

const remove = () => {
  cropImage.value = undefined
  cropImageUrl.value = undefined
}
const uploadFile = (event) => {
  const files = event.target.files

  // let filename = files[0].name
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    cropImageUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  cropImage.value = files[0]
}

const handleCropRegistration = async (id) => {
  // generalStore.isLoading = true
  const data = new FormData()

  data.append('name', name.value)
  // data.append('varieties', varieties.value)
  // Append each variety individually
  varieties.value.forEach((variety) => {
    data.append('varieties', variety)
  })

  if (cropImage.value) {
    data.append('image', cropImage.value)
  }

  if (isEditMode.value === true) {
    try {
      generalStore.isLoading = true

      const response = await cropsStore.updateCrop(data, id)

      console.log('UPDATE RESPONSE:', response)

      if (response.status == 200) {
        generalStore.isLoading = false
        isEditMode.value = false
        isModalOpen.value = false

        toast.add({
          id: Math.random().toString().substring(2, 10),
          title: 'Success',
          description: response.data.message,
          icon: 'i-mdi-check-circle-outline',
          color: 'primary',
          timeout: 4000,
        })
      }
    } catch (error) {
      // console.log('UPDATE ERROR: ' + error)

      isEditMode.value = false
      generalStore.isLoading = false
      isModalOpen.value = false

      toast.add({
        id: Math.random().toString().substring(2, 10),
        title: 'ERROR',
        description: error.message,
        icon: 'i-mdi-alert-circle-outline',
        color: 'rose',
        timeout: 4000,
      })
    }
  } else {
    try {
      const res = await cropsStore.registerCrop(data)
      if (res.status === 201) {
        toast.add({
          id: Math.random().toString().substring(2, 10),
          title: 'Success',
          description: res.data.message,
          icon: 'i-mdi-check-circle-outline',
          color: 'primary',
          timeout: 4000,
        })

        name.value = ''
        varieties.value = []
        cropImage.value = ''
        cropImageUrl.value = ''

        isModalOpen.value = false
        generalStore.isLoading = false
      }
    } catch (error) {
      // console.log('FE CREATE ERROR', error)
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
      isModalOpen.value = false
    }
  }
}
</script>
<template>
  <div class="w-full min-h-screen bg-white mt-5 px-5 py-5">
    <!-- Delete Alert -->
    <div v-if="deleteModalStore.showModal">
      <UModal
        v-model="deleteModalStore.showModal"
        variant="subtle"
        color="rose"
        prevent-close
      >
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Are you sure you want to delete the crop?
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="deleteModalStore.closeModal"
              />
            </div>
          </template>

          <div class="space-y-5">
            <p class="text-sm">
              By confirming, the crop will be permanently deleted from the
              database.
            </p>
            <div class="flex justify-between">
              <UButton
                @click="deleteModalStore.closeModal"
                color="gray"
                variant="outline"
                size="xs"
                label="Cancel"
              />
              <!-- icon="i-heroicons-x-mark-20-solid" -->
              <UButton
                @click="handleDelete"
                color="red"
                variant="soft"
                icon="i-heroicons-trash-solid"
                class="mr-3"
                size="xs"
              >
                Delete
              </UButton>
            </div>
          </div>

          <!-- <template #footer>
          </template> -->
        </UCard>
      </UModal>
    </div>

    <!-- Show a single crop's details Modal -->
    <div v-if="cropsStore.showSingleCropModal">
      <UModal v-model="cropsStore.showSingleCropModal" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ cropsStore.crop.name }}
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="cropsStore.closeSingleCropModal"
              />
            </div>
          </template>

          <div class="flex flex-col gap-5">
            <div>
              <img
                :src="`${imageBaseUrl}${cropsStore.crop.cropImage}`"
                alt="Crop Image"
                class="w-full rounded-lg object-cover h-[200px]"
              />
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-700 mb-3">
                Varieties:
              </div>
              <div class="flex flex-wrap gap-3 gap-y-1">
                <div
                  v-for="variety in cropsStore.crop.varieties"
                  :key="variety"
                  class="text-sm font-semibold text-gray-800"
                >
                  <UBadge color="apple" size="lg" variant="subtle">
                    {{ variety }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </UModal>
    </div>

    <div class="flex justify-between items-center">
      <h3 class="font-bold mb-5 text-xl">Manage all Crops</h3>
      <UButton
        @click="addNewCrop"
        icon="i-heroicons-plus-small-solid"
        size="sm"
        color="yellow"
        variant="soft"
        >Add A Crop</UButton
      >
    </div>

    <UCard>
      <UTable :columns="columns" :rows="crops" class="w-full">
        <template #cropImage-data="{ row }">
          <div class="flex justify-start">
            <img
              :src="`${imageBaseUrl}${row.cropImage}?`"
              alt="Crop Image"
              class="w-[120px] rounded-lg object-contain h-[60px] justify-left"
            />
          </div>
        </template>

        <template #name-data="{ row }">
          <div>
            <p class="text-base">{{ row.name }}</p>
          </div>
        </template>

        <template #varieties-data="{ row }">
          <div class="flex flex-wrap items-center gap-2">
            <div
              v-for="(variety, index) in row.varieties"
              :key="index"
              class=""
            >
              <UBadge size="xs" :label="variety" variant="subtle" />
            </div>
          </div>
        </template>

        <template #createdBy-data="{ row }">
          <div>
            <span
              >{{ row.createdBy.firstName }} {{ row.createdBy.surname }}</span
            >
            <span></span>
          </div>
        </template>

        <!-- #cell(actions)="props" -->
        <template #actions-data="{ row }">
          <div class="flex gap-3">
            <UIcon
              name="i-heroicons-pencil-square"
              class="cursor-pointer text-gray-700 hover:text-apple-500 w-5 h-5"
              @click="editCrop(row)"
            />
            <UIcon
              name="i-heroicons-trash"
              class="cursor-pointer text-red-700 hover:text-red-500 w-5 h-5"
              @click="deleteModalStore.openModal(row)"
            />
            <UIcon
              name="i-heroicons-eye"
              class="cursor-pointer text-gray-700 hover:text-green-500 w-5 h-5"
              @click="viewCrop(row)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <div>
      <UModal v-model="isModalOpen" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold leading-6 text-apple-500">
                <span v-if="isEditMode">Edit a Crop</span>
                <span v-else>Add a New Crop</span>
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="closeModal"
              />
            </div>
          </template>

          <div class="space-y-5">
            <UFormGroup label="Crop Name">
              <UInput
                v-model="name"
                type="text"
                placeholder="Enter the name of the crop"
              />
            </UFormGroup>
            <UDivider />

            <UFormGroup
              label="Crop's varieties: (Type the variety and press the button to add)"
            >
              <div class="flex gap-5 items-center">
                <UInput
                  type="text"
                  id="varieties"
                  v-model="newVariety"
                  class="flex-1"
                />
                <UButton
                  icon="i-heroicons-plus"
                  @click="addNewVariety"
                  color="yellow"
                  :trailing="false"
                  variant="outline"
                  size="xs"
                >
                  Add Variety
                </UButton>
              </div>
              <div></div>
              <ul class="flex flex-wrap gap-3 mt-3">
                <UBadge
                  v-for="(variety, index) in varieties"
                  :key="index"
                  variant="subtle"
                  class="gap-3"
                >
                  {{ variety }}
                  <UIcon
                    @click="removeVariety(index)"
                    name="i-heroicons-x-mark"
                    class="w-4 h-4 text-apple-500 cursor-pointer hover:text-rose-500"
                  >
                  </UIcon>
                </UBadge>
              </ul>
            </UFormGroup>

            <!-- <div v-for="(variety, index) in varieties" :key="index">
              <UFormGroup :label="`Variety # ${index + 1}`" class="">
                <div class="w-full flex items-center gap-3">
                  <UInput
                    v-model="varieties[index]"
                    type="text"
                    placeholder="Enter the variety"
                    class="w-full flex-1"
                  />
                  <UIcon
                    name="i-heroicons-trash"
                    class="cursor-pointer text-red-700 hover:text-red-500 w-6 h-6"
                    @click="removeVariety(index)"
                  />
                </div>
              </UFormGroup>
            </div>
            <div class="flex justify-end">
              <UButton
                @click="addNewVariety"
                icon="i-heroicons-plus"
                size="xs"
                color="yellow"
                square
                label="Add Variety"
                variant="outline"
              />
            </div> -->
            <UDivider />
            <div class="block">
              <div class="mb-3">
                <label for="profileImage" class="mt-4 text-sm">
                  Upload the Crop Image
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
                    v-if="isEditMode"
                    :src="cropImageUrl || `${imageBaseUrl}${cropImageUrl}`"
                    class="rounded-lg w-36 h-24 object-contain border-0"
                    alt=""
                  />
                  <img
                    v-else
                    :src="cropImageUrl"
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
                      v-if="cropImage"
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
              <UDivider />
              <div class="flex justify-between py-5">
                <UButton
                  @click="closeModal"
                  variant="outline"
                  size="sm"
                  color="orange"
                  label="Cancel"
                />
                <!-- :disabled="" -->
                <UButton
                  @click="handleCropRegistration(cropsStore?.crop?._id)"
                  :loading="generalStore.isLoading"
                  loading-icon="i-eos-icons-loading"
                  size="sm"
                  color="apple"
                >
                  {{ isEditMode ? 'Update' : 'Save' }}
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </UModal>
    </div>
  </div>
</template>
