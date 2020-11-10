<template>
  <div class="home">
    <AuthHeader class="home-header" />
    <transition
      name="fade-in"
      appear
    >
      <main class="home-main">
        <img
          class="logo"
          alt="Vue logo"
          src="@/assets/logo.png"
        >
        <HelloWorld :msg="message" />

        <p>{{ counter }}</p>

        <button @click="increment">
          increment
        </button>

        <button @click="decrement">
          decrement
        </button>
      </main>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import HelloWorld from '@/components/organisms/HelloWorld.vue';
import AuthHeader from '@/components/organisms/header/AuthHeader.vue';

@Component({
  components: {
    HelloWorld,
    AuthHeader
  }
})
export default class HomeTemplate extends Vue {
  @Prop({required: true}) private message!: string;
  @Prop({required: true}) private counter!: number;

  @Emit() private increment(e: MouseEvent): MouseEvent {
    return e;
  }
  @Emit() private decrement(e: MouseEvent): MouseEvent {
    return e;
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    margin: auto;
  }

  .fade-in {
    &-enter-active {
      transition: opacity .6s .1s;
    }
    &-enter {
      opacity: 0;
    }
  }
</style>
