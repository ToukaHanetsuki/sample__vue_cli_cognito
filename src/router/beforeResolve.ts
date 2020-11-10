import { Route, NavigationGuardNext } from 'vue-router';
import { Cognito } from '@/plugins/cognito';
import { signOut } from './signOut';

/**
 * 認証ページ遷移制限
 *
 * 認証が必要なページに遷移しようとしていた場合は認証画面にリダイレクトさせる
 */
const validRequiredAuth = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    signOut(to, from, next);
    return false;
  }
  return true;
};

/**
 * 非認証ページ遷移制限
 *
 * 非認証でないと遷移できないページの制限
 */
const validNotRequiredAuth = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (to.matched.some(record => record.meta.notRequiredAuth)) {
    next(false);
    return false;
  }
  return true;
};

export default async(to: Route, from: Route, next: NavigationGuardNext): Promise<void> => {

  const isApproveNext = await Cognito.checkAuthenticated()
    .then(async() => {
      return validNotRequiredAuth(to, from, next);
    })
    .catch(() => {
      return validRequiredAuth(to, from, next);
    });

  if (isApproveNext) {
    next();
  }
};