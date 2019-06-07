<template lang="pug">
  v-flex.py-2.px-2
    v-card(
      class="mx-auto"
    )
      v-card-title Product {{$route.params.id}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Stream extends Vue {}
</script>
