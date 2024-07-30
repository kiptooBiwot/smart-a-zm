<script>
definePageMeta({
  layout: 'dashboard',
})

const rawMaterials = ref([
  {
    product: 'Coffee',
    variety: 'Arabica',
    description: 'High quality Arabica Cofee from the highlands of Kenya',
    farmerEthAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    quantity: '5 tonnes',
    inspectionStamp: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    image:
      'https://images.pexels.com/photos/47316/cocoa-beans-cocoa-cacao-candy-47316.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
  {
    product: 'Coffee',
    variety: 'Robusta',
    description: 'High quality Arabica Cofee from the highlands of Kenya',
    farmerEthAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    quantity: '5 tonnes',
    inspectionStamp: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    image:
      'https://images.pexels.com/photos/7507354/pexels-photo-7507354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    product: 'Maize',
    variety: '6-14',
    description: 'Maize from Malawi',
    farmerEthAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    quantity: '20 tonnes',
    inspectionStamp: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    image:
      'https://images.pexels.com/photos/6316517/pexels-photo-6316517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    product: 'Tea',
    variety: 'Purple tea',
    description: 'High quality purple tea from the highlands of Ethiopia',
    farmerEthAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    quantity: '1 tonne',
    inspectionStamp: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    image:
      'https://images.pexels.com/photos/39347/tea-farmhouse-hand-fresh-39347.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
])
</script>

<template>
  <div class="bg-white block text-gray-600 p-6 m-5 h-auto shadow-xl rounded-lg">
    <h3 class="font-bold text-2xl mb-6">Raw Materials Available</h3>

    <div
      v-for="(item, index) in rawMaterials"
      :key="index"
      class="flex shadow-lg border border-gray-100 rounded-md text-sm mb-6 space-y-4"
    >
      <div class="w-3/12 mr-4 h-48 rounded-l-md overflow-hidden">
        <img :src="`${item.image}`" alt="" srcset="" />
      </div>
      <div>
        <div class="block">
          <div>
            <span class="font-bold tracking-wide">Product:</span>
            {{ item.product }}
          </div>
          <div>
            <span class="font-bold tracking-wide">Variety:</span>
            {{ item.variety }}
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
            <a href="#" class="text-accent hover:underline"
              >{{ item.farmerEthAddress }}
            </a>
          </div>
          <div>
            <span class="font-bold tracking-wide">Inspection ID:</span>
            <a href="#" class="text-accent hover:underline"
              >{{ item.inspectionStamp }}
            </a>
          </div>
          <div class="my-2">
            <button class="btn-primary">Purchase</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
