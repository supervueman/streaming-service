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
import { Action } from "vuex-class";

@Component
export default class Signin extends Vue {
  private password: string = "";
  private email: string = "";

  @Action("signIn", { namespace: "authenticate" }) signInAction: any;

  signIn() {
    const data: Object = {
      password: this.password,
      email: this.email
    };
    this.signInAction(data);
  }
}
</script>
