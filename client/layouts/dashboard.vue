<script script></script>

<template>
  <div class="flex h-screen bg-gray-50">
    <div class="z-10 w-0 md:w-64 overflow-hidden flex-shrink-0">
      <dashboardSideBar />
    </div>
    <div class="flex flex-col flex-1">
      <dashboardNavBar />
      <!-- <slot /> -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 #94a3b8;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 60px;
}

*::-webkit-scrollbar-thumb {
  background-color: #94a3b8;
  border-radius: 100px;
  border: 3px solid #94a3b8;
}
</style>
