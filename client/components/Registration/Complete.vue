<template>
  <div>
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div
        class="mx-auto px-5 py-10 h-full text-center justify-center items-center space-y-10"
      >
        <div class="w-full">
          <svg
            class="w-32 h-32 mx-auto text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <h2 class="text-xl text-gray-500 font-medium">
            Registration Complete. <br />
          </h2>
          <p>Your Email is now verified. Please log in to proceed.</p>
        </div>
        <div class="w-full">
          <!-- <NuxtLink to="/signin"> -->
          <UButton block size="md" @click="goToLogin">Login</UButton>
          <!-- </NuxtLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getActivePinia } from 'pinia'

const router = useRouter()

const goToLogin = () => {
  // map through that list and use the **$reset** fn to reset the state
  getActivePinia()._s.forEach((store) => store.$reset())
  router.push('/signin')
}
</script>

<style></style>
