<template>
  <div class="ComparaisonPage">
    <b-container class="bv-example-row" style="padding: 20px">
      <ComparaisonVue />
    </b-container>
  </div>
</template>



<script>

// @ is an alias to /src
import ComparaisonVue from "@/components/Comparaison.vue";

export default {
  name: "Comparaison",
  components: {
    ComparaisonVue,
  },
};
</script>


