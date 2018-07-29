module.exports = {
    entry: {
        index: './jsx/index.jsx',
    },
    output: {
        filename: './build/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "react"]
                }
            },
        ]
    },

    target:'node'
};