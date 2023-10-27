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
    rollupOptions: {
      output: {
        manualChunks(id) {

          if (
            id.includes('sentry') 
          )  {
            return '@sentry';
          }
         
          
          if (
            id.includes(' react-icons') ||    id.includes('react-loader-spinner') 
          )  {
            return '@loaders-icons';
          }
         
          if (
            id.includes('react-router-dom') 
          )  {
            return '@react-router';
          }
          
          
          if (id.includes('@mui') || id.includes('formik')) {
            return '@mui';
          }
          // creating a chunk to react routes deps. Reducing the vendor chunk size
       
          if (
            id.includes('reduxjs/toolkit') ||
            id.includes('react-redux')
          )  {
            return '@redux';
          }

          if (
            id.includes('framer') 
          )  {
            return '@framer';
          }
          if (
            id.includes('date-fns') 
          )  {
            return '@date-fns';
          }
        },
      },
    },
  },
  

})