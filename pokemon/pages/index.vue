<template>
  <v-sheet
    class="my-4 mx-16"
    outlined
    rounded="xl"
    color="rgba(255, 255, 255, 0.4)"
    style="border-witdh: 10px; border-color: grey"
    height="91vh"
  >
    <v-container>
      <center>
        <p class="mt-auto" style="font-size: 4rem">Vukedex!</p>
      </center>
      <center>
        <p style="font-size: 1.5rem">All your favorite pokemon, are here!</p>
      </center>
      <v-row>
        <v-btn
          class="mx-auto my-5"
          style="color: white"
          nuxt
          to="/home"
          rounded
          color="#4a266a"
        >
          find all pokemon
        </v-btn>
      </v-row>
      <v-row>
        <v-img
          class="mt-6 mx-auto"
          width="100%"
          max-width="25rem"
          :src="require('../assets/pokemon-home.png')"
        ></v-img>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      height: window.innerHeight,
    };
  },
  beforeCreate() {
    this.$store.dispatch("getAllPokemon");
  },
};
</script>

<style scoped></style>
