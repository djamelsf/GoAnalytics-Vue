<template>
  <div class="NewsArticles">
    <b-container class="bv-example-row" style="padding: 20px">
      <TextAnnotation />
    </b-container>
  </div>
</template>

<script>
//import TextAnnotation from '../components/TextAnnotation.vue';
// @ is an alias to /src
import TextAnnotation from "@/components/TextAnnotation.vue";
export default {
  name: "NewsArticles",
  components: {
    TextAnnotation,
  },
};
</script>