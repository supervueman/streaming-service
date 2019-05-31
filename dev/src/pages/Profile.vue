<template lang="pug">
  section(class="main-sect" v-if="profile")
    h1(class="h1") Hello {{ profile.email }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
  get profile() {
    return this.$store.getters["authenticate/getProfile"];
  }
}
</script>
