<script setup>
definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <div class="min-h-screen py-5">
    <div class="w-[70%] mx-auto py-10 px-10 bg-white rounded-md">
      <div>
        <!-- <dashboard-sms-multiselect /> -->
        <Multiselect />
      </div>
    </div>
  </div>
</template>
