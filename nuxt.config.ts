// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    // Other modules
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    // The correct configuration for vee-validate
    ["@vee-validate/nuxt", { autoImports: true }],
  ],

  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    baseURL: "/nuxt-task/",
  },

  // nitro: {
  //   preset: "github-pages",
  // },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
});
