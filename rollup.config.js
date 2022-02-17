import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';
import vuePlugin from 'rollup-plugin-vue2'

export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'commonjs'
  },
  external: [
    'vue',
    'uuid'
  ],
  plugins: [
    commonjs(),
    typescript(),
    vuePlugin(),
  ]
})