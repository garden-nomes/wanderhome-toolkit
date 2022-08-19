import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/wanderhome-toolkit/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src"),
    },
  },
});
