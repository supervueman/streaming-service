<template lang="pug">
  v-flex.py-2.px-2(v-if="product._id !== ''")
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

        v-img(
          v-if="product.imageUrl !== ''"
          :src="`${baseImageUrl}/${product.imageUrl}`"
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
          @change="isSelectNewImage = true"
        )
      v-card-actions
        v-btn(
          @click="remove"
          color="error"
          class="mr-2 mb-2 ml-auto"
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
import axios from "axios";
import { config } from "../config";

@Component
export default class Product extends Vue {
  @Getter("getProduct", { namespace: "product" }) product: ProductInterface;
  @Action("fetchProduct", { namespace: "product" }) fetchProduct: any;
  @Action("editProduct", { namespace: "product" }) editProduct: any;
  @Action("deleteProduct", { namespace: "product" }) deleteProduct: any;

  private baseImageUrl: string = config.baseImageUrl;
  private isSelectNewImage: boolean = false;

  async mounted() {
    await this.fetchProduct(this.$route.params.id);
  }

  triggerForUploadFile() {
    this.$refs.file.click();
  }

  async save() {
    if (this.isSelectNewImage) {
      const files = this.$refs.file.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const res: any = await axios("/file-upload", {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("access_token")
        },
        data: formData
      });

      this.product.imageUrl = res.data.filePath;
    }
    this.product.price = Number(this.product.price);
    await this.editProduct(this.product);

    this.isSelectNewImage = false;
  }

  async remove() {
    await this.deleteProduct(this.product._id);
  }
}
</script>
