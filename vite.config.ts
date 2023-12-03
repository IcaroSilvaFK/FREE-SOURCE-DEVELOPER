import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vite'
import vitestConfig from './vitest.config'

export default mergeConfig(vitestConfig, defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
}))
