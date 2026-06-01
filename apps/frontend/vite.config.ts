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
                display: "standalone",
                background_color: "#111111",
                theme_color: "#111111",

                icons: [
                    {
                        src: "icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ]
});