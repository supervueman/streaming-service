<template lang="pug">
  div(class="sign-in" id="auth")
    h1(class="h1") Login
    div(class="form-group")
      input(type="text" name="email" placeholder="email" v-model="email")
    div(class="form-group")
      input(type="text" name="password" placeholder="password" v-model="password")
    button(class="btn" @click="signIn") Sign In
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signin extends Vue {
  password: string = "";
  email: string = "";

  get profile() {
    return this.$store.getters["authenticate/getProfile"];
  }

  signIn() {
    const data = {
      password: this.password,
      email: this.email
    };
    this.$store.dispatch("authenticate/signIn", data);
  }
}
</script>
