<template lang="pug">
  v-flex.py-2.px-2(v-if="profile._id !== ''")
    v-card(
      class="mx-auto"
    )
      v-card-title.title My stream
      v-card-text
        video#camera-stream
        v-text-field(
          v-model="stream.title"
          label="Title:"
          required
        )
        v-img(
          v-if="stream.imageUrl !== ''"
          :src="`${baseImageUrl}/${stream.imageUrl}`"
          alt="alt"
        )
        v-btn(flat @click="triggerForUploadFile") Upload image
        input(
          class="input-file"
          type="file"
          ref="file"
          multiple
          style="display: none;"
          @change="isSelectNewImage = true"
        )
      v-card-actions
        v-btn(primary @click="startStream") Start stream
        v-btn(primary @click="stopStream") Stop stream
        v-btn(primary @click="edit") Update stream
        v-btn#start-camera(primary) start video
    v-card(
      class="mx-auto"
      v-if="isStreamStart"
    )
      v-card-title
        h1(class="title") Offers
      v-card-text
        v-layout.row.wrap(fill-height align-start justify-start)
          offer-card.xl3.lg3.md3.sm2.xs2(
            v-if="product._id !== ''"
            v-for="product in products"
            :key="product._id"
            :id="product._id"
            :imageUrl="`${baseImageUrl}/${product.imageUrl}`"
            :title="product.title"
            :price="product.price"
            @activateOffer="activateOffer(product)"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import {
  ProfileInterface,
  StreamInterface,
  ProductCardInterface,
  ProductInterface
} from "../types";
import { config } from "../config";
import axios from "axios";

@Component
export default class StreamOwner extends Vue {
  @Getter("getProfile", { namespace: "authenticate" })
  profile: ProfileInterface;
  @Action("fetchProfile", { namespace: "authenticate" }) fetchProfile;
  @Action("fetchStream", { namespace: "stream" }) fetchStream;
  @Getter("getProducts", { namespace: "products" })
  products: ProductCardInterface[];
  @Getter("getCount", { namespace: "products" }) count: number;
  @Action("fetchProducts", { namespace: "products" }) fetchProducts: any;
  @Action("createStream", { namespace: "stream" }) createStream: any;
  @Action("deleteStream", { namespace: "stream" }) deleteStream: any;
  @Action("editStream", { namespace: "stream" }) editStream: any;
  @Getter("getStream", { namespace: "stream" }) stream: StreamInterface;

  private baseImageUrl: string = config.baseImageUrl;
  private isStreamStart: boolean = false;
  private title: string = "";
  private imageUrl: string = "";
  private isSelectNewImage: boolean = false;
  private offerId: string = "";

  async startStream() {
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

      this.stream.imageUrl = res.data.filePath;
      this.createStream({
        title: this.stream.title,
        imageUrl: this.stream.imageUrl
      });
      this.isStreamStart = true;
      this.isSelectNewImage = false;
    }
  }

  async stopStream() {
    await this.deleteStream(this.stream._id);
    this.$router.push("/streams");
  }

  async edit() {
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

      this.stream.imageUrl = res.data.filePath;
    }
    await this.editStream({
      ...this.stream,
      prodId: this.offerId
    });
  }

  activateOffer(offer) {
    this.offerId = offer._id;
  }

  triggerForUploadFile() {
    this.$refs.file.click();
  }

  async mounted() {
    await this.fetchProfile();
    await this.fetchProducts();

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    // References to all the element we will need.
    var video = document.querySelector("#camera-stream"),
      start_camera = document.querySelector("#start-camera");

    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!navigator.getMedia) {
    } else {
      // Request the camera.
      navigator.getMedia(
        { video: true },
        stream => {
          // Create an object URL for the video stream and
          // set it as src of our HTLM video element.
          try {
            video.srcObject = stream;
          } catch (error) {
            video.src = window.URL.createObjectURL(stream);
          }
          // video.srcObject = window.URL.createObjectURL(stream);
          // Play the video element to start the stream.
          video.play();
        },
        // Error Callback
        function(err) {
          console.log(err);
        }
      );
    }
  }
}
</script>

<style lang="sass">
#camera-stream
  width: 100%
</style>

