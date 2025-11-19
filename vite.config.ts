import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "tailwindcss";

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    resolve: {
        alias: {
            "@data": path.resolve(__dirname, "src/data"),
            "@components": path.resolve(__dirname, "src/components"),
        },
    },
});
