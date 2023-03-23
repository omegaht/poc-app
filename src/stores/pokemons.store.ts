import { defineStore } from 'pinia'
import router from '@/router'

export const usePokemonsStore = defineStore({
  id: 'pokemons',
  state: () => ({
    pokemons: [],
    nextUrl: '',
    previousUrl: '',
    isLoading: true,
    favorites: []
  }),
  actions: {
    async fecthPokemons(url = 'https://pokeapi.co/api/v2/pokemon/') {
      try {
        const response = await fetch(url)
        const data = await response.json()

        this.pokemons = data.results
        this.nextUrl = data.next
        this.previousUrl = data.previous
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    viewDetail(pokemon: any) {
      // Navigate to the new page for the selected pokemon
      router.push({ name: 'detail', params: { pokemonId: pokemon.name } })
    },
    addToFavorites(pokemon: any) {
      this.favorites = [...this.favorites, pokemon]
    }
  }
})
