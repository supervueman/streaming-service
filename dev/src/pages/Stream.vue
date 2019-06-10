<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
    )
      v-card-title Stream: {{stream.title}}
      v-card-text
        v-layout
          v-flex
            v-flex.title Product: {{stream.product.title}}
            v-flex
              v-img.mx-auto.my-3(
                :src="`/static/${stream.product.imageUrl}`"
                max-width="300"
                alt="alt"
              )
            v-flex Price: {{stream.product.price}}
            v-flex Content: {{stream.product.content}}

          v-flex
            v-flex.title Streamer: 
              router-link(
                :to="`/users/${stream.streamer._id}`"
              ) {{stream.streamer.firstname}} {{stream.streamer.lastname}}
            v-flex
              v-img.mx-auto.my-3(
                :src="`/static/${stream.streamer.avatar}`"
                max-width="300"
                alt="alt"
              )
            v-flex E-mail: {{stream.streamer.email}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { StreamInterface } from "../types";

@Component
export default class Stream extends Vue {
  @Getter("getStream", { namespace: "stream" }) stream: StreamInterface;
  @Action("fetchStream", { namespace: "stream" }) fetchStream: any;

  async mounted() {
    await this.fetchStream(this.$route.params.id);
  }
}
</script>
