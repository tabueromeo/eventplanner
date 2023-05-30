const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
	output: {
		path: path.join(__dirname, "/public"), // the bundle output path
		filename: "bundle.js", // the name of the bundle
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html", // to import index.html file inside index.js
		}),
		new ESLintPlugin(),
		new Dotenv(),
	],
	devServer: {
		port: 3000, // you can change the port
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // .js and .jsx files
				exclude: /node_modules/, // excluding the node_modules folder
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: "url-loader",
				options: { limit: false },
			},
		],
	},
};
