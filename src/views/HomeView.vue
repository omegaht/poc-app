<template>
  <Navbar />
  <div class="flex gap-24 flex-col">
    <div v-if="isLoading">Loading . . .</div>
    <div v-else class="flex flex-col gap-24 justify-center py-28">
      <Autocomplete />
      <div class="flex flex-wrap gap-8 justify-center">
        <div v-for="(pokemon, index) in pokemons" :key="index">
          <div
            class="max-w-sm rounded overflow-hidden shadow-lg h-588"
            @click="pokemonsStore.viewDetail(pokemon)"
          >
            <img
              class="w-full"
              :src="pokemon.sprites.front_default"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{ pokemon?.name }}</div>
              <p class="text-gray-700 text-base">
                {{ pokemon?.description }}
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <div v-if="!pokemonsStore.isFavorite(pokemon)">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click.stop="pokemonsStore.addToFavorites(pokemon)"
                >
                  Add Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-16 justify-center mb-16">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          v-if="previousUrl"
          @click="pokemonsStore.fetchPokemons(previousUrl)"
        >
          Previous
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          v-if="nextUrl"
          @click="pokemonsStore.fetchPokemons(nextUrl)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePokemonsStore } from '@/stores'
import Autocomplete from '@/components/Autocomplete.vue'
import Navbar from '@/components/Navbar.vue'

const pokemonsStore = usePokemonsStore()
const { pokemons, nextUrl, previousUrl, isLoading } = storeToRefs(pokemonsStore)

pokemonsStore.fetchPokemons()
</script>

<style>
.card {
  width: 300px;
}

.card:hover {
  cursor: pointer;
}
</style>
