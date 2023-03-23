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
        <div class="card" @click="toggleFavorite(pokemon)">
          <div class="card-header">
            <h2>{{ pokemon.name }}</h2>
          </div>
          <div class="card-body">
            <!-- <img :src="pokemon.imageUrl" /> -->
            <button class="btn">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button class="btn" v-if="previousUrl" @click="loadPage(previousUrl)">Previous</button>
      <button class="btn" v-if="nextUrl" @click="loadPage(nextUrl)">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pokemons: [],
      nextUrl: '',
      previousUrl: ''
    }
  },
  mounted() {
    this.loadPage('https://pokeapi.co/api/v2/pokemon/')
  },
  methods: {
    loadPage(url: string) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.pokemons = data.results
          this.nextUrl = data.next
          this.previousUrl = data.previous
        })
        .catch((error) => console.log(error))
    },
    toggleFavorite(pokemon: any) {
      // Navigate to the new page for the selected pokemon
      this.$router.push({ name: 'detail', params: { pokemonId: pokemon.name } })
    }
  }
}
</script>

<style>
.card {
  width: 300px;
}

.card:hover {
  cursor: pointer;
}
</style>
