import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        host: true,
        port: 2000
    },
    
    plugins: [
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",

            devOptions: {
                enabled: true
            },

            manifest: {
                name: "Chess App",
                short_name: "Chess",
                start_url: "/",
                display: "standalone"
            }
        })
    ]
});