<template>
  <v-sheet
    class="my-4 mx-16 pb-4"
    outlined
    rounded="xl"
    color="rgba(255, 255, 255, 0.4)"
    style="border-witdh: 10px; border-color: grey"
  >
    <v-container>
      <center>
        <p style="font-size: 5vw">Vukedex!</p>
      </center>
      <center>
        <p style="font-size: 3.5vw">All your favorite pokemon, are here!</p>
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
          all pokemon
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
