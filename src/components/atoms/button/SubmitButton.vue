<template>
  <base-button
    class="submit-button"
    :disabled="isProgressing"
    v-bind="$attrs"
    @click="submit"
  >
    <slot />
  </base-button>
</template>

<script lang="ts">
import { Component, Emit } from 'vue-property-decorator';
import BaseButton from './BaseButton.vue';
import { mixins } from 'vue-class-component';
import { clickEventPropMixin } from '@/mixins/clickEventPropMixin';

/** 多重送信防止buttonコンポーネント */
@Component({
  components: {
    BaseButton
  }
})
export default class SubmitButton extends mixins(clickEventPropMixin) {
  private progressing = false;

  private get isProgressing(): boolean {
    return this.progressing;
  }

  @Emit() public async submit(e: Event): Promise<unknown> {
    this.progressing = true;
    const resq = await this.clickEvent(e).catch(err => err);
    this.progressing = false;
    return resq;
  }
}
</script>

<style scoped lang="scss"></style>
