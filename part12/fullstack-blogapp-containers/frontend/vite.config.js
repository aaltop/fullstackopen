import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: process.env.VITE_BACKEND_URL,
                changeOrigin: true,
            },
        },
        // windows-wsl2 integration
        watch: { usePolling: true }
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./testSetup.js"
    },
    // build: {
    //     outDir: "../dist",
    //     emptyOutDir: true
    // }
})
