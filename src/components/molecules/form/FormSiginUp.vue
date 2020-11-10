<template>
  <form class="form-sign-up">
    <BaseLabel>
      アカウント名
      <BaseInputText
        v-model="name"
        autocomplete="name"
      />
    </BaseLabel>
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
        autocomplete="new-password"
      />
    </BaseLabel>
    <BaseLabel>
      パスワード確認
      <InputPassword
        v-model="confirmPassword"
        autocomplete="new-password"
      />
    </BaseLabel>
    <SubmitButton
      :disabled="isDisabled"
      :click-event="clickEvent"
    >
      SIGN UP
    </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import BaseInputText from '@/components/atoms/input/BaseInputText.vue';
import InputPassword from '@/components/atoms/input/InputPassword.vue';
import SubmitButton from '@/components/atoms/button/SubmitButton.vue';
import BaseLabel from '@/components/atoms/label/BaseLabel.vue';

export interface SignUpForm extends Email, Password, Name {}
interface Email { email: string }
interface Password { password: string }
interface Name { name: string }

type Diff = Email|Password|Name;

/** サインアップするためのFormコンポーネント */
@Component({
  components: {
    BaseInputText,
    InputPassword,
    SubmitButton,
    BaseLabel
  }
})
export default class FormSiginUp extends Vue {
  @Prop({required: true}) private value!: SignUpForm;
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

  private get password() {
    return this.value.password;
  }

  private set password(password: string) {
    this.updateValue({ password });
  }

  private get isPassword() {
    return this.password.trim().length > 1;
  }

  private get name() {
    return this.value.name;
  }

  private set name(name: string) {
    this.updateValue({ name });
  }

  private get isName() {
    return this.name.trim().length > 1;
  }

  private get isUnMatchPassword() {
    return this.confirmPassword !== this.password;
  }

  private get isDisabled() {
    return !(this.isEmail && this.isPassword && this.isName) || this.isUnMatchPassword;
  }

  @Emit('input') private updateValue(diff: Diff): SignUpForm {
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
