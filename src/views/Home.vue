<template>
  <div class="home">
    <b-container class="bv-example-row" style="padding: 20px">
      <TopicsChart />
    </b-container>
  </div>
</template>



<script>

// @ is an alias to /src
import TopicsChart from "@/components/TopicsChart.vue";
export default {
  name: "Home",
  components: {
    TopicsChart,
  },
};
</script>


