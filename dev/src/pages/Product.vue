<template lang="pug">
  v-flex(class="mt-5")
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
      @keyup.enter="save"
    )
      v-card-title
        h1(class="title") Product {{$route.params.id}}
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
        v-btn(
          @click="save"
          color="primary"
          class="ml-auto mr-2 mb-2"
        ) Save product  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Product extends Vue {
  get product() {
    return {
      title: "",
      content: "",
      price: 0,
      imageUrl: ""
    };
  }

  save() {
    console.log("save");
  }
}
</script>
