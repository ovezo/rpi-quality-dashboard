import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import postcss from './postcss.config.cjs'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() 

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
    'serverUrl': JSON.stringify(process.env.DEVICE_BACKEND_URL+"/"), //http://35.223.249.6
    'googleUrl': JSON.stringify(process.env.GOOGLE_URL+"/"),
  },
  css: {
    postcss,
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude:[
        ...configDefaults.exclude, 
        'src/archive/*'
      ]
    }
  },
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  assetsInclude: "**/*.tif"
})
