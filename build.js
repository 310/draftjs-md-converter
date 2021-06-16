import esbuild from 'esbuild';
import babel from 'esbuild-plugin-babel';

const options = {
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ['path'],
  plugins: [
    babel({
      config: {
        presets: [
          [
            "@babel/preset-env",
            {
              "useBuiltIns": "usage",
              "corejs": 3
            }
          ]
        ],
        plugins: ["@babel/plugin-transform-object-assign"]
      }
    })
  ],
  target: 'es2015'
};
(async () => {
  await esbuild
    .build({ ...options, outfile: 'dist/index.js', format: 'cjs' })
    .catch(() => process.exit(1));

  await esbuild
    .build({ ...options, outfile: 'dist/index.esm.js', format: 'esm' })
    .catch(() => process.exit(1));
})();
