import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appBar: {
      isVisible: false,
      title: "",
      subtitle: "",
      backUrl: ""
    }
  },
  mutations: {
    setAppBar(state, payload) {
      state.appBar = Object.assign(state.appBar, payload);
    }
  },
  actions: {
    async fetchUser(context, user) {
      const response = await fetch(`https://api.github.com/users/${user}`, {
        headers: {
          Authorization: "token c0ee7d81401ad11802e202b66591313f685b6853"
        }
      });

      if (response.status !== 200) throw new Error(response.status);

      const json = await response.json();
      return { ...json };
    },
    async fetchRepos(context, user) {
      const response = await fetch(`https://api.github.com/users/${user}/repos`, {
        headers: {
          Authorization: "token c0ee7d81401ad11802e202b66591313f685b6853"
        }
      });

      if (response.status !== 200) throw new Error(response.status);

      const json = await response.json();
      return [...json];
    },
    async fetchRepoMeta(context, { user, repo }) {
      const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
        headers: {
          Authorization: "token c0ee7d81401ad11802e202b66591313f685b6853"
        }
      });

      if (response.status !== 200) throw new Error(response.status);

      const json = await response.json();
      return { ...json };
    },
    async fetchRepoReadme(context, { user, repo }) {
      const response = await fetch(`https://api.github.com/repos/${user}/${repo}/readme`, {
        headers: {
          Authorization: "token c0ee7d81401ad11802e202b66591313f685b6853"
        }
      });

      if (response.status !== 200) throw new Error(response.status);

      const json = await response.json();
      const contents = await fetch(json.download_url);
      const text = await contents.text();
      return text;
    }
  }
});
