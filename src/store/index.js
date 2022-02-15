import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'



Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    liste: null,
    data: null,
    dPie: null,
    articles:null,
    article:null,
  },
  mutations: {
    setListe(state, liste) {
      state.liste = liste;
    },
    setData(state, data) {
      state.data = data;
    },
    setDataPie(state, dPie) {
      state.dPie = dPie;
    },
    setArticles(state,articles){
      state.articles= articles;
    },
    setArticle(state,article){
      state.article= article;
    }
  },
  actions: {
    async link({ commit }, params) {
      let formData = new FormData();
      formData.append("url", params);
      await axios.post("http://127.0.0.1:5000/run", formData)
        .then(response => {
          commit('setData', response.data)
        })
    },
    async dataPie({ commit }, params) {
      let formData = new FormData();
      formData.append("url", params);
      await axios.post("http://127.0.0.1:5000/getTopTypes", formData)
        .then(response => {
          commit('setDataPie', response.data)
        })
    },
    async articles({ commit }, params) {
      commit('setArticles',params)
    },
    async upArticle({ commit }, params) {
      commit('setArticle',params)
    },

  },
  modules: {
  },
  getters: {
    liste: state => state.liste,
    getData: state => state.data,
    getDataPie: state => state.dPie,
    getArticles: state => state.articles,
    getArticle: state => state.article,
  }
})
