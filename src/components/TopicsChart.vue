<template>
  <div id="chart">
    <h2>The most common topics of the articles </h2>
    <apexchart
      type="bar"
      height="600"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dataJson from "../assets/data.json";
export default {
  name: "TopicsChart",
  data: function () {
    return {
      dataJson: dataJson,
      series: [
        {
          name: "",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            ["Feb", "s"],
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: "Number of occurrences of a type ",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val + " times";
            },
          },
        },
      },
    };
  },
  methods: {
    ...mapActions(["mostPopularTopics"]),
    getSortOrder(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    },
    traitement(d) {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      d.sort(this.getSortOrder("dateTime"));
      let cat = [];
      let counts = [];
      d.forEach((element) => {
        let max = null;
        let tab = element["counts"];
        for (var key in tab) {
          if (max == null) {
            max = [key, tab[key]];
          } else {
            if (tab[key] > max[1]) {
              max = [key, tab[key]];
            }
          }
        }

        if (max != null) {
          let da = new Date(element["dateTime"]);
          cat.push([max[0], da.toLocaleDateString("en-US", options)]);
          counts.push(max[1]);
        }
      });
      return [cat, counts];
    },
  },
  computed: {
    ...mapGetters(["getMostPopularTopics"]),
  },
  async created() {
    let res = this.traitement(this.dataJson);
    this.chartOptions.xaxis.categories = res[0];
    this.series[0].data = res[1];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
