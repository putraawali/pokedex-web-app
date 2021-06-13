<template>
  <v-card class="mx-auto rounded-xl my-2 pt-3" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img class="mx-4" :src="detailPokemon.image"></v-img>

    <h1 class="text-center text-uppercase" style="letter-spacing: 0.1em">
      {{ detailPokemon.data.name }}
    </h1>

    <v-card-text>
      <v-row align="center" justify="center" class="mx-0">
        <v-chip
          v-for="(type, i) in detailPokemon.data.types"
          :key="i"
          class="mx-2"
          outlined
          :color="chipsColorType(type.type.name)"
        >
          {{ capitalize(type.type.name) }}
        </v-chip>
      </v-row>

      <v-card-text justify="center" align="center">
        <p class="mt-4">Hp: {{ detailPokemon.data.stats[0].base_stat }}</p>
        <v-sheet
          height="4px"
          width="60%"
          rounded
          :style="hpBar(detailPokemon.data.types[0].type.name)"
        ></v-sheet>
      </v-card-text>

      <v-row>
        <v-col justify="center" align="center">
          <p class="subtitle-1">Attack</p>
          <p class="body-2">
            {{ detailPokemon.data.stats[1].base_stat }}
          </p>
        </v-col>
        <v-col justify="center" align="center">
          <p class="subtitle-1">Defense</p>
          <p class="body-2">
            {{ detailPokemon.data.stats[2].base_stat }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <div class="d-flex justify-center">
        <v-chip-group
          v-model="selection"
          style="justify-content: space-between"
        >
          <v-chip
            class="mx-2"
            v-for="(evolution, i) in detailPokemon.evolutions"
            :key="i"
            nuxt
            outlined
            color="#6155a6"
            :to="`/detail/${evolution}`"
            >{{ capitalize(evolution) }}</v-chip
          >
        </v-chip-group>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["detailPokemon"],
  data() {
    return {
      selection: 1,
    };
  },
  methods: {
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    hpBar(type) {
      let color = this.chipsColorType(type);
      return `
      background: #ef3b36;
      background: -webkit-linear-gradient(to right, ${color}, #dbf6e9);
      background: linear-gradient(to right, ${color}, #dbf6e9);
      `;
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
  },
};
</script>

<style scoped>
.card-custom {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 15px;
}
</style>
