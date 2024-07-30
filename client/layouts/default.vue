<script setup></script>

<template>
  <div class="relative">
    <nav class="">
      <Navbar />
    </nav>
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>

<style>
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #64748b #111827;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #64748b;
  border-radius: 60px;
}

*::-webkit-scrollbar-thumb {
  background-color: #111827;
  border-radius: 20px;
  border: 3px solid #111827;
}
</style>
