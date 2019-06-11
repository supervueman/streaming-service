<template lang="pug">
  v-flex.py-2.px-2(v-if="user._id !== ''")
    v-card(
        class="mx-auto"
        max-width="500"
        tag="form"
      )
        v-card-title
          h1(class="title") {{user.firstname}} {{user.lastname}}
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

          v-img(
            v-if="user.imageUrl !== ''"
            :src="`${baseImageUrl}/${user.avatar}`"
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
import { UserInterface } from "../types";
import { config } from "../config";

@Component
export default class User extends Vue {
  @Getter("getUser", { namespace: "user" }) user: UserInterface;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;

  private baseImageUrl: string = config.baseImageUrl;

  async mounted() {
    await this.fetchUser(this.$route.params.id);
  }
}
</script>
