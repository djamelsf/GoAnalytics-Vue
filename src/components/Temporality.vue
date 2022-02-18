<template>
  <div id="Temporality">
    <b-form-input
      placeholder="Search entity"
      list="input1-list"
      @change="search(word)"
      v-model="word"
      id="input-with-list1"
      required
    ></b-form-input>
    <b-form-datalist id="input1-list" :options="options"></b-form-datalist>
    <br />
    <div id="chart">
      <apexchart
        type="rangeBar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import axios from "axios";
/* import { mapGetters, mapActions } from "vuex"; */
import words from "../assets/words.json";
//import tfidf from "../assets/TF_IDF.json";
//import wordcloud from "vue-wordcloud";
export default {
  name: "Temporality",
  data: function () {
    return {
      words: words,
      word: "",
      options: words,
      series: [
        {
          data: [
            {
              
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          type: "datetime",
        },
      },
    };
  },
  methods: {
    async search(word) {
      await this.computeTemporality(word);
      let res = this.getTemporality;
      let tab=[]
      res.forEach((element) => {
        let t = {
          x: element["x"],
          y: [
            new Date(element["y"][0]).getTime(),
            new Date(element["y"][1]).getTime(),
          ],
        };
        tab.push(t);
      });
      this.series=[{data:tab}];
      console.log(this.series)
    },
    ...mapActions(["computeTemporality"]),
  },
  computed: {
    ...mapGetters(["getTemporality"]),
  },
  created() {
      //this.search("Lionel Messi");
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

.aa::v-deep .entity {
  position: relative;
  display: inline-block;
  background-color: #42b983;
}

.aa::v-deep .entity .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  /*  bottom: 100%;
  left: 50%;
  margin-left: -60px; */
}

.aa::v-deep .entity:hover .tooltiptext {
  visibility: visible;
}

a {
  cursor: pointer;
}
</style>
