import { boot } from 'quasar/wrappers';
import GoogleSignInPlugin from 'vue3-google-signin';

export default boot(async ({ app }) => {
  app.use(GoogleSignInPlugin, {
    clientId: 'VITE_GOOGLE_CLIENT_ID',
  });
});
