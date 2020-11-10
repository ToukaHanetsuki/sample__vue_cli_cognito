<template>
  <div class="about">
    <h1>This is an about page</h1>
    <InputTextSubmit
      v-model="text"
      label="テキスト"
      submit-text="確認"
      :click-event="submit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputTextSubmit from '@/components/organisms/search/InputTextSubmit.vue';
import { ExampleCodeUtils } from '../plugins/exampleCodeUtils';

@Component({
  components: {
    InputTextSubmit
  }
})
export default class About extends Vue {
  private text = '';

  private async submit(): Promise<void> {
    await ExampleCodeUtils.examplePromise();
  }
}
</script>
