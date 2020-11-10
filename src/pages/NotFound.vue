<template>
  <NotFoundTemplate />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NotFoundTemplate from '@/components/templates/NotFoundTemplate.vue';

@Component({
  components: {
    NotFoundTemplate
  }
})
export default class NotFound extends Vue {}
</script>
