<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg h-588"
    @click="props.onClick && props.onClick(pokemon)"
  >
    <img class="w-full" :src="pokemon?.sprites.front_default" alt="pokemon front image" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ pokemon?.name }}</div>
      <p class="text-gray-700 text-base">
        {{ pokemon?.description }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <div v-if="props.isFavorite ? !props.isFavorite(pokemon) : false">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click.stop="props.onAddFavorite && props.onAddFavorite(pokemon)"
        >
          Add Favorite
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pokemon: Object,
  isFavorite: { type: Function, required: false },
  onClick: { type: Function, required: false },
  onAddFavorite: { type: Function, required: false }
})
</script>
