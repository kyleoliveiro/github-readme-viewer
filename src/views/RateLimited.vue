<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="py-12 px-3 text-center">
          <p class="headline grey--text">The application has been rate limited. Try again later!</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RateLimited',
};
</script>
