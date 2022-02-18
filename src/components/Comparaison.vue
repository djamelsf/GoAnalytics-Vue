<template>
  <div id="Comparaison">
    <b-form @submit="onSubmit">
      <b-row>
        <b-col cols="12" md="6">
          <b-form-input
            placeholder="Article title 1"
            v-model="form.doc1"
            list="input-list"
            id="input-with-list"
            required
          ></b-form-input>
          <b-form-datalist id="input-list" :options="options"></b-form-datalist>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-input
            placeholder="Article title 2"
            v-model="form.doc2"
            list="input-list"
            id="input-with-list"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <br />
      <b-button type="submit" variant="primary">Compare</b-button>
    </b-form>
    <div v-if="show">
      <b-row>
        <br />
        <b-col cols="12" md="6">
          <div class="overflow-auto" style="height: 500px">
            <div class="aa" v-html="doc1Content"></div>
          </div>

          <div id="chart" v-if="sh">
            <apexchart
              type="pie"
              width="380"
              :options="chartOptions1"
              :series="series1"
            ></apexchart>
          </div>
        </b-col>
        <b-col cols="12" md="6">
          <div class="overflow-auto" style="height: 500px">
            <div class="aa" v-html="doc2Content"></div>
          </div>

          <div id="chart2" v-if="sh">
            <apexchart
              type="pie"
              width="380"
              :options="chartOptions2"
              :series="series2"
            ></apexchart>
          </div>
        </b-col>
      </b-row>
      <div>
        <br />
        <b-card title="Similarities" v-if="sh">
          <b-card-text>
            Cosine similarity (Without Stop words) : {{ cosine }}
          </b-card-text>
          <b-card-text> Similarity (Spacy) : {{ sim }} </b-card-text>
          <b-card-text> Jaccard Similarity : {{ jaccard }} </b-card-text>
        </b-card>
      </div>
    </div>
    <div v-else><b-spinner label="Loading..."></b-spinner></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import axios from "axios";
/* import { mapGetters, mapActions } from "vuex"; */
import dataJson from "../assets/data.json";
//import tfidf from "../assets/TF_IDF.json";
//import wordcloud from "vue-wordcloud";
export default {
  name: "Comparaison",
  data: function () {
    return {
      show: true,
      sh: false,
      dataJson: dataJson,
      img: null,
      html: "",
      data: [],
      jaccard:null,
      options: [],
      doc1: null,
      doc2: null,
      form: {
        doc1: null,
        doc2: null,
      },
      doc1Content: null,
      doc2Content: null,
      cosine: null,
      sim: null,
      series1: [44, 55, 13, 43, 22],
      series2: [44, 55, 13, 43, 22],
      chartOptions1: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
      chartOptions2: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
    async onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form));
      this.sh = false;
      await this.render(this.form.doc1, 1);
      await this.render(this.form.doc2, 2);

      await this.link([this.doc1, this.doc2]);
      await this.simSpacy([this.doc1, this.doc2]);
      await this.jSim([this.doc1, this.doc2]);
      this.cosine = this.getData;
      this.sim = this.getDataSpacy;
      this.jaccard=this.getDataJ;
      this.show = true;
      this.sh = true;
    },
    async render(title, i) {
      let HTMLcontent = "";
      this.show = false;

      let article = null;
      this.dataJson.forEach((element) => {
        if (element["title"] == title) {
          article = element;
        }
      });
      this.img = article["img"];
      this.title = article["title"];
      HTMLcontent =
        '<div class="entities" style="line-height: 2.5; direction: ltr">';
      this.html = article["content"];
      this.data = article["ents"];
      let last = 0;
      for (let index = 0; index < this.data.length; index++) {
        const ligne = this.data[index];

        HTMLcontent += this.html.substring(last, ligne["start"]);
        HTMLcontent +=
          '<mark class="entity" style=" padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;">' +
          this.html.substring(ligne["start"], ligne["end"]) +
          "<span class='tooltiptext'> ";
        if (ligne["type"].length == 0) {
          for (let index = 0; index < ligne["types"].length; index++) {
            let element = ligne["types"][index];
            HTMLcontent += "<p>" + element + "</p>";
          }
        } else {
          for (let index = 0; index < ligne["type"].length; index++) {
            let element = ligne["type"][index];
            HTMLcontent += "<p>" + element + "</p>";
          }
        }

        HTMLcontent += "</span> </mark>";

        last = ligne["end"];
      }
      HTMLcontent += this.html.substring(last, this.html.length) + "</div>";
      await this.dataPie(this.html);
      if (i == 1) {
        this.doc1Content = HTMLcontent;
        this.doc1 = this.html;
        this.series1 = this.getDataPie[1];
        this.chartOptions1.labels = this.getDataPie[0];
      } else {
        this.doc2Content = HTMLcontent;
        this.doc2 = this.html;
        this.series2 = this.getDataPie[1];
        this.chartOptions2.labels = this.getDataPie[0];
      }

      this.show = true;
    },
    ...mapActions(["link", "simSpacy", "dataPie","jSim"]),
  },
  computed: {
    ...mapGetters(["getData", "getDataSpacy", "getDataPie","getDataJ"]),
  },
  created() {
    let tab = [];
    this.dataJson.forEach((element) => {
      tab.push(element["title"]);
    });
    this.options = tab;
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
