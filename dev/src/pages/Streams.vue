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
            v-if="stream._id !== ''"
            v-for="stream in streams"
            :key="stream._id"
            :id="stream._id"
            :streamerId="stream.streamer._id"
            :firstname="stream.streamer.firstname"
            :lastname="stream.streamer.lastname"
            :imageUrl="`${baseImageUrl}/${stream.imageUrl}`"
            :title="stream.title"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { StreamCardInterface } from "../types";
import { config } from "../config";
import openSocket from "socket.io-client";

@Component
export default class Streams extends Vue {
  @Getter("getStreams", { namespace: "streams" })
  streams: StreamCardInterface[];
  @Getter("getCount", { namespace: "streams" }) count: number;
  @Action("fetchStreams", { namespace: "streams" }) fetchStreams: any;

  private baseImageUrl: string = config.baseImageUrl;

  async mounted() {
    const socket = openSocket(process.env.VUE_APP_SERVER_URL_DEV);
    socket.on("streams", async data => {
      if (data.action === "create") {
        this.streams.push(data.stream);
        // await this.fetchStreams();
      }
      if (data.action === "delete") {
        await this.fetchStreams();
      }
    });
    await this.fetchStreams();
  }
}
</script>
