<template>
  <base-button
    class="submit-button"
    :disabled="isProgressing"
    @click="submit"
  >
    <slot />
  </base-button>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import BaseButton from './BaseButton.vue';

@Component({
  components: {
    BaseButton
  }
})
export default class SubmitButton extends Vue {
  private progressing = false;

  private get isProgressing(): boolean {
    return this.progressing;
  }

  @Prop({ required: true }) private clickEvent!: (e: Event) => Promise<unknown>;

  @Emit() public async submit(e: Event): Promise<unknown> {
    this.progressing = true;
    const resq = await this.clickEvent(e);
    this.progressing = false;
    return resq;
  }
}
</script>

<style scoped lang="scss"></style>
