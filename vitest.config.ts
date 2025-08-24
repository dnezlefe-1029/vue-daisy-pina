import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.ts',
    deps: { inline: ['@vue', '@vueuse'] },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})