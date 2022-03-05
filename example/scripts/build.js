
import { build } from 'esbuild'
import glob from 'glob'
import * as fs from 'fs'

fs.rmSync("./dist", { recursive: true, force: true })

const entryPoints = glob.sync('./src/index.ts')

build({
  preserveSymlinks: false,
  treeShaking: true,
  tsconfig: './tsconfig.build.json',
  entryPoints,
  bundle: true,
  target: 'es2020',
  outbase: './src',
  outdir: './dist' ,
  platform: 'browser',
  format: "esm",
  sourcemap: true,
  outExtension: {
      '.js': '.mjs'
  },
  external: [],
  watch: false,
})