<template>
  <div
    class="d-flex flex-column w-50"
    :style="{
      gap: '24px'
    }"
  >
    <div
      class="d-flex flex-wrap justify-content-between"
      :style="{
        gap: '16px'
      }"
    >
      <div v-for="(pokemon, index) in pokemons" :key="index">
        <div class="card" @click="pokemonsStore.viewDetail(pokemon)">
          <div class="card-header">
            <h2>{{ pokemon.name }}</h2>
          </div>
          <div class="card-body">
            <!-- <img :src="pokemon.imageUrl" /> -->
            <button class="btn btn-primary" @click.stop="pokemonsStore.addToFavorites(pokemon)">
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button class="btn" v-if="previousUrl" @click="pokemonsStore.fecthPokemons(previousUrl)">
        Previous
      </button>
      <button class="btn" v-if="nextUrl" @click="pokemonsStore.fecthPokemons(nextUrl)">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePokemonsStore } from '@/stores'

const pokemonsStore = usePokemonsStore()
const { pokemons, nextUrl, previousUrl } = storeToRefs(pokemonsStore)

pokemonsStore.fecthPokemons()
</script>

<style>
.card {
  width: 300px;
}

.card:hover {
  cursor: pointer;
}
</style>
