/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8'
    },
    setupFiles: ['./src/setup-vitest.ts']
  },
})