<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
      @keyup.enter="save"
    )
      v-card-title
        h1(class="title") Add product
      v-card-text
        v-text-field(
          v-model="product.title"
          label="Title:"
          required
        )
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
        v-text-field(
          v-model="product.imageUrl"
          label="Image:"
          required
        )
      v-card-actions
        //- router-link(to="/reset-password" class="ml-2") Забыли пароль?
        v-btn(
          @click="save"
          color="primary"
          class="ml-auto mr-2 mb-2"
        ) Add product
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { ProductInterface } from "../types";

@Component
export default class AddProduct extends Vue {
  private product = {
    title: "",
    content: "",
    imageUrl: "",
    price: 0
  };

  @Action("addProduct", { namespace: "product" }) addProduct: any;

  async save() {
    this.product.price = Number(this.product.price);
    await this.addProduct(this.product);
  }
}
</script>
