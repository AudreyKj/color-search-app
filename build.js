const webpack = require("webpack");
//const dotenv = require("dotenv");

const conf = {
    entry: ["@babel/polyfill", __dirname + "/src/start.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    performance: {
        hints: false
    },
    mode: require.main == module ? "production" : "development",
    optimization:
        require.main == module
            ? {
                  minimize: true
              }
            : {},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-react", "@babel/preset-env"]
                }
            }
        ]
    }
};

if (require.main == module) {
    webpack(conf, function(err, info) {
        if (err) {
            console.log(err);
        }
        if (info && info.compilation.errors.length) {
            console.log(info.compilation.errors);
        }
    });
} else {
    module.exports = require("webpack-dev-middleware")(webpack(conf), {
        watchOptions: {
            aggregateTimeout: 300
        },
        publicPath: "/"
    });
}

// module.exports = () => {
//     const env = dotenv.config().parsed;
//
//     const envKeys = Object.keys(env).reduce((prev, next) => {
//         prev[`process.env.${next}`] = JSON.stringify(env[next]);
//         return prev;
//     }, {});
//
//     return {
//         plugins: [new webpack.DefinePlugin(envKeys)]
//     };
// };
