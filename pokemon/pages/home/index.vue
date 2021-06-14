<template>
  <v-container>
    <v-row v-if="allPokemon.length === 20" justify="center" align="center">
      <v-col
        v-for="(pokemon, i) in allPokemon"
        :key="i"
        :i="i"
        cols="5"
        sm="3"
        md="4"
      >
        <card-all-pokemon :pokemon="pokemon" />
      </v-col>
    </v-row>
    <div
      v-if="allPokemon.length === 20"
      style="justify-content: center; align-items: center; display: flex"
      class="my-4"
    >
      <v-btn
        v-if="pagination !== 1"
        class="ma-2 mx-4"
        outlined
        large
        fab
        color="#4a266a"
        @click.prevent="previousPage()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn
        @click.prevent="nextPage()"
        class="ma-2 mx-4"
        outlined
        large
        fab
        color="#4a266a"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <loading v-else />
  </v-container>
</template>

<script>
import CardAllPokemon from "../../components/CardAllPokemon.vue";
import loading from "../../layouts/loading.vue";
export default {
  components: {
    CardAllPokemon,
    loading,
  },
  methods: {
    nextPage() {
      this.$store.dispatch("getAllPokemon", "next");
    },
    previousPage() {
      this.$store.dispatch("getAllPokemon", "previous");
    },
  },
  computed: {
    allPokemon() {
      return this.$store.state.allPokemon;
    },
    pagination() {
      return this.$store.state.page;
    },
  },
  created() {
    this.allPokemon;
    this.pagination;
  },
  beforeCreate() {
    this.$store.dispatch("getAllPokemon");
  },
};
</script>

<style scoped>
#pokemon-rounded-bg {
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0 2em;
}
</style>
