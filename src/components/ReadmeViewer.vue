<template>
  <v-card :loading="loading" data-cy="readme-viewer">
    <div class="pa-6">
      <template v-if="loading">
        <v-skeleton-loader type="article" />
      </template>
      <template v-else>
        <article v-html="renderedContents" class="markdown-body"></article>
      </template>
    </div>
  </v-card>
</template>

<script>
import dompurify from "dompurify";
import marked from "marked";

export default {
  name: "ReadmeViewer",
  props: {
    contents: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    renderedContents() {
      return dompurify.sanitize(
        marked(this.contents, {
          gfm: true
        })
      );
    }
  }
};
</script>

<style lang="scss">
@import "~github-markdown-css";

.markdown-body {
  // Override some vuetify styles
  code {
    box-shadow: none;
    font-weight: normal;

    &::before,
    &::after {
      display: none;
    }
  }
}
</style>
