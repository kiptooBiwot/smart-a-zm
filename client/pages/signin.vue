<script setup>
import { useGeneralStore } from '~/stores/general.js'
import { useAuthStore } from '~/stores/auth.js'
import { SignInValidationSchema } from '~/validation_schema/SignInSchema.ts'

const router = useRouter()
const generalStore = useGeneralStore()
const authStore = useAuthStore()
const toast = useToast()

definePageMeta({
  layout: 'auth',
})

const state = {
  email: '',
  password: '',
}

const login = async (event) => {
  // console.log(event.data)

  generalStore.isLoading = true

  const response = await authStore.signIn({
    email: state.email,
    password: state.password,
  })

  // console.log('FE LOGIN RESPONSE', response);

  if (response.status === 200) {
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'SUCCESS',
      description: 'Access granted. Welcome back!',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 4000,
    })

    state.email = ''
    state.password = ''
    generalStore.isLoading = false
    router.push('/dashboard')
  }

  if (response.error) {
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'ERROR',
      description: response.error.message,
      icon: 'i-mdi-alert-circle-outline',
      color: 'rose',
      timeout: 4000,
      // ui: "{ default: { color: 'bg-rose-100 text-rose-600' } }"
    })
    generalStore.isLoading = false
  }
}
</script>

<template>
  <div class="flex items-center min-h-screen pt-20 p-6 bg-apple-50">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full"
            src="/images/login.jpg"
            alt="Login Image"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:py-10 md:w-1/2">
          <div class="col-span-4 flex flex-col justify-center w-full px-5">
            <h3 class="text-2xl font-medium py-5 text-center">Sign In</h3>
            <UForm
              :schema="SignInValidationSchema"
              :state="state"
              class="space-y-2 w-full"
              @submit="login"
            >
              <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" size="lg" class="" />
              </UFormGroup>

              <UFormGroup label="Password" name="password">
                <UInput
                  v-model="state.password"
                  type="password"
                  size="lg"
                  class=""
                />
              </UFormGroup>

              <NuxtLink to="#" class="flex justify-end py-0 text-sm">
                <UButton variant="link" class="text-xs px-0 pt-0 font-normal"
                  >Forgot password?</UButton
                >
              </NuxtLink>

              <UButton
                :loading="generalStore.isLoading"
                loading-icon="i-eos-icons-loading"
                type="submit"
                size="lg"
                block
                class=""
              >
                Sign In
              </UButton>
            </UForm>
            <p class="mt-3 text-sm">
              Don't have an account?
              <NuxtLink to="/signup" class="">
                <UButton variant="link" class="text-sm">Sign Up</UButton>
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
