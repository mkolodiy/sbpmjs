// vite.config.ts
import { defineConfig } from "file:///Users/mkolodiy/Workspace/sbpmjs/node_modules/.pnpm/vite@5.4.1_@types+node@22.5.5/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/mkolodiy/Workspace/sbpmjs/node_modules/.pnpm/vite-plugin-dts@4.2.1_@types+node@22.5.5_rollup@4.21.3_typescript@5.6.2_vite@5.4.1_@types+node@22.5.5_/node_modules/vite-plugin-dts/dist/index.mjs";
import { externalizeDeps } from "file:///Users/mkolodiy/Workspace/sbpmjs/node_modules/.pnpm/vite-plugin-externalize-deps@0.8.0_vite@5.4.1_@types+node@22.5.5_/node_modules/vite-plugin-externalize-deps/dist/index.js";
var outDir = "dist";
var srcDir = "./src";
var vite_config_default = defineConfig({
  plugins: [
    externalizeDeps({ include: ["@joint/core"] }),
    dts({
      outDir,
      entryRoot: srcDir,
      include: srcDir,
      compilerOptions: {
        module: 99,
        // ESNext
        declarationMap: false
      },
      beforeWriteFile: (filePath, content) => {
        content = content.replace(
          /^(im|ex)port\s[\w{}*\s,]+from\s['"]\.\/[^.'"]+(?=['"];?$)/gm,
          "$&.js"
        );
        return { filePath, content };
      }
    })
  ],
  build: {
    outDir,
    minify: false,
    sourcemap: true,
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
      fileName: () => "[name].js"
    },
    rollupOptions: {
      output: {
        preserveModules: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWtvbG9kaXkvV29ya3NwYWNlL3NicG1qcy9wYWNrYWdlcy9tb2RlbGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWtvbG9kaXkvV29ya3NwYWNlL3NicG1qcy9wYWNrYWdlcy9tb2RlbGVyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ta29sb2RpeS9Xb3Jrc3BhY2Uvc2JwbWpzL3BhY2thZ2VzL21vZGVsZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgeyBleHRlcm5hbGl6ZURlcHMgfSBmcm9tIFwidml0ZS1wbHVnaW4tZXh0ZXJuYWxpemUtZGVwc1wiO1xuXG5jb25zdCBvdXREaXIgPSBcImRpc3RcIjtcbmNvbnN0IHNyY0RpciA9IFwiLi9zcmNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdGV4dGVybmFsaXplRGVwcyh7IGluY2x1ZGU6IFtcIkBqb2ludC9jb3JlXCJdIH0pLFxuXHRcdGR0cyh7XG5cdFx0XHRvdXREaXIsXG5cdFx0XHRlbnRyeVJvb3Q6IHNyY0Rpcixcblx0XHRcdGluY2x1ZGU6IHNyY0Rpcixcblx0XHRcdGNvbXBpbGVyT3B0aW9uczoge1xuXHRcdFx0XHRtb2R1bGU6IDk5LCAvLyBFU05leHRcblx0XHRcdFx0ZGVjbGFyYXRpb25NYXA6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGJlZm9yZVdyaXRlRmlsZTogKGZpbGVQYXRoLCBjb250ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoXG5cdFx0XHRcdFx0L14oaW18ZXgpcG9ydFxcc1tcXHd7fSpcXHMsXStmcm9tXFxzWydcIl1cXC5cXC9bXi4nXCJdKyg/PVsnXCJdOz8kKS9nbSxcblx0XHRcdFx0XHRcIiQmLmpzXCIsXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0cmV0dXJuIHsgZmlsZVBhdGgsIGNvbnRlbnQgfTtcblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG5cdGJ1aWxkOiB7XG5cdFx0b3V0RGlyLFxuXHRcdG1pbmlmeTogZmFsc2UsXG5cdFx0c291cmNlbWFwOiB0cnVlLFxuXHRcdGxpYjoge1xuXHRcdFx0ZW50cnk6IFwiLi9zcmMvaW5kZXgudHNcIixcblx0XHRcdGZvcm1hdHM6IFtcImVzXCJdLFxuXHRcdFx0ZmlsZU5hbWU6ICgpID0+IFwiW25hbWVdLmpzXCIsXG5cdFx0fSxcblx0XHRyb2xsdXBPcHRpb25zOiB7XG5cdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0cHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsb0JBQW9CO0FBQ2xXLE9BQU8sU0FBUztBQUNoQixTQUFTLHVCQUF1QjtBQUVoQyxJQUFNLFNBQVM7QUFDZixJQUFNLFNBQVM7QUFFZixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixnQkFBZ0IsRUFBRSxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7QUFBQSxJQUM1QyxJQUFJO0FBQUEsTUFDSDtBQUFBLE1BQ0EsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsaUJBQWlCO0FBQUEsUUFDaEIsUUFBUTtBQUFBO0FBQUEsUUFDUixnQkFBZ0I7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsaUJBQWlCLENBQUMsVUFBVSxZQUFZO0FBQ3ZDLGtCQUFVLFFBQVE7QUFBQSxVQUNqQjtBQUFBLFVBQ0E7QUFBQSxRQUNEO0FBRUEsZUFBTyxFQUFFLFVBQVUsUUFBUTtBQUFBLE1BQzVCO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ047QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxVQUFVLE1BQU07QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ1AsaUJBQWlCO0FBQUEsTUFDbEI7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
