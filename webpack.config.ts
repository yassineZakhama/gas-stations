import { Configuration } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const devServer: WebpackDevServer.Configuration = {
	port: 3000,
	open: true,
	hot: true,
	liveReload: false,
	client: {
		overlay: false
	},
	proxy: [
		{
			context: ["/api"],
			target: "http://localhost:3001"
		}
	],
	static: [{ directory: __dirname + "/client/resources/html" }, { directory: __dirname + "/build/dist" }]
};

const config: Configuration = {
	devServer,
	devtool: "source-map",
	mode: "development",
	entry: "/client/src/index.tsx",
	output: {
		path: __dirname + "build/webpack",
		filename: "[name].[contenthash].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: "client/resources/html/index.html"
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"]
			},
			{
				test: /\.tsx?$/,
				loader: "esbuild-loader",
				options: {
					loader: "tsx",
					target: "ES2020"
				}
			},
			{
				test: /.svg?$/,
				loader: "@svgr/webpack",
				options: {
					svgo: false
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx"]
	}
};

export default config;
