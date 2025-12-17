
const { defineConfig } = require('vite')
const path = require('path')

module.exports = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: false
  },
  build: {
    outDir: 'dist'
  }
})