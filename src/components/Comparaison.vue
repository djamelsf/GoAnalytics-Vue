<template>
  <div id="Comparaison">
    <b-form @submit="onSubmit">
      <b-row>
        <b-col cols="12" md="6">
          <b-form-input
            placeholder="Search"
            v-model="form.doc1"
            list="input-list"
            id="input-with-list"
            required
          ></b-form-input>
          <b-form-datalist id="input-list" :options="options"></b-form-datalist>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-input
            placeholder="Search"
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
  </div>
</template>

<script>
//import axios from "axios";
/* import { mapGetters, mapActions } from "vuex"; */
import dataJson from "../assets/data.json";
//import tfidf from "../assets/TF_IDF.json";
//import wordcloud from "vue-wordcloud";
export default {
  name: "Comparaison",
  data: function () {
    return {
      dataJson: dataJson,
      options: [],
      form: {
        doc1:null,
        doc2:null,
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
  computed: {},
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
</style>
