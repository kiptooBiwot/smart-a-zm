<script setup>
import { useAuthStore } from '~/stores/auth.js'
import { useGeneralStore } from '~/stores/general'

const authStore = useAuthStore()
const generalStore = useGeneralStore()

// const logo = ref(avnLogo)
const isSubMenuOpen = ref(false)
const isSideMenuOpen = ref(false)
const isPagesMenuOpen = ref(false)
const menuItems = [
  {
    title: 'Dashboard',
    linkUrl: '/dashboard',
    icon: 'M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z',
    roles: [
      'admin',
      'farmer',
      'regulator',
      'transporter',
      'manufacturer',
      'retailer',
      'customer',
    ],
  },
  {
    title: 'Communicate',
    linkUrl: '/communicate',
    icon: 'M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    children: [
      {
        title: 'Send SMS',
        linkUrl: '/dashboard/communicate/send-sms',
      },
      {
        title: 'Send WhatsApp',
        linkUrl: '/dashboard/communicate/send-sms',
      },
    ],
    roles: ['admin'],
  },
  {
    title: 'Farmer',
    linkUrl: '/farmer',
    icon: 'M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    children: [
      {
        title: 'Manage your Farms',
        linkUrl: '/dashboard/farmer/manage-farms',
      },
      {
        title: 'Update',
        linkUrl: '/dashboard/farmer/register-farmer',
      },
      {
        title: 'Register a Crop',
        linkUrl: '/dashboard/farmer/add-crop',
      },
      {
        title: 'Manage Registered Crops',
        linkUrl: '/dashboard/farmer/manage-crop',
      },
      { title: 'Harvesting', linkUrl: '/dashboard/farmer/harvesting' },
      {
        title: 'Request for Certification',
        linkUrl: '/dashboard/farmer/certification',
      },
      {
        title: 'Market / Sell Crop',
        linkUrl: '/dashboard/farmer/sell-harvest',
      },
    ],
    roles: ['admin', 'farmer'],
  },
  {
    title: 'Regulator',
    linkUrl: '/regulator',
    icon: 'M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2zm11 7H4v11h16V8zm-4.964 2.136l1.414 1.414-4.95 4.95-3.536-3.536L9.38 11.55l2.121 2.122 3.536-3.536z',
    children: [
      {
        title: 'Inspection Requests',
        linkUrl: '/dashboard/inspection/requests',
      },
      {
        title: 'Inspected Farms',
        linkUrl: '/dashboard/inspection/inspected',
      },
      {
        title: 'Inspection Checklist',
        linkUrl: '/dashboard/inspection/checklist',
      },
    ],
    roles: ['admin', 'regulator'],
  },
  {
    title: 'Manufacturer',
    linkUrl: '/manufacturer',
    icon: 'M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z',
    children: [
      {
        title: 'Purchase Raw Materials',
        linkUrl: '/dashboard/manufacturer/purchase-raw-materials',
      },
      {
        title: 'Process Products',
        linkUrl: '/dashboard/manufacturer/process-products',
      },
      {
        title: 'Package Products',
        linkUrl: '/dashboard/manufacturer/package-products',
      },
      {
        title: 'Request Certification',
        linkUrl: '/dashboard/manufacturer/request-certification',
      },
    ],
    roles: ['admin', 'manufacturer'],
  },
  {
    title: 'Shipping',
    linkUrl: '/shipping',
    icon: 'M8.965 18a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07zM15 7H3v8.05a3.5 3.5 0 0 1 5.663.95h5.674c.168-.353.393-.674.663-.95V7zm2 6h4v-.285L18.992 10H17v3zm.5 6a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3.001zM7 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z',
    roles: ['admin', 'transporter'],
  },
  {
    title: 'Retailer',
    linkUrl: '/retailer',
    icon: 'M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7H2v-2l1-5h18l1 5v2h-1zM5 13v6h14v-6H5zm-.96-2h15.92l-.6-3H4.64l-.6 3zM6 14h8v3H6v-3zM3 3h18v2H3V3z',
    roles: ['admin', 'retailer'],
  },
  {
    title: 'Consumer',
    linkUrl: '/consumer',
    icon: 'M12 11a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L12 13a3 3 0 0 0-2.995 2.824L9 16v6H7v-6a5 5 0 0 1 5-5zm-6.5 3c.279 0 .55.033.81.094a5.947 5.947 0 0 0-.301 1.575L6 16v.086a1.492 1.492 0 0 0-.356-.08L5.5 16a1.5 1.5 0 0 0-1.493 1.356L4 17.5V22H2v-4.5A3.5 3.5 0 0 1 5.5 14zm13 0a3.5 3.5 0 0 1 3.5 3.5V22h-2v-4.5a1.5 1.5 0 0 0-1.356-1.493L18.5 16c-.175 0-.343.03-.5.085V16c0-.666-.108-1.306-.309-1.904.259-.063.53-.096.809-.096zm-13-6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-13 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm13 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    children: [
      {
        title: 'Trace Current Product',
        linkUrl: '/dashboard/consumer/trace-product',
      },
      // {
      //   title: 'Process Products',
      //   linkUrl: '/dashboard/manufacturer/process-products',
      // },
      // {
      //   title: 'Package Products',
      //   linkUrl: '/dashboard/manufacturer/package-products',
      // },
      // {
      //   title: 'Request Certification',
      //   linkUrl: '/dashboard/manufacturer/request-certification',
      // },
    ],
    roles: ['admin', 'customer'],
  },
]

