<template>
  <div class="confirmation">
    <main class="confirmation-main">
      <h1>Confirmation</h1>
      <FormConfirmation
        v-model="internalValue"
        :click-event="clickEvent"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FormConfirmation, { ConfirmationForm } from '@/components/molecules/form/FormConfirmation.vue';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';
import { clickEventPropMixin } from '@/mixins/clickEventPropMixin';

@Component({
  components: {
    FormConfirmation
  }
})
export default class ConfirmationTemplate extends mixins<InternalValueMixin<ConfirmationForm>, clickEventPropMixin>(InternalValueMixin, clickEventPropMixin) {}
</script>
