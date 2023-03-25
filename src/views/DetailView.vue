<template>
  <Navbar />
  <div v-if="pokemon">
    <div class="flex flex-col items-center p-8 gap-4">
      <h1 class="text-5xl font-bold">{{ pokemon.name }}</h1>

      <ul class="list-none ml-4 flex gap-4">
        <li v-for="type in pokemon.types" :key="type.type.name" class="rounded bg-amber-200 px-2">
          {{ type.type.name }}
        </li>
      </ul>

      <h4 class="text-xl font-bold"></h4>
      <img
        class="w-32 h-32 my-4"
        :src="pokemon.sprites.front_default"
        alt="Front sprite of {{ pokemon.name }}"
      />
      <div class="flex flex-col">
        <div class="my-2 flex items-center">
          <h3 class="text-lg font-semibold">Abilities:</h3>
          <ul class="list-none ml-4 px-2 flex gap-4">
            <li
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
              class="rounded bg-sky-400 p-2"
            >
              {{ ability.ability.name }}
            </li>
          </ul>
        </div>
        <div class="my-4 flex items-center gap-4">
          <h3 class="text-lg font-semibold">Base Experience:</h3>
          <p>{{ pokemon.base_experience }}</p>
        </div>
        <div class="my-4 flex items-center gap-4">
          <h3 class="text-lg font-semibold">Height</h3>
          <p>{{ pokemon.height }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'
export default {
  data() {
    return {
      pokemon: null as any,
      pokemonImg: null,
      isLoading: true
    }
  },
  async mounted() {
    const { pokemonId } = this.$route.params
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      this.pokemon = data
      this.isLoading = false
      this.pokemonImg = data.sprites.front_default
    } catch (error) {
      console.error(error)
    }
  },
  components: {
    Navbar
  }
}
</script>
