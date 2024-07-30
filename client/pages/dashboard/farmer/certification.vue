<script setup>
definePageMeta({
  layout: 'dashboard',
})

const crops = ref([
  {
    cropType: 'Coffee',
    cropVariety: 'Arabica',
    datePlanted: '15/04/2010',
    cropOption: '',
    description:
      'Having sprayed the crops, and the berries are turning red. The farm is requesting for inpection and QA.',
    cropImage:
      'https://images.pexels.com/photos/4090603/pexels-photo-4090603.jpeg',
  },
  {
    cropType: 'Coffee',
    cropVariety: 'Robusta',
    datePlanted: '15/04/2004',
    cropOption: '',
    description: 'Inspection of harvested berries',
    cropImage:
      'https://images.pexels.com/photos/7125712/pexels-photo-7125712.jpeg',
  },
  {
    cropType: 'Maize',
    cropVariety: 'Hybrid 6-14',
    datePlanted: '09/01/2022',
    cropOption: '',
    description:
      'The crops are at the flowering stage, Inspection and QA is requested',
    cropImage:
      'https://images.pexels.com/photos/5029646/pexels-photo-5029646.jpeg',
  },
  // {
  //   cropType: 'Coffee',
  //   cropVariety: 'Arabica',
  //   datePlanted: '15/04/2010',
  //   cropOption: '',
  //   description:
  //     'Having sprayed the crops, and the berries are turning red. The farm is requesting for inpection and QA.',
  //   cropImage:
  //     'https://images.pexels.com/photos/4090603/pexels-photo-4090603.jpeg',
  // },
  // {
  //   cropType: 'Coffee',
  //   cropVariety: 'Arabica',
  //   datePlanted: '15/04/2010',
  //   cropOption: '',
  //   description:
  //     'Having sprayed the crops, and the berries are turning red. The farm is requesting for inpection and QA.',
  //   cropImage:
  //     'https://images.pexels.com/photos/4090603/pexels-photo-4090603.jpeg',
  // },
  // {
  //   cropType: 'Coffee',
  //   cropVariety: 'Arabica',
  //   datePlanted: '15/04/2010',
  //   cropOption: '',
  //   description:
  //     'Having sprayed the crops, and the berries are turning red. The farm is requesting for inpection and QA.',
  //   cropImage:
  //     'https://images.pexels.com/photos/4090603/pexels-photo-4090603.jpeg',
  // },
])
</script>

<template>
  <div class="m-4 rounded-md p-10 bg-white shadow-md min-h-auto">
    <h3 class="text-xl font-bold text-gray-500 mb-5">
      Request Inspection & Certification
    </h3>

    <!-- <div
      v-for="(crop, index) in crops"
      :key="index"
      class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"
    >
      <a href="#">
        <img
          class="rounded-t-lg h-64 w-full object-cover object-center"
          :src="crop.cropImage"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="text-2xl font-bold tracking-tight">
            {{ crop.cropType }}
          </h5>
          <h3 class="mb-2 text-sm tracking-tight">
            {{ crop.cropVariety }}
          </h3>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ crop.description }}
        </p>
        <button href="#" class="btn-success items-center">
          Request Inspection
          <svg
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div> -->

    <div class="flex w-full">
      <div
        v-for="(crop, index) in crops"
        :key="index"
        class="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-4"
      >
        <!-- class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4"> -->

        <a
          href=""
          class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="absolute inset-0 h-full w-full object-cover"
              :src="crop.cropImage"
              alt=""
            />
          </div>
          <div class="p-4">
            <span
              class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >{{ crop.cropType }}</span
            >
            <h2 class="mt-2 mb-2 font-bold">{{ crop.cropVariety }}</h2>
            <p class="text-sm">
              {{ crop.description }}
            </p>

            <div class="justify-between flex mt-3">
              <div class="">
                <h4
                  class="text-xs font-medium tracking-tighter text-secondary uppercase"
                >
                  Date Planted
                </h4>

                <div class="flex items-center">
                  <span class="text-sm fill-gray-500 font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z"
                      />
                    </svg> </span
                  >&nbsp;<span class="font-bold">{{ crop.datePlanted }}</span
                  >&nbsp;
                  <!-- <span class="text-sm font-semibold">Date</span> -->
                </div>
              </div>
              <div>
                <h4
                  class="text-xs font-medium tracking-tighter text-secondary uppercase"
                >
                  Last Inspection
                </h4>

                <div class="flex items-center">
                  <span class="text-sm fill-gray-500 font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z"
                      />
                    </svg> </span
                  >&nbsp;<span class="font-bold">05/11/2021</span>&nbsp;
                  <!-- <span class="text-sm font-semibold">Date</span> -->
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-b text-xs text-gray-700">
            <button class="btn-primary">Request Inspection</button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style></style>
