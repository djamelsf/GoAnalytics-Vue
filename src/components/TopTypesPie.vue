<template>
  <div id="chart">
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
//import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TopTypesPie",
  data: function () {
    return {
      series: null,
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        //labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        //labels: ["Person", "Event", "Organization", "Artifact", "Yagogeoentity"],
        labels: null,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["dataPie"]),
  },
  computed: {
    ...mapGetters(["getDataPie"]),
  },
  async created() {
    await this.dataPie();
    this.series = [1, 2, 3];
    this.chartOptions.labels = ["ha", "hi", "ho"];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
