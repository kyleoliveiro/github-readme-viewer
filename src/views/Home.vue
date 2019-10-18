<template>
  <v-container fill-height>
    <v-row justify="center" class="mb-12 pb-12">
      <v-col cols="12">
        <SearchForm
          :errors="searchFormErrors"
          @change="handleSearchFormChange"
          @error="handleSearchFormError"
          @success="handleSearchFormSuccess"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBarController from '@/mixins/AppBarController';
import SearchForm from '@/components/SearchForm.vue';

export default {
  name: 'Home',
  mixins: [
    AppBarController,
  ],
  components: {
    SearchForm,
  },
  data: () => ({
    searchFormErrors: [],
  }),
  mounted() {
    this.setAppBar({
      isVisible: false,
      title: '',
      subtitle: '',
      backUrl: '',
    });
  },
  methods: {
    handleSearchFormError(errorCode) {
      let errorMessage;
      switch (errorCode) {
        case '404':
          errorMessage = 'Github user not found.';
          break;
        case '403':
          this.$router.push('/rate-limited');
          break;
        default:
          errorMessage = `Error: ${errorCode}.`;
      }

      this.searchFormErrors.push(errorMessage);
    },
    handleSearchFormSuccess(username) {
      this.$router.push(`/view/${username}`);
    },
    handleSearchFormChange() {
      this.searchFormErrors = [];
    },
  },
};
</script>
