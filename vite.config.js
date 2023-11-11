import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/variables.scss"; @import 'node_modules/bootstrap/scss/functions'; @import 'node_modules/bootstrap/scss/variables'; @import 'node_modules/bootstrap/scss/mixins';`
      }
    }
  }
})
