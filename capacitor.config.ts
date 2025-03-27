import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ReactiveForm',
  webDir: 'www',

plugins: {
  GoogleAuth: {
    scopes: ["profile", "email"],
    serverClientId: "701772098331-45uur025tla55uhh6r3e2cucio9ua618.apps.googleusercontent.com",
    forceCodeForRefreshToken: true
  }
}
};

export default config;
