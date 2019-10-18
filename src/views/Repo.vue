<template>
  <v-container class="margin: auto;" style="max-width: 882px;">
    <template v-if="isRepoValid !== false">
      <v-row>
        <v-col>
          <ReadmeViewer :contents="repoReadme" :loading="isLoading" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <div class="py-12 px-3 text-center" data-cy="invalid-repo-message">
        <p class="headline grey--text">
          @{{ $route.params.user }}/{{ $route.params.repo }} does not exist!
        </p>
        <router-link to="/">Back home</router-link>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import AppBarController from "@/mixins/AppBarController";
import ReadmeViewer from "@/components/ReadmeViewer.vue";

export default {
  name: "User",
  mixins: [AppBarController],
  components: {
    ReadmeViewer
  },
  data: () => ({
    isLoading: true,
    isRepoValid: true,
    repoMeta: null,
    repoReadme: ""
  }),
  async mounted() {
    const { user, repo } = this.$route.params;

    this.setAppBar({
      isVisible: true,
      title: "",
      subtitle: "",
      backUrl: `/view/${user}`
    });

    try {
      this.repoMeta = await this.fetchRepoMeta({ user, repo });
      this.repoReadme = await this.fetchRepoReadme({ user, repo });

      this.setAppBar({
        title: `@${this.repoMeta.owner.login} / ${this.repoMeta.name}`,
        subtitle: this.repoMeta.description
      });

      this.isLoading = false;
    } catch (e) {
      switch (e.message) {
        case "404":
          this.isRepoValid = false;
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
    ...mapActions(["fetchRepoMeta", "fetchRepoReadme"])
  }
};
</script>
