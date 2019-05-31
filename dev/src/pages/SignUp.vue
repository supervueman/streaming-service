<template lang="pug">
  div(class="sign-up" id="auth")
    h1(class="h1") Registration
    div(class="form-group")
      input(type="text" name="email" placeholder="email" v-model="email")
    div(class="form-group")
      input(type="text" name="password" placeholder="password" v-model="password")
    button(class="btn" @click="signUp") Sign Up
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SignUp extends Vue {
  password: string = "";
  email: string = "";

  get profile() {
    return this.$store.getters["authenticate/getProfile"];
  }

  signUp() {
    const data = {
      password: this.password,
      email: this.email
    };
    this.$store.dispatch("authenticate/signUp", data);
  }
}
</script>
