import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // GitHub Pages serves from /<repo>/, so Vite needs a matching base path at build time.
  // In GitHub Actions, `GITHUB_REPOSITORY` looks like: "owner/repo".
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]

  return {
    base: isGitHubPages && repoName ? `/${repoName}/` : '/',
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  }
})
