const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.resolve('javascript', 'app.js'),
    output: {
        filename: 'dist/bundle.js',
        // path: __dirname,
        sourceMapFilename: 'sourcemap'
    }
};
