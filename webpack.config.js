var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/MonthPicker/MonthPicker.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'MonthPicker.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use:  {
            
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
              
            }
            }
        ]
    }
}