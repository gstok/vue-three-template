
const webpack = require("webpack");

module.exports = {
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         jQuery: "jquery",
    //         $: "jquery",
    //     }),
    // ],
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $: "jquery",
            }),
        ],
    },
    devServer: {
        open: true,
    },
};