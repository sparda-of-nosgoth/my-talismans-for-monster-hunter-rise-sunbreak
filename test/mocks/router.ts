import { config } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import routes from 'src/router/routes';

export function useMockRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  config.global.plugins = [...config.global.plugins, router];

  return { router };
}
