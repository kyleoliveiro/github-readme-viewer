<template>
  <v-form class="text-center px-3">
    <v-icon
      size="96"
      class="mb-6"
    >mdi-github-face</v-icon>

    <v-text-field
      solo
      autofocus
      clearable
      rounded
      label="Github username"
      class="mx-auto mb-3"
      style="max-width: 32rem;"
      :error-messages="errors"
      v-model="username"
      data-cy="username-field"
    />

    <v-btn
      large
      color="primary"
      type="submit"
      :disabled="!username"
      @click.prevent="handleSubmit"
      data-cy="submit-btn"
    >Find repositories</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchForm',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    username: '',
  }),
  watch: {
    username() {
      this.$emit('change');
    },
  },
  methods: {
    ...mapActions([
      'fetchUser',
    ]),
    async handleSubmit() {
      try {
        await this.fetchUser(this.username);
        this.$emit('success', this.username);
      } catch (e) {
        this.$emit('error', e.message);
      }
    },
  },
};
</script>
