<template>
  <form class="form-sign-in">
    <BaseLabel>
      メールアドレス
      <BaseInputText
        v-model="email"
        type="email"
        autocomplete="username"
      />
    </BaseLabel>
    <BaseLabel>
      パスワード
      <InputPassword
        v-model="password"
        autocomplete="current-password"
      />
    </BaseLabel>
    <SubmitButton
      :disabled="isDisabled"
      :click-event="clickEvent"
    >
      SIGN IN
    </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import BaseInputText from '@/components/atoms/input/BaseInputText.vue';
import InputPassword from '@/components/atoms/input/InputPassword.vue';
import SubmitButton from '@/components/atoms/button/SubmitButton.vue';
import BaseLabel from '@/components/atoms/label/BaseLabel.vue';

export interface SignInForm extends Email, Password {}
interface Email { email: string }
interface Password { password: string }

type Diff = Email|Password;

/** サインアップするためのFormコンポーネント */
@Component({
  components: {
    BaseInputText,
    InputPassword,
    SubmitButton,
    BaseLabel
  }
})
export default class FormSiginIn extends Vue {
  @Prop({required: true}) private value!: SignInForm;
  @Prop({ required: true }) private clickEvent!: (e: Event) => Promise<unknown>;

  private get email() {
    return this.value.email;
  }

  private set email(email: string) {
    this.updateValue({ email });
  }

  private get isEmail() {
    return this.email.trim().length > 1;
  }

  private get password() {
    return this.value.password;
  }

  private set password(password: string) {
    this.updateValue({ password });
  }

  private get isPassword() {
    return this.password.trim().length > 1;
  }

  private get isDisabled() {
    return !(this.isPassword && this.isEmail);
  }

  @Emit('input') private updateValue(diff: Diff): SignInForm {
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
