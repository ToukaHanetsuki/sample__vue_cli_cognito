<template>
  <div class="sign-up">
    <main class="sign-up-main">
      <h1>Sign Up</h1>
      <FormSiginUp
        v-model="internalValue"
        :click-event="clickEvent"
      />
      <router-link :to="{name: $CONST.ROUTE_NAME.SIGN_IN}">
        SIGN IN
      </router-link>
    </main>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FormSiginUp, { SignUpForm } from '@/components/molecules/form/FormSiginUp.vue';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';
import { clickEventPropMixin } from '@/mixins/clickEventPropMixin';

@Component({
  components: {
    FormSiginUp
  }
})
export default class SignUpTemplate extends mixins<InternalValueMixin<SignUpForm>, clickEventPropMixin>(InternalValueMixin, clickEventPropMixin) {}
</script>
