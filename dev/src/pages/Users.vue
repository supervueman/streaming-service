<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
    )
      v-card-title
        h1(class="title") Users
      v-card-text
        v-layout.row.wrap(fill-height align-start justify-start)
          user-card.xl3.lg3.md3.sm2.xs2(
            v-for="user in users"
            :key="user._id"
            :id="user._id"
            :firstname="user.firstname"
            :lastname="user.lastname"
            :avatar="`${baseImageUrl}/${user.avatar}`"
            :email="user.email"
            :phone="user.phone"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { UserCardInterface } from "../types";
import { config } from "../config";

@Component
export default class Users extends Vue {
  @Getter("getUsers", { namespace: "users" }) users: UserCardInterface[];
  @Getter("getCount", { namespace: "users" }) count: number;
  @Action("fetchUsers", { namespace: "users" }) fetchUsers: any;

  private baseImageUrl: string = config.baseImageUrl;

  async mounted() {
    await this.fetchUsers();
  }
}
</script>
