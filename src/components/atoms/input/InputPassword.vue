<template>
  <BaseInputText
    v-model="internalValue"
    type="password"
    v-bind="$attrs"
    @enter="enter"
  />
</template>

<script lang="ts">
import { Component, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';
import BaseInputText from './BaseInputText.vue';

/** input[type=password]コンポーネント */
@Component({
  components: {
    BaseInputText
  }
})
export default class InputPassword extends mixins(InternalValueMixin) {
  @Emit() private enter(e: KeyboardEvent): KeyboardEvent {
    return e;
  }
}
</script>

<style scoped lang="scss"></style>
