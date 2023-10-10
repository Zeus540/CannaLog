import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), sentryVitePlugin({
    org: "sentry",
    project: "cannalog",
    url: "https://olympus.zaheerroberts.co.za/"
  })],

  build: {
    sourcemap: true
  }
})