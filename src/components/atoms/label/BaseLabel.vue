<template>
  <label
    class="base-label"
    v-bind="$attrs"
  >
    <slot />
  </label>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/** ベースとなるlabelコンポーネント */
@Component
export default class BaseLabel extends Vue {}
</script>

<style scoped lang="scss"></style>
