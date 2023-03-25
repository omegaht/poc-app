<template>
  <div class="flex self-center" v-click-outside="hideSuggestions">
    <div>
      <input
        type="text"
        v-model="inputValue"
        placeholder="Enter a pokemon name"
        class="form-input"
        @input="showSuggestions = true"
      />
      <aside
        class="absolute z-10 flex flex-col items-start w-64 bg-white border rounded-md shadow-md mt-1"
        role="menu"
        aria-labelledby="menu-heading"
        v-if="suggestions.length > 0 && showSuggestions"
      >
        <ul class="flex flex-col w-full">
          <li
            class="px-2 py-3 space-x-2 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="onSuggestionSelected(suggestion)"
          >
            {{ suggestion.name }}
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePokemonsStore } from '@/stores'
import { storeToRefs } from 'pinia'

const pokemonsStore = usePokemonsStore()
const { pokemons } = storeToRefs(pokemonsStore)

let inputValue = ref('')
let showSuggestions = ref(false)

const suggestions = computed(() => {
  const fushi = pokemons.value.filter((element) =>
    element.name.toLowerCase().includes(inputValue.value.toLowerCase())
  )
  return fushi
})

const onSuggestionSelected = (suggestion: any) => {
  inputValue.value = suggestion.name
  showSuggestions.value = false
}

const hideSuggestions = () => {
  showSuggestions.value = false
}
</script>
