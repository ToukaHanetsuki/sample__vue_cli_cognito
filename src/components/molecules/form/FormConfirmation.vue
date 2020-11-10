<template>
  <form class="form-confirmation">
    <BaseLabel>
      メールアドレス
      <BaseInputText
        v-model="email"
        type="email"
      />
    </BaseLabel>
    <BaseLabel>
      認証コード
      <BaseInputText
        v-model="confirmationCode"
      />
    </BaseLabel>
    <SubmitButton
      :disabled="isDisabled"
      :click-event="clickEvent"
    >
      CONFIRMATION
    </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import BaseInputText from '@/components/atoms/input/BaseInputText.vue';
import SubmitButton from '@/components/atoms/button/SubmitButton.vue';
import BaseLabel from '@/components/atoms/label/BaseLabel.vue';

export interface ConfirmationForm extends Email, ConfirmationCode {}
interface Email { email: string }
interface ConfirmationCode { confirmationCode: string }

type Diff = Email|ConfirmationCode;

/** メールアドレス認証するためのFormコンポーネント */
@Component({
  components: {
    BaseInputText,
    SubmitButton,
    BaseLabel
  }
})
export default class FormConfirmation extends Vue {
  @Prop({required: true}) private value!: ConfirmationForm;
  @Prop({ required: true }) private clickEvent!: (e: Event) => Promise<unknown>;

  private confirmPassword = '';

  private get email() {
    return this.value.email;
  }

  private set email(email: string) {
    this.updateValue({ email });
  }

  private get isEmail() {
    return this.email.trim().length > 1;
  }

  private get confirmationCode() {
    return this.value.confirmationCode;
  }

  private set confirmationCode(confirmationCode: string) {
    this.updateValue({ confirmationCode });
  }

  private get isConfirmationCode() {
    return this.confirmationCode.trim().length > 1;
  }

  private get isDisabled() {
    return !(this.isEmail && this.isConfirmationCode);
  }

  @Emit('input') private updateValue(diff: Diff): ConfirmationForm {
    return { ...this.value, ...diff};
  }
}
</script>

<style scoped lang="scss">
  .base-label {
    display: block;
    margin-bottom: 1rem;
  }
</style>
