<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
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
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Users extends Vue {}
</script>
