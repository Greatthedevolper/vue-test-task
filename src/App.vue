<template>
  <div class="container h-100">
    <Header />
    <div class="inner-body">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
export default {
  name: "AppVue",
  components: {
    Header
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {}
};
</script>
<style scoped></style>
