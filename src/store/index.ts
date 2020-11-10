import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { CounterState } from '@/store/modules/counter';

export interface State {
  counter: CounterState;
}
export default new Vuex.Store<State>({});
