<template lang="pug">
  v-flex(mt-5)
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
      @keyup.enter="signUp"
    )
      v-card-title
        h1(class="title") Sign up
      v-card-text
        v-text-field(
          v-model="email"
          label="E-mail:"
          required
        )
        v-text-field(
          v-model="password"
          label="Password:"
          type="password"
          required
        )
        v-text-field(
          v-model="confirmPassword"
          label="Repeat password:"
          type="password"
          required
        )
      v-card-actions
        v-btn(
          @click="signUp"
          color="primary"
          class="ml-auto mr-2 mb-2") Sign up
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class SignUp extends Vue {
  private password: string = "";
  private email: string = "";
  private confirmPassword: string = "";

  @Action("signUp", { namespace: "authenticate" }) signUpAction: any;

  async signUp() {
    const data: Object = {
      password: this.password,
      email: this.email
    };

    await this.signUpAction(data);
  }
}
</script>
