import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TalismanManager.vue') },
    ],
  },
  {
    path: '/skills',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '/translation', component: () => import('pages/SkillTranslation.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
