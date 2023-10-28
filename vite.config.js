import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig,splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {visualizer} from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),splitVendorChunkPlugin(), sentryVitePlugin({
    org: "sentry",
    project: "cannalog",
    url: "https://olympus.zaheerroberts.co.za/",
    //authToken: process.env.SENTRY_AUTH_TOKEN
  }),
  //viteCompression(),
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
            id.includes('socket.io') || id.includes('axios')
          )  {
            return '@networking';
          }

          // if (
          //   id.includes('assets')
          // )  {
          //   return '@assets';
          // }
          
          //  if (
          //    id.includes('PublicPlants')
          //  )  {
          //    return '@publicPlants';
          //  }

          //  if (
          //    id.includes('MyPlants')
          //  )  {
          //    return '@myPlants';
          //  }

          // if (
          //   id.includes('Terms') || id.includes('PrivacyPolicy') ||  id.includes('CookiePolicy')
          // )  {
          //   return '@legal';
          // }

          if (
            id.includes('chart') || id.includes('Chart')
          )  {
            return '@charts';
          }
          
          if (
            id.includes('sentry') 
          )  {
            return '@sentry';
          }
         
          
          if (
            id.includes(' react-icons') ||    id.includes('react-loader-spinner') 
          )  {
            return '@loaders';
          }
         
          if (
            id.includes('react-router-dom') 
          )  {
            return '@react-router';
          }
          
          
          if (id.includes('@mui') || id.includes('formik') ||  id.includes('yup') ){
            return '@mui';
          }

       
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