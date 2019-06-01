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
import { Action } from "vuex-class";

@Component
export default class SignUp extends Vue {
  private password: string = "";
  private email: string = "";

  @Action("signUp", { namespace: "authenticate" }) signUpAction: any;

  signUp() {
    const data: Object = {
      password: this.password,
      email: this.email
    };
    this.signUpAction(data);
  }
}
</script>
