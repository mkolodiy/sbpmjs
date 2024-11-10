import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

const outDir = "dist";
const srcDir = "./src";

export default defineConfig({
	plugins: [
		externalizeDeps({ include: ["@joint/core"] }),
		dts({
			outDir,
			entryRoot: srcDir,
			include: srcDir,
			compilerOptions: {
				module: 99, // ESNext
				declarationMap: false,
			},
			beforeWriteFile: (filePath, content) => {
				content = content.replace(
					/^(im|ex)port\s[\w{}*\s,]+from\s['"]\.\/[^.'"]+(?=['"];?$)/gm,
					"$&.js",
				);

				return { filePath, content };
			},
		}),
	],
	build: {
		outDir,
		minify: false,
		sourcemap: true,
		lib: {
			entry: "./src/index.ts",
			formats: ["es"],
			fileName: () => "[name].js",
		},
		rollupOptions: {
			output: {
				preserveModules: true,
			},
		},
	},
});
