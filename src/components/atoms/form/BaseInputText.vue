<template>
  <input
    v-model="internalValue"
    class="input-text"
    type="text"
    v-bind="$attrs"
    @keydown.enter="trigger"
  >
</template>

<script lang="ts">
import { Component, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';

@Component
export default class BaseInputText extends mixins(InternalValueMixin) {
  @Emit() private enter(e: KeyboardEvent): KeyboardEvent {
    return e;
  }

  private trigger(e: KeyboardEvent): void {
    if (e.keyCode !== 13) return;
    this.enter(e);
  }
}
</script>

<style scoped lang="scss"></style>
