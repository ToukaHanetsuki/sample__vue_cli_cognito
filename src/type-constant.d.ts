import { ROUTE_NAME } from '@/constants/routeName';

declare module 'vue/types/vue' {
  interface Vue {
    $CONST: {
      ROUTE_NAME: typeof ROUTE_NAME;
    };
  }
}