<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld :msg="message" />

    <p>{{ counter }}</p>
    <button @click="increment">
      increment
    </button>
    <button @click="decrement">
      decrement
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { counterModule } from '@/store/modules/counter';
import HelloWorld from '@/components/templates/HelloWorld.vue';

@Component({
  components: {
    HelloWorld
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
