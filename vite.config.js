import { defineConfig } from 'vite'
import { resolve, basename } from 'path'
import { readdirSync } from 'fs'

const projectName = basename(__dirname)   // ✅ root project folder name

function getHtmlInputs(dir) {
  const files = readdirSync(dir, { withFileTypes: true })
  const inputs = {}

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.html')) {
      const name = file.name.replace('.html', '')
      inputs[name] = resolve(dir, file.name)
    }
  }
  return inputs
}

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? `/${projectName}/` : '/',  // ✅ auto project folder
    build: {
      rollupOptions: {
        input: {
          ...getHtmlInputs(resolve(__dirname, './'))
        }
      }
    }
  }
})
