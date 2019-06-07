<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
      tag="form"
    )
      v-card-title
        h1(class="title") Streams
      v-card-text
        v-layout.row.wrap(fill-height align-start justify-start)
          stream-card.xl3.lg3.md3.sm2.xs2(
            firstname="Rinat"
            lastname="Davlikamov"
            id="1"
            streamerId="1"
            imageUrl="avatar.jpg"
            title="Product"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Streams extends Vue {}
</script>
