<template lang="pug">
  v-flex.py-2.px-2
    v-card(:to="`/streams/${id}`")
      v-img(
        :src="`/static/${imageUrl}`"
        aspect-ratio="1"
      )
      v-flex.px-2 {{title}}
      v-flex Price: {{price}}
      v-flex Streamer: 
        router-link(:to="`/users/${streamerId}`") {{firstname}} {{lastname}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class StreamCard extends Vue {
  @Prop({
    default: "",
    required: true
  })
  private id: string;

  @Prop({
    default: ""
  })
  private imageUrl: string;

  @Prop({
    default: ""
  })
  private title: string;

  @Prop({
    default: 0,
    required: true
  })
  private price: number;

  @Prop({
    default: "",
    required: true
  })
  private streamerId: string;

  @Prop({
    default: ""
  })
  private firstname: string;

  @Prop({
    default: ""
  })
  private lastname: string;
}
</script>
