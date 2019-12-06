import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import visualizer from 'rollup-plugin-visualizer';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

export default [
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.min.js', format: 'iife' }],
    plugins: [
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
