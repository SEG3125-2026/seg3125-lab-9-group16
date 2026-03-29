import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rawBase = process.env.VITE_BASE_PATH || '/'
const baseSegment = rawBase.replace(/^\/+|\/+$/g, '')

const apiProxy = {
  ...(baseSegment
    ? {
        [`/${baseSegment}/api`]: {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(`/${baseSegment}`, ''),
        },
      }
    : {}),
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: rawBase,
  server: {
    proxy: { ...apiProxy },
  },
  preview: {
    proxy: { ...apiProxy },
  },
})
