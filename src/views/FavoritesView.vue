<template>
  <div
    class="d-flex flex-wrap justify-content-between"
    :style="{
      gap: '16px'
    }"
  >
    <div v-if="favorites.length === 0">No favorites yet</div>
    <div v-else v-for="(pokemon, index) in favorites" :key="index">
      <div class="card">
        <div class="card-header">
          <h1>{{ pokemon.name }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePokemonsStore } from '@/stores'

const pokemonsStore = usePokemonsStore()
const { favorites } = storeToRefs(pokemonsStore)
</script>
