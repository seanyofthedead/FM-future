import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'

// The build inlines everything (JS, CSS, fonts, CSV data) into dist/index.html so the
// demo can be sent as one file and opened from disk with no server or npm install.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  server: { port: 5180 },
  build: { assetsInlineLimit: 100_000_000 },
})
