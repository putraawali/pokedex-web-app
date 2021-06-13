<template>
  <section>
    <Loading v-if="isLoading" />
    <DetailPokemon v-if="!isLoading" :detailPokemon="detailPokemon" />
  </section>
</template>

<script>
import Loading from "../../layouts/loading.vue";
import DetailPokemon from "../../components/DetailPokemon.vue";
export default {
  components: {
    Loading,
    DetailPokemon,
  },
  computed: {
    detailPokemon() {
      return this.$store.state.detailPokemon;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  beforeCreate() {
    const id = this.$route.params.id;
    this.$store.dispatch("getDetailPokemon", id);
  },
  created() {
    this.detailPokemon;
  },
  mounted() {
    this.$store.commit("changeIsLoadingToTrue");
  },
};
</script>
