import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default {
  input: "index.ts",
  output: {
    file: "dist/server.js",
    format: "cjs",
  },
  plugins: [typescript(), commonjs(), resolve(), json()],
};
