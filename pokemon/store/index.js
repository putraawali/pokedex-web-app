const pokeURL = "https://pokeapi.co/api/v2/pokemon/";
const urlPokeSpecies = "https://pokeapi.co/api/v2/pokemon-species/";
let nextPokemonURL;
let previousPokemonURL;
export const state = () => ({
  allPokemon: [],
  page: 1,
  detailPokemon: {},
  isLoading: true,
  searchList: [],
});

export const mutations = {
  changeIsLoadingToTrue(state) {
    state.isLoading = true;
  },
  getAllPokemon(state, data) {
    data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    state.allPokemon = data;
  },
  incrementPage(state) {
    state.page++;
  },
  decrementPage(state) {
    state.page--;
  },
  detailPokemon(state, data) {
    state.detailPokemon = data;
    state.isLoading = false;
  },
  getPokemonForSearch(state, data) {
    state.searchList = data;
  },
};

export const actions = {
  async getAllPokemon({ commit }, requestPagination) {
    // result of this get request has previous and next url
    let pokemons;

    if (requestPagination === "next") {
      pokemons = await this.$axios.$get(nextPokemonURL);
    } else if (requestPagination === "previous") {
      pokemons = await this.$axios.$get(previousPokemonURL);
    } else {
      pokemons = await this.$axios.$get(pokeURL);
    }

    nextPokemonURL = pokemons.next;
    previousPokemonURL = pokemons.previous;

    let pokemonsContainer = [];
    pokemons.results.forEach(async (eachPokemon) => {
      let pokemon = await this.$axios.get(eachPokemon.url);
      let dataPokemon = {
        id: pokemon.data.id,
        name: pokemon.data.name,
        image: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.data.id}.png`,
        types: pokemon.data.types,
        detail: `/detail/${pokemon.data.name}`,
      };
      pokemonsContainer = pokemonsContainer.concat(dataPokemon);
      commit("getAllPokemon", pokemonsContainer);
    });
    if (requestPagination === "next") {
      commit("incrementPage");
    }
    if (requestPagination === "previous") {
      commit("decrementPage");
    }
  },
  async getDetailPokemon({ commit }, id) {
    let pokemonDetail = await this.$axios.get(`${pokeURL}${id}`);
    let pokemonSpecies = await this.$axios.get(`${urlPokeSpecies}${id}`);
    let pokemonEvolutionChain = await this.$axios.get(
      pokemonSpecies.data.evolution_chain.url
    );
    let pokemonForLoop = pokemonEvolutionChain.data.chain;
    let pokemonChainData = [];
    pokemonChainData.push(pokemonForLoop.species.name);
    for (let pokemon in pokemonForLoop) {
      if (pokemon === "evolves_to") {
        pokemonForLoop[pokemon].forEach((evoPoke) => {
          pokemonChainData.push(evoPoke.species.name);
          if (evoPoke.evolves_to.length > 0) {
            evoPoke.evolves_to.forEach((anotherEvoPoke) => {
              pokemonChainData.push(anotherEvoPoke.species.name);
            });
          }
        });
      }
    }
    const detailPokemon = {
      data: pokemonDetail.data,
      evolutions: pokemonChainData,
      image: `https://pokeres.bastionbot.org/images/pokemon/${pokemonDetail.data.id}.png`,
    };

    commit("detailPokemon", detailPokemon);
  },
  async getPokemonForSearch({ commit }) {
    const response = await this.$axios.get(`${pokeURL}?limit=500`);
    const pokemonList = response.data.results.map(
      (el) => el.name.charAt(0).toUpperCase() + el.name.slice(1)
    );
    commit("getPokemonForSearch", pokemonList);
  },
};
