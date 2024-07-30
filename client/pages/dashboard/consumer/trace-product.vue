<script setup>
definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <!-- component -->
  <div class="bg-white block m-5 text-gray-600 p-6 h-auto shadow-xl rounded-lg">
    <h2 class="text-xl font-bold tracking-wide my-4 mx-auto">
      Product Tracability from Source
    </h2>
    <div class="container mx-auto w-full h-full">
      <div class="relative wrap overflow-hidden p-10 h-full">
        <div
          class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
          style="left: 50%"
        />
        <!-- right timeline -->
        <div
          class="mb-8 flex justify-between items-center w-full right-timeline"
        >
          <div class="order-1 w-5/12" />
          <div
            class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
          >
            <h1 class="mx-auto font-semibold text-lg text-white">1</h1>
          </div>
          <div
            class="order-1 bg-teal-400 rounded-lg shadow-xl text-white w-5/12 px-6 py-4"
          >
            <h3 class="mb-3 font-bold text-gray-800 text-xl">Planting</h3>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Date Planted:</span> 15th
              January 2004
            </p>
            <p
              class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
            >
              <span class="font-bold text-gray-800">Description:</span>Planted
              in the rainy season in January.
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Crop: </span> Coffee
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Variety: </span> Arabica
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Fertilizer used: </span> DAP
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Agrochemicals used: </span>
              Chemical one, Chemical two, Chemical three, Chemical 4
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Farmer:</span> John Doe
              <br />
              <span class="font-bold text-gray-800">Plot No:</span> 078/654/8521
              <br />
              <span class="font-bold text-gray-800">Longitude:</span> 012654789
              <br />
              <span class="font-bold text-gray-800">Latitude:</span> 3214569870
              <br />
              <span class="font-bold text-gray-800">Country:</span> Kenya
            </p>
          </div>
        </div>

        <!-- left timeline -->
        <div
          class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline"
        >
          <div class="order-1 w-5/12" />
          <div
            class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
          >
            <h1 class="mx-auto text-white font-semibold text-lg">2</h1>
          </div>
          <!-- <div class="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 class="mb-3 font-bold text-white text-xl">
              Lorem Ipsum
            </h3>
            <p
              class="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div> -->
          <div class="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 class="mb-3 font-bold text-gray-800 text-xl">Harvesting</h3>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Date Harvested:</span> 21st
              December 2020
            </p>
            <p
              class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
            >
              <span class="font-bold text-gray-800">Description:</span>After the
              berries ripened, they were harvested.
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Quantity: </span> 20 tonnes
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Size of land: </span>
              Five acres
            </p>
          </div>
        </div>

        <!-- right timeline -->
        <div
          class="mb-8 flex justify-between items-center w-full right-timeline"
        >
          <div class="order-1 w-5/12" />
          <div
            class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
          >
            <h1 class="mx-auto text-lg text-white font-semibold">3</h1>
          </div>
          <div
            class="order-1 bg-green-400 rounded-lg text-white shadow-xl w-5/12 px-6 py-4"
          >
            <h3 class="mb-3 font-bold text-gray-800 text-xl">Inspection</h3>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Date Inspected:</span> 30th
              November 2020
            </p>
            <p
              class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
            >
              <span class="font-bold text-gray-800">Description:</span>The
              berries were inpsected and given a clean bill of health.
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800">Grading: </span> A
            </p>
            <p class="text-sm">
              <span class="font-bold text-gray-800"
                >Regulatory Authority:
              </span>
              Ministry of Agriculture, Export Processing Department
            </p>
          </div>
        </div>

        <!-- left timeline -->
        <div
          class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline"
        >
          <div class="order-1 w-5/12" />
          <div
            class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
          >
            <h1 class="mx-auto text-white font-semibold text-lg">4</h1>
          </div>
          <div
            class="order-1 bg-yellow-400 rounded-lg shadow-xl w-5/12 px-6 py-4"
          >
            <h3 class="mb-3 font-bold text-white text-xl">
              Manufacturing / Processing
            </h3>
            <div
              class="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100"
            >
              <p class="text-sm">
                <span class="font-bold text-gray-800">Processing Company:</span>
                Smart-A Africa
              </p>
              <p
                class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
              >
                <span class="font-bold text-gray-800">Description:</span>Grading
                roasting and packaging was done within 30 days.
              </p>
              <p class="text-sm">
                <span class="font-bold text-gray-800"
                  >Raw material purchase date:
                </span>
                03 January, 2021
              </p>
              <p class="text-sm">
                <span class="font-bold text-gray-800">Packaging Date: </span>
                28th January, 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
