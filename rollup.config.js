import path from 'path';

import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import visualizer from 'rollup-plugin-visualizer';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import beep from '@rollup/plugin-beep';
import progress from 'rollup-plugin-progress';
import cjs from 'rollup-plugin-commonjs';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import globals from 'rollup-plugin-node-globals';

import getDirList from './internals/getDirList';

const ROOT_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(ROOT_DIR, 'src');

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      buble(),
      cjs({
        include: ['node_modules/**'],
        namedExports: {
          'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
          'node_modules/react-dom/index.js': ['render']
        }
      }),
      resolve({
        browser: true,
        main: true,
      }),
      globals(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      alias({
        resolve: ['.js', '.ts', '.tsx'],
        entries: getDirList(APP_DIR).map(dir => ({
          find: dir,
          replacement: path.resolve(ROOT_DIR, `src/${dir}`),
        })),
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
      beep(),
      progress({
        clearLine: false,
      }),
    ]
  }
]
