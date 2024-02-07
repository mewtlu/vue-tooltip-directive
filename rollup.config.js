import { defineConfig } from 'rollup'
import packageConfig from './package.json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import vuePlugin from 'rollup-plugin-vue2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const sharedPlugins = [
  vuePlugin(),
  nodeResolve(),
]

export default [
  defineConfig({
    input: './src/index.ts',
    output: {
      dir: packageConfig.exports['.'].import,
      format: 'esm',
    },
    external: [
      'vue',
    ],
    plugins: [
      commonjs(), // Needs to be before typescript plugin for some reason
      typescript({
        tsconfig: './tsconfig.json',
      }),
      ...sharedPlugins,
    ]
  }),
  defineConfig({
    input: './src/index.ts',
    output: {
      dir: packageConfig.exports['.'].require,
      format: 'cjs',
    },
    external: [
      'vue',
    ],
    plugins: [
      commonjs(), // Needs to be before typescript plugin for some reason
      typescript({
        tsconfig: './tsconfig.cjs.json',
      }),
      ...sharedPlugins
    ]
  })
]
