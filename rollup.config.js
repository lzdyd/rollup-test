import path from 'path';

import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import visualizer from 'rollup-plugin-visualizer';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

import getDirList from './internals/getDirList';

const ROOT_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(ROOT_DIR, 'src');

export default [
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.min.js', format: 'iife' }],
    plugins: [
      resolve(),
      alias({
        resolve: ['.ts'],
        entries: getDirList(APP_DIR).map(dir => ({
          find: dir,
          replacement: path.resolve(ROOT_DIR, `src/${dir}`)
        }))
      }),
      typescript({
        typescript: require('typescript'),
        objectHashIgnoreUnknownHack: true,
      }),
      cleaner({
        targets: ['./dist/'],
      }),
      visualizer(),
      sizeSnapshot(),
    ],
  },
];
