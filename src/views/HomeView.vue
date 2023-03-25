<template>
  <Navbar />
  <div class="flex gap-24 flex-col">
    <div v-if="isLoading">Loading . . .</div>
    <div v-else class="flex flex-col gap-24 justify-center py-28">
      <Autocomplete />
      <div class="flex flex-wrap gap-8 justify-center">
        <div v-for="(pokemon, index) in pokemons" :key="index">
          <Card
            :pokemon="pokemon"
            :is-favorite="pokemonsStore.isFavorite"
            :on-click="pokemonsStore.viewDetail"
            :on-add-favorite="pokemonsStore.addToFavorites"
          />
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
import Card from '@/components/Card.vue'

const pokemonsStore = usePokemonsStore()
const { pokemons, nextUrl, previousUrl, isLoading } = storeToRefs(pokemonsStore)

pokemonsStore.fetchPokemons()
</script>
