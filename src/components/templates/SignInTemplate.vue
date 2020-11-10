<template>
  <div class="sign-in">
    <main class="sign-in-main">
      <h1>Sign In</h1>
      <FormSiginIn
        v-model="internalValue"
        :click-event="clickEvent"
      />
      <router-link :to="{name: $CONST.ROUTE_NAME.SIGN_UP}">
        SIGN UP
      </router-link>
    </main>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FormSiginIn, { SignInForm } from '@/components/molecules/form/FormSiginIn.vue';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';
import { clickEventPropMixin } from '@/mixins/clickEventPropMixin';

@Component({
  components: {
    FormSiginIn
  }
})
export default class SignInTemplate extends mixins<InternalValueMixin<SignInForm>, clickEventPropMixin>(InternalValueMixin, clickEventPropMixin) {}
</script>
