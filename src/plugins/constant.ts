import { VueConstructor } from 'vue';
import { ROUTE_NAME } from '@/constants/routeName';

export const constantPlugin = {
  install(Vue: VueConstructor): void {

    // instance propertyの登録
    Vue.prototype.$CONST = {
      ROUTE_NAME
    };
  }
};