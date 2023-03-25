<template>
  <nav class="flex items-center justify-between flex-wrap bg-gray-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Poc App</span>
    </div>
    <div class="block lg:hidden">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path
            :class="{ hidden: isOpen, 'inline-flex': !isOpen }"
            class="inline-flex"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 6h14v2H3V6zm0 5h14v2H3v-2zm0 5h14v2H3v-2z"
          />
          <path
            :class="{ hidden: !isOpen, 'inline-flex': isOpen }"
            class="hidden"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 3h14v14H3V3zm2 2v10h10V5H5z"
          />
        </svg>
      </button>
    </div>
    <div
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto"
      :class="{ block: isOpen, hidden: !isOpen }"
    >
      <div class="flex lg:flex-grow gap-4 text-white">
        <div>
          <router-link class="nav-link" to="/"><h3 class="text-2xl">Home</h3></router-link>
        </div>
        <div>
          <router-link class="nav-link" to="/favorites"
            ><h3 class="text-2xl">Favorites</h3></router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
