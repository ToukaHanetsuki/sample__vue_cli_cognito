import { Cognito } from '@/plugins/cognito/cognito';

declare module 'vue/types/vue' {
  interface Vue {
    $cognito: Cognito;
  }
}