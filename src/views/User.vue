<template>
  <v-container class="mx-auto" style="max-width: 882px;">
    <template v-if="isUserValid !== false">
      <v-row v-show="!isLoading && repos.length > 0">
        <v-col>
          <v-text-field
            rounded
            outlined
            clearable
            autofocus
            hide-details
            label="Filter repos"
            append-icon="mdi-magnify"
            v-model="filterString"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <RepoList :repos="filteredRepos" :loading="isLoading" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <div class="py-12 px-3 text-center" data-cy="invalid-user-message">
        <p class="headline grey--text">@{{ $route.params.user }} does not exist!</p>
        <router-link to="/">Back home</router-link>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import AppBarController from "@/mixins/AppBarController";
import RepoList from "@/components/RepoList.vue";

export default {
  name: "User",
  mixins: [AppBarController],
  components: {
    RepoList
  },
  data: () => ({
    isLoading: true,
    isUserValid: null,
    filterString: "",
    user: null,
    repos: []
  }),
  computed: {
    sortedRepos() {
      return [...this.repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    },
    filteredRepos() {
      return [...this.sortedRepos].filter(repo =>
        repo.name.toLowerCase().includes(this.filterString.toLowerCase().trim())
      );
    }
  },
  async mounted() {
    const { user } = this.$route.params;

    this.setAppBar({
      isVisible: true,
      title: "",
      subtitle: "",
      backUrl: "/"
    });

    try {
      this.user = await this.fetchUser(user);
      this.repos = await this.fetchRepos(user);

      this.setAppBar({
        title: `@${this.user.login}`,
        subtitle: this.user.name
      });

      this.isLoading = false;
    } catch (e) {
      switch (e.message) {
        case "404":
          this.isUserValid = false;
          break;
        case "403":
          this.$router.push("/rate-limited");
          break;
        default:
          throw new Error(e);
      }
    }
  },
  methods: {
    ...mapActions(["fetchUser", "fetchRepos"])
  }
};
</script>
