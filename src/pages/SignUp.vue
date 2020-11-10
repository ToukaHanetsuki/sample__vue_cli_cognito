<template>
  <SignUpTemplate
    v-model="form"
    :click-event="clickEvent"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignUpTemplate from '@/components/templates/SignUpTemplate.vue';
import { SignUpForm } from '@/components/molecules/form/FormSiginUp.vue';

@Component({
  components: {
    SignUpTemplate
  }
})
export default class SignUp extends Vue {
  private form: SignUpForm = {
    email: '',
    password: '',
    name: ''
  };

  private async clickEvent() {
    await this.$cognito.signUp(this.form.email, this.form.password, {name: this.form.name});
    this.$router.push({name: this.$CONST.ROUTE_NAME.CONFIRMATION}).catch();
  }
}
</script>
