<template lang="pug">
  v-flex.py-2.px-2
    v-card(:to="`/products/${id}`")
      v-img(
        :src="`/static/${imageUrl}`"
        aspect-ratio="1"
      )
      v-flex.px-2 Product: {{title}}
      v-flex Price: {{price}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ProductCard extends Vue {
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
    default: ""
  })
  private price: string;
}
</script>
