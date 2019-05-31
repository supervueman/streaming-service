<template lang="pug">
  v-app
    v-toolbar(app)
      v-toolbar-title(class="headline text-uppercase")
        span(class="font-weight-light") STREAM SERVICE
      v-spacer
      v-btn(flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank")
        span(class="mr-2") Latest Release
    v-content
      v-container(fluid id="container")
            router-view
</template>

<script>
export default {
  name: "App",
  beforeCreate() {
    this.$store.dispatch("authenticate/fetchProfile");
  }
};
</script>
