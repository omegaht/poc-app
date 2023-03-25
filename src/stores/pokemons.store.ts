import { defineStore } from 'pinia'
import router from '@/router'

interface Pokemon {
  name: string
  url: string
  description?: string
}

interface PokemonsState {
  pokemons: Pokemon[]
  nextUrl: string | null
  previousUrl: string | null
  isLoading: boolean
  favorites: Pokemon[]
  filteredList: Pokemon[]
}

export const usePokemonsStore = defineStore({
  id: 'pokemons',
  state: (): PokemonsState => ({
    pokemons: [],
    nextUrl: '',
    previousUrl: '',
    isLoading: true,
    favorites: JSON.parse(localStorage.getItem('favorites') || ''),
    filteredList: []
  }),
  actions: {
    async fetchPokemons(url = 'https://pokeapi.co/api/v2/pokemon/') {
      try {
        const response = await fetch(url)
        const data = await response.json()

        const apiData = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const pokemonInfo = await this.fetchPokemonInfo(pokemon.url)
            const pokemonDescription = await this.fetchPokemonInfo(pokemonInfo.species.url)
            const { flavor_text_entries } = await pokemonDescription

            return { ...pokemonInfo, description: flavor_text_entries[0].flavor_text }
          })
        )

        this.pokemons = apiData
        this.nextUrl = data.next
        this.previousUrl = data.previous
        this.isLoading = false
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPokemonInfo(url: string) {
      try {
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        console.log(error)
      }
    },

    viewDetail(pokemon: Pokemon) {
      router.push({ name: 'detail', params: { pokemonId: pokemon.name } })
    },
    addToFavorites(pokemon: Pokemon) {
      this.favorites = [...this.favorites, pokemon]
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    isFavorite(pokemon: Pokemon) {
      return this.favorites.some((favorited) => favorited.name === pokemon.name)
    },
    filterPokemons(searchTerm: string) {
      return this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }
})