const activeSubMenu = ref(null)
const togglePagesMenu = (index) => {
  if (activeSubMenu.value === index) {
    activeSubMenu.value = null
  } else {
    activeSubMenu.value = index
  }
}

const role = ref(null)

watchEffect(() => {
  role.value = authStore?.user?.role
  // console.log('Fetched Role:', role.value)
})

const filteredMenuItems = computed(() => {
  const items = menuItems.filter((item) => {
    // console.log('ITEM:', item)
    // console.log('USER ROLES:', authStore?.user?.role)

    return item.roles.includes(role.value)
  })
  return items
})

// Log the filtered menu items to see the output
watch(
  filteredMenuItems,
  (newVal) => {
    // console.log('Filtered Menu Items:', newVal)
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="generalStore.isSideMenuOpen ? 'block' : 'hidden'"
      @click="generalStore.isSideMenuOpen = false"
      class="fixed inset-0 z-10 transition-opacity bg-apple-500 opacity-50 lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <aside
      class="h-screen fixed min-w-[250px] shadow-md overflow-hidden md:translate-x-0 bg-apple-900 z-30"
      :class="
        generalStore.isSideMenuOpen
          ? 'translate-x-0 ease-out'
          : '-translate-x-full ease-in'
      "
    >
      <div class="h-screen overflow-y-auto">
        <div class="flex flex-col h-full justify-between">
          <div class="py-4 text-gray-200">
            <div class="flex items-center ml-6 mt-2">
              <Logo />
            </div>
            <ul class="mt-6">
              <li
                v-for="(item, index) in filteredMenuItems"
                :key="index"
                class="relative px-6 py-3"
              >
                <NuxtLink
                  v-if="!item.children"
                  :to="item.linkUrl"
                  class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 fill-gray-200 hover:text-accent hover:fill-accent"
                  @click="generalStore.toggleSidebar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class=""
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path :d="item.icon" />
                  </svg>
                  <span class="ml-4">{{ item.title }}</span>
                </NuxtLink>
                <div v-else>
                  <button
                    class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 fill-gray-200 hover:text-accent hover:fill-accent"
                    aria-haspopup="true"
                    @click="togglePagesMenu(index)"
                  >
                    <span class="inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class=""
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path :d="item.icon"></path>
                      </svg>
                      <span class="ml-4">{{ item.title }}</span>
                    </span>
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <!-- <MenuItems
                    v-for="(subItem, i) in item.children"
                    :key="i"
                    :menu-items="subItem"
                  /> -->
                  <template v-if="activeSubMenu === index">
                    <ul
                      x-transition:enter="transition-all ease-in-out duration-300"
                      x-transition:enter-start="opacity-25 max-h-0"
                      x-transition:enter-end="opacity-100 max-h-xl"
                      x-transition:leave="transition-all ease-in-out duration-300"
                      x-transition:leave-start="opacity-100 max-h-xl"
                      x-transition:leave-end="opacity-0 max-h-0"
                      class="p-2 mt-2 space-y-2 overflow-hidden text-xs font-medium text-gray-200 border-l border-accent ml-5 transition duration-1000"
                      aria-label="submenu"
                    >
                      <li
                        v-for="(subItem, i) in item.children"
                        :key="i"
                        class="px-2 py-1 transition-colors duration-150 hover:text-accent"
                      >
                        <NuxtLink :to="subItem.linkUrl" class="w-full">
                          {{ subItem.title }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </template>
                </div>
              </li>
            </ul>
          </div>
          <div class="py-0">
            <ul class="mt-6">
              <li class="relative px-6 py-3">
                <NuxtLink
                  to=""
                  class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 fill-gray-200 cursor-pointer hover:text-accent hover:fill-accent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class=""
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M2.213 14.06a9.945 9.945 0 0 1 0-4.12c1.11.13 2.08-.237 2.396-1.001.317-.765-.108-1.71-.986-2.403a9.945 9.945 0 0 1 2.913-2.913c.692.877 1.638 1.303 2.403.986.765-.317 1.132-1.286 1.001-2.396a9.945 9.945 0 0 1 4.12 0c-.13 1.11.237 2.08 1.001 2.396.765.317 1.71-.108 2.403-.986a9.945 9.945 0 0 1 2.913 2.913c-.877.692-1.303 1.638-.986 2.403.317.765 1.286 1.132 2.396 1.001a9.945 9.945 0 0 1 0 4.12c-1.11-.13-2.08.237-2.396 1.001-.317.765.108 1.71.986 2.403a9.945 9.945 0 0 1-2.913 2.913c-.692-.877-1.638-1.303-2.403-.986-.765.317-1.132 1.286-1.001 2.396a9.945 9.945 0 0 1-4.12 0c.13-1.11-.237-2.08-1.001-2.396-.765-.317-1.71.108-2.403.986a9.945 9.945 0 0 1-2.913-2.913c.877-.692 1.303-1.638.986-2.403-.317-.765-1.286-1.132-2.396-1.001zM4 12.21c1.1.305 2.007 1.002 2.457 2.086.449 1.085.3 2.22-.262 3.212.096.102.195.201.297.297.993-.562 2.127-.71 3.212-.262 1.084.45 1.781 1.357 2.086 2.457.14.004.28.004.42 0 .305-1.1 1.002-2.007 2.086-2.457 1.085-.449 2.22-.3 3.212.262.102-.096.201-.195.297-.297-.562-.993-.71-2.127-.262-3.212.45-1.084 1.357-1.781 2.457-2.086.004-.14.004-.28 0-.42-1.1-.305-2.007-1.002-2.457-2.086-.449-1.085-.3-2.22.262-3.212a7.935 7.935 0 0 0-.297-.297c-.993.562-2.127.71-3.212.262C13.212 6.007 12.515 5.1 12.21 4a7.935 7.935 0 0 0-.42 0c-.305 1.1-1.002 2.007-2.086 2.457-1.085.449-2.22.3-3.212-.262-.102.096-.201.195-.297.297.562.993.71 2.127.262 3.212C6.007 10.788 5.1 11.485 4 11.79c-.004.14-.004.28 0 .42zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                    />
                  </svg>
                  <span class="ml-4 text-gray-200">Settings</span>
                </NuxtLink>
              </li>
              <li class="relative px-6 py-3">
                <NuxtLink
                  to=""
                  class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 fill-gray-200 hover:text-accent hover:border-accent"
                >
                  <div class="">
                    <img
                      :src="authStore?.user?.profileImage"
                      class="rounded-full object-cover w-8 h-8 border-2 border-accent"
                      alt=""
                    />
                  </div>
                  <div class="text-gray-200 cursor-pointer">
                    <div class="ml-4">
                      {{
                        authStore?.user?.firstName +
                        ' ' +
                        authStore?.user?.surname
                      }}
                    </div>
                    <div class="ml-4 text-xs font-normal">
                      {{ authStore?.user?.email }}
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
