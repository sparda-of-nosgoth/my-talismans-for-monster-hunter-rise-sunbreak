import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => ({ path: '/talismans/manager' }),
  },
  {
    path: '/talismans/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: 'manager', component: () => import('pages/TalismanManager.vue') },
      { path: 'import_export', component: () => import('pages/TalismanImportExport.vue') },
    ],
  },
  {
    path: '/skills/translation',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/SkillTranslation.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
