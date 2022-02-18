<template>
  <div class="TemporalityPage">
    <b-container class="bv-example-row" style="padding: 20px">
      <Temporality />
    </b-container>
  </div>
</template>

<script>
//import TextAnnotation from '../components/TextAnnotation.vue';
// @ is an alias to /src
import Temporality from "@/components/Temporality.vue";
export default {
  name: "TemporalityPage",
  components: {
    Temporality,
  },
};
</script>