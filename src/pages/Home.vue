<template>
  <HomeTemplate
    :message="message"
    :counter="counter"
    @increment="increment"
    @decrement="decrement"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { counterModule } from '@/store/modules/counter';
import HomeTemplate from '@/components/templates/HomeTemplate.vue';

@Component({
  components: {
    HomeTemplate
  }
})
export default class Home extends Vue {
  private message = 'Welcome to Your Vue.js App';

  private get counter(): number {
    return counterModule.counter;
  }

  private increment(): void {
    counterModule.increment();
  }

  private decrement(): void {
    counterModule.decrement();
  }
}
</script>