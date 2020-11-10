<template>
  <header>
    <nav>
      <router-link :to="{name: $CONST.ROUTE_NAME.HOME}">
        Home
      </router-link> |
      <router-link :to="{name: $CONST.ROUTE_NAME.ABOUT}">
        About
      </router-link> |
      <router-link :to="{name: $CONST.ROUTE_NAME.SIGN_OUT}">
        signOut
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AuthHeader extends Vue {}
</script>

<style lang="scss" scoped>
nav {
  padding-bottom: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-active {
      color: #42b983;
    }
  }
}
</style>