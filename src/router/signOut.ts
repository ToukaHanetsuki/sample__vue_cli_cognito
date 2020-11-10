import { Route, NavigationGuardNext } from 'vue-router';
import { Cognito } from '@/plugins/cognito';
import { ROUTE_NAME } from '@/constants/routeName';

/** サインアウト */
export const signOut = (to: Route, from: Route, next: NavigationGuardNext): void => {
  Cognito.signOut();
  next({name: ROUTE_NAME.SIGN_IN});
};