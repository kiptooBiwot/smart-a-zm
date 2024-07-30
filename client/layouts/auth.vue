<script setup></script>

<template>
  <div class="relative">
    <nav>
      <Navbar />
    </nav>
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>
