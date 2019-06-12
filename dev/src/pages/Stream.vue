<template lang="pug">
  v-flex.py-2.px-2(v-if="stream._id !== ''")
    v-card(
      class="mx-auto"
    )
      v-card-title Stream: {{stream.title}}
      v-card-text
        v-layout
          v-flex(v-if="stream.product")
            v-flex
              v-img.mx-auto.my-3(
                v-if="stream.product.imageUrl !== ''"
                :src="`${baseImageUrl}/${stream.product.imageUrl}`"
                max-width="300"
                alt="alt"
              )
              v-flex Product {{stream.product.title}} {{stream.product.price}}$
              v-flex {{stream.product.content}}

          v-flex
            v-flex.title Streamer: 
              router-link(
                :to="`/users/${stream.streamer._id}`"
              ) {{stream.streamer.firstname}} {{stream.streamer.lastname}}
            v-flex
              v-img.mx-auto.my-3(
                :src="`${baseImageUrl}/${stream.streamer.avatar}`"
                max-width="300"
                alt="alt"
              )
            v-flex E-mail: {{stream.streamer.email}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { StreamInterface } from "../types";
import { config } from "../config";
import openSocket from "socket.io-client";

@Component
export default class Stream extends Vue {
  @Getter("getStream", { namespace: "streamOwner" }) stream: StreamInterface;
  @Action("fetchStream", { namespace: "streamOwner" }) fetchStream: any;

  private baseImageUrl: string = config.baseImageUrl;

  async mounted() {
    await this.fetchStream(this.$route.params.id);
    const socket = openSocket(process.env.VUE_APP_SERVER_URL_DEV);
    socket.on("stream", async data => {
      if (data.action === "update") {
        if (data.stream._id === this.$route.params.id) {
          await this.fetchStream(this.$route.params.id);
        }
      }
    });

    socket.on("streams", async data => {
      if (data.action === "delete") {
        if (data._id === this.$route.params.id) {
          this.$router.push("/streams");
        }
      }
    });
  }
}
</script>
