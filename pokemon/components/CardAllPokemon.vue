<template>
  <v-card
    class="rounded-xl mx-3"
    align="center"
    style="background-color: #fff5f9; padding-top: 1em"
    id="card-custom"
    @mouseenter="mouseOver(i)"
    @mouseleave="mouseOver(i)"
  >
    <div
      id="pokemon-rounded-bg"
      class="rounded-circle"
      style="max-height: 10em; max-width: 10em"
    >
      <v-img
        v-if="isImageLoading"
        src="https://www.freepnglogos.com/uploads/pokeball-png/pokeball-the-poke-basic-league-accepting-challengers-9.png"
      />
      <v-img v-if="!isImageLoading" :eager="true" :src="pokemon.image" />
    </div>
    <div class="text-center text-h5 mt-5" style="color: #333">
      {{ capitalize(pokemon.name) }}
    </div>
    <v-card-text justify="center" align="center">
      <v-chip
        v-for="(type, j) in pokemon.types"
        :key="j"
        class="ma-2"
        :color="chipsColorType(type.type.name)"
      >
        {{ capitalize(type.type.name) }}
      </v-chip>
    </v-card-text>
    <v-overlay v-if="hover && index === i" absolute opacity="0.7">
      <v-btn color="#B5B5B5" nuxt :to="pokemon.detail">See more info</v-btn>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isImageLoading: false,
      hover: true,
      hover: false,
      index: 0,
    };
  },
  props: ["pokemon", "i"],
  methods: {
    mouseOver(index) {
      this.index = index;
      this.hover = !this.hover;
    },
    chipsColorType(type) {
      const colours = [
        { name: "normal", color: "#A8A77A" },
        { name: "fire", color: "#EE8130" },
        { name: "water", color: "#6390F0" },
        { name: "electric", color: "#F7D02C" },
        { name: "grass", color: "#7AC74C" },
        { name: "ice", color: "#96D9D6" },
        { name: "fighting", color: "#C22E28" },
        { name: "poison", color: "#A33EA1" },
        { name: "ground", color: "#E2BF65" },
        { name: "flying", color: "#A98FF3" },
        { name: "psychic", color: "#F95587" },
        { name: "bug", color: "#A6B91A" },
        { name: "rock", color: "#B6A136" },
        { name: "ghost", color: "#735797" },
        { name: "dragon", color: "#6F35FC" },
        { name: "dark", color: "#705746" },
        { name: "steel", color: "#B7B7CE" },
        { name: "fairy", color: "#D685AD" },
      ];
      const found = colours.find((color) => color.name === type);
      return found.color;
    },
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
};
</script>

<style></style>
