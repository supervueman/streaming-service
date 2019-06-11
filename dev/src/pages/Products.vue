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
            v-if="product._id !== ''"
            v-for="product in products"
            :key="product._id"
            :id="product._id"
            :imageUrl="`${baseImageUrl}/${product.imageUrl}`"
            :title="product.title"
            :price="product.price"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ProductCardInterface } from "../types";
import { config } from "../config";

@Component
export default class Products extends Vue {
  private baseImageUrl: string = config.baseImageUrl;
  @Getter("getProducts", { namespace: "products" })
  products: ProductCardInterface[];
  @Getter("getCount", { namespace: "products" }) count: number;
  @Action("fetchProducts", { namespace: "products" }) fetchProducts: any;

  async mounted() {
    await this.fetchProducts();
  }
}
</script>
