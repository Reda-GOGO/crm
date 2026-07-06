import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server.ts"],

  outDir: "dist-server",

  format: ["esm"],

  platform: "node",

  target: "node22",

  bundle: true,

  splitting: false,

  sourcemap: true,

  clean: true,

  minify: false,

  dts: false,

  treeshake: true,

  shims: false,

  external: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
});
