import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build use relative asset paths, so it works
// out of the box on GitHub Pages project sites (username.github.io/repo-name/)
// without needing to hardcode the repo name here.
export default defineConfig({
  plugins: [react()],
  base: './',
})
