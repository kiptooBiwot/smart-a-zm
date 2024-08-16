<script setup>
import { useAuthStore } from '~/stores/auth.js'
import { useGeneralStore } from '~/stores/general.js'
import { RegisterValidationSchema } from '~/validation_schema/RegisterSchema.ts'

const authStore = useAuthStore()
const generalStore = useGeneralStore()
const toast = useToast()
const router = useRouter()

definePageMeta({
  layout: 'auth',
})

const state = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
  // profile information
  firstName: '',
  middleName: '',
  surname: '',
  dob: '',
  role: '',
  profilePic: '',
  gender: '',
  country: '',
  city: '',
  mobileNumber: '',
  imageUrl: null,
  // Verification code
  code: '',
})

// const profilePic = ref(null)
const file = ref(null)

const currentStep = (stepNumber) => {
  authStore.step = stepNumber
}

const registerUser = async (event) => {
  generalStore.isLoading = true

  const res = await authStore.registerUser({
    email: state.email,
    password: state.password,
    agreeTerms: state.agreeTerms,
  })

  if (res.status === 201) {
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'SUCCESS',
      description: res.data.message,
      icon: 'i-heroicons-check-circle',
      color: 'apple',
      timeout: 4000,
    })
    generalStore.isLoading = false

    state.email = ''
    state.password = ''
    state.confirmPassword = ''
    state.agreeTerms = ''
    state.firstName = ''
    state.middleName = ''
    state.surname = ''
    state.dob = ''
    state.role = ''
    state.profilePic = ''
    state.gender = ''
    state.country = ''
    state.city = ''
    state.mobileNumber = ''
    state.imageUrl = ''
    state.code = ''
  }

  if (res.error) {
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'ERROR',
      description: res.error.message,
      icon: 'i-mdi-alert-circle-outline',
      color: 'rose',
      timeout: 4000,
      // ui: "{ default: { color: 'bg-rose-100 text-rose-600' } }"
    })
    generalStore.isLoading = false
  }
}

const updateProfileInfo = async () => {
  generalStore.isLoading = true
  try {
    const data = new FormData()

    data.append('firstName', state.firstName)
    data.append('middleName', state.middleName)
    data.append('surname', state.surname)
    data.append('dob', state.dob)
    data.append('role', state.role)
    data.append('gender', state.gender)
    data.append('country', state.country)
    data.append('city', state.city)
    data.append('mobileNumber', state.mobileNumber)
    data.append('image', state.profilePic)

    const res = await authStore.updateProfile(data)

    if (res.status === 201) {
      toast.add({
        id: Math.random().toString().substring(2, 10),
        title: 'SUCCESS',
        description: res.data.message,
        icon: 'i-heroicons-check-circle',
        color: 'apple',
        timeout: 4000,
      })

      state.firstName = ''
      state.middleName = ''
      state.surname = ''
      state.dob = ''
      state.role = ''
      state.gender = ''
      state.country = ''
      state.city = ''
      state.mobileNumber = ''
      state.profilePic = ''
      state.code = ''

      generalStore.isLoading = false
    }
    // this.$router.push('/')
  } catch (error) {
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'ERROR',
      description: res.error.message,
      icon: 'i-mdi-alert-circle-outline',
      color: 'rose',
      timeout: 4000,
      // ui: "{ default: { color: 'bg-rose-100 text-rose-600' } }"
    })
    generalStore.isLoading = false
  }
}

