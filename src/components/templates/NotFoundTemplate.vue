<template>
  <div class="not-found">
    <main class="not-found-main">
      <h1>404</h1>
      <p>お探しのページが見つかりません。</p>
      <a
        href="#"
        @click.prevent="routerBack"
      >BACK</a>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFoundTemplate extends Vue {
  private routerBack() {
    this.$router.back();
  }
}
</script>
