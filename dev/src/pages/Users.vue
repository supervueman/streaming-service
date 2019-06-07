<template lang="pug">
  v-flex(class="mt-5")
    v-card(
      class="mx-auto"
      tag="form"
    )
      v-card-title
        h1(class="title") Users
      v-card-text
        v-layout.row.wrap(fill-height align-start justify-start)
          user-card.xl3.lg3.md3.sm2.xs2(
            firstname="Rinat"
            lastname="Davlikamov"
            avatar="avatar.jpg"
            email="supervueman@gmail.com"
            phone="+7 (937) 078-08-30"
            id="1"
            slug="supervueman"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Users extends Vue {}
</script>
