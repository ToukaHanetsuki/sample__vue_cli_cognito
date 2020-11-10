<template>
  <div class="about">
    <AuthHeader class="about-header" />
    <main class="about-main">
      <h1>This is an about page</h1>
      <InputSearch
        v-model="internalValue"
        label="テキスト"
        submit-text="確認"
        :click-event="clickEvent"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import InputSearch from '@/components/molecules/search/InputSearch.vue';
import AuthHeader from '@/components/organisms/header/AuthHeader.vue';
import { mixins } from 'vue-class-component';
import { InternalValueMixin } from '@/mixins/InternalValueMixin';
import { clickEventPropMixin } from '@/mixins/clickEventPropMixin';

@Component({
  components: {
    InputSearch,
    AuthHeader
  }
})
export default class AboutTemplate extends mixins<InternalValueMixin<string>, clickEventPropMixin>(InternalValueMixin, clickEventPropMixin) {}
</script>
