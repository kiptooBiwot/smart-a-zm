<script setup>
import { useAuthStore } from '~/stores/auth.js'
import { useGeneralStore } from '~/stores/general'

const authStore = useAuthStore()
const generalStore = useGeneralStore()
const router = useRouter()
const toast = useToast()

// const isSideMenuOpen = ref(false)
const isNotificationsMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const dark = ref(false)

// const toggleSideMenu = () => {
//   generalStore.isSideMenuOpen = !generalStore.isSideMenuOpen
// }
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}
const closeProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const runSignOut = async () => {
  const response = await authStore.signOut()

  if (response) {
    toast.add({
      id: Math.random().toString().substring(2, 10),
      title: 'SUCCESS',
      description: response.message,
      icon: 'i-heroicons-check-circle',
      color: 'apple',
      timeout: 4000,
    })
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
  }
  router.push('/signin')
}

console.log('NAME INITIAL:', authStore?.getNameInitial)
</script>

<template>
  <header class="z-10 py-4 bg-white shadow-md">
    <!-- https://www.trademarkelite.com/trademark/trademark-search.aspx?sw=spring
 -->
    <div
      class="container flex items-center justify-between h-full px-6 mx-auto text-apple-500"
    >
      <!-- Mobile hamburger -->
      <button
        class="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
        aria-label="Menu"
        @click="generalStore.toggleSidebar"
      >
        <svg
          class="w-6 h-6 text-accent"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <!-- Search input -->
      <div class="flex justify-center flex-1 lg:mr-32">
        <div class="relative w-full max-w-xl mr-6 focus-within:text-gray-500">
          <div class="absolute inset-y-0 flex items-center pl-2">
            <svg
              class="w-5 h-5 text-accent"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <!-- class="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" -->
          <input
            type="text"
            class="pl-10 pr-2 bg-gray-100 border-0 focus:bg:white"
            placeholder="Search for projects"
            aria-label="Search"
          />
        </div>
      </div>
      <ul class="flex items-center flex-shrink-0 space-x-6">
        <!-- Theme toggler -->
        <!-- <li class="flex">
          <button
            class="rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Toggle color mode"
            @click="toggleTheme"
          >
            <template v-if="!dark">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
            </template>
            <template v-if="dark">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
          </button>
        </li> -->
        <!-- Notifications menu -->
        <li class="relative">
          <div class="mr-5 relative text-gray-500">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute bg-red-500 text-red-100 py-0.5 px-1.5 text-xs rounded-full font-semibold -right-1 -top-2"
              >5</span
            >
            <!-- <span class="absolute w-4 h-4 items-center justify-center bg-red-700 rounded-full text-red-100 font-semibold text-xs -right-1 -top-2">10</span> -->
          </div>
          <!-- <button
            class="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Notifications"
            aria-haspopup="true"
            @click="toggleNotificationsMenu"
            @keydown.escape="closeNotificationsMenu"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              ></path>
            </svg> -->
          <!-- Notification badge -->
          <!--<span
              aria-hidden="true"
              class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"
            ></span>
          </button> -->
        </li>
        <!-- Profile menu -->
        <li class="relative">
          <button
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none border-2 w-9 h-9 flex-shrink-0 bg-apple-100 border-gray-300"
            aria-label="Account"
            aria-haspopup="true"
            @click="toggleProfileMenu"
            @keydown.escape="closeProfileMenu"
          >
            <img
              v-if="authStore?.user?.profileImage"
              class="object-cover w-8 h-8 rounded-full"
              alt=""
              :src="authStore?.user?.profileImage"
              aria-hidden="true"
            />
            <h3 v-else class="font-heading font-medium text-2xl text-apple-500">
              {{ authStore?.getNameInitial }}
            </h3>
          </button>
          <template v-if="isProfileMenuOpen">
            <ul
              x-transition:leave="transition ease-in duration-150"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
              class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-500 bg-white border border-gray-100 rounded-md shadow-md"
              aria-label="submenu"
              @click="closeProfileMenu"
              @keydown.escape="closeProfileMenu"
            >
              <li class="flex">
                <NuxtLink
                  to="/dashboard"
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                  href="#"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <span>Profile</span>
                </NuxtLink>
              </li>
              <li class="flex">
                <NuxtLink
                  to="/dashboard"
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                  href="#"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Settings</span>
                </NuxtLink>
              </li>
              <li class="flex" @click.prevent="runSignOut">
                <span
                  to=""
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                  href="#"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <span>Log out</span>
                </span>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </header>
</template>

<style></style>
