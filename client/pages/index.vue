<script setup>
definePageMeta({
  // middleware: ['auth'],
})

const router = useRouter()

const goToSignup = () => {
  router.push('/signin')
}
</script>

<template>
  <div class="h-screen">
    <div
      class="grid grid-cols-1 md:grid-cols-2 h-screen bg-apple-50 items-center justify-center"
    >
      <div class="px-5 w-full md:w-4/5 md:px-0 mx-auto">
        <h1 class="text-5xl font-bold py-5 tracking-wide">
          Empowering African Farmers Through
          <span class="text-apple-500">Climate-Smart Agriculture</span>
        </h1>
        <hr class="w-24 border-1 border-gray-300" />
        <p class="py-3">
          Join our innovative program to combat climate change, enhance crop
          yields, and secure farmers' livelihoods using cutting-edge GIS and
          blockchain technologies.
        </p>

        <UButton size="xl" class="mt-2 md:my-6" @click="goToSignup"
          >Get Started</UButton
        >
      </div>
      <div
        class="h-full bg-primary-50 flex items-center px-5 md:px-0 justify-center"
      >
        <img
          src="/images/smart-farming.jpeg"
          alt=""
          class="w-full md:w-full h-full object-cover object-right"
        />
      </div>
    </div>
  </div>
</template>
