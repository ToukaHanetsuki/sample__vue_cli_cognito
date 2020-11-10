import { Mutation, Action, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';

// state's interface
export interface CounterState {
  counter: number;
}
@Module({ dynamic: true, store, name: 'counter', namespaced: true })
class Counter extends VuexModule implements CounterState {
  // state
  public counter = 0;

  // actions
  @Action({})
  public increment(): void {
    this.setCounter(this.counter + 1);
  }

  @Action({})
  public decrement(): void {
    this.setCounter(this.counter - 1);
  }

  // mutation
  @Mutation
  public setCounter(num: number): void {
    this.counter = num;
  }
}

export const counterModule = getModule(Counter);
