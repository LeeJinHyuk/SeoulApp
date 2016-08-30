/**
 * Created by LeeJinHyuk on 2016-07-31.
 */
var webpack = require("webpack");

var config = {
    entry : {
      main : __dirname + "/scripts/main.js"
    },
    output : {
        path : __dirname + "/scripts",
        filename : "[name].bundle.js",
        chunkFilename : "[id].bundle.js"
    },
    module : {
        loaders : [
            {
                test : /\.js$/,
                loader : "babel",
                query : {
                    presets : ["es2015", "react", "stage-0"],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};

module.exports = config;
