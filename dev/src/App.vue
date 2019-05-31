<template lang="pug">
	div(id="app")
		v-app(light)
			toolbar(:profile="profile")
			div {{profile}}
			v-content
				v-container(fluid id="container")
					router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class App extends Vue {
  @Action("fetchProfile", { namespace: "authenticate" }) fetchProfile: any;
  @Getter("getProfile", { namespace: "authenticate" }) profile: string;

  async mounted() {
    await this.fetchProfile();
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
