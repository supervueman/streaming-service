<template lang="pug">
  v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
    )
      v-card-title
        h1(class="title") User {{$route.params.id}}
      v-card-text
        v-text-field(
          v-model="user.firstname"
          label="Firstname:"
          disabled
        )
        v-text-field(
          v-model="user.lastname"
          label="Lastname:"
          disabled
        )
        v-text-field(
          v-model="user.email"
          label="E-mail:"
          disabled
        )
        v-text-field(
          v-model="user.phone"
          label="Phone:"
          disabled
        )
        v-text-field(
          v-model="user.website"
          label="Website:"
          disabled
        )
        v-text-field(
          v-model="user.facebook"
          label="Facebook:"
          disabled
        )
        v-text-field(
          v-model="user.instagram"
          label="Instagram:"
          disabled
        )
        v-text-field(
          v-model="user.vkontakte"
          label="Vkontakte:"
          disabled
        )
        v-text-field(
          v-model="user.avatar"
          label="Avatar:"
          disabled
        )
        v-text-field(
          v-model="user.content"
          label="Content:"
          disabled
        )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class User extends Vue {
  get user() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      vkontakte: "",
      avatar: "",
      content: ""
    };
  }
}
</script>
