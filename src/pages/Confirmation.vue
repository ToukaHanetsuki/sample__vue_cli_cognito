<template>
  <ConfirmationTemplate
    v-model="form"
    :click-event="clickEvent"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ConfirmationForm } from '@/components/molecules/form/FormConfirmation.vue';
import ConfirmationTemplate from '@/components/templates/ConfirmationTemplate.vue';

@Component({
  components: {
    ConfirmationTemplate
  }
})
export default class Confirmation extends Vue {
  private form: ConfirmationForm = {
    email: '',
    confirmationCode: ''
  };

  private async clickEvent() {
    await this.$cognito.confirmation(this.form.email, this.form.confirmationCode);
    this.$router.push({name: this.$CONST.ROUTE_NAME.SIGN_IN}).catch();
  }
}
</script>
