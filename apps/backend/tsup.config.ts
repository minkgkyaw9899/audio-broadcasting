import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  watch: process.env.NODE_ENV !== 'production' ? true : false,
  format: 'esm'
})