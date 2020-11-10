import { VueConstructor } from 'vue';
import { Cognito as CognitoPlugin } from './cognito';

export const Cognito = new CognitoPlugin();

export const cognitoPlugin = {
  install(Vue: VueConstructor): void {

    // instance propertyの登録
    Vue.prototype.$cognito = Cognito;
  }
};