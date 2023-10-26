import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig,splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {visualizer} from "rollup-plugin-visualizer";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),splitVendorChunkPlugin(), sentryVitePlugin({
    org: "sentry",
    project: "cannalog",
    url: "https://olympus.zaheerroberts.co.za/",
    //authToken: process.env.SENTRY_AUTH_TOKEN
  }),
  visualizer({
    emitFile:true,
    filename:"stats.html"
  })],

  build: {
    sourcemap: true,
  },

})