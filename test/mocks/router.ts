import { createRouter, createWebHistory } from 'vue-router';
import routes from 'src/router/routes';

const routerMocked = createRouter({
  history: createWebHistory(),
  routes,
});

export { routerMocked };
