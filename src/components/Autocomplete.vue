<template>
  <div>
    <input type="text" v-model="inputValue" />
    <ul>
      <li v-for="suggestion in suggestions" :key="suggestion.name">
        {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePokemonsStore } from '@/stores'

const { pokemons } = usePokemonsStore()

let inputValue = ref('')

const suggestions = computed(() => {
  const fushi = pokemons.filter((element) =>
    element.name.toLowerCase().includes(inputValue.value.toLowerCase())
  )
  return fushi
})
</script>
