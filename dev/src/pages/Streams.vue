<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
    )
      v-card-title
        h1(class="title") Streams
      v-card-text
        v-layout.row.wrap(fill-height align-start justify-start)
          stream-card.xl3.lg3.md3.sm2.xs2(
            v-for="stream in streams"
            :key="stream._id"
            :id="stream._id"
            :streamerId="stream.streamer._id"
            :firstname="stream.streamer.firstname"
            :lastname="stream.streamer.lastname"
            :imageUrl="stream.imageUrl"
            :title="stream.title"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { StreamCardInterface } from "../types";

@Component
export default class Streams extends Vue {
  @Getter("getStreams", { namespace: "streams" })
  streams: StreamCardInterface[];
  @Getter("getCount", { namespace: "streams" }) count: number;
  @Action("fetchStreams", { namespace: "streams" }) fetchStreams: any;

  async mounted() {
    await this.fetchStreams();
  }
}
</script>
