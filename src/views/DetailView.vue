<template>
  <div v-if="isLoading">Loading . . .</div>
  <div class="card" v-else>
    <img :src="pokemonImg" alt="a graphic pokemon representation" />
    <div class="card-header">
      <h1>{{ this.$route.params.pokemonId }}</h1>
    </div>
    <div class="card-body">
      <p>base experience: {{ pokemon?.base_experience }}</p>
      <p>height: {{ pokemon?.height }}</p>
      <p>weight: {{ pokemon?.weight }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pokemon: null,
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
  }
}
</script>