const verifyCode = async () => {
  generalStore.isLoading = true
  try {
    const id = authStore.registeredUser.updatedAccount._id

    const verificationCode = state.code

    const res = await authStore.verifyEmailCode({ id, token: verificationCode })

    if (res) {
      toast.add({
        id: Math.random().toString().substring(2, 10),
        title: 'SUCCESS',
        description: res.message,
        icon: 'i-heroicons-check-circle',
        color: 'apple',
        timeout: 4000,
      })
      generalStore.isLoading = false
      // router.push('/signin')

      // Send SMS message to the user
      const phone = authStore.registeredUser.updatedAccount.mobileNumber
      const name = authStore.registeredUser.updatedAccount.surname
      const id = authStore.registeredUser.updatedAccount.customId

      // Convert the phone number to array
      // const phoneNumber = Object.values(phone)
      // console.log('SMS DETAILS:', phone, id, name)

      const message = `Dear ${name}, Welcome to SMART-A Platform. Your SMART-ID is: ${id}. Thank you for registering.`

      const resp = await authStore.sendSuccessSms({ message, phone })

      if (resp) {
        toast.add({
          id: Math.random().toString().substring(2, 10),
          title: 'SUCCESS',
          description: 'Check your phone for an SMS from SMART-A',
          icon: 'i-heroicons-check-circle',
          color: 'apple',
          timeout: 4000,
        })
        generalStore.isLoading = false
        // router.push('/dashboard')
      }
    }
  } catch (error) {
    console.error(error)
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

const browse = () => {
  file.value.click()
}

const remove = () => {
  state.profilePic = undefined
  state.imageUrl = undefined
}
const uploadFile = (event) => {
  const files = event.target.files

  // let filename = files[0].name
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    state.imageUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  state.profilePic = files[0]
}
const closeAlert = () => {
  this.alertOpen = false
}
</script>

<template>
  <div class="flex items-center p-6 min-h-screen bg-apple-50">
    <div class="flex-1 h-full max-w-4xl overflow-hidden mx-0 lg:mx-auto">
      <div class="w-full pt-5 bg-apple-100 rounded-md shadow-md">
        <div class="block lg:hidden ml-5 w-full">
          <div v-if="authStore.step === 1">
            <h3 class="uppercase text-sm font-semibold">
              Create Account
              <span class="text-apple-500 ml-4 text-base lowercase"
                >Step {{ authStore.step }} of 3</span
              >
            </h3>
          </div>
          <div v-if="authStore.step === 2">
            <h3 class="uppercase text-sm font-semibold">
              Profile Information
              <span class="text-apple-500 ml-4 text-base lowercase"
                >Step {{ authStore.step }} of 3</span
              >
            </h3>
          </div>
          <div v-if="authStore.step === 3">
            <h3 class="uppercase text-sm font-semibold">
              Complete
              <span class="text-apple-500 ml-4 text-base lowercase"
                >Step {{ authStore.step }} /of 3</span
              >
            </h3>
          </div>
        </div>
        <div class="flex p-5">
          <div class="hidden lg:block w-0 lg:w-3/12 mx-4 p-4">
            <div
              class="flex cursor-pointer text-apple-500 items-center"
              @click.prevent="currentStep(1)"
            >
              <div
                class="rounded-full relative transition duration-500 ease-in-out h-12 w-12 flex-shrink-0 py-3 border-2 hover:scale-105"
                :class="{
                  'text-gray-500': authStore.step !== 1,
                  'text-apple-500 border-apple-500':
                    authStore.step === 1 || authStore.step1Complete,
                }"
              >
                <UIcon
                  v-if="!authStore.step1Complete"
                  name="i-heroicons-lock-closed"
                  class="w-[100%] h-[100%]"
                />
                <UIcon
                  v-else
                  name="i-heroicons-check-16-solid"
                  class="w-[100%] h-[100%]"
                  :class="{
                    'text-gray-500': authStore.step !== 1,
                    'text-apple-500 border-apple-500':
                      authStore.step === 1 || authStore.step1Complete,
                  }"
                />
              </div>
              <div class="ml-5">
                <h5
                  class="uppercase font-medium text-xs"
                  :class="{
                    'text-gray-500 ': authStore.step !== 1,
                    'text-apple-500 border-apple-500': authStore.step === 1,
                  }"
                >
                  Create Account
                </h5>
              </div>
            </div>
            <div
              class="border-l-2 h-16 transition duration-500 ease-in-out ml-6"
              :class="{
                'text-gray-500': authStore.step !== 1,
                'text-apple-500 border-apple-500':
                  authStore.step === 1 || authStore.step1Complete,
              }"
            ></div>
            <div
              class="flex cursor-pointer items-center"
              @click.prevent="currentStep(2)"
            >
              <div
                class="rounded-full transition duration-500 ease-in-out h-12 w-12 flex-shrink-0 py-3 border-2 hover:scale-105"
                :class="{
                  'text-gray-500': authStore.step !== 2,
                  'text-apple-500 border-apple-500':
                    authStore.step === 2 || authStore.step2Complete,
                }"
              >
                <UIcon
                  v-if="!authStore.step2Complete"
                  name="i-heroicons-user-plus"
                  class="w-[100%] h-[100%]"
                />

                <UIcon
                  v-else
                  name="i-heroicons-check-16-solid"
                  class="w-[100%] h-[100%]"
                  :class="{
                    'text-gray-500': authStore.step !== 2,
                    'text-apple-500 border-apple-500':
                      authStore.step === 2 || authStore.step1Complete,
                  }"
                />
              </div>
              <div class="ml-5">
                <h5
                  class="uppercase font-medium text-xs"
                  :class="{
                    'text-gray-500 ': authStore.step !== 2,
                    'text-apple-500 border-apple-500':
                      authStore.step === 2 || authStore.step2Complete,
                  }"
                >
                  Profile Information
                </h5>
              </div>
            </div>
            <div
              class="border-l-2 h-16 transition duration-500 ease-in-out ml-6"
              :class="{
                'text-gray-500 ': authStore.step !== 2,
                'text-apple-500 border-apple-500':
                  authStore.step === 2 || authStore.step2Complete,
              }"
            ></div>
            <div
              class="flex cursor-pointer text-apple-500 items-center"
              @click.prevent="currentStep(3)"
            >
              <div
                class="rounded-full transition duration-500 ease-in-out h-12 w-12 flex-shrink-0 py-3 border-2 hover:scale-105"
                :class="{
                  'text-gray-500 bg-white': authStore.step !== 3,
                  'text-apple-500 border-apple-500':
                    authStore.step === 3 || authStore.registrationComplete,
                }"
              >
                <UIcon
                  v-if="!authStore.step2Complete"
                  name="i-heroicons-clipboard-document-check"
                  class="w-[100%] h-[100%]"
                />

                <UIcon
                  v-else
                  name="i-heroicons-hand-thumb-up"
                  class="w-[100%] h-[100%]"
                  :class="{
                    'text-gray-500': authStore.step !== 3,
                    'text-apple-500 border-apple-500':
                      authStore.step === 3 || authStore.step1Complete,
                  }"
                />
              </div>
              <div class="ml-5">
                <h5
                  class="uppercase font-medium text-xs"
                  :class="{
                    'text-gray-500 ': authStore.step !== 3,
                    'text-apple-500 border-apple-500':
                      authStore.step === 3 || authStore.registrationComplete,
                  }"
                >
                  Complete
                </h5>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-9/12 bg-white p-5 rounded-md shadow-md">
            <div v-if="authStore.step === 1">
              <div class="flex flex-col overflow-y-auto md:flex-row">
                <div
                  class="flex items-center justify-center md:px-10 md:py-4 sm:p-4 md:w-full"
                >
                  <UForm
                    :schema="RegisterValidationSchema"
                    :state="state"
                    class="space-y-2 w-full"
                    @submit="registerUser"
                  >
                    <UFormGroup label="Email" name="email">
                      <UInput v-model="state.email" class="" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                      <UInput
                        v-model="state.password"
                        type="password"
                        class=""
                      />
                    </UFormGroup>

                    <UFormGroup label="Confirm Password" name="confirmPassword">
                      <UInput
                        v-model="state.confirmPassword"
                        type="password"
                        class=""
                      />
                    </UFormGroup>

                    <UCheckbox
                      v-model="state.agreeTerms"
                      name="terms"
                      label="I agree to the Privacy Policy"
                      required
                    />

                    <UButton
                      :loading="generalStore.isLoading"
                      loading-icon="i-eos-icons-loading"
                      type="submit"
                      size="lg"
                      block
                      class="mt-10"
                    >
                      Sign Up
                    </UButton>
                    <p class="mt-3 text-sm">
                      Have an account?
                      <NuxtLink to="/signin" class="">
                        <UButton variant="link" class="text-sm"
                          >Sign In</UButton
                        >
                      </NuxtLink>
                    </p>
                  </UForm>
                </div>
              </div>
            </div>
            <div v-if="authStore.step === 2">
              <div class="flex flex-col overflow-y-auto md:flex-row">
                <div
                  class="flex items-center justify-center md:px-10 md:py-4 sm:p-4 md:w-full"
                >
                  <div class="w-full">
                    <h1 class="mb-4 text-xl font-semibold">
                      Profile Information
                    </h1>
                    <div class="w-full space-y-2">
                      <div>
                        <label for="first_name" class="mt-4 text-xs">
                          First Name
                          <input
                            id="first_name"
                            v-model="state.firstName"
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
                            v-model="state.middleName"
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
                            v-model="state.surname"
                            type="text"
                            name="surname"
                          />
                        </label>
                      </div>
                      <div>
                        <label for="id_number" class="mt-4 text-xs">
                          Date of Birth
                          <input
                            id="id_number"
                            v-model="state.dob"
                            type="date"
                            name=""
                          />
                        </label>
                      </div>
                      <div>
                        <label for="id_number" class="mt-4 text-xs">
                          Select your role
                          <select id="id_number" v-model="state.role" name="">
                            <option value="farmer">Farmer</option>
                            <option value="manufacturer">Manufacturer</option>
                            <option value="qa">Quality Assurance</option>
                            <option value="transporter">Transporter</option>
                            <option value="retailer">Retailer</option>
                            <option value="consumer">Consumer</option>
                          </select>
                        </label>
                      </div>
                      <!-- <div>
                      <label for="id_number" class="mt-4 text-xs">
                        ID/Passport Number
                        <input
                          id="id_number"
                          v-model="idNumber"
                          type="text"
                          name=""
                        />
                      </label>
                    </div> -->
                      <div class="block">
                        <div class="mb-3">
                          <label for="profileImage" class="mt-4 text-xs">
                            Profile Image (Optional)
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
                              :src="state.imageUrl"
                              class="rounded-full w-24 h-24 object-cover border-0"
                              alt=""
                            />
                            <!-- :class="
                              $v.basicInfo.profilePic.$error
                                ? 'ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500'
                                : null
                            " -->
                            <div
                              class="absolute rounded-full top-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center"
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
                                v-if="state.profilePic"
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
                      <div>
                        <label for="gender" class="mt-4 text-xs">
                          Gender
                          <select
                            id="gender"
                            v-model="state.gender"
                            name="gender"
                          >
                            <option value="">Choose one</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <!-- <option value="Male">Other</option> -->
                          </select>
                        </label>
                      </div>
                      <div>
                        <label for="country" class="mt-4 text-xs">
                          Country
                          <select v-model="state.country" name="country">
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
                        <label for="cityTown" class="mt-4 text-xs">
                          City/Town
                          <input
                            id="cityTown"
                            v-model="state.city"
                            type="text"
                            name="cityTown"
                          />
                        </label>
                      </div>
                      <div>
                        <label for="phone_no" class="mt-4 text-xs">
                          Mobile Phone Number
                          <MazPhoneNumberInput
                            v-model="state.mobileNumber"
                            placeholder="Enter your phone number"
                            class="w-full"
                          />
                          <!-- <input
                            id="phone_no"
                            v-model="state.mobileNumber"
                            type="text"
                            name="phone_no"
                          /> -->
                        </label>
                      </div>
                    </div>
                    <hr class="my-8" />
                    <!-- <button
                      type="submit"
                      class="btn-primary"
                      @click.prevent="updateProfileInfo"
                    >
                      Update Profile
                    </button> -->
                    <div class="flex items-end">
                      <!-- <UButton block @click="updateProfileInfo"
                        >Update Profile</UButton
                      > -->
                      <UButton
                        @click="updateProfileInfo"
                        :loading="generalStore.isLoading"
                        loading-icon="i-eos-icons-loading"
                        size="lg"
                        block
                        class=""
                      >
                        Update Profile Information
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="authStore.step === 3">
              <div
                v-if="!authStore.verifiedEmail"
                class="flex flex-col overflow-y-auto md:flex-row"
              >
                <!-- v-if="!verifiedEmail" -->
                <div
                  class="mx-auto px-5 py-10 h-full text-center justify-center items-center space-y-10"
                >
                  <div class="w-full"></div>
                  <div>
                    <h1 class="mb-4 text-xl font-semibold">
                      Registration Almost Complete. <br />
                    </h1>
                    <p class="">
                      A verification code has been sent to your email. Check
                      your email and enter the code below
                    </p>
                  </div>
                  <div>
                    <label for="verification_code" class="mt-4 text-xs">
                      Enter your (4-digit) verification code
                      <input
                        id="verification_code"
                        v-model="state.code"
                        type="text"
                        name="verification_code"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <!-- <button class="btn-primary" @click="verifyCode">
                      Verify
                    </button> -->
                    <UButton
                      @click="verifyCode"
                      :loading="generalStore.isLoading"
                      loading-icon="i-eos-icons-loading"
                      size="lg"
                      block
                      class=""
                    >
                      Verify
                    </UButton>
                  </div>
                </div>
              </div>
              <div v-if="authStore.verifiedEmail">
                <RegistrationComplete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
