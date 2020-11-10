import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import queryString from 'query-string';
import beforeResolve from './beforeResolve';
import { signOut } from './signOut';
import { ROUTE_NAME } from '@/constants/routeName';

// pages
import Home from '@/pages/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: ROUTE_NAME.ROUTE,
    redirect: 'Home'
  },
  {
    path: '/home',
    name: ROUTE_NAME.HOME,
    component: Home,
    meta: { requiredAuth: true }
  },
  {
    path: '/about',
    name: ROUTE_NAME.ABOUT,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
    meta: { requiredAuth: true }
  },
  {
    path: '/signup',
    name: ROUTE_NAME.SIGN_UP,
    component: () => import(/* webpackChunkName: "sign-up" */ '@/pages/SignUp.vue'),
    meta: { notRequiredAuth: true }
  },
  {
    path: '/confirmation',
    name: ROUTE_NAME.CONFIRMATION,
    component: () => import(/* webpackChunkName: "confirmation" */ '@/pages/Confirmation.vue'),
    meta: { notRequiredAuth: true }
  },
  {
    path: '/signin',
    name: ROUTE_NAME.SIGN_IN,
    component: () => import(/* webpackChunkName: "sign-in" */ '@/pages/SignIn.vue'),
    meta: { notRequiredAuth: true }
  },
  {
    path: '/signout',
    name: ROUTE_NAME.SIGN_OUT,
    beforeEnter: signOut
  },
  {
    path: '*',
    name: ROUTE_NAME.NOT_FOUND,
    component: () => import(/* webpackChunkName: "not-found" */ '@/pages/NotFound.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseQuery: (query: string): any => {
    return queryString.parse(query, {
      arrayFormat: 'bracket'
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringifyQuery: (params: any): string => {
    if (0 === Object.keys(params).length) {
      return '';
    } else {
      return '?' + queryString.stringify(params, {
        arrayFormat: 'bracket'
      });
    }
  },
  routes
});

router.beforeResolve(beforeResolve);

export default router;
