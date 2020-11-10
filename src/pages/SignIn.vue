<template>
  <SignInTemplate
    v-model="form"
    :click-event="clickEvent"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignInTemplate from '@/components/templates/SignInTemplate.vue';
import { SignInForm } from '@/components/molecules/form/FormSiginIn.vue';

@Component({
  components: {
    SignInTemplate
  }
})
export default class SignIn extends Vue {
  private form: SignInForm = {
    email: '',
    password: ''
  };

  private async clickEvent() {
    await this.$cognito.signIn(this.form.email, this.form.password);
    this.$router.push({name: this.$CONST.ROUTE_NAME.HOME}).catch();
  }
}
</script>
