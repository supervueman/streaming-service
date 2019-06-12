<template lang="pug">
  v-flex.py-2.px-2
    v-card(:to="`/users/${id}`")
      v-img(
        v-if="avatar !== ''"
        :src="avatar"
        aspect-ratio="1"
      )
      v-flex.px-2 {{firstname}} {{lastname}}
      v-flex Phone: {{phone}}
      v-flex E-mail: {{email}}
      v-flex Is stream {{isStream}}
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserCard extends Vue {
  @Prop({
    default: ""
  })
  private firstname: string;

  @Prop({
    default: ""
  })
  private lastname: string;

  @Prop({
    default: ""
  })
  private avatar: string;

  @Prop({
    default: ""
  })
  private email: string;

  @Prop({
    default: ""
  })
  private phone: string;

  @Prop({
    default: ""
  })
  private id: string;

  @Prop({
    default: false
  })
  private isStream: boolean;
}
</script>
