import Vue from "vue";
import Vuex from "vuex";
//import axios from 'axios'




Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    liste: null,
    data: null,
    dPie: null,
    articles: null,
    mPA: null,
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
    setArticles(state, articles) {
      state.articles = articles;
    },
    setMostPopularTopics(state, mPA) {
      state.mPA = mPA;
    }
  },
  actions: {
 /*    async link({ commit }, params) {
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
    }, */
    async articles({ commit }, params) {
      commit('setArticles', params)
    },
    async mostPopularTopics({ commit }, params) {
      let cat = [];
      let counts = []
      params.forEach(element => {
        let max = null;
        let tab = element['counts'];
        for (var key in tab) {
          if (max == null) {
            max = [key, tab[key]]
          } else {
            if (tab[key] > max[1]) {
              max = [key, tab[key]]
            }
          }
        }


        if (max != null) {
          cat.push([max[0], element['dateTime']])
          counts.push(max[1])
        }


      });
      commit('setMostPopularTopics', [cat, counts])
    },

  },
  modules: {
  },
  getters: {
    liste: state => state.liste,
    getData: state => state.data,
    getDataPie: state => state.dPie,
    getArticles: state => state.articles,
    getMostPopularTopics: state => state.mPA,
  }
})
