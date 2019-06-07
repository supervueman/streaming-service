<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
    )
      v-card-title
        h1(class="title") Products
      v-card-text
        v-layout.row.wrap(fill-height align-start justify-start)
          product-card.xl3.lg3.md3.sm2.xs2(
            id="1"
            imageUrl="avatar.jpg"
            title="Product"
            :price="12"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Products extends Vue {}
</script>
