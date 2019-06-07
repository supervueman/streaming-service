<template lang="pug">
  v-flex(class="mt-5" v-if="profile")
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
    )
      v-card-title
        h1(class="title") Profile
      v-card-text
        v-text-field(
          v-model="profile.slug"
          label="Slug:"
          required
        )
        v-text-field(
          v-model="profile.firstname"
          label="Firstname:"
          required
        )
        v-text-field(
          v-model="profile.lastname"
          label="Lastname:"
          required
        )
        v-text-field(
          v-model="profile.email"
          label="E-mail:"
          required
        )
        v-text-field(
          v-model="profile.phone"
          label="Phone:"
          required
        )
        v-text-field(
          v-model="profile.website"
          label="Website:"
          required
        )
        v-text-field(
          v-model="profile.facebook"
          label="Facebook:"
          required
        )
        v-text-field(
          v-model="profile.instagram"
          label="Instagram:"
          required
        )
        v-text-field(
          v-model="profile.vkontakte"
          label="Vkontakte:"
          required
        )
        v-text-field(
          v-model="profile.avatar"
          label="Avatar:"
          required
        )
        v-text-field(
          v-model="profile.content"
          label="Content:"
          required
        )
      v-card-actions
        v-btn.ml-auto.mr-2.mb-2(
          color="primary"
          @click="save"
        ) Save
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Profile extends Vue {
  @Getter("getProfile", { namespace: "authenticate" }) profile: string;
  @Action("editProfile", { namespace: "profile" }) editProfile: any;

  save() {
    this.editProfile(this.profile);
  }
}
</script>
