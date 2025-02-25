import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import sassDts from "vite-plugin-sass-dts";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsConfigPaths(),
    sassDts({
      enabledMode: ["development", "production"], // or remove this line to enable it in all modes
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
  },
});
