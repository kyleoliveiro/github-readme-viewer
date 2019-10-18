<template>
  <v-app data-cy="app">
    <v-app-bar app dark class="elevation-0" v-if="appBar.isVisible">
      <v-btn icon data-cy="back-btn" v-if="appBar.backUrl" @click="$router.push(appBar.backUrl)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="appBar.title || appBar.subtitle">
        <div class="h1 font-weight-bold">{{ appBar.title }}</div>
        <v-expand-transition>
          <div class="caption text-truncate" style="max-width: 640px;" v-if="appBar.subtitle">
            {{ appBar.subtitle }}
          </div>
        </v-expand-transition>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-fade-transition hide-on-leave>
        <router-view />
      </v-fade-transition>
    </v-content>

    <v-footer app>
      <v-row justify="space-between" class="caption grey--text">
        <v-col>
          <span class="font-weight-bold">Github Readme Viewer</span>
        </v-col>
        <v-col class="text-right">
          <span>By <a href="https://github.com/kyleoliveiro">@kyleoliveiro</a></span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["appBar"])
  }
};
</script>
