import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import sassDts from "vite-plugin-sass-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		sassDts({
			enabledMode: ["development", "production"], // or remove this line to enable it in all modes
		}),
	],
});
