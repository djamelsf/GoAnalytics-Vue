<template>
  <div id="app">
    <br />
    <b-form-input
      placeholder="Search"
      v-model="mot"
      list="input-list"
      id="input-with-list"
      required
    ></b-form-input>
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
  </div>
</template>

<script>
import dataJson from "../assets/data.json";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SideBar",
  data: function () {
    return { articles: dataJson, article: null };
  },
  methods: {
    ...mapActions(["upArticle"]),
    test(article) {
      this.upArticle(article);
    },
  },
  computed: {
    ...mapGetters(["getArticle"]),
  },
  created() {},
};
</script>
<style lang="scss" scoped>
#app {
  //background-color: rgba(206, 202, 202, 0.925);
  margin-top: 0px;
  //border: solid black;
  //color: white;
}
a {
  cursor: pointer;
}
</style>
