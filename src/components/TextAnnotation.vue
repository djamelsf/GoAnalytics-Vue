<template>
  <div id="textAnnotation">
    <b-row>
      <b-col cols="12" md="3">
        <br />
        <b-list-group
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 700px; overflow-y: scroll"
        >
          <a
            v-for="(article, index) in articles"
            :key="index"
            @click="test(article)"
          >
            <b-list-group-item>{{ article["title"] }}</b-list-group-item></a
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9">
        <h2>{{ title }}</h2>
        <img :src="img" />
        <div v-if="show">
          <div class="overflow-auto" style="height: 500px">
            <div class="aa" v-html="HTMLcontent"></div>
          </div>
        </div>
        <div v-else><b-spinner label="Loading..."></b-spinner></div>
        <br />
        <!-- --------------------------------- -->
        <b-row>
          <b-col cols="12" md="5">
            <h3>Top-level types classification</h3>
            <div id="chart" v-if="show">
              <apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </b-col>
          <b-col cols="12" md="7">
            <h3>Words that characterize the article</h3>
            <wordcloud
              :data="defaultWords"
              nameKey="name"
              valueKey="value"
              color="Accent"
              :showTooltip="false"
              :wordClick="wordClickHandler"
            >
            </wordcloud>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dataJson from "../assets/data.json";
import tfidf from "../assets/TF_IDF.json";
import wordcloud from "vue-wordcloud";
export default {
  name: "TextAnnotation",
  components: {
    wordcloud,
  },
  data: function () {
    return {
      show: true,
      dataJson: dataJson,
      img: dataJson[0]["img"],
      title: null,
      articles: dataJson,
      article: null,
      words: tfidf,

      defaultWords: [],

      html: "",
      url: "",
      data: [],
      HTMLcontent: "",
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [],
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
    test(article) {
      this.article = article;
      this.NED(article["id"]);
    },
    wordClickHandler(name, value, vm) {
      console.log("wordClickHandler", name, value, vm);
    },
    async NED(id) {
      this.show = false;

      let article = null;
      this.dataJson.forEach((element) => {
        if (element["id"] == id) {
          article = element;
        }
      });
      this.img = article["img"];
      this.title = article["title"];
      this.HTMLcontent =
        '<div class="entities" style="line-height: 2.5; direction: ltr">';
      this.html = article["content"];
      this.data = article["ents"];
      let last = 0;
      for (let index = 0; index < this.data.length; index++) {
        const ligne = this.data[index];

        this.HTMLcontent += this.html.substring(last, ligne["start"]);
        this.HTMLcontent +=
          '<mark class="entity" style=" padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;">' +
          this.html.substring(ligne["start"], ligne["end"]) +
          "<span class='tooltiptext'> ";
        if (ligne["type"].length == 0) {
          for (let index = 0; index < ligne["types"].length; index++) {
            let element = ligne["types"][index];
            this.HTMLcontent += "<p>" + element + "</p>";
          }
        } else {
          for (let index = 0; index < ligne["type"].length; index++) {
            let element = ligne["type"][index];
            this.HTMLcontent += "<p>" + element + "</p>";
          }
        }

        this.HTMLcontent += "</span> </mark>";

        last = ligne["end"];
      }
      this.HTMLcontent +=
        this.html.substring(last, this.html.length) + "</div>";

      await this.dataPie(this.html);
      this.series = this.getDataPie[1];
      this.chartOptions.labels = this.getDataPie[0];

      this.show = true;

      let tab = [];
      for (const key in this.words[id]) {
        const element = this.words[id][key];
        let elt = { name: key, value: element };
        tab.push(elt);
      }
      this.defaultWords = tab;
    },
  },
  computed: {
    ...mapGetters(["getDataPie"]),
  },
  async created() {
    await this.NED(this.dataJson[10]["id"]);
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
