if (process.argv.length < 3) {
    console.error("Your less app host should be specified. ex: 'node build.js test.edgeone.app'")
    return
}

let appHost = process.argv[2]
let shell = require('shelljs')
shell.ls('./index.html', './src/index.js').forEach(function (file) {
    shell.sed('-i', 'REPLACE_WITH_YOUR_APP_HOST', appHost, file);
});

require('esbuild').buildSync({
    entryPoints: ['./src/index.js'],
    bundle: true,
    minify: true,
    outfile: './dist/bundle.js',
})

