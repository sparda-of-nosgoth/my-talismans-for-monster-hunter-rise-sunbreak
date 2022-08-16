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
    path: '/talismans/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: 'import_export', component: () => import('components/ManagerImportExport.vue') },
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
