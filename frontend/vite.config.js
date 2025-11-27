import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { data } from "react-router-dom";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      comps: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/components/pages"),
      css: path.resolve(__dirname, "src/assets/stylesheets"),
      data: path.resolve(__dirname, "src/data"),
    },
  },
});
