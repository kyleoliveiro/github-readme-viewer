<template>
  <v-card
    hover
    outlined
    link
    :ripple="false"
    :to="`/view/${repo.owner.login}/${repo.name}`"
    data-cy="repo-list-item"
  >
    <v-card-title>{{repo.name}}</v-card-title>
    <v-card-subtitle>{{repo.description}}</v-card-subtitle>

    <v-card-actions>
      <v-spacer />

      <div class="pa-2">
        <v-icon
          small
          class="pa-1"
        >mdi-eye</v-icon>
        <span class="caption font-weight-bold">{{repo.watchers_count}}</span>
      </div>

      <div class="pa-2">
        <v-icon
          small
          class="pa-1"
        >mdi-star</v-icon>
        <span class="caption font-weight-bold">{{repo.stargazers_count}}</span>
      </div>

      <div class="pa-2">
        <v-icon
          small
          class="pa-1"
        >mdi-source-fork</v-icon>
        <span class="caption font-weight-bold">{{repo.forks_count}}</span>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RepoListItem',
  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
};
</script>
