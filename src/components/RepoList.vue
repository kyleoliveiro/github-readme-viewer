<template>
  <div data-cy="repo-list">
    <template v-if="loading">
      <v-row
        v-for="(item, index) in Array(3)"
        :key="index"
      >
        <v-col>
          <v-card loading>
            <v-skeleton-loader type="card-heading, list-item-two-line" />
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <template v-if="repos.length">
        <v-row v-for="repo in repos" :key="repo.id" >
          <v-col>
            <RepoListItem :repo="repo" />
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <p class="py-12 px-3 text-center headline grey--text">This user has no public repositories 🙁️</p>
      </template>
    </template>
  </div>
</template>

<script>
import RepoListItem from '@/components/RepoListItem.vue';

export default {
  name: 'RepoList',
  components: {
    RepoListItem,
  },
  props: {
    repos: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
