import common from "./webpack.common.js";
import { merge } from "webpack-merge";
export default merge(common, {
  mode: "production",
  entry: "./src/index.js",
  devtool: "source-map",
});
