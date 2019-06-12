<template lang="pug">
  v-toolbar(app dark class="primary")
    v-toolbar-title.mr-3 TEMPLATE
    v-toolbar-items(class="hidden-xs-and-down" v-if="profileId !== ''")
      v-btn(flat to="/users") Users
      v-btn(flat to="/streams") Streams
      v-btn(flat to="/products") Products
      v-btn(flat to="/add-product") Add product
      v-btn(flat to="/stream-owner") Start stream
    v-spacer
    v-toolbar-items(class="hidden-xs-and-down" v-if="profileId === ''")
      v-btn(flat to="/signin") Login
      v-btn(flat to="/signup") Sign up
    v-toolbar-items(class="hidden-xs-and-down" v-if="profileId !== ''")
      v-btn(flat to="/profile") Profile
    v-toolbar-items(class="hidden-xs-and-down" v-if="profileId !== ''")
      v-btn(flat @click="logout") Logout
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ProfileInterface } from "../../types";

@Component
export default class Toolbar extends Vue {
  @Prop({
    default: {
      _id: ""
    }
  })
  private profileId: string;

  @Action("logout", { namespace: "authenticate" }) logoutAction: any;

  logout() {
    this.logoutAction();
  }
}
</script>
