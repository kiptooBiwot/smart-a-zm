<script setup>

  definePageMeta({
    layout: 'dashboard'
  })

 
  const crops = ref([
      {
        cropType: 'Coffee',
        cropVariety: 'Arabica',
        datePlanted: '15/04/2010',
        farmer: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
        description:
          'Having sprayed the crops, and the berries are turning red. The farm is requesting for inpection and QA.',
        cropImage:
          'https://images.pexels.com/photos/4090603/pexels-photo-4090603.jpeg',
      },
      {
        cropType: 'Coffee',
        cropVariety: 'Robusta',
        datePlanted: '15/04/2004',
        farmer: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        description: 'Inspection of harvested berries',
        cropImage:
          'https://images.pexels.com/photos/7125712/pexels-photo-7125712.jpeg',
      },
      {
        cropType: 'Maize',
        cropVariety: 'Hybrid 6-14',
        datePlanted: '09/01/2022',
        farmer: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
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
  <div class="py-10 px-5">
    <h3 class="font-bold text-2xl mb-6">Inspection Requests</h3>
    <div
      v-for="(item, index) in crops"
      :key="index"
      class="flex shadow-lg border border-gray-100 rounded-md text-sm mb-6 space-y-4"
    >
      <div class="w-3/12 mr-4 h-48 rounded-l-md overflow-hidden">
        <img :src="item.cropImage" class="object-contain" alt="" srcset="" />
      </div>
      <div>
        <div class="block">
          <div>
            <span class="font-bold tracking-wide">Crop:</span>
            {{ item.cropType }}
          </div>
          <div>
            <span class="font-bold tracking-wide">Variety:</span>
            {{ item.cropVariety }}
          </div>
          <div>
            <span class="font-bold tracking-wide">Description:</span>
            {{ item.description }}
          </div>
          <div>
            <span class="font-bold tracking-wide">Quantity:</span>
            {{ item.quantity }}
          </div>
          <div>
            <span class="font-bold tracking-wide">Farmer Etherum Address:</span>
            <a href="#" class="text-accent"> {{ item.farmer }} </a>
          </div>
          <!-- <div>
            <span class="font-bold tracking-wide">Inspection ID:</span>
            {{ item.inspectionStamp }}
          </div> -->
          <div class="my-2">
            <button class="btn-primary px-8">Schedule Inspection Date</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>
