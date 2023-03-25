<template>
  <Navbar />
  <div class="flex flex-wrap gap-8 justify-center py-28">
    <div v-if="favorites.length === 0">No favorites yet</div>
    <div v-else v-for="(pokemon, index) in favorites" :key="index">
      <Card :pokemon="pokemon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Card from '@/components/Card.vue'
import Navbar from '@/components/Navbar.vue'

import { usePokemonsStore } from '@/stores'

const pokemonsStore = usePokemonsStore()
const { favorites } = storeToRefs(pokemonsStore)
</script>
