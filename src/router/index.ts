import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import queryString from 'query-string';

// pages
import Home from '@/pages/Home.vue';
import ExampleSort from '@/pages/ExampleSort.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: (): any => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  {
    path: '/example_sort',
    name: 'ExampleSort',
    component: ExampleSort
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

export default router;
