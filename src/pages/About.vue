<template>
  <AboutTemplate
    v-model="text"
    :click-event="submit"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputSearch from '@/components/molecules/search/InputSearch.vue';
import AboutTemplate from '@/components/templates/AboutTemplate.vue';
import { ExampleCodeUtils } from '@/plugins/exampleCodeUtils';

@Component({
  components: {
    InputSearch,
    AboutTemplate
  }
})
export default class About extends Vue {
  private text = '';

  private async submit(): Promise<void> {
    await ExampleCodeUtils.examplePromise();
  }
}
</script>
