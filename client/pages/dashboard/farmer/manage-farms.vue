<script setup>
definePageMeta({
  layout: 'dashboard',
})

const accountForm = reactive({ name: 'Benjamin', username: 'benjamincanac' })
const passwordForm = reactive({ currentPassword: '', newPassword: '' })
const items = [
  {
    key: 'farms',
    label: 'Manage your farms',
    description:
      "Make changes to your account here. Click save when you're done.",
  },
  {
    key: 'password',
    label: 'Password',
    description:
      "Change your password here. After saving, you'll be logged out.",
  },
]

const openSlideover = ref(false)

const registerFarm = () => {
  openSlideover.value = true
}
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
              <div class="space-y-5 hidden">
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
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <!-- Add farm cards here -->
                <UCard class="">
                  <div class="flex gap-5">
                    <div>
                      <UIcon
                        name="i-heroicons:map"
                        class="w-[70px] h-[70px] text-apple-500"
                      />
                    </div>
                    <div class="flex-col">
                      <h1 class="font-semibold text-lg font-heading">
                        The First Farm
                      </h1>
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis, saepe suscipit? Odio voluptate obcaecati.
                      </p>
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
                <UCard class="">
                  <div class="flex gap-5">
                    <div>
                      <UIcon
                        name="i-heroicons:map"
                        class="w-[70px] h-[70px] text-apple-500"
                      />
                    </div>
                    <div class="flex-col">
                      <h1 class="font-semibold text-xl font-heading">
                        Second Farm
                      </h1>
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis, saepe suscipit? Odio voluptate obcaecati.
                      </p>
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
                        color="rose"
                        class="uppercase text-xs"
                      >
                        Delete Farm
                      </UButton>
                      <UButton
                        size="sm"
                        variant="outline"
                        class="uppercase text-xs"
                      >
                        Add Crop
                      </UButton>
                    </div>
                  </template>
                </UCard>
              </div>
            </div>
            <div v-else-if="item.key === 'password'" class="space-y-3">
              <UFormGroup label="Current Password" name="current" required>
                <UInput
                  v-model="passwordForm.currentPassword"
                  type="password"
                  required
                />
              </UFormGroup>
              <UFormGroup label="New Password" name="new" required>
                <UInput
                  v-model="passwordForm.newPassword"
                  type="password"
                  required
                />
              </UFormGroup>
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
      <USlideover v-model="openSlideover" prevent-close class="">
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
                class="text-base font-semibold leading-6 font-heading dark:text-white"
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

          <Placeholder class="h-full" />
        </UCard>
      </USlideover>
    </div>
  </div>
</template>
