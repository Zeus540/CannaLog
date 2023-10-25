import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh';
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), sentryVitePlugin({
    org: "sentry",
    project: "cannalog",
    url: "https://olympus.zaheerroberts.co.za/",
    authToken: process.env.SENTRY_AUTH_TOKEN
  })],

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Specify how to manually split chunks
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },

})