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

        v-img(
          :src="`${baseImageUrl}/${product.imageUrl}`"
          max-widht="300"
          alt="alt"
        )

        v-btn(flat @click="triggerForUploadFile") Upload image

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

        input(
          class="input-file"
          type="file"
          ref="file"
          multiple
          style="display: none;"
        )

      v-card-actions
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
import axios from "axios";
import { config } from "../config";

@Component
export default class AddProduct extends Vue {
  private product = {
    title: "",
    content: "",
    imageUrl: "",
    price: 0
  };

  private baseImageUrl: string = config.baseImageUrl;

  @Action("addProduct", { namespace: "product" }) addProduct: any;

  triggerForUploadFile() {
    this.$refs.file.click();
  }

  async save() {
    const files = this.$refs.file.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    const res = await axios(
      `${process.env.VUE_APP_SERVER_URL_DEV}/file-upload`,
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("access_token")
        },
        data: formData
      }
    );

    this.product.imageUrl = res.data.filePath;
    this.product.price = Number(this.product.price);
    this.addProduct(this.product);
  }
}
</script>
