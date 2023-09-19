require('esbuild').buildSync({
    entryPoints: ['./src/index.js'],
    bundle: true,
    minify: true,
    outfile: './dist/bundle.js',
})

