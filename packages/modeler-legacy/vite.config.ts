import { defineConfig } from "vite";
import packageJson from "./package.json";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			name: packageJson.name,
			formats: ["es"],
			fileName: () => "index.js",
		},
		rollupOptions: {
			external: ["jointjs"],
		},
	},
});
