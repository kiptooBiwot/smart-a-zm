<script setup>
const menuItems = [
  {
    title: 'Home',
    linkUrl: '/',
  },
  {
    title: 'Sign In',
    linkUrl: '/signin',
  },
  {
    title: 'Sign Up',
    linkUrl: '/signup',
  },
]
</script>

<template>
  <div
    class="absolute z-10 w-full px-20 py-5 flex bg-transparent justify-between text-gray-500 font-title items-center"
  >
    <div class="flex items-center">
      <h4 class="font-bold text-2xl uppercase text-apple-500">Smart-A</h4>
    </div>
    <div class="">
      <ul class="flex">
        <li
          v-for="item in menuItems"
          :key="item.title"
          class="ml-5 text-gray-200 uppercase tracking-wide font-heading font-semibold hover:text-accent-one transition duration-700 ease-in-out"
        >
          <NuxtLink :to="item.linkUrl">
            <UButton variant="link" class="uppercase text-sm text-apple-500">{{
              item.title
            }}</UButton>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
