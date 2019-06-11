<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
      @keyup.enter="save"
    )
      v-card-title
        h1(class="title") Product: {{product.title}}
      v-card-text
        v-text-field(
          v-model="product.title"
          label="Title:"
          required
        )

        v-img(:src="`${baseImageUrl}/${product.imageUrl}`", alt="alt")

        v-text-field(
          v-model="product.content"
          label="Content:"
          required
        )
        v-text-field(
          v-model="product.price"
          label="Price:"
          type="number"
          required
        )
      v-card-actions
        v-btn(
          @click="stream"
          class="ml-auto mr-2 mb-2"
        ) Stream
        v-btn(
          @click="remove"
          color="error"
          class="mr-2 mb-2"
        ) Remove
        v-btn(
          @click="save"
          color="primary"
          class="mr-2 mb-2"
        ) Save product
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ProductInterface } from "../types";
import { config } from "../config";

@Component
export default class Product extends Vue {
  @Getter("getProduct", { namespace: "product" }) product: ProductInterface;
  @Action("fetchProduct", { namespace: "product" }) fetchProduct: any;
  @Action("editProduct", { namespace: "product" }) editProduct: any;
  @Action("deleteProduct", { namespace: "product" }) deleteProduct: any;
  @Action("createStream", { namespace: "stream" }) createStream: any;

  private baseImageUrl: string = config.baseImageUrl;

  async mounted() {
    await this.fetchProduct(this.$route.params.id);
  }

  async save() {
    this.product.price = Number(this.product.price);
    await this.editProduct(this.product);
  }

  async remove() {
    await this.deleteProduct(this.product._id);
  }

  async stream() {
    this.createStream({
      prodId: this.product._id,
      title: this.product.title,
      imageUrl: this.product.imageUrl
    });
  }
}
</script>
