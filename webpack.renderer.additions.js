module.exports = {
    target: 'electron-renderer',
    module: {
        rules: [
            // es6 + react
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
            },
            // sass
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: ['sass-loader'],
                resolve: {
                    extensions: ['.sass', '.scss'],
                },
            },
        ],
    },
};
