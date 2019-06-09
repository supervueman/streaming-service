<template lang="pug">
  v-flex(class="mt-5")
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
      @keyup.enter="signIn"
    )
      v-card-title
        h1(class="title") Login
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
      v-card-actions
        //- router-link(to="/reset-password" class="ml-2") Забыли пароль?
        v-btn(
          @click="signIn"
          color="primary"
          class="ml-auto mr-2 mb-2"
        ) Login
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Signin extends Vue {
  private password: string = "";
  private email: string = "";

  @Action("signIn", { namespace: "authenticate" }) signInAction: any;

  async signIn() {
    const data: Object = {
      password: this.password,
      email: this.email
    };
    await this.signInAction(data);
  }
}
</script>
