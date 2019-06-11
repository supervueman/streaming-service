<template lang="pug">
  v-flex.py-2.px-2(v-if="profile")
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
    )
      v-card-title
        h1(class="title") Profile
      v-card-text
        v-text-field(
          v-model="profile.firstname"
          label="Firstname:"
          required
        )
        v-text-field(
          v-model="profile.lastname"
          label="Lastname:"
          required
        )
        v-text-field(
          v-model="profile.email"
          label="E-mail:"
          required
        )
        v-text-field(
          v-model="profile.phone"
          label="Phone:"
          required
        )
        v-text-field(
          v-model="profile.website"
          label="Website:"
          required
        )
        v-text-field(
          v-model="profile.facebook"
          label="Facebook:"
          required
        )
        v-text-field(
          v-model="profile.instagram"
          label="Instagram:"
          required
        )
        v-text-field(
          v-model="profile.vkontakte"
          label="Vkontakte:"
          required
        )

        v-img(:src="`${baseImageUrl}/${profile.avatar}`", alt="alt")
        v-btn(flat @click="triggerForUploadFile") Upload image

        v-text-field(
          v-model="profile.content"
          label="Content:"
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
        v-btn.ml-auto.mr-2.mb-2(
          color="primary"
          @click="save"
        ) Save
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ProfileInterface } from "../types";
import axios from "axios";
import { config } from "../config";

@Component
export default class Profile extends Vue {
  @Getter("getProfile", { namespace: "authenticate" })
  profile: ProfileInterface;
  @Action("editProfile", { namespace: "profile" }) editProfile: any;

  private baseImageUrl: string = config.baseImageUrl;
  private isSelectNewImage: boolean = false;

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

      const res: any = await axios(
        `${process.env.VUE_APP_SERVER_URL_DEV}/file-upload`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("access_token")
          },
          data: formData
        }
      );

      this.profile.avatar = res.data.filePath;
    }
    await this.editProfile(this.profile);
    this.isSelectNewImage = false;
  }
}
</script>
