<template>
  <v-app style="background-color: #ffd9e8">
    <v-sheet>
      <v-app-bar
        v-if="this.$route.name !== 'index'"
        height="50%"
        color="#de95ba"
        dark
      >
        <v-img
          src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png"
          style="height: 100%; max-width: 8em"
          class="img-navbar"
          @click="goToHomeScreen"
        />
        <v-spacer> </v-spacer>
        <v-autocomplete
          v-if="show"
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          :@click="select ? seeDetail(select) : null"
          cache-items
          flat
          hide-no-data
          hide-details
          label="Search pokemon"
          solo-inverted
        >
        </v-autocomplete>
        <v-btn @click="showSearchBar" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
    </v-sheet>
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    goToHomeScreen() {
      this.select = null;
      this.$router.push("/home");
    },
    seeDetail(selected) {
      this.$router.push(`/detail/${selected.toLowerCase()}`);
    },
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    showSearchBar() {
      this.show = !this.show;
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.searchList.filter((e) => {
          this.capitalize(e);
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
  },
  computed: {
    searchList() {
      return this.$store.state.searchList;
    },
  },
  beforeCreate() {
    this.$store.dispatch("getPokemonForSearch");
  },
  created() {
    this.searchList;
  },
};
</script>

<style scoped>
.img-navbar:hover {
  cursor: pointer;
}
</style>
