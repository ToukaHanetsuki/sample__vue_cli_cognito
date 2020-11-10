<template>
  <button
    class="base-button"
    v-bind="$attrs"
    @click="click"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class BaseButton extends Vue {
  @Emit() private click(e: Event): Event {
    return e;
  }
}
</script>

<style scoped lang="scss"></style>
