<template>
  <div>
    <BaseLabel>{{ label }}</BaseLabel>
    <BaseInputText
      v-model="internalValue"
      @enter="onClickSubmit"
    />
    <SubmitButton
      ref="submitButton"
      :disabled="!isValue"
      :click-event="clickEvent"
    >
      {{ submitText }}
    </SubmitButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import SubmitButton from '@/components/atoms/button/SubmitButton.vue';
import BaseLabel from '@/components/atoms/label/BaseLabel.vue';
import BaseInputText from '@/components/atoms/input/BaseInputText.vue';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';

/** 検索バーコンポーネント */
@Component({
  components: {
    SubmitButton,
    BaseLabel,
    BaseInputText
  }
})
export default class InputSearch extends mixins<InternalValueMixin<string>>(InternalValueMixin) {
  @Prop({ required: true }) private submitText!: string;
  @Prop({ required: true }) private label!: string;
  @Prop({ required: true }) private clickEvent!: (e: Event) => Promise<unknown>;

  protected get isValue(): boolean {
    return this.internalValue.length > 0;
  }

  private onClickSubmit(e: KeyboardEvent): void {
    (this.$refs.submitButton as SubmitButton).submit(e);
  }
}
</script>

<style scoped lang="scss"></style>
